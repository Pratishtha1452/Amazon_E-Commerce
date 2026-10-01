import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {loadProductsFetch} from '../data/products.js';
import '../data/cart-class.js'
import {cart} from '../data/cart-class.js';
//import '../data/car.js';
//import '../data/backend-practice.js'

Promise.all([
  new Promise((resolve) => {
    loadProductsFetch().then(() => {
      resolve();
    });
  }),
  new Promise((resolve) => {
    cart.loadCart(() => {
      resolve();
    });
  })
]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve();
//   });

// }).then(() => {
//   new Promise((resolve) => {
//     cart.loadCart(() => {
//       resolve();
//     });
//   });

// }).then(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });
// loadProducts(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });
