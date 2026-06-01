const video = document.getElementById("intro");
const skipBtn = document.getElementById("skipBtn");

function entrarNoSite() {
   video.style.opacity = "0";

   setTimeout(() => {
      window.location.href = "cardapio.html";
   }, 1000);
}

video.addEventListener("ended", entrarNoSite);

skipBtn.addEventListener("click", entrarNoSite);

