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
  const purchaseSound = document.getElementById("PurchaseSound"); // Ajout du son d'achat
  const bonussound2 = document.getElementById("BonusSound2");
  const bonussound3 = document.getElementById("bonusSound3");

  const backgroundImage = document.getElementById("click").querySelector("img");

  backgroundImage.addEventListener("dragstart", (e) => {
    e.preventDefault(); // Empêche le déplacement par défaut de l'image
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

  // Fonction pour fermer le popup
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }

  // Fonction pour afficher le popup lorsque la page est chargée
  window.addEventListener("load", function () {
    openPopup();
  });

  // Récupérer le lien "Jeu" en utilisant une autre méthode (par exemple, par balise a)
  const jeuLink = document.querySelector('a[href="./jeu.html"]');

  // Attacher un gestionnaire d'événements au lien "Jeu" pour ouvrir le popup
  jeuLink.addEventListener("click", function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    openPopup();
  });

  // Cibler la croix de fermeture du popup et attacher un gestionnaire d'événements pour fermer le popup lors du clic
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", closePopup);

  function enableButtonAnimation(button) {
    button.classList.add("enabled-animation");
    purchaseSound.currentTime = 0; // Remet le son au début
    purchaseSound.play();
  }

  function stopButtonAnimation(button) {
    bonusButton.classList.remove("enabled-animation");
  }

  function showMessage(message) {
    alert(message);
  }

  clickImage.addEventListener("click", (e) => {
    clickSound.currentTime = 0; // Remet le son au début
    clickSound.play();
    // Add +1 animation
    const plusOne = document.createElement("div");
    plusOne.className = "plusOne";
    plusOne.textContent = "+1";
    plusOne.style.top = e.clientY + "px";
    plusOne.style.left = e.clientX + "px";
    document.body.appendChild(plusOne);
    setTimeout(() => {
      plusOne.remove();
    }, 1000);

    // Grow and shrink animation
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
      purchaseSound.currentTime = 0; // Remet le son au début
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
      }, 1000); // Intervalle de 1 seconde par défaut

      // Mettre à jour le texte du bouton
      autoclickButton.textContent = `Autoclick - Upgraded`;
      autoclickButton.classList.add("green-text"); // Ajouter la classe pour le texte vert

      // Ajouter une animation après l'achat
      autoclickButton.classList.add("grow"); // Ajouter l'animation de croissance

      enableButtonAnimation(autoclickButton);

      // Appeler la fonction d'amélioration de l'autoclicker
    }
    purchaseSound.currentTime = 0; // Remet le son au début
    purchaseSound.play(); // Joue le son d'achat
  });

  document.getElementById("click").addEventListener("click", function (event) {
    const particlesContainer = document.getElementById("particlesContainer");

    // Clear previous particles
    particlesContainer.innerHTML = "";

    // Array of particle image sources
    const particleImages = ["bout1.png", "bout2.png", "TESTASUPPR.jpg"];

    // Create particles
    const numParticles = 15;
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("img");
      particle.classList.add("particle");
      let randomIndex = Math.floor(Math.random() * particleImages.length);
      // Randomly choose if an image with a 3% chance should appear
      if (Math.random() < 0.03) {
        randomIndex = Math.floor(Math.random() * 3);
      }
      particle.src = particleImages[randomIndex];
      particle.alt = `Particle ${randomIndex}`;

      particlesContainer.appendChild(particle);

      // Position particles around the click point with slight variation
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

      // Disperse particles in different directions
      const deltaX = particleX - event.clientX;
      const deltaY = particleY - event.clientY;
      particle.style.animation = `particleMove 1s ease-out forwards`;
      particle.style.animationDelay = `${Math.random() * 0.5}s`;
      particle.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
  });

  function upgradeAutoclicker() {
    // Augmenter le niveau d'amélioration
    improvementCounter++;

    // Augmenter le multiplicateur de clics
    multiplier++;

    // Réduire le coût de l'autoclicker (par exemple, divisez le coût actuel par 2)
    autoclickCost /= 2;

    // Mettre à jour l'affichage du score, du multiplicateur et du coût de l'autoclicker
    updateScore();
    updateMultiplier();
    autoclickButton.textContent = `Autoclick - Cost: ${autoclickCost}`;

    // Réduire le temps de clique (par exemple, diminuer l'intervalle de temps de setInterval)
    clearInterval(autoclickInterval);
    autoclickInterval = setInterval(() => {
      if (autoclickerActive) {
        score += multiplier;
        updateScore();
      }
    }, 500); // Réduire l'intervalle de clique à 500 millisecondes
  }

  let autoclickInterval; // Déclarer une variable pour stocker l'intervalle du clic automatique

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
      }, 1000); // Intervalle de 1 seconde par défaut

      showMessage("Achat effectué!");
      updateButtons();
    }
    purchaseSound.currentTime = 0; // Remet le son au début
    purchaseSound.play(); // Joue le son d'achat
  });

  function animateBonusImage() {
    bonusSound.play();
    // Ajoutez une classe pour l'animation rainbow et le clignotement
    clickImage.classList.add("rainbow-image");
    clickImage.classList.add("blinking");

    // Démarrez l'animation rainbow
    const rainbowAnimation = setInterval(() => {
      clickImage.style.filter = `hue-rotate(${Math.floor(
        Math.random() * 360
      )}deg)`; // Change the hue randomly
    }, 100);

    function stopBonusSound() {
      // Arrête le son lorsque le cooldown du bonus est terminé
      bonusSound.pause();
      bonusSound.currentTime = 0;
    }

    // Arrêtez l'animation après la durée du cooldown
    setTimeout(() => {
      clearInterval(rainbowAnimation); // Arrêtez l'animation rainbow
      clickImage.style.filter = ""; // Réinitialisez le filtre
      clickImage.classList.remove("rainbow-image"); // Supprimez la classe d'animation rainbow
      clickImage.classList.remove("blinking"); // Supprimez la classe de clignotement
    }, bonusDuration * 1000);
  }

  function animateBonusButton() {
    // Ajoutez une classe pour l'animation rainbow et le clignotement
    bonusButton.classList.add("rainbow");
    bonusButton.classList.add("blinking");

    // Démarrez l'animation rainbow
    const rainbowAnimation = setInterval(() => {
      bonusButton.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Change the text color randomly
    }, 100);

    // Arrêtez l'animation après la durée du cooldown
    setTimeout(() => {
      clearInterval(rainbowAnimation); // Arrêtez l'animation rainbow
      bonusButton.style.color = ""; // Réinitialisez la couleur du texte
      bonusButton.classList.remove("rainbow"); // Supprimez la classe d'animation rainbow
      bonusButton.classList.remove("blinking"); // Supprimez la classe de clignotement
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

          clickImage.style.filter = ""; // Réinitialisez le filtre
        } else {
          // Ajouter 500 points chaque seconde pendant le cooldown
          score += 500;
          updateScore();
          enableButtonAnimation(bonusButton);
        }
      }, 1000);
    }
    purchaseSound.currentTime = 0; // Remet le son au début
    purchaseSound.play(); // Joue le son d'achat
  });

  bonusButton2.addEventListener("click", () => {
    if (score >= bonusCost && !bonusActive) {
      score -= bonusCost;
      bonusActive = true;
      bonusButton2.disabled = true;

      // Définir une variable pour stocker l'état de l'effet noir et blanc
      let grayscale = false;

      // Définir l'intervalle pour faire clignoter l'image en noir et blanc
      const interval = setInterval(() => {
        grayscale = !grayscale; // Inverser l'état de l'effet noir et blanc

        // Appliquer l'effet noir et blanc sur l'image
        if (grayscale) {
          clickImage.style.filter = "grayscale(100%)";
          clickImage.style.animation = "rotate 0.5s linear infinite";
        } else {
          clickImage.style.filter = ""; // Réinitialiser l'effet noir et blanc
        }
      }, 120); // Changer l'effet toutes les 500 millisecondes

      // Définir la durée du bonus en secondes
      let bonusTimer = 45;

      // Définir l'intervalle pour mettre à jour le compte à rebours et le score
      const countdownInterval = setInterval(() => {
        bonusTimer--;
        bonusButton2.textContent = `Bonus 2 (${bonusTimer}s)`;

        if (bonusTimer <= 0) {
          clearInterval(interval); // Arrêter le clignotement de l'image
          clearInterval(countdownInterval); // Arrêter le compte à rebours
          bonusActive = false;
          bonusButton2.textContent = "Bonus 2 - Cost: 20";
          bonusButton2.disabled = false;
          bonusButton2.classList.add("grow");
          clickImage.style.filter = ""; // Réinitialiser l'effet noir et blanc
          clickImage.style.animation = "";

          // Arrêter l'animation de rotation
          stopButtonAnimation();
          bonusSound2.pause(); // Arrêter le son du bonus
          bonusSound2.currentTime = 0;
        } else {
          // Ajouter 850 points chaque seconde pendant la durée du bonus
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
    const volume = parseInt(volumeSlider.value) / 100; // Convertir la valeur en pourcentage en décimal
    // Parcourir toutes les balises audio et vidéo sur la page
    const mediaElements = document.querySelectorAll("audio, video");
    mediaElements.forEach((element) => {
      element.volume = volume; // Définir le volume pour chaque élément
    });
  });

  bonusButton3.addEventListener("click", () => {
    // Vérifier si le score est supérieur ou égal à 20
    if (score >= 20) {
      // Jouer le son attribué au bouton 3
      bonussound3.play();

      // Déduire 20 du score
      score -= 20;
      updateScore(); // Mettre à jour l'affichage du score

      // Masquer les boutons et les pancakes
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

      // Ajouter un GIF avec les points qui montent au milieu de la page
      const gifElement = document.createElement("img");
      gifElement.src = "gif/200w.gif"; // Chemin vers le GIF
      gifElement.style.position = "fixed";
      gifElement.style.top = "50%";
      gifElement.style.left = "50%";
      gifElement.style.transform = "translate(-50%, -50%)";
      document.body.appendChild(gifElement);
      all.style.animation = "rotate 2s linear infinite";

      all.classList.add("rainbow-image");
      all.classList.add("blinking");

      // Démarrez l'animation rainbow
      const rainbowAnimation = setInterval(() => {
        all.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`; // Change the hue randomly
      }, 100);

      // Augmenter le score de 1500 points par seconde
      const scoreIncrement = 1500;
      const animationDuration = 30; // Durée de l'animation en secondes
      const animationInterval = setInterval(() => {
        score += scoreIncrement;
        updateScore();
      }, 1000);

      // Arrêter l'animation après la durée spécifiée
      setTimeout(() => {
        // Réafficher les boutons et les pancakes
        hiddenElements.forEach((element) => {
          element.style.display = "block";
          all.style.animation = "none";
          clearInterval(rainbowAnimation); // Arrêtez l'animation rainbow
          all.style.filter = ""; // Réinitialisez le filtre
          all.classList.remove("rainbow-image"); // Supprimez la classe d'animation rainbow
          all.classList.remove("blinking"); //
        });

        // Supprimer le GIF
        document.body.removeChild(gifElement);

        // Arrêter l'augmentation du score
        clearInterval(animationInterval);

        // Réorganiser tous les éléments comme la navigation après l'animation
        // Ici, vous pouvez réorganiser vos éléments de la manière appropriée
      }, animationDuration * 1000);
    }
  });

  updateScore();
  updateMultiplier();
  updateButtons();
});
