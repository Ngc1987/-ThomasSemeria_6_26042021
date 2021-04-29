
// Selecting all required elements

const gallery = document.querySelectorAll(".gallery__sample img"),
previewBox = document.querySelector(".preview-box"),
previewImg = previewBox.querySelector("img")
closeIcon = previewBox.querySelector(".imgBox__close"),
currentImg = previewBox.querySelector(".current-img"),
totalImg = previewBox.querySelector(".total-img");
shadow = document.querySelector(".shadow");

console.log(gallery);


window.onload = () => {  // Une fois la fenêtre chargée
    for(let i = 0; i < gallery.length; i++) {
        let newIndex = i; // On passe i comme valeur à la variable newIndex
        let clickImgIndex;
        gallery[i].onclick = () => {
            clickImgIndex = newIndex; // On passe l'index de l'image cliquée à la variable clickImgIndex
            // console.log(i);

            function preview() { 
                let selectedImgUrl = gallery[newIndex].src; // Obtenir l'url de l'image cliquée
                previewImg.src = selectedImgUrl; // Passe la source de l'image cliquée dans la lightbox
                // console.log(selectedImgUrl);
                // currentImg.textContent = newIndex + 1;
            }

            // Travail sur l'affichage du numéro de l'image
            
            // totalImg.textContent = gallery.length;

            // console.log(selectedImgUrl);


            // Travail sur les boutons précédent et suivant
            const prevBtn = document.querySelector(".prev");
            const nextBtn = document.querySelector(".next");
            if(newIndex == 0) {
                prevBtn.style.display = "none";
            }
            if(newIndex >= gallery.length - 1) {
                nextBtn.style.display = "none";
            }
            prevBtn.onclick = () => {
                newIndex--; // Enlève 1 à l'index de l'image à afficher
                if(newIndex == 0) {
                    preview();
                    prevBtn.style.display = "none";
                } else {
                    preview(); // Appelle la fonction preview pour changer la source de l'image
                    nextBtn.style.display = "block";
                }
            }
            nextBtn.onclick = () => {
                newIndex++; // Enlève 1 à l'index de l'image à afficher
                if(newIndex >= (gallery.length - 1)) {
                    preview();
                    nextBtn.style.display = "none";
                } else {
                    preview(); // Appelle la fonction preview pour changer la source de l'image
                    prevBtn.style.display = "block";
                }
            }
            


            preview(); // Appelle fonction preview
            previewBox.classList.add("show");
            shadow.style.display = "block"
            document.querySelector("body").style.overflow = "hidden";

            closeIcon.onclick = () => {
                previewBox.classList.remove("show");
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
                newIndex = clickImgIndex; // Assigner index de la première image cliquée à la variable newIndex
                shadow.style.display = "none"
                document.querySelector("body").style.overflow = "auto";
            }
        }
    }

}



// ****************** BOUTON CONTACT *************************************
// const contactBtn = document.querySelector(".contact");
// const modal = document.querySelector(".modal");
// const closeBtn = document.querySelector(".modal__head__close");

// contactBtn.onclick = () => {
//     modal.style.display = "block";
// }

// closeBtn.onclick = () => {
    
//     modal.style.display = "none";
// }

// ****************** BOUTON SUBMIT **************************************
const submitBtn = document.querySelector("#submit");
const prenom = document.querySelector("#prenom");
const nom = document.querySelector("#nom");
const email = document.querySelector("#email");

submitBtn.onclick = function(e) {
    e.preventDefault();
    console.log(prenom.value);
    console.log(nom.value);
    console.log(email.value);
}


// ******************* OUVERTURE FENETRE MODALE **************************
// Récupérer les composants de type aria-haspopup="dialog" d1 document
// ainsi que les fenêtres modales liées
const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
const doc = document.querySelector('.js-document');
// Selection de tous les éléments focalisables de la modale
const focusableElementsArray = [
  '[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
];
const keyCodes = {
  tab: 9,
  enter: 13,
  escape: 27,
};
// Fonction open qui passe l'attribut aria-hidden à false pour 
// pouvoir afficher la modale et désactiver le document principal
const open = function (dialog) {
  const focusableElements = dialog.querySelectorAll(focusableElementsArray);
  const firstFocusableElement = focusableElements[1];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  dialog.setAttribute('aria-hidden', false);
  doc.setAttribute('aria-hidden', true);

  // return si pas d'élément focusable
  if (!firstFocusableElement) {
    return;
  }
    // Pour que le focus se charge après le lancement de la modale
    // qui apparaît avec une transition
  window.setTimeout(() => {
    firstFocusableElement.focus();

    // trapping focus inside the dialog
    focusableElements.forEach((focusableElement) => {
      if (focusableElement.addEventListener) {
        focusableElement.addEventListener('keydown', (event) => {
          const tab = event.which === keyCodes.tab;

          if (!tab) {
            return;
          }

          if (event.shiftKey) {
            if (event.target === firstFocusableElement) { // shift + tab
              event.preventDefault();

              lastFocusableElement.focus();
            }
          } else if (event.target === lastFocusableElement) { // tab
            event.preventDefault();

            firstFocusableElement.focus();
          }
        });
      }
    });
  }, 100);
};
// Fonction close qui passe l'attribut aria-hidden à true pour 
// pouvoir fermer la modale et réactiver le document principal
const close = function (dialog, trigger) {
  dialog.setAttribute('aria-hidden', true);
  doc.setAttribute('aria-hidden', false);

  // restoring focus
  trigger.focus();
};

triggers.forEach((trigger) => {
  const dialog = document.getElementById(trigger.getAttribute('aria-controls'));
  // Récupérer éléments ayant data-dismiss en attribut (boutons de fermeture) et appeler la fonction close
  const dismissTriggers = dialog.querySelectorAll('[data-dismiss]');

  // Au clic donc du trigger, on envoie la fonction (open)
  trigger.addEventListener('click', (event) => {
    event.preventDefault();

    open(dialog);
  });

  trigger.addEventListener('keydown', (event) => {
    if (event.which === keyCodes.enter) {
      event.preventDefault();

      open(dialog);
    }  
  });

  // close dialog
  dialog.addEventListener('keydown', (event) => {
    if (event.which === keyCodes.escape) {
      close(dialog, trigger);
    }      
  });

  dismissTriggers.forEach((dismissTrigger) => {
    const dismissDialog = document.getElementById(dismissTrigger.dataset.dismiss);

    dismissTrigger.addEventListener('click', (event) => {
      event.preventDefault();

      close(dismissDialog, trigger);
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target === dialog) {
      close(dialog, trigger);
    }
  }); 
});


