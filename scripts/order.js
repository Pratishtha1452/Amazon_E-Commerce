import { orders } from '../data/orders.js';
import { loadProductsFetch, getProduct } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {cart} from '../data/cart-class.js';


async function loadOrders() {
  await loadProductsFetch();

  let orderContainer = '';

  orders.forEach((order) => {
    orderContainer += `
      <div class="order-container">
        <!-- 1. TOP HEADER SECTION -->
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dayjs(order.orderTime).format('MMMM D')}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <!-- 2. PRODUCT GRID SECTION (OUTSIDE order-header) -->
        <div class="order-details-grid">
          ${renderOrders(order)}
        </div>
      </div>
    `;
  });

  document.querySelector('.js-orders-grid').innerHTML = orderContainer;
  document.querySelectorAll('.js-buy-again').forEach((button, index) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset;
      cart.addToCart(productId, 1);
      button.innerHTML =`Added`;
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    });
  });
}

function renderOrders(order) {
  let productsHtml = '';

  order.products.forEach((productDetails) => {
    const product = getProduct(productDetails.productId);
    const deliveryDate = dayjs(productDetails.estimatedDeliveryTime).format('MMMM D');

    productsHtml += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${deliveryDate}
        </div>
        <div class="product-quantity">
          Quantity: ${productDetails.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <!-- Inside scripts/orders.js -->
        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });

  return productsHtml;
}

loadOrders();