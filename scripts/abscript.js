document.addEventListener("DOMContentLoaded", function() {
  const moreBtn = document.getElementById("btn-more");
  const moreData = document.querySelector(".more");

  moreBtn.addEventListener("click", () => {
      moreBtn.style.display = 'none';
      moreData.style.display = 'block';
  });
});