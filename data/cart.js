export let cart = [{
  productId: 
  'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 1,
}, {
  productId:
  '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 2
}];

export function addToCart(productId, buyQuantity){
  let matchingItem;
  cart.forEach((item) => {
    if(productId == item.productId){
      matchingItem = item;
    }
  });
  if(matchingItem){
    matchingItem.quantity += buyQuantity;
  }
  else{
    cart.push({
      productId,
      quantity: buyQuantity
    });
  }
}

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem)
    }
  });

  cart = newCart;
}