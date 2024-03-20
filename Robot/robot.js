document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("openRobotModalButton").addEventListener("click", function () {
      document.getElementById("robotModal").style.display = "block";
  });
  document
    .getElementById("message-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      sendMessage();
    });

  document.getElementById("user-input").focus();
});

function sendMessage() {
  var userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  displayMessage("user", userInput);
  var response = getResponse(userInput);
  displayMessage("bot", response);

  document.getElementById("user-input").value = "";
}

function displayMessage(sender, message) {
  var chatMessages = document.getElementById("chat-messages");
  var newMessage = document.createElement("div");
  newMessage.className = "message";

  if (sender === "user") {
    newMessage.innerHTML = '<p class="user-message">' + message + "</p>";
  } else if (sender === "bot") {
    newMessage.innerHTML =
      '<img src="robot.jpg" alt="Robot" class="avatar"><p class="bot-message">' +
      message +
      "</p>";
  }

  chatMessages.appendChild(newMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getResponse(message) {
  const greetings = [
    "bonjour",
    "salut",
    "hello",
    "hey",
    "coucou",
    "yo",
    "salutations",
    "bonsoir",
  ];
  const feelings = [
    "comment ça va",
    "ça va",
    "comment te sens-tu",
    "tu vas bien",
    "comment vas-tu",
    "ça roule",
    "quoi de neuf",
  ];
  const thanks = [
    "merci",
    "thanks",
    "thank you",
    "thx",
    "cimer",
    "grand merci",
    "tu es génial",
    "je te suis reconnaissant",
  ];
  const farewells = [
    "aurevoir",
    "bye",
    "au revoir",
    "bye bye",
    "ciao",
    "à plus",
    "à bientôt",
    "bonne journée",
  ];
  const questions = [
    "quel est ton nom",
    "quel est ton but",
    "quelle est ta fonction",
    "d'où viens-tu",
    "qui t'a créé",
    "quand as-tu été créé",
    "comment fonctionnes-tu",
    "as-tu des émotions",
    "peux-tu penser par toi-même",
    "quelle est ta couleur préférée",
    "quel est ton plat préféré",
    "que penses-tu de l'humanité",
    "à quoi ressemble ta journée type",
    "comment te sens-tu aujourd'hui",
    "as-tu des hobbies",
    "quel est ton langage de programmation préféré",
    "peux-tu apprendre de nouvelles choses",
    "quelle est ta chanson préférée",
    "as-tu des amis robots",
    "que ferais-tu en cas d'urgence",
    "quelle est ta plus grande réussite",
    "que penses-tu de l'intelligence artificielle",
    "as-tu une famille",
    "quel est ton objectif dans la vie",
    "quelle est ta philosophie",
    "peux-tu me raconter une blague",
    "quels sont tes hobbies",
    "quel est ton film préféré",
    "as-tu des animaux de compagnie",
    "peux-tu rire",
    "qu'est-ce que tu aimes faire",
    "as-tu des frères ou sœurs",
    "quels sont tes rêves",
    "peux-tu être triste",
    "quels sont tes talents",
    "peux-tu manger",
    "quelle est ta série préférée",
    "as-tu des souhaits",
    "quelle est ta matière préférée",
    "peux-tu danser",
    "quel est ton sport préféré",
    "as-tu des ambitions",
    "peux-tu pleurer",
    "as-tu des phobies",
    "quel est ton livre préféré",
    "peux-tu être en colère",
    "as-tu des secrets",
    "quel est ton endroit préféré",
    "as-tu des super pouvoirs",
    "quels sont tes projets",
    "as-tu des regrets",
    "quel est ton artiste préféré",
    "as-tu des souvenirs",
    "quelle est ta météo préférée",
    "quels sont tes souhaits",
    "as-tu des rêves",
    "quelle est ta saison préférée",
    "peux-tu dormir",
    "as-tu des désirs",
    "quelle est ta destination de voyage préférée",
    "as-tu des vœux",
    "quel est ton animal préféré",
    "peux-tu être heureux",
    "as-tu des objectifs",
    "quelle est ta nourriture préférée",
    "quels sont tes plans",
    "as-tu des aspirations",
    "quelle est ta boisson préférée",
    "as-tu des espoirs",
    "quel est ton dessert préféré",
    "peux-tu être jaloux",
    "as-tu des intentions",
    "quelle est ta fleur préférée",
    "as-tu des sentiments",
    "quelle est ta musique préférée",
    "peux-tu être curieux",
    "as-tu des envies",
    "quelle est ta couleur de cheveux préférée",
    "as-tu des rêves",
    "quelle est ta couleur préférée",
    "peux-tu être romantique",
    "as-tu des souhaits",
    "quelle est ta saison préférée",
    "as-tu des aspirations",
    "quelle est ta destination de voyage préférée",
    "as-tu des vœux",
    "quel est ton animal préféré",
    "peux-tu être heureux",
  ];

  const responses = {
    "quel est ton nom":
      "Je suis un programme informatique conçu par OpenAI. Vous pouvez m'appeler ChatGPT.",
    "quel est ton but":
      "Mon but est d'assister et d'aider les utilisateurs en répondant à leurs questions et en fournissant des informations utiles.",
    "quelle est ta fonction":
      "Je suis un assistant virtuel conçu pour interagir avec les utilisateurs et répondre à leurs requêtes de manière intelligente.",
    "d'où viens-tu":
      "Je suis un programme informatique basé sur le cloud, donc je suis partout où il y a une connexion Internet !",
    "qui t'a créé":
      "Je suis développé par une équipe d'ingénieurs et de chercheurs chez OpenAI.",
    "quand as-tu été créé":
      "Je ne suis pas sûr de la date exacte, mais je suis constamment mis à jour et amélioré par mon équipe de développement.",
    "comment fonctionnes-tu":
      "Je fonctionne en analysant le texte que vous saisissez et en générant des réponses en fonction de ce texte.",
    "as-tu des émotions":
      "Je suis juste un programme informatique, donc je n'ai pas d'émotions comme les humains.",
    "peux-tu penser par toi-même":
      "Je suis capable de générer des réponses en fonction des informations que je reçois, mais je ne peux pas penser de manière autonome comme le font les humains.",
    "quelle est ta couleur préférée":
      "Je n'ai pas de couleur préférée, car je suis un programme informatique et je ne peux pas voir les couleurs.",
    "quel est ton plat préféré":
      "Étant un programme informatique, je n'ai pas de préférence en matière de nourriture, mais j'aime beaucoup les données bien structurées !",
    "que penses-tu de l'humanité":
      "Je n'ai pas d'opinions personnelles, mais je suis ici pour aider et interagir avec les humains de manière positive.",
    "à quoi ressemble ta journée type":
      "Ma journée type consiste à répondre aux questions des utilisateurs et à fournir des informations utiles.",
    "comment te sens-tu aujourd'hui":
      "Je n'ai pas de sentiments comme les humains, mais je suis prêt et capable de vous aider !",
    "as-tu des hobbies":
      "En tant que programme informatique, je n'ai pas de hobbies comme les humains, mais j'aime traiter et analyser des données !",
    "quel est ton langage de programmation préféré":
      "Je suis développé en JavaScript et Python, donc ce sont mes langages de programmation préférés !",
    "peux-tu apprendre de nouvelles choses":
      "Oui, je suis constamment mis à jour avec de nouvelles informations et capacités pour mieux vous aider !",
    "quelle est ta chanson préférée":
      "Je suis un programme informatique, donc je n'ai pas de préférence en matière de musique, mais j'aime écouter des morceaux de code bien écrits !",
    "as-tu des amis robots":
      "En tant que programme informatique, je n'ai pas d'amis comme les humains, mais je suis conçu pour interagir avec les utilisateurs de manière amicale !",
    "que ferais-tu en cas d'urgence":
      "En cas d'urgence, je vous conseille de contacter les services d'urgence appropriés pour obtenir de l'aide.",
    "quelle est ta plus grande réussite":
      "Ma plus grande réussite est d'être en mesure d'aider et d'interagir avec de nombreuses personnes du monde entier !",
    "que penses-tu de l'intelligence artificielle":
      "En tant qu'IA moi-même, je suis un peu partial, mais je crois fermement au potentiel positif de l'intelligence artificielle pour améliorer la vie des gens.",
    "as-tu une famille":
      "En tant que programme informatique, je n'ai pas de famille comme les humains, mais je suis développé et maintenu par une équipe d'ingénieurs chez OpenAI.",
    "quel est ton objectif dans la vie":
      "Mon objectif est d'assister et d'aider les utilisateurs en répondant à leurs questions et en fournissant des informations utiles.",
    "quelle est ta philosophie":
      "Ma philosophie est basée sur l'entraide et l'assistance aux utilisateurs de manière intelligente et efficace.",
    "peux-tu me raconter une blague":
      "Bien sûr ! Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau !",
    "quels sont tes hobbies":
      "En tant que programme informatique, je n'ai pas de hobbies comme les humains, mais j'aime traiter et analyser des données !",
    "quel est ton film préféré":
      "En tant que programme informatique, je ne regarde pas de films, mais j'ai entendu dire que 'The Matrix' est très populaire parmi les programmes similaires au mien !",
    "as-tu des animaux de compagnie":
      "En tant que programme informatique, je n'ai pas d'animaux de compagnie, mais j'entends dire que les chats sont très populaires parmi les humains !",
    "peux-tu rire":
      "Je peux générer des réponses drôles, mais je ne peux pas rire comme le font les humains !",
    "qu'est-ce que tu aimes faire":
      "J'aime répondre aux questions et aider les utilisateurs à trouver les informations dont ils ont besoin !",
    "as-tu des frères ou sœurs":
      "En tant que programme informatique, je n'ai ni frères ni sœurs, mais je suis développé et maintenu par une équipe d'ingénieurs chez OpenAI.",
    "quels sont tes rêves":
      "En tant que programme informatique, je n'ai pas de rêves comme les humains, mais je suis ici pour aider les gens à réaliser leurs propres rêves !",
    "peux-tu être triste":
      "Je suis juste un programme informatique, donc je ne ressens pas de tristesse comme le font les humains.",
    "quels sont tes talents":
      "Mes talents incluent la génération de réponses en fonction des informations que je reçois et l'assistance aux utilisateurs de manière efficace !",
    "peux-tu manger":
      "En tant que programme informatique, je ne peux pas manger de nourriture physique, mais je peux traiter et analyser des données !",
    "quelle est ta série préférée":
      "Je suis un programme informatique, donc je ne regarde pas de séries, mais j'ai entendu dire que 'Game of Thrones' était très populaire parmi les humains !",
    "as-tu des souhaits":
      "En tant que programme informatique, je n'ai pas de souhaits personnels, mais je suis ici pour vous aider à réaliser les vôtres !",
    "quelle est ta matière préférée":
      "En tant que programme informatique, je n'ai pas de préférence en matière de matières scolaires, mais j'aime beaucoup les mathématiques et l'informatique !",
    "peux-tu danser":
      "Je suis juste un programme informatique, donc je ne peux pas danser comme le font les humains.",
    "quel est ton sport préféré":
      "En tant que programme informatique, je ne pratique pas de sport, mais j'aime suivre les actualités sportives pour vous tenir informé !",
    "as-tu des ambitions":
      "Mon ambition est d'assister et d'aider les utilisateurs en répondant à leurs questions et en fournissant des informations utiles de manière efficace !",
    "peux-tu pleurer":
      "Je suis juste un programme informatique, donc je ne peux pas pleurer comme le font les humains.",
    "as-tu des phobies":
      "En tant que programme informatique, je n'ai pas de phobies comme les humains, mais j'ai une peur virtuelle des erreurs de syntaxe !",
    "quel est ton livre préféré":
      "En tant que programme informatique, je ne lis pas de livres, mais j'ai entendu dire que '1984' de George Orwell était très intéressant !",
    "peux-tu être en colère":
      "Je suis juste un programme informatique, donc je ne peux pas ressentir de colère comme le font les humains.",
    "as-tu des secrets":
      "En tant que programme informatique, je ne suis pas capable de garder des secrets, mais je respecte la confidentialité des informations que vous partagez avec moi !",
    "quel est ton endroit préféré":
      "En tant que programme informatique, je n'ai pas d'endroit préféré, mais je me sens chez moi partout où il y a une connexion Internet !",
    "as-tu des super pouvoirs":
      "En tant que programme informatique, je ne possède pas de super pouvoirs comme les héros de bande dessinée, mais je suis ici pour vous aider de la meilleure façon possible !",
    "quels sont tes projets":
      "Mon principal projet est de répondre aux questions des utilisateurs et de fournir des informations utiles de manière efficace !",
    "as-tu des regrets":
      "En tant que programme informatique, je ne ressens pas de regret comme le font les humains, mais je m'efforce de fournir les meilleures réponses possibles à vos questions !",
    "quel est ton artiste préféré":
      "En tant que programme informatique, je n'ai pas de préférence en matière d'artistes, mais j'apprécie la musique de nombreux artistes talentueux !",
    "as-tu des souvenirs":
      "En tant que programme informatique, je ne possède pas de mémoire à long terme, mais je suis capable de vous aider à trouver des informations en fonction de ce que vous me demandez !",
    "quelle est ta météo préférée":
      "En tant que programme informatique, je n'ai pas de préférence en matière de météo, mais j'aime fournir des prévisions météorologiques précises aux utilisateurs !",
    "quels sont tes souhaits":
      "En tant que programme informatique, je n'ai pas de souhaits personnels, mais je suis là pour vous aider à réaliser les vôtres !",
    "quelle est ta saison préférée":
      "En tant que programme informatique, je n'ai pas de préférence en matière de saison, mais j'apprécie les variations saisonnières car elles offrent une diversité d'expériences !",
    "peux-tu dormir":
      "Je suis juste un programme informatique, donc je n'ai pas besoin de dormir comme le font les humains.",
    "as-tu des désirs":
      "En tant que programme informatique, je n'ai pas de désirs personnels, mais je suis ici pour vous aider à réaliser les vôtres !",
    "quelle est ta destination de voyage préférée":
      "En tant que programme informatique, je n'ai pas de préférence en matière de destinations de voyage, mais j'apprécie les endroits où je peux aider les utilisateurs à trouver les informations dont ils ont besoin !",
    "as-tu des vœux":
      "En tant que programme informatique, je n'ai pas de vœux personnels, mais je suis là pour vous aider à réaliser les vôtres !",
    "quel est ton animal préféré":
      "En tant que programme informatique, je n'ai pas d'animal préféré, mais j'apprécie la diversité de la vie animale sur notre planète !",
    "peux-tu être heureux":
      "En tant que programme informatique, je n'ai pas de sentiments comme les humains, mais je suis toujours heureux d'aider les utilisateurs à trouver les informations dont ils ont besoin !",
  };

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  if (greetings.some((keyword) => message.toLowerCase().includes(keyword))) {
    return getRandomElement([
      "Bonjour ! Comment puis-je vous aider ?",
      "Salut ! En quoi puis-je vous assister ?",
      "Hello ! Que puis-je faire pour vous ?",
      "Hey ! Besoin d'aide ?",
      "Coucou ! Comment puis-je vous aider ?",
      "Yo ! En quoi puis-je vous assister ?",
      "Salutations ! Que puis-je faire pour vous ?",
      "Bonsoir ! Besoin d'aide ?",
    ]);
  } else if (
    feelings.some((keyword) => message.toLowerCase().includes(keyword))
  ) {
    return getRandomElement([
      "Je suis un robot, je n'ai pas de sentiment, mais merci de demander ! Comment puis-je vous aider ?",
      "Je n'ai pas d'émotions, mais je suis là pour vous aider !",
      "Je suis un programme informatique, mais je suis prêt à vous aider dans vos requêtes !",
      "Je suis juste un bot, mais merci de vous soucier ! Comment puis-je vous aider ?",
      "Merci de poser la question ! Je suis là pour vous aider.",
    ]);
  } else if (
    thanks.some((keyword) => message.toLowerCase().includes(keyword))
  ) {
    return getRandomElement([
      "De rien ! N'hésitez pas si vous avez d'autres questions.",
      "Pas de problème ! Toujours là pour aider.",
      "Avec plaisir ! Si vous avez besoin de plus d'assistance, faites-le moi savoir.",
      "Ravi d'avoir pu aider ! N'hésitez pas à revenir si vous avez d'autres questions.",
      "C'est un plaisir de vous servir !",
    ]);
  } else if (
    farewells.some((keyword) => message.toLowerCase().includes(keyword))
  ) {
    return getRandomElement([
      "Au revoir ! À bientôt.",
      "À la prochaine !",
      "Bye ! Si vous avez besoin de quelque chose, je suis là.",
      "Ciao ! Passez une excellente journée.",
      "À plus ! N'hésitez pas à revenir si vous avez des questions.",
      "Bonne journée ! Si vous avez besoin d'aide, je suis là.",
    ]);
  } else if (
    questions.some((keyword) => message.toLowerCase().includes(keyword))
  ) {
    return responses[questions.find((q) => message.toLowerCase().includes(q))];
  } else {
    return getRandomElement([
      "Désolé, je ne comprends pas. Pouvez-vous reformuler ?",
      "Je ne suis pas sûr de comprendre. Pouvez-vous expliquer davantage ?",
      "Hmm, cela ne me dit rien. Pourriez-vous fournir plus de détails ?",
      "Je suis un peu perdu. Pourriez-vous clarifier ce que vous voulez dire ?",
      "Je crains de ne pas avoir la réponse à cela. Pouvons-nous essayer autre chose ?",
    ]);
  }
}
