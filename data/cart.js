export const cart = [];

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