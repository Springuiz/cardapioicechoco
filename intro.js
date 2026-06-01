window.addEventListener("DOMContentLoaded", () => {

const video = document.getElementById("intro");
const skipBtn = document.getElementById("skipBtn");

function entrarNoSite() {
   video.style.transition = "opacity 1s";
   video.style.opacity = "0";

   setTimeout(() => {
      window.location.href = "cardapio.html";
   }, 1000);
}

// quando vídeo acabar
video.addEventListener("ended", entrarNoSite);

// botão pular
skipBtn.addEventListener("click", () => {
   video.pause();
   entrarNoSite();
});

// autoplay seguro
video.play().catch(() => {});

// liberar som no clique
document.addEventListener("click", () => {
   video.muted = false;
}, { once: true });

});
