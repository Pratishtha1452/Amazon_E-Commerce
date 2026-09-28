import { getDeliveryOption } from "./deliveryOptions.js";

function Cart(localStorageKey) {
  const cart = {
    cartItems : undefined,

    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if(!this.cartItems){
        this.cartItems = [{
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
      }
    },

    saveToStorage(){
      localStorage.setItem('localStorageKey', JSON.stringify(this.cartItems));
    },

    addToCart(productId, buyQuantity = 1){
      //if already exists in cart -> find it in the cart and increase the quantity
      let matchingItem;
      this.cartItems.forEach((item) => {
        if(productId == item.productId){
          matchingItem = item;
        }
      });
      if(matchingItem){
        matchingItem.quantity += buyQuantity;
      }

      //else if not in cart push it into the cart object
      else{
        this.cartItemst.push({
          productId,
          quantity: buyQuantity,
          deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
    },

    removeFromCart(productId){
      const newCart = [];
      this.cartItemsrt.forEach((cartItem) => {
        if(cartItem.productId !== productId){
          newCart.push(cartItem)
        }
      });

      this.cartItems = newCart;

      this.saveToStorage();
    },

    calculateCartQuantity(){
      let cartQuantity = 0;
      this.cartItems.forEach((item) => {
        cartQuantity += item.quantity;
      });
      return cartQuantity;
    },

    UpdateQuantity(productId, newQuantity){
      this.cartItems.forEach((item) => {
        if(item.productId === productId){
          item.quantity = newQuantity;
        }
      });

      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId){
      let matchingItem;
      this.cartItems.forEach((item) => {
        if(productId == item.productId){
          matchingItem = item;
        }
      });

      if(!matchingItem){
        return;
      }

      const deliveryOption = getDeliveryOption(deliveryOptionId);
      if(!deliveryOption){
        return;
      }
      matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart();
const businessCart = Cart();
cart.loadFromStorage('cart-oop');
businessCart.loadFromStorage('business-cart');

console.log(cart);
console.log(businessCart);
