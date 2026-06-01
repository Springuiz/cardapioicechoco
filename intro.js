const video = document.getElementById("intro");
const skipBtn = document.getElementById("skipBtn");

// garante que não quebra se ainda não carregou
video.addEventListener("loadeddata", () => {
    video.play().catch(() => {});
});

btn.addEventListener("click", () => {
    video.pause();
    video.currentTime = video.duration; // pula pro final
    video.style.display = "none";
    btn.style.display = "none";
});

function entrarNoSite() {
   video.style.opacity = "0";

   setTimeout(() => {
      window.location.href = "cardapio.html";
   }, 1000);
}

video.addEventListener("ended", entrarNoSite);

skipBtn.addEventListener("click", entrarNoSite);
