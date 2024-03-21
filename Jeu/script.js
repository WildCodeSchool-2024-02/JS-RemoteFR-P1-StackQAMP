document.addEventListener("DOMContentLoaded", function () {
  let score = 0;
  let multiplier = 1;
  let multiplierCost = 50;
  let autoclickCost = 20;
  let bonusCost = 5000;
  let bonusCost2 = 15000;
  let bonusCost3 = 25000;
  let bonusCost4 = 50000;
  let bonusCost5 = 100000;
  let bonusCost6 = 250000;
  let bonusCost7 = 1000000;
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
  const bonussound = document.getElementById("bonusSound");
  const bonussound2 = document.getElementById("BonusSound2");
  const bonussound3 = document.getElementById("bonusSound3");
  const bonussound4 = document.getElementById("bonusSound4");
  const bonusSound5 = document.getElementById("bonusSound5");

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

  const closeBtn = document.querySelector(".closepopup");
  closeBtn.addEventListener("click", closePopup);

  function enableButtonAnimation(button) {
    button.classList.add("enabled-animation");
    purchaseSound.currentTime = 0;
    purchaseSound.play();
  }

  function stopButtonAnimation(button) {
    button.classList.remove("enabled-animation");

    button.classList.remove("blinking");
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

    const particleImages = ["/img/bout1.png", "/img/bout2.png"];

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
    clickImage.classList.add("rainbow-image");
    clickImage.classList.add("blinking");

    const rainbowAnimation = setInterval(() => {
      clickImage.style.filter = `hue-rotate(${Math.floor(
        Math.random() * 360
      )}deg)`;
    }, 100);

    setTimeout(() => {
      clearInterval(rainbowAnimation);
      clickImage.style.filter = "";
      clickImage.classList.remove("rainbow-image");
      clickImage.classList.remove("blinking");
    }, bonusDuration * 1000);
  }

  function animateBonusButton(button) {
    button.classList.add("rainbow");
    button.classList.add("blinking");

    const rainbowAnimation = setInterval(() => {
      button.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }, 100);

    setTimeout(() => {
      clearInterval(rainbowAnimation);
      button.style.color = "";
      button.classList.remove("rainbow");
      button.classList.remove("blinking");
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
          bonusButton.textContent = "🍄 LIKE MARIO | Cost: 5000";
          bonusButton.disabled = false;
          bonusButton.classList.add("grow");
          stopButtonAnimation(bonusButton);
          clickImage.style.filter = "";
        } else {
          score += 500;
          updateScore();
          enableButtonAnimation(bonusButton);
          bonussound.play();
        }
      }, 1000);
    }
    purchaseSound.currentTime = 0;
    purchaseSound.play();
  });

  bonusButton2.addEventListener("click", () => {
    if (score >= bonusCost2 && !bonusActive) {
      score -= bonusCost2;
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
          bonusButton2.textContent = "🙃 REVERSE HEAD | Cost: 15 000";
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
    if (score >= 25000) {
      bonussound3.play();
      score -= 25000;
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
      gifElement.src = "/gif/200w.gif";
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

  bonusButton4.addEventListener("click", () => {
    if (score >= bonusCost4) {
      bonussound4.play();

      score -= bonusCost4;
      updateScore();

      all.classList.add("rainbow-image");
      all.classList.add("blinking");
      animateBonusButton(bonusButton4);
      enableButtonAnimation(bonusButton4);

      const rainbowAnimation = setInterval(() => {
        all.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
      }, 100);

      const scoreIncrement = 2500;
      const animationDuration = 30;
      const animationInterval = setInterval(() => {
        score += scoreIncrement;
        updateScore();
      }, 1000);

      setTimeout(() => {
        clearInterval(animationInterval);
        clearInterval(rainbowAnimation);
        all.style.animation = "none";
        all.style.filter = "";
        all.classList.remove("rainbow-image");
        all.classList.remove("blinking");
        stopButtonAnimation(bonusButton4);
      }, animationDuration * 1000);
    }
  });

  bonusButton5.addEventListener("click", () => {
    setTimeout(() => {
      if (score >= bonusCost5 && !bonusActive) {
        score -= bonusCost5;
        bonusActive = true;
        bonusButton5.disabled = true;

        animateBonusButton(bonusButton5);

        animateClickImage();

        let bonusTimer = 30;
        const bonusIncrement = 5000;
        const interval = setInterval(() => {
          bonusTimer--;
          bonusButton5.textContent = `Broken (${bonusTimer}s)`;

          score += bonusIncrement;
          updateScore();

          if (bonusTimer <= 0) {
            clearInterval(interval);
            bonusActive = false;
            bonusButton5.textContent = "💔He is broken :/ - Cost: 100 000";
            bonusButton5.disabled = false;
            bonusButton5.classList.add("grow");

            stopButtonAnimation(bonusButton5);

            document.documentElement.classList.remove("black-and-white");
            document.body.classList.remove("dripping-effect");

            document.documentElement.classList.remove("clickImage");

            clickImage.style.transform = "scale(1)";
          } else {
            const scale = 1 - bonusTimer / 30;
            clickImage.style.transform = `scale(${scale})`;
          }
        }, 1000);

        document.documentElement.classList.add("black-and-white");
        document.body.classList.add("dripping-effect");

        bonusSound5.play();
      }
      purchaseSound.currentTime = 0;
      purchaseSound.play();
    }, 5000);
  });
  function animateClickImage() {
    const clickImage = document.getElementById("click");

    let rotationAngle = 0;
    let scaleValue = 1;

    const bonusTimer = 10;

    clickImage.addEventListener("click", () => {
      scaleValue = 1;

      const animationInterval = setInterval(() => {
        rotationAngle += 6;
        scaleValue -= 0.01;

        clickImage.style.transform = `rotate(${rotationAngle}deg) scale(${scaleValue})`;

        if (rotationAngle >= 360) {
          clearInterval(animationInterval);
          rotationAngle = 0;
          scaleValue = 1;
          clickImage.style.transition = "transform 1s";
          clickImage.style.transform = "none";
        }

        if (bonusTimer <= 0) {
          clearInterval(animationInterval);
          clickImage.style.transform = "none";
        }
      }, 1000 / 3);
    });
  }

  bonusButton6.addEventListener("click", () => {
    setTimeout(() => {
      if (score >= bonusCost6 && !bonusActive) {
        score -= bonusCost6;
        bonusActive = true;
        bonusButton6.disabled = true;
        enableButtonAnimation(bonusButton6);

        const videoElement = document.createElement("video");
        videoElement.src = "../video/BEAR.mp4";
        videoElement.autoplay = true;
        videoElement.controls = false;
        videoElement.controlsList = "nodownload";
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.style.position = "fixed";
        videoElement.style.top = "0";
        videoElement.style.left = "0";
        videoElement.style.zIndex = "9999";

        videoElement.addEventListener("ended", () => {
          document.body.removeChild(videoElement);
        });

        document.body.appendChild(videoElement);

        let bonusTimer = bonusDuration;
        const interval = setInterval(() => {
          bonusTimer--;
          bonusButton6.textContent = `Bonus 6 (${bonusTimer}s)`;

          score += bonusIncrement;
          updateScore();

          if (bonusTimer <= 0) {
            clearInterval(interval);
            bonusActive = false;
            bonusButton6.textContent = "🧸 LIKE A BEAR | Cost: 250 000";
            bonusButton6.disabled = false;

            stopButtonAnimation(bonusButton6);

            document.body.removeChild(videoElement);
          }
        }, 1000);
      }
      purchaseSound.currentTime = 0;
      purchaseSound.play();
    }, 5000);
  });

  bonusButton7.addEventListener("click", () => {
    if (score >= bonusCost7 && !bonusActive) {
      score -= bonusCost7;
      bonusActive = true;
      bonusButton7.disabled = true;
      enableButtonAnimation(bonusButton7);

      let bonusTimer = bonusDuration;
      const interval = setInterval(() => {
        bonusTimer--;
        bonusButton7.textContent = `Bonus 6 (${bonusTimer}s)`;

        score += bonusIncrement;
        updateScore();

        if (bonusTimer <= 0) {
          clearInterval(interval);
          bonusActive = false;
          bonusButton7.textContent = "Bonus 6 - Cost: 250 000";
          bonusButton7.disabled = false;

          disableButtonAnimation(bonusButton7);
        }
      }, 1000);
    }
    purchaseSound.currentTime = 0;
    purchaseSound.play();
  });

  function giveMoney(amount) {
    score += amount;
    updateScore();
    console.log("Tu t'es donné :", amount, "PAN");
  }
  // Vous pouvez exécuter cette commande dans la console du navigateur
  // Par exemple : giveMoney(10000) donnera 10000 à votre score
  window.giveMoney = giveMoney;

  updateScore();
  updateMultiplier();
  updateButtons();
});
