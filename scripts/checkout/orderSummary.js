  import {cart} from '../../data/cart.js';
  import {products, getProduct} from '../../data/products.js';
  import {formatCurrency} from '../utils/money.js';
  import { removeFromCart, updateDeliveryOption} from '../../data/cart.js';
  import { calculateCartQuantity } from '../../data/cart.js';
  import { UpdateQuantity } from '../../data/cart.js';
  import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
  import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
  import { renderPaymentSummary } from './paymentSummary.js';
  import { renderCheckoutHeader } from './checkoutHeader.js';



  export function renderOrderSummary(){


    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {

      const productId = cartItem.productId;
      const matchingProduct = getProduct(productId);

      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = getDeliveryOption(deliveryOptionId);
      const dateString = calculateDeliveryDate(deliveryOption);

      cartSummaryHTML += `<div class="cart-item-container
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name js-product-name-${matchingProduct.id}">
                ${matchingProduct.name}
              </div>
              <div class="product-price js-product-price-${matchingProduct.id}">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${delOptionsHtml(matchingProduct, cartItem)}
            </div>
          </div>
        </div>`;
    });

    function delOptionsHtml(matchingProduct, cartItem){

      let html = '';

      deliveryOptions.forEach((option) => {
        const dateString = calculateDeliveryDate(option);
        const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)}`;

        const isChecked = option.id === cartItem.deliveryOptionId;

        html += `
          <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${option.id}" data-product-id="${matchingProduct.id}" data-delivery-option-id="${option.id}">
            <input type="radio" ${isChecked ? 'checked' : ''}
              class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${option.id}"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        `
    });
    return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        
        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
        
      });
    });


    document.querySelectorAll('.js-update-link').forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        
        container.classList.add('is-editing-quantity');
      });
    });


    document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(quantityInput.value);

        if (newQuantity <= 0 || newQuantity >= 1000) {
          alert('Quantity must be at least 1 and less than 1000\nIf you wish to reduce the product quantity to 0, please use the delete button instead.');
          return;
        }

        UpdateQuantity(productId, newQuantity);

        container.classList.remove('is-editing-quantity');
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
      });
    });

    document.querySelectorAll('.quantity-input').forEach((input) => {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const productId = input.dataset.productId;

          const saveLink = document.querySelector(`.js-save-quantity-link[data-product-id="${productId}"]`);
          
          saveLink.click();
        }
      });
    });

    document.querySelectorAll('.js-delivery-option').forEach((option)=>{
      option.addEventListener('click',() => {
        const{productId, deliveryOptionId} = option.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
      })
    });
  }


