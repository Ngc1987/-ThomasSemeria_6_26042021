
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
