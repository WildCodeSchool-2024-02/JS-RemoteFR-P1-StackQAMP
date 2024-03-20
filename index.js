// BURGER

let sidenav = document.getElementById("mySidenav");
let openBtn = document.getElementById("openBtn");
let closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
  sidenav.classList.add("active");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  sidenav.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", function () {
  let images = document.querySelectorAll(".profile");

  images.forEach(function (image) {
    image.addEventListener("click", function (event) {
      let confettiContainer = document.createElement("div");
      confettiContainer.style.position = "absolute";
      confettiContainer.style.top = "0";
      confettiContainer.style.left = "0";
      confettiContainer.style.width = "100%";
      confettiContainer.style.height = "100%";
      confettiContainer.style.pointerEvents = "none";
      image.parentNode.appendChild(confettiContainer);

      let confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.position = "absolute";
      confetti.style.left = event.clientX + "px";
      confetti.style.top = event.clientY + "px";
      confetti.style.backgroundColor = getRandomColor();
      confettiContainer.appendChild(confetti);

      setTimeout(function () {
        confettiContainer.remove();
      }, 1000); // Supprime les confettis après 3 secondes
    });
  });
});

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let images = document.querySelectorAll(".profile");

images.forEach(function (image) {
  // Empêcher le déplacement de l'image
  image.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });
});
