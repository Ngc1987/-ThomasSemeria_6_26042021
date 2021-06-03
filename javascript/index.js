
// *******************************************************************************
// ****************** ACCES PHOTOGRAPHES FICHIER JSON ****************************
// *******************************************************************************

fetch("./json/photographes.json").then(function(response) {
  // if(response.ok) {
    response.json().then(function(json) {
      // eslint-disable-next-line no-undef
      photographData = json;
      // eslint-disable-next-line no-undef
      photographers = json.photographers;
      // eslint-disable-next-line no-undef
      photographMedia = json.medias;
      showPhotographers(json);
      // focusElements();
    });
  // } else {
  //   console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
  // }
});  

const photographList = document.querySelector(".photographList");


/**
 * @param  {JSON} photographData // Tableau des photographes
 */
function showPhotographers(photographData) {
  // eslint-disable-next-line no-undef
  for(let i = 0; i < photographers.length; i++) {
    
    // console.log(photographData["medias"]);
    const link = document.createElement("a");
    const item = document.createElement("article");
    const id = document.createElement("section");
    const photo = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("h2");
    const descript = document.createElement("section");
    const city = document.createElement("div");
    const phrase = document.createElement("div");
    const price = document.createElement("div");
    const tagContainer = document.createElement("section");

    // console.log(sortTag);

    item.setAttribute("class", "photographItem");
    id.setAttribute("class", "photographItem__id");
    photo.setAttribute("class", "photographItem__id__photo");
    name.setAttribute("class", "photographItem__id__name");
    descript.setAttribute("class", "photographItem__descript");
    descript.setAttribute("tabindex", 0);
    city.setAttribute("class", "photographItem__descript__city");
    phrase.setAttribute("class", "photographItem__descript__phrase");
    price.setAttribute("class", "photographItem__descript__price");
    tagContainer.setAttribute("class", "photographItem__tags");
    
    // eslint-disable-next-line no-undef
    link.setAttribute("href", `photographe.html?id=${photographers[i].id}`);
    // eslint-disable-next-line no-undef
    img.setAttribute("src", `images/Photographs/${photographers[i].portrait}`);
    // eslint-disable-next-line no-undef
    link.setAttribute("aria-label", `${photographers[i].name}`);
    img.setAttribute("alt", "");
    // eslint-disable-next-line no-undef
    name.textContent = photographers[i].name;
    // eslint-disable-next-line no-undef
    city.textContent = `${photographers[i].city}, ${photographers[i].country}`;
    // eslint-disable-next-line no-undef
    phrase.textContent = photographers[i].tagline;
    // eslint-disable-next-line no-undef
    price.textContent = `${photographers[i].price}€ / jour`;


    const photographTag = photographData["photographers"][i]["tags"];

    

    for(let t = 0; t < photographTag.length; t++) {

      const tagLink = document.createElement("a");
      const span = document.createElement("span");
      span.textContent = `#${photographTag[t].toLowerCase()}`;
      span.setAttribute("tabindex", 0);
      item.classList.add(`${photographTag[t].toLowerCase()}`);
      tagContainer.appendChild(tagLink);
      tagLink.appendChild(span);
      tagLink.setAttribute("aria-label", `Filtrer les photographes avec le tag ${photographTag[t]}`);
    }

    photo.appendChild(img);
    link.appendChild(photo);
    link.appendChild(name);
    id.appendChild(link);
    descript.appendChild(city);
    descript.appendChild(phrase);
    descript.appendChild(price);
    item.appendChild(id);
    item.appendChild(descript);
    item.appendChild(tagContainer);

    photographList.appendChild(item);
  }



  // *************************************************************
  // ************************ TRI TAGS ***************************

  // Sélection de tous les photographes sur page index.html
  const photographeItem = document.querySelectorAll(".photographItem");

  
  /**
   * @param  {string} tagChoosen // Afficher les photographes selon le tag sélectionné en paramètre
   */
  function showPhotographListByTag(tagChoosen) {

    Array.from(photographeItem).forEach(function(photographe) {

        const photographTag = photographe.lastElementChild.childNodes;

        for(let tags = 0; tags < photographTag.length; tags++) {

          const photographTagFormat = photographTag[tags].innerText.toLowerCase().substring(1);

          if(photographTagFormat.indexOf(tagChoosen) !== -1 || tagChoosen == null) {

            photographe.style.display = "block";
            console.log(photographTagFormat);
            break;

          } else {
            photographe.style.display = "none";
          }
        }
    });
  }


  // Sélection des span contenant les tags dans le header de index.html
  let tagSort = document.querySelectorAll("span");

  // Pour chaque tag, au clic:
  tagSort.forEach(function(tag) {

    
    tag.setAttribute("aria-label", `Filtrer les photographes avec le tag ${tag.innerHTML.substring(1)}`);

      tag.addEventListener("click", function(e) {
        // On prend le texte contenu dans le tag cliqué, on le transforme en minuscules et supprime le #
        const tagFilter = e.target.innerText.toLowerCase().substring(1);
        // tagFilter.setAttribute("href", )

        // Appel de la fonction avec le tag sélectionné en paramètre
        showPhotographListByTag(tagFilter);
      });

      tag.addEventListener("keydown", (e) => {

        // console.log(e);
    
        if(e.code == "Enter" || e.code == "NumpadEnter") {
          const tagFilter = e.target.innerText.toLowerCase().substring(1);
        // Appel de la fonction avec le tag sélectionné en paramètre
        showPhotographListByTag(tagFilter);
        }
      });
  });

  
  
  const params = new URLSearchParams(window.location.search);
  const photographerTag = params.get("tag");

  // Appel de la fonction avec le tag sélectionné sur la page du photographe
  showPhotographListByTag(photographerTag);

  // console.log(photographerTag);

}

// const keyCodes = {
//   tab: 9,
//   enter: 13,
//   escape: 27,
//   left: 37,
//   right: 39
// };


// function focusElements() {
//   // const topLink = document.querySelector("#topLink");
//   const logo = document.querySelector("#logo");
//   const tagContainer = document.querySelector("#tags");
//   const tags = tagContainer.children;
//   const title = document.querySelector("h1");
//   const photographerId = document.querySelector(".photographItem__id");
//   const photographerDescript = document.querySelector(".photographItem__descript");
//   const photographerContainerTags= document.querySelector(".photographItem__tags");
//   const photographTags = photographerContainerTags.children;

//   const focusablesElements = [topLink, logo, tags, title, photographerId, photographerDescript, photographTags];

//   const firstFocusableElement = focusablesElements[0];
//   const lastFocusableElement = focusablesElements[focusablesElements.length - 1];


//   firstFocusableElement.focus();

//   focusablesElements.forEach((focusableElement) => {
//     if (focusableElement.addEventListener) {
//       focusableElement.addEventListener("keydown", (event) => {
//         const tab = event.which === keyCodes.tab;

//         if (!tab) {
//           return;
//         }

//         if (event.shiftKey) {
//           if (event.target === firstFocusableElement) { // shift + tab
//             event.preventDefault();

//             lastFocusableElement.focus();
//           }
//         } else if (event.target === lastFocusableElement) { // tab
//           event.preventDefault();

//           firstFocusableElement.focus();
//         }
//       });
//     }
//   });

//   console.log(photographTags);
// }