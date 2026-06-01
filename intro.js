const video = document.getElementById("intro");
const skipBtn = document.getElementById("skipBtn");

function entrarNoSite() {
   video.style.transition = "opacity 1s";
   video.style.opacity = "0";

   setTimeout(() => {
      window.location.href = "cardapio.html";
   }, 1000);
}

// autoplay seguro
video.addEventListener("loadeddata", () => {
   video.play().catch(() => {});
});

// quando acabar o vídeo
video.addEventListener("ended", entrarNoSite);

// botão pular
skipBtn.addEventListener("click", () => {
   video.pause();
   entrarNoSite();
});
