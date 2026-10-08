import {getOrder} from '../data/orders.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

async function loadTrackingPage() {
  await loadProductsFetch();
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product= getProduct(productId);

  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  const deliveryDateString = dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D, YYYY');
  const currentTime = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const deliveryProgress = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

  const isPreparing = deliveryProgress < 50;
  const isShipped = deliveryProgress >= 50 && deliveryProgress < 100;
  const isDelivered = deliveryProgress >= 100;

  let trackingHtml =``;
  trackingHtml = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${deliveryDateString}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${isPreparing ? 'current-status' : ''}">
        Preparing
      </div>
      <div class="progress-label ${isShipped ? 'current-status' : ''}">
        Shipped
      </div>
      <div class="progress-label ${isDelivered ? 'current-status' : ''}">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${deliveryProgress}%"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHtml;
}
loadTrackingPage();

document.querySelector('.js-search-button').addEventListener('click', () => {
  const search = document.querySelector('.js-search-bar').value;
  window.location.href = `amazon.html?search=${search}`;
});