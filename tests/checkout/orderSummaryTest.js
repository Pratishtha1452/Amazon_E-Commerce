import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {cart} from "../../data/cart-class.js";


describe('test suite: renderOrderSummary', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    document.querySelector('.js-test-container').innerHTML = `
    <div class= js-checkout-header></div>
    <div class="js-order-summary"></div>
    <div class=js-payment-summary></div>
    `;

    cart.cartItems = [{
        productId: 
        'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }, {
        productId:
        '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryOptionId: '2'
      }];
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = ``;
  });

  it('displaysTheCart', () => {
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).innerText
    ).toContain('Quantity: 1');
    expect(
      document.querySelector(`.js-product-quantity-${'15b6fc6f-327a-4ec4-896f-486349e85a3d'}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-name-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');

      expect(
        document.querySelector(`.js-product-price-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`)
      .innerText).toEqual('$10.90');
  });
  
  it('removesAProduct', () => {
    document.querySelector(`.js-delete-link-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${'15b6fc6f-327a-4ec4-896f-486349e85a3d'}`)
    ).not.toEqual(null);
    
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
  });

  it('updates delivery option', () => {
    document.querySelector(`.js-delivery-option-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}-${'3'}`).click();

    expect(document.querySelector(`.js-delivery-option-input-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}-${'3'}`).checked).toEqual(true);

    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
  });
});