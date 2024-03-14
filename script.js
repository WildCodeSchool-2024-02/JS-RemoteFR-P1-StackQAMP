document.addEventListener("DOMContentLoaded", function () {
  let score = 0;
  let multiplier = 1;
  let multiplierCost = 50;
  let autoclickCost = 20;
  let bonusCost = 20;
  let bonusActive = false;
  let bonusDuration = 30;
  let autoclickerActive = false;
  let improvementCounter = 0;

  const scoreDisplay = document.getElementById("scoreValue");
  const clickImage = document.getElementById("click");
  const multiplierButton = document.getElementById("multiplier");
  const multiplierValueDisplay = document.getElementById("multiplierValue");
  const multiplierCostDisplay = document.getElementById("multiplierCost");
  const autoclickButton = document.getElementById("autoclick");
  const img = document.querySelector(".pck");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const bonusButton = document.getElementById("bonus");
  const bonusButton2 = document.getElementById("bonus2");
  const bonusButton3 = document.getElementById("etc1");
  const bonusButton4 = document.getElementById("etc2");
  const bonusButton5 = document.getElementById("etc3");
  const bonusButton6 = document.getElementById("etc4");
  const bonusButton7 = document.getElementById("etc5");
  const all = document.querySelector("*");
  const clickSound = document.getElementById("clickSound");
  const smallImagesContainer = document.getElementById("smallImagesContainer");
  const purchaseSound = document.getElementById("PurchaseSound");
  const bonussound2 = document.getElementById("BonusSound2");
  const bonussound3 = document.getElementById("bonusSound3");

  const backgroundImage = document.getElementById("click").querySelector("img");

  backgroundImage.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  function updateScore() {
    scoreDisplay.textContent = score;
  }

  function updateMultiplier() {
    multiplierValueDisplay.textContent = multiplier;
    multiplierCostDisplay.textContent = multiplierCost;
  }

  function updateButtons() {
    multiplierButton.classList.toggle("disabled", score < multiplierCost);
    multiplierButton.classList.toggle("enabled", score >= multiplierCost);

    if (score >= multiplierCost) {
      multiplierButton.classList.add("enabled-animation");
    } else {
      multiplierButton.classList.remove("enabled-animation");
    }
  }

  function openPopup() {
    document.getElementById("popup").style.display = "block";
  }

  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }

  window.addEventListener("load", function () {
    openPopup();
  });

  const jeuLink = document.querySelector('a[href="./jeu.html"]');

  jeuLink.addEventListener("click", function (event) {
    event.preventDefault();
    openPopup();
  });

  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", closePopup);

  function enableButtonAnimation(button) {
    button.classList.add("enabled-animation");
    purchaseSound.currentTime = 0;
    purchaseSound.play();
  }

  function stopButtonAnimation(button) {
    bonusButton.classList.remove("enabled-animation");
  }

  function showMessage(message) {
    alert(message);
  }

  clickImage.addEventListener("click", (e) => {
    clickSound.currentTime = 0;
    clickSound.play();
    const plusOne = document.createElement("div");
    plusOne.className = "plusOne";
    plusOne.textContent = "+1";
    plusOne.style.top = e.clientY + "px";
    plusOne.style.left = e.clientX + "px";
    document.body.appendChild(plusOne);
    setTimeout(() => {
      plusOne.remove();
    }, 1000);

    clickImage.classList.add("grow");
    setTimeout(() => {
      clickImage.classList.remove("grow");
    }, 200);

    score += multiplier;
    updateScore();
  });

  multiplierButton.addEventListener("click", () => {
    if (score >= multiplierCost) {
      score -= multiplierCost;
      multiplier++;
      multiplierCost *= 2;
      updateScore();
      updateMultiplier();
      multiplierCostDisplay.classList.add("green-text");
      setTimeout(() => {
        multiplierCostDisplay.classList.remove("green-text");
      }, 1000);
      enableButtonAnimation(multiplierButton);
      handlePurchase();
      updateSmallImages();
      purchaseSound.currentTime = 0;
      purchaseSound.play();
    }
  });

  autoclickButton.addEventListener("click", () => {
    if (score >= autoclickCost && !autoclickerActive) {
      score -= autoclickCost;
      autoclickerActive = true;
      autoclickButton.disabled = true;

      // Démarrer l'autoclicker
      autoclickInterval = setInterval(() => {
        if (autoclickerActive) {
          score += multiplier;
          updateScore();
        }
      }, 1000);

      autoclickButton.textContent = `Autoclick - Upgraded`;
      autoclickButton.classList.add("green-text");

      autoclickButton.classList.add("grow");

      enableButtonAnimation(autoclickButton);
    }
    purchaseSound.currentTime = 0;
    purchaseSound.play();
  });

  document.getElementById("click").addEventListener("click", function (event) {
    const particlesContainer = document.getElementById("particlesContainer");

    particlesContainer.innerHTML = "";

    const particleImages = ["bout1.png", "bout2.png", "TESTASUPPR.jpg"];

    const numParticles = 15;
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("img");
      particle.classList.add("particle");
      let randomIndex = Math.floor(Math.random() * particleImages.length);

      if (Math.random() < 0.03) {
        randomIndex = Math.floor(Math.random() * 3);
      }
      particle.src = particleImages[randomIndex];
      particle.alt = `Particle ${randomIndex}`;

      particlesContainer.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      const particleX =
        event.clientX -
        particlesContainer.getBoundingClientRect().left +
        Math.cos(angle) * distance;
      const particleY =
        event.clientY -
        particlesContainer.getBoundingClientRect().top +
        Math.sin(angle) * distance;
      particle.style.left = particleX + "px";
      particle.style.top = particleY + "px";

      const deltaX = particleX - event.clientX;
      const deltaY = particleY - event.clientY;
      particle.style.animation = `particleMove 1s ease-out forwards`;
      particle.style.animationDelay = `${Math.random() * 0.5}s`;
      particle.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
  });

  function upgradeAutoclicker() {
    improvementCounter++;

    multiplier++;

    autoclickCost /= 2;

    updateScore();
    updateMultiplier();
    autoclickButton.textContent = `Autoclick - Cost: ${autoclickCost}`;

    clearInterval(autoclickInterval);
    autoclickInterval = setInterval(() => {
      if (autoclickerActive) {
        score += multiplier;
        updateScore();
      }
    }, 500);
  }

  let autoclickInterval;

  autoclickButton.addEventListener("click", () => {
    if (score >= autoclickCost && !autoclickerActive) {
      score -= autoclickCost;
      autoclickerActive = true;
      autoclickButton.disabled = true;

      autoclickInterval = setInterval(() => {
        if (autoclickerActive) {
          score += multiplier;
          updateScore();
        }
      }, 1000);

      showMessage("Achat effectué!");
      updateButtons();
    }
    purchaseSound.currentTime = 0;
    purchaseSound.play();
  });

  function animateBonusImage() {
    bonusSound.play();

    clickImage.classList.add("rainbow-image");
    clickImage.classList.add("blinking");

    const rainbowAnimation = setInterval(() => {
      clickImage.style.filter = `hue-rotate(${Math.floor(
        Math.random() * 360
      )}deg)`;
    }, 100);

    function stopBonusSound() {
      bonusSound.pause();
      bonusSound.currentTime = 0;
    }

    setTimeout(() => {
      clearInterval(rainbowAnimation);
      clickImage.style.filter = "";
      clickImage.classList.remove("rainbow-image");
      clickImage.classList.remove("blinking");
    }, bonusDuration * 1000);
  }

  function animateBonusButton() {
    bonusButton.classList.add("rainbow");
    bonusButton.classList.add("blinking");

    const rainbowAnimation = setInterval(() => {
      bonusButton.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }, 100);

    setTimeout(() => {
      clearInterval(rainbowAnimation);
      bonusButton.style.color = "";
      bonusButton.classList.remove("rainbow");
      bonusButton.classList.remove("blinking");
    }, bonusDuration * 1000);
  }

  bonusButton.addEventListener("click", () => {
    if (score >= bonusCost && !bonusActive) {
      score -= bonusCost;
      bonusActive = true;
      bonusButton.disabled = true;
      animateBonusImage();

      let bonusTimer = bonusDuration;
      const interval = setInterval(() => {
        bonusTimer--;
        bonusButton.textContent = `Bonus (${bonusTimer}s)`;
        if (bonusTimer <= 0) {
          clearInterval(interval);
          bonusActive = false;
          bonusButton.textContent = "Bonus - Cost: 5000";
          bonusButton.disabled = false;
          bonusButton.classList.add("grow");
          stopButtonAnimation();
          stopBonusSound();

          clickImage.style.filter = "";
        } else {
          score += 500;
          updateScore();
          enableButtonAnimation(bonusButton);
        }
      }, 1000);
    }
    purchaseSound.currentTime = 0;
    purchaseSound.play();
  });

  bonusButton2.addEventListener("click", () => {
    if (score >= bonusCost && !bonusActive) {
      score -= bonusCost;
      bonusActive = true;
      bonusButton2.disabled = true;

      let grayscale = false;

      const interval = setInterval(() => {
        grayscale = !grayscale;

        if (grayscale) {
          clickImage.style.filter = "grayscale(100%)";
          clickImage.style.animation = "rotate 0.5s linear infinite";
        } else {
          clickImage.style.filter = "";
        }
      }, 120);

      let bonusTimer = 45;

      const countdownInterval = setInterval(() => {
        bonusTimer--;
        bonusButton2.textContent = `Bonus 2 (${bonusTimer}s)`;

        if (bonusTimer <= 0) {
          clearInterval(interval);
          clearInterval(countdownInterval);
          bonusActive = false;
          bonusButton2.textContent = "Bonus 2 - Cost: 20";
          bonusButton2.disabled = false;
          bonusButton2.classList.add("grow");
          clickImage.style.filter = "";
          clickImage.style.animation = "";

          stopButtonAnimation();
          bonusSound2.pause();
          bonusSound2.currentTime = 0;
        } else {
          score += 850;
          updateScore();
          enableButtonAnimation(bonusButton2);
          bonusSound2.play();
        }
      }, 1000);

      clickImage.style.animation = "rotate 2s linear infinite";
    }
    purchaseSound.currentTime = 0;
    purchaseSound.play();
  });

  const volumeSlider = document.getElementById("volumeSlider");

  volumeSlider.addEventListener("input", function () {
    const volume = parseInt(volumeSlider.value) / 100;

    const mediaElements = document.querySelectorAll("audio, video");
    mediaElements.forEach((element) => {
      element.volume = volume;
    });
  });

  bonusButton3.addEventListener("click", () => {
    if (score >= 20) {
      bonussound3.play();

      score -= 20;
      updateScore();

      const hiddenElements = [
        multiplierButton,
        autoclickButton,
        bonusButton,
        bonusButton2,
        bonusButton3,
        bonusButton4,
        bonusButton5,
        bonusButton6,
        bonusButton7,
        img,
      ];

      hiddenElements.forEach((element) => {
        element.style.display = "none";
      });

      const gifElement = document.createElement("img");
      gifElement.src = "gif/200w.gif";
      gifElement.style.position = "fixed";
      gifElement.style.top = "50%";
      gifElement.style.left = "50%";
      gifElement.style.transform = "translate(-50%, -50%)";
      document.body.appendChild(gifElement);
      all.style.animation = "rotate 2s linear infinite";

      all.classList.add("rainbow-image");
      all.classList.add("blinking");

      const rainbowAnimation = setInterval(() => {
        all.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
      }, 100);

      const scoreIncrement = 1500;
      const animationDuration = 30;
      const animationInterval = setInterval(() => {
        score += scoreIncrement;
        updateScore();
      }, 1000);

      setTimeout(() => {
        hiddenElements.forEach((element) => {
          element.style.display = "block";
          all.style.animation = "none";
          clearInterval(rainbowAnimation);
          all.style.filter = "";
          all.classList.remove("rainbow-image");
          all.classList.remove("blinking");
        });

        document.body.removeChild(gifElement);

        clearInterval(animationInterval);
      }, animationDuration * 1000);
    }
  });

  updateScore();
  updateMultiplier();
  updateButtons();
});