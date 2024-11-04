import { cart,calculateCartQuantity } from "../data/cart.js"; 
import { products } from "../data/data.js";

export function paymentSummary(){

  

 
    let total=0;
    let deliveryRate=0;
    let tbtax=0;
    let tax=0;
    let gtotal=0;

    cart.forEach((cartItem)=>{
      let matchingItem;
        let dataId=cartItem.dataId
        products.forEach((data)=>{
          if (data.id===dataId) {
            matchingItem=data
          }
        });
        const items = cartItem.quantity;
        
          total+=matchingItem.price*items;

          deliveryRate += 200;
          tbtax=total+deliveryRate;
          tax=0.1*tbtax;
          gtotal=tbtax+tax;
        
  
      });

    

  let paymentHTML ='';
  paymentHTML+=`<div class="payment-summary-title">
          Order Summary
        </div>
        
        <div class="payment-summary-row">
          <div>Items (${calculateCartQuantity()}):</div>
          <div class="payment-summary-money">Rs.${total}</div>
        </div>

        <div class="payment-summary-row">
          <div>Delivery Charge &amp; handling:</div>
          <div class="payment-summary-money">Rs.${deliveryRate}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">Rs.${tbtax}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">Rs.${tax}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">Rs.${gtotal}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
        <p class="display-order" > <i class="ri-checkbox-circle-fill"></i> Order finalized</p>
        `;
     

        document.querySelector(".payment-summary").innerHTML=paymentHTML;

        const orderPlaced = document.querySelector(".place-order-button");
        const displayOrder = document.querySelector(".display-order")

        orderPlaced.addEventListener("click",()=>{
          displayOrder.classList.add("display-added")
          setTimeout(() => {
            displayOrder.classList.remove("display-added")
          }, 1000);
        });

        
    }

paymentSummary();

