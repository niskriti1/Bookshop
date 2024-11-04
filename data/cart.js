export let cart =  JSON.parse(localStorage.getItem('cart'));
if (!cart){
 cart =[{
  dataId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
},{
  dataId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
},];
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export const addtoCart =(dataId,quantity)=>{
  
  let matchingItems = cart.find(cartItem => cartItem.dataId === dataId);
  if (matchingItems) {
    matchingItems.quantity+=quantity;
  }else{
    cart.push({
      dataId,
      quantity
    });
    
  }
  saveToStorage();

};

export const calculateCartQuantity = () => {
  let cartQuantity = 0;

  cart.forEach((cartItem)=>{
    cartQuantity+=cartItem.quantity;
  });
  return cartQuantity;
};

export const updateQuantity = (dataId,newquantity)=>{
  let matchingItem;

  cart.forEach((cartItem)=>{
    if (cartItem.dataId===dataId) {
      matchingItem = cartItem
    }
  });
  if (matchingItem) {
    matchingItem.quantity=newquantity;
  }

  saveToStorage();
}

export const removeCartQuantity = (dataId) =>{
  const newCart = [];

  cart.forEach((cartItem)=>{
    if (cartItem.dataId!==dataId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToStorage();
};
