// Selection du bouton pour remonter en tête de page
let topLink = document.querySelector("#topLink");
// Au scroll de la fenêtre, le bouton apparaît
document.addEventListener('DOMContentLoaded', function() {
    window.onscroll = function() {
      topLink.className = (window.pageYOffset > 100) ? "show" : "hide";
    };
});


let requestURL = "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json";
// let request = new XMLHttpRequest();
// request.open("GET", requestURL);
// request.responseType = "json";
// request.send();

// request.onload = function() {
//   let photographersData = request.response;
//   showPhotographers(photographersData);
// }

// console.log(photographersData);


// fetch(requestURL).then(function(response)) {
//   response.json().then(function(json)) {
//     photographData = json;
//   }
// }

// fetch("./json/photographes.json").then(result => result.json()).then(console.log);

// fetch("./json/photographes.json").then(function(response) {
//   response.json().then(function(console.log(response)))
// })



fetch('./json/photographes.json').then(function(response) {
  // if(response.ok) {
    response.json().then(function(json) {
      photographData = json;
      showPhotographers(photographData);
    });
  // } else {
  //   console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
  // }
});  

const photographList = document.querySelector(".photographList");

function showPhotographers(photographData) {
  const photographers = photographData["photographers"];
  for(let i = 0; i < photographers.length; i++) {
    

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

    console.log(photographers);

    item.setAttribute("class", "photographItem");
    id.setAttribute("class", "photographItem__id");
    photo.setAttribute("class", "photographItem__id__photo");
    name.setAttribute("class", "photographItem__id__name");
    descript.setAttribute("class", "photographItem__descript");
    city.setAttribute("class", "photographItem__descript__city");
    phrase.setAttribute("class", "photographItem__descript__phrase");
    price.setAttribute("class", "photographItem__descript__price");
    tagContainer.setAttribute("class", "photographItem__tags");
    

    link.setAttribute("href", "photographe.html");
    img.setAttribute("src", `images/Photographs/${photographers[i].portrait}`);
    img.setAttribute("alt", `Photo de ${photographers[i].name}`);
    name.textContent = photographers[i].name;
    city.textContent = `${photographers[i].city}, ${photographers[i].country}`;
    phrase.textContent = photographers[i].tagline;
    price.textContent = `${photographers[i].price}€ / jour`;

    const tagst = photographData["photographers"][i]["tags"];
    console.log(tagst);

    for(let t = 0; t < tagst.length; t++) {

      const span = document.createElement("span");
      span.textContent = `#${tagst[t]}`;
      tagContainer.appendChild(span);
    }

    photo.appendChild(img);
    id.appendChild(photo);
    id.appendChild(name);
    descript.appendChild(city);
    descript.appendChild(phrase);
    descript.appendChild(price);
    item.appendChild(id);
    item.appendChild(descript);
    item.appendChild(tagContainer);
    link.appendChild(item);

    photographList.appendChild(link);


  }

  
}