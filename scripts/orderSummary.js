import { cart,calculateCartQuantity, updateQuantity,removeCartQuantity } from "../data/cart.js";
import { products } from "../data/data.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'


export function orderSummary(){

  updateCartQuantity();

  let cartSummaryHTML= ``;

  cart.forEach((cartItem)=>{
    const dataId = cartItem.dataId;
    let matchingItem;

    products.forEach((data)=>{
      if (data.id === dataId) {
        matchingItem = data;
      }
    });

  const today=dayjs();
  const deliveryDate = today.add(3,'days');
  const dateString=deliveryDate.format('dddd, MMMM D');
  

  cartSummaryHTML+=`
      <div class="cart-item-container js-cart-item-container-${matchingItem.id}">

        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingItem.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-price">
                Rs.${matchingItem.price}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary" data-product-id="${matchingItem.id}">
                  Update
                </span>
                <input class="quantity-input" type="number">
                <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingItem.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                  Delete
                </span>
              </div>
              <div style="margin-top:6px"> Delivery Rate: Rs. 200 </div>
            </div>
          </div>
          </div>
      </div>
    `
  });
    

  

  

  function emptyPage() {
      document.querySelector(".js-order-summary").innerHTML = emptyHTML;
      document.querySelector(".payment-summary").classList.add("disable");
      document.querySelector(".empty-btn").addEventListener("click",()=>{
      window.location.href='../books.html';
    });
  }

  const emptyHTML=`
    <div>
      <p class="empty-msg">Your cart is empty.</p>
      <button class="empty-btn">View Products</button>
  </div>`;

 

  if (calculateCartQuantity() === 0) {
          emptyPage();
  }
  else{
        document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  }


  

  function updateCartQuantity(){
    const checkout = calculateCartQuantity()
    document.querySelector(".js-quantity-items").innerHTML = `${checkout} items`;
  };

  document.querySelectorAll(".update-quantity-link").forEach((update)=>{
    update.addEventListener("click",()=>{
      const productId = update.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add("is-editing-quantity");
      
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((save)=>{
    save.addEventListener("click",()=>{
      const productId = save.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove("is-editing-quantity");
      const newquantity = Number(document.querySelector(".quantity-input").value);

      const quantitylabel=document.querySelector(`.js-quantity-label-${productId}`);

      if (newquantity>0&&newquantity<1000) {
        quantitylabel.innerHTML=newquantity;
        updateQuantity(productId,newquantity);
      }else{
        alert("Please enter the value between 0 and 1000!")
      }
      updateCartQuantity();
    });
  });

  document.querySelectorAll(".delete-quantity-link").forEach((del) => {
    del.addEventListener("click",()=>{
      const productId = del.dataset.productId;
      removeCartQuantity(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateCartQuantity();

    })
  });

};

orderSummary();



