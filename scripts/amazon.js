import {cart} from '../data/cart-class.js';
import {products, loadProductsFetch} from '../data/products.js'
import '../data/products.js';

loadProductsFetch().then(() => {
  renderProductsGrid();
});


function renderProductsGrid(){
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  // 2. Filter products if search exists
  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      // Check if any keyword matches (for 18q)
      if (product.keywords) {
        product.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(search.toLowerCase())) {
            matchingKeyword = true;
          }
        });
      }

      return (
        matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  let productsHTML = '';
  const addedMessageTimeout ={};

  filteredProducts.forEach((product) => {
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count} 
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHtml()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id= "${product.id}">
        Add to Cart
      </button>
    </div>
    `;
  });
  document.querySelector('.js-products-grid').innerHTML = productsHTML;


  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset;
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const buyQuantity = Number(quantitySelector.value);

      cart.addToCart(productId, buyQuantity);

      UpdateCartQuantity();

      showAdded(productId);
      
      console.log(cart);
    });
  });


  function showAdded(productId){
    let addedMsg = document.querySelector(`.js-added-${productId}`);
    addedMsg.classList.add('addedmsg');
    const prevTimeoutId = addedMessageTimeout[productId];
    if(prevTimeoutId){
      clearTimeout(prevTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedMsg.classList.remove('addedmsg');
    }, 2000);

    addedMessageTimeout[productId] = timeoutId;
  }

  function UpdateCartQuantity(){
    const cartQuantity = cart.calculateCartQuantity();

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
  UpdateCartQuantity();

}

document.querySelector('.js-search-button').addEventListener('click', () => {
  const search = document.querySelector('.js-search-bar').value;
  window.location.href = `amazon.html?search=${search}`;
});