import { products } from "../data/data.js";
import { addtoCart, calculateCartQuantity } from "../data/cart.js";

let dataHTML = '';


products.forEach((data)=>{
  dataHTML += `
    <div class="each-book each-${data.id}" data-data-id="${data.id}">
            <figure>
                <img src="${data.image}">
            </figure>
            <p>${data.name}</p>
            <p>Rs.${data.price}</p>
            <select class="sel-quantity js-select-quantity-${data.id}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
            </select>
            <br><br>
            
            <div class="added-to-cart js-added-to-cart-${data.id}">
            <img src="images/checkmark.png">
            Added
          </div>
          <button class="cart-btn" data-data-id="${data.id}">Add to Cart</button>
        </div>
  ` 
  
});
document.querySelector(".js-books-grid").innerHTML = dataHTML;


document.querySelector(".search-button").addEventListener("click",()=>{
 searchItem();
})

const updateCartQuantity = (dataId)=>{
  document.querySelector(".js-cart-quantity").innerHTML=calculateCartQuantity();

  const addedMessageTimeouts = [];

  const addedMessage = document.querySelector(`.js-added-to-cart-${dataId}`);
  addedMessage.classList.add("added-to-cart-visible")

  const previousTimeoutId = addedMessageTimeouts[dataId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }
  const timer = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    },2000);

    addedMessageTimeouts[dataId] = timer;

};

document.querySelectorAll(".cart-btn").forEach((button)=>{
  button.addEventListener("click",()=>{
    const {dataId} = button.dataset;
    const quantity = Number(document.querySelector(`.js-select-quantity-${dataId}`).value);
    addtoCart(dataId,quantity);
    updateCartQuantity(dataId);
  });
});

function searchItem() {
  const searchData = document.querySelector(".search-bar");
    console.log(searchData.value.toLowerCase())
    const output = products.filter(data => data.keywords.includes(searchData.value.toLowerCase()));
    document.querySelectorAll(".each-book").forEach((book)=>{
      const {dataId} = book.dataset;
      
      for (let i = 0; i < output.length; i++) {
          if (dataId === output[i].id) { 
            console.log(dataId)
            const elements = document.querySelectorAll(`.each-${dataId}`);
            elements.forEach((element)=>{
              setInterval(() => {
                element.style.display='block'
              }, 100);
            })
            }
          else{
              book.style.display='none'
          }
          }
          
          })
      }  


