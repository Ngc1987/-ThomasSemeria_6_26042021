
// *******************************************************************************
// ****************** ACCES PHOTOGRAPHES FICHIER JSON ****************************
// *******************************************************************************

// Adresse fichier json
let requestURL = "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json";

// const photographData;

fetch('./json/photographes.json').then(function(response) {
  // if(response.ok) {
    response.json().then(function(json) {
      photographData = json;
      photographers = json.photographers;
      photographMedia = json.medias;
      showPhotographers(json);
    });
  // } else {
  //   console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
  // }
});  

const photographList = document.querySelector(".photographList");

// const sortTag = photographData.photographers[i]["tags"];
// console.log(photographers);


function showPhotographers(photographData) {
  // const photographers = photographData["photographers"];
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
    city.setAttribute("class", "photographItem__descript__city");
    phrase.setAttribute("class", "photographItem__descript__phrase");
    price.setAttribute("class", "photographItem__descript__price");
    tagContainer.setAttribute("class", "photographItem__tags");
    

    link.setAttribute("href", `photographe.html?id=${photographers[i].id}`);
    img.setAttribute("src", `images/Photographs/${photographers[i].portrait}`);
    img.setAttribute("alt", `Photo de ${photographers[i].name}`);
    name.textContent = photographers[i].name;
    city.textContent = `${photographers[i].city}, ${photographers[i].country}`;
    phrase.textContent = photographers[i].tagline;
    price.textContent = `${photographers[i].price}€ / jour`;


    const photographTag = photographData["photographers"][i]["tags"];

    

    for(let t = 0; t < photographTag.length; t++) {

      // photographTagLow =photographTag.toLowerCase();

      const span = document.createElement("span");
      span.textContent = `#${photographTag[t].toLowerCase()}`;
      item.classList.add(`${photographTag[t].toLowerCase()}`)
      tagContainer.appendChild(span);
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
  const photographeList = document.querySelectorAll(".photographItem");

  // Afficher les photographes selon le tag sélectionné en paramètre
  function showPhotographListByTag(tagChoosen) {
    Array.from(photographeList).forEach(function(photographe) {

      const photographTag = photographe.lastElementChild.childNodes;
      // console.log(photographTag[0]);

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
    })
  }


  // Sélection des span contenant les tags sur index.html
  let tagSort = document.querySelectorAll("span");

  // Pour chaque tag, au clic:
  tagSort.forEach(function(tag) {
      tag.addEventListener("click", function(e) {
        // On prend le texte contenu dans le tag cliqué, on le transforme en minuscules et supprime le #
        const tagFilter = e.target.innerText.toLowerCase().substring(1);
        // console.log(tagFilter);

        // Appel de la fonction avec le tag sélectionné en paramètre
        showPhotographListByTag(tagFilter);
      });
  });

  
  const params = new URLSearchParams(window.location.search);
  const photographerTag = params.get("tag");
  // const photographeList = document.querySelectorAll(".photographItem");

  // Appel de la fonction avec le tag sélectionné sur la page du photographe
  showPhotographListByTag(photographerTag);

  console.log(photographerTag);

  // Array.from(photographeList).forEach(function(photographe) {

  //   const photographTag = photographe.lastElementChild.childNodes;
  // // console.log(photographTag[0]);

  //     for(let tags = 0; tags < photographTag.length; tags++) {
    
  //       const photographTagFormat = photographTag[tags].innerText.toLowerCase().substring(1);

  //       if(photographTagFormat.indexOf(photographerTag) !== -1 || photographerTag == null) {
  //         photographe.style.display = "block";
  //         console.log(photographTagFormat);
  //         break;

  //       } else {
  //         photographe.style.display = "none";
  //       }
  //     }
  // } )


  

  // console.log(tagFilter);



// }
}



// if (params && params.get("tag"))


// var str = "http://waytolearnx.com/t.html?name=alex-babtise&age=25&address=paris";
// var url = new URL(str);
// var name = url.searchParams.get("name");
// console.log(name);



// let url = new URL(params);
// let tagSearch = url.searchParams.get("tag");
// console.log(tagSearch);



















  // for(let i = 0; i < item.length; i++) {

  // for(let tag = 0; tag < tagSort.length; tag++) {
    
    // console.log(tagSort[tag].innerHTML);

    // tagSort.onclick = function() {

    //   // const tagArray = 
    //   if(tagSort[tag].innerHTML !== itemSort.classList.value) {
    //       itemSort.classList.add("hide");
    //   };
    // }
  // }
// console.log(photographData);

// TRI PHOTOS
  // const sortDataMedia = (sortBy) => {

  //   switch (sortBy){
  //     case 'popularity':
              
  //     data.media.sort(function(a,b){
  //       return b.likes - a.likes
  //     })
  //     break;
  
  //     case 'date':
  //     data.media.sort(function(a,b){
  //       return new Date(b.date) - new Date(a.date);
  //     })
  //     break;
  
  
  //     case 'title':        
  //     data.media.sort((a, b) => a.alt.localeCompare(b.alt, 'fr', {ignorePunctuation: true}));
  //     break;
  
  //   }
  // }