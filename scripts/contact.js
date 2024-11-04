const submitBtn = document.querySelector(".contact-submit");
const submitMsg = document.querySelector(".submitted");

submitBtn.addEventListener("click",(event)=>{
  event.preventDefault();
  submitMsg.classList.add("display-added");
  setTimeout(() => {
    submitMsg.classList.remove("display-added")
  }, 2000);
});