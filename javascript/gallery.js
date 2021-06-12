const params = new URLSearchParams(window.location.search);
const photographerId = params.get("id");
const galleryContainer = document.querySelector(".gallery");



if (params && params.get("id")) {

    fetchPhotographer(photographerId).then(function(result) {
        if(result == "undefined") {
            errorMsg();
        } else {
            fetchMediaByPhotographer(photographerId).then(function(mediaList) {
                // console.log(mediaList);
                const newList = mediaList.map((element) => {
                    return new Media(element);
                });
                console.log(newList);

                // console.log(newList);
                sortBy(newList);
                showGallery(newList);
                lightbox();
                liking();
                showTotalLikesAndPrice();
            });
        }
    });
} else {
    errorMsg();
}



function errorMsg() {
    const errorDiv = document.querySelector(".js-document");
    const errorMessage = document.createElement("h1");
    errorMessage.textContent = "L'ID de ce photographe n'existe pas";
    errorDiv.appendChild(errorMessage);
    "L'ID de ce photographe n'existe pas"
}



/**
 * @param  {number} photographerId // Récupère l'ID du photographe pour recueillir ses informations dans notre Json
 */
function fetchPhotographer(photographerId) {

    return new Promise((resolve, reject) => {

        fetch("./json/photographes.json").then(function(response) {
        
            response.json().then(function(json) {
                // eslint-disable-next-line no-undef
                photographData = json;
                // eslint-disable-next-line no-undef
                const result = photographData.photographers.find(data => data.id == photographerId);
                console.log(result);
                showHeaderPhotograph(photographerId);

                if(result) {
                    resolve(result);
                } else {
                    reject();
                }
            });
        });
    });
}
/**
 * @param  {number} photographerId // Afficher les informations du photographe dans le header récupérées selon son ID
 */
function showHeaderPhotograph(photographerId) {
    // eslint-disable-next-line no-undef
    // console.log(photographData.photographers);
    // console.log(photographerId);
    // eslint-disable-next-line no-undef
    const photographers = photographData.photographers;
    // eslint-disable-next-line no-undef
    for(i= 0; i < photographers.length; i++) {
        // eslint-disable-next-line no-undef
        if(photographers[i].id == photographerId) {

            const name = document.querySelector(".photographPage__head__descript-name");
            const city = document.querySelector(".photographPage__head__descript-city");
            const phrase = document.querySelector(".photographPage__head__descript-phrase");
            const tags = document.querySelector(".photographPage__head__descript-tags");
            const nameOnDialogBox = document.querySelector(".dialog__box-contact");
            // eslint-disable-next-line no-undef
            name.innerHTML = photographers[i].name;
            name.setAttribute("tabindex", "0");
            // eslint-disable-next-line no-undef
            city.innerHTML = `${photographers[i].city}, ${photographers[i].country}`;
            // eslint-disable-next-line no-undef
            phrase.innerHTML = photographers[i].tagline;
            // eslint-disable-next-line no-undef
            nameOnDialogBox.innerHTML = photographers[i].name;
            // eslint-disable-next-line no-undef
            const photographersTags = photographers[i].tags;
            // eslint-disable-next-line no-undef
            for(tag = 0; tag < photographersTags.length; tag++) {

                const tagLink = document.createElement("a");
                // eslint-disable-next-line no-undef
                tagLink.setAttribute("href", `index.html?tag=${photographersTags[tag]}`);
                // eslint-disable-next-line no-undef
                tagLink.setAttribute("aria-label", `Retour à la liste des photographes filtrés avec le tag ${photographersTags[tag]}`);
                // eslint-disable-next-line no-undef
                tagLink.textContent = `#${photographersTags[tag].toLowerCase()}`;
                tags.appendChild(tagLink);
            }

            const photo = document.querySelector(".photographPage__head__id-photo");
            const photographerPortrait = document.createElement("img");
            // eslint-disable-next-line no-undef
            photographerPortrait.setAttribute("src", `images/Photographs/${photographers[i].portrait}`);
            // eslint-disable-next-line no-undef
            photographerPortrait.setAttribute("alt", `Photo de profil de ${photographers[i].name}`);
            photographerPortrait.setAttribute("tabindex", "0");
            photo.appendChild(photographerPortrait);


            const photographPrice = document.querySelector(".likeAndPrice__price");
            // eslint-disable-next-line no-undef
            photographPrice.innerHTML = `${photographers[i].price}€ / jour`;
            photographPrice.setAttribute("tabindex", "0");
            // eslint-disable-next-line no-undef
            photographPrice.setAttribute("aria-label", `Ses services vous seront facturés ${photographers[i].price} euros par jour`);
        }
    }
}

/**
 * @param  {number} photographerId // Récupère l'ID du photographe cliqué afin de récupérer les médias ayant le même ID
 */
function fetchMediaByPhotographer(photographerId) {

    return new Promise((resolve) => {

        fetch("./json/photographes.json").then(function(response) {
        
            response.json().then(function(json) {
                // eslint-disable-next-line no-undef
                photographData = json;
                // eslint-disable-next-line no-undef
                const result = photographData.media.filter(data => data.photographerId == photographerId);

                console.log(result);
                resolve(result);
                //   sortBy(result);

            });
        });
    });
}


class Media {

    constructor(data) {

        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.tags = data.tags;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
        this.alt-text = data.alt;

        if(data.image) {

            this.source = data.image;
            this.isVideo = false;
        }

        if(data.video) {

            this.source = data.video;
            this.isVideo = true;
        }
        
    }

    getHtml() {

        const article = document.createElement("article");
        article.setAttribute("class", "gallery__sample");

        const imgContainer = document.createElement("section");
        imgContainer.setAttribute("class", "image");

        const span = document.createElement("span");

        const descript = document.createElement("section");
        descript.setAttribute("class", "gallery__sample__descript");

        const name = document.createElement("h2");
        name.setAttribute("class", "gallery__sample__descript-name");
        name.innerHTML = this.title;
        name.setAttribute("aria-label", this.title);
        name.setAttribute("tabindex", "0");

        const like = document.createElement("h3");
        like.setAttribute("class", "gallery__sample__descript-like unliked");
        like.innerHTML = this.likes;
        like.setAttribute("tabindex", "0");
        like.setAttribute("aria-label", "likes");

        const heart = document.createElement("i");
        heart.setAttribute("class", "fas fa-heart gallery__sample__descript-heart unliked");
        
        if(this.source.includes("mp4")) {
            const video = document.createElement("video");
            video.setAttribute("src", "images/photographersImages/"+ this.source);
            video.setAttribute("poster", `images/photographersImages/mini${this.source.replace("mp4", "jpg")}`);
            video.setAttribute("alt", this.alt-text);
            video.setAttribute("tabindex", "0");
            const subtitles = document.createElement("track");
                    subtitles.setAttribute("src", `images/photographersImages/${this.source.replace("mp4", "vtt")}`);
                    subtitles.setAttribute("label", "Français");
                    subtitles.setAttribute("kind", "subtitles");
                    subtitles.setAttribute("srclang", "fr");
                    subtitles.setAttribute("default", "");
            imgContainer.appendChild(video);
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Votre navigateur ne peut pas lire le format de vidéo proposé. Pensez à le mettre à jour";
            video.appendChild(subtitles);
            video.appendChild(errorMessage);
            // console.log(video);

            video.onclick = function() {
                video.setAttribute("autoplay", "");
            };
        }

        if(this.source.includes("jpg")) {
            const image = document.createElement("img");
            image.setAttribute("src", "images/photographersImages/"+ this.source);  
            image.setAttribute("alt", this.alt-text);  
            image.setAttribute("tabindex", "0");  
            span.appendChild(image);
        }

        article.appendChild(imgContainer);
        imgContainer.appendChild(span);
        article.appendChild(descript);
        descript.appendChild(name);
        descript.appendChild(like);
        descript.appendChild(heart);

        return article;
    }
}


function lightbox() { 
    
    // Selection des éléments requis
    const gallery = document.querySelectorAll(".gallery__sample img, video"),
    previewBox = document.querySelector(".preview-box"),
    previewImg = previewBox.querySelector("img"),
    header = document.querySelector("header"),
    closeIcon = previewBox.querySelector(".imgBox__close"),
    currentImg = previewBox.querySelector(".current-img"),
    shadow = document.querySelector(".shadow");// Une fois la fenêtre chargée
    
    for(let i = 0; i < gallery.length; i++) {
        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");



        let newIndex = i; // On passe i comme valeur à la variable newIndex
        let clickImgIndex;

        

        const openLightBox = () => {

            previewBox.setAttribute("aria-hidden", false);
            // eslint-disable-next-line no-undef
            doc.setAttribute("aria-hidden", "true");
            header.setAttribute("aria-hidden", "true");
            prevBtn.setAttribute("tabindex", "0");
            nextBtn.setAttribute("tabindex", "0");
            closeIcon.setAttribute("tabindex", "0");
            // closeIcon.focus();

            // prevBtn.focus();  
            clickImgIndex = newIndex; // On passe l'index de l'image cliquée à la variable clickImgIndex
            // currentImg.children[0].remove();
            const video = document.createElement("video");

            function preview() { 
                let selectedItemUrl = gallery[newIndex].src; // Obtenir l'url de l'image cliquée
                previewImg.src = selectedItemUrl; // Passe la source de l'image cliquée dans la lightbox

                console.log(selectedItemUrl);
                console.log(currentImg.children[0]);

                
                

                if(selectedItemUrl.includes("mp4")) {
                    currentImg.children[0].remove();
                    
                    const error = document.createElement("p");
                    error.innerHTML = "Votre navigateur ne prend pas en charge ce format de vidéo. Pensez à le mettre à jour";
                    const subtitles = document.createElement("track");
                    subtitles.setAttribute("src", `${selectedItemUrl.replace("mp4", "vtt")}`);
                    subtitles.setAttribute("label", "Français");
                    subtitles.setAttribute("kind", "subtitles");
                    subtitles.setAttribute("srclang", "fr");
                    subtitles.setAttribute("default", "");
                    video.setAttribute("src", selectedItemUrl);
                    video.setAttribute("autoplay", "");
                    video.setAttribute("controls", "");
                    video.appendChild(subtitles);
                    video.appendChild(error);
                    currentImg.appendChild(video);
                }
                if(selectedItemUrl.includes("jpg")) {
                    currentImg.children[0].remove();    
                    const img = document.createElement("img");
                    img.setAttribute("src", selectedItemUrl);
                    currentImg.appendChild(img);
                }
            }

            preview(); // Appelle fonction preview

            function previous() {
                newIndex--; // Enlève 1 à l'index de l'image à afficher
                if(newIndex < 0) {
                    newIndex = gallery.length - 1;
                }
                preview();
            }

            prevBtn.addEventListener("click", previous);

            
            function next() {
                newIndex++; // Enlève 1 à l'index de l'image à afficher
                if(newIndex > (gallery.length - 1)) {
                    newIndex = 0;
                } 
                preview();
            }

            nextBtn.addEventListener("click", next); 

            previewBox.classList.add("show");
            shadow.style.display = "block";
            document.querySelector("body").style.overflow = "hidden";

            
            function closeLightBox() {

                previewBox.setAttribute("aria-hidden", true);
                // eslint-disable-next-line no-undef
                doc.setAttribute("aria-hidden", false);
                video.removeAttribute("autoplay");
                previewBox.classList.remove("show");
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
                newIndex = clickImgIndex; // Assigner index de la première image cliquée à la variable newIndex
                shadow.style.display = "none";
                document.querySelector("body").style.overflow = "auto";
            }

            closeIcon.addEventListener("click", closeLightBox);
            

            document.addEventListener("keydown", (e) => {

                console.log(e.code);
                if(e.code == "ArrowLeft") {
                    previous();
                }
            
                if(e.code == "ArrowRight") {
                    next();
                }
                if(e.code == "Escape") {
                    closeLightBox();
                }
            });
        };

        gallery[i].addEventListener("click", openLightBox);

        gallery[i].addEventListener("keydown", (e) => {
            // console.log(e.code);
            if(e.code == "Enter" || e.code == "NumpadEnter") {
                openLightBox();
            }
        });
    }
}






function showGallery(list) {
    // const galleryContainer = document.querySelector(".gallery");

    list.forEach((media) => {
        galleryContainer.appendChild(media.getHtml());
    });

    // sortBy(list);
}


function liking() {
    
    const likes = document.querySelectorAll(".gallery__sample__descript-like");

    likes.forEach(like => {

        like.addEventListener("click", classToggle);

        like.addEventListener("keydown", (e) => {

            console.log(e.code);
            if(e.code == "Enter" || e.code == "NumpadEnter") {
                classToggle();
            }
        });
        
        function classToggle() {

            like.classList.toggle("liked");
            like.classList.toggle("unliked");

            if(like.classList.contains("liked")) {
                like.innerText ++ ;
                like.classList.add("liked");
                like.nextElementSibling.classList.add("likedHeart");
                like.classList.remove("unliked");
        
            } else if (like.classList.contains("unliked")) {
                like.innerText --;
                like.classList.add("unliked");
                like.nextElementSibling.classList.remove("likedHeart");
                like.classList.remove("liked");
            }

            console.log(like.nextElementSibling);

            showTotalLikesAndPrice();
        }
    });
}


function showTotalLikesAndPrice() {

    const totalLikes = document.querySelector(".likeAndPrice__like");
    const likes = document.querySelectorAll(".gallery__sample__descript-like");
    

    let sum = 0;
        // eslint-disable-next-line no-undef
        for(like = 0; like < likes.length; like++){
            // eslint-disable-next-line no-undef
            let likeValue = parseInt(likes[like].textContent);
            // console.log(likeValue);
        
            sum = sum + likeValue;
    }

    totalLikes.innerHTML = sum + " <i class='fas fa-heart'></i>";
    totalLikes.setAttribute("tabindex", "0");
    totalLikes.setAttribute("aria-label", `En cumulé, les oeuvres de ce photographe on été aimées ${sum} fois.`);
}


// **************************** BOUTON TRI PHOTOS ***************************
// **************************************************************************
const sortWrapper = document.querySelector(".sortWrapper");
const sortSelect = document.querySelector(".sortWrapper__select");

const sortButton = document.querySelector(".sortWrapper__select-trigger");

sortButton.addEventListener("mouseenter", () => {
    sortSelect.classList.toggle("black");
});
sortButton.addEventListener("mouseleave", () => {
    sortSelect.classList.toggle("black");
});

function sortBy(newList) { 


    sortWrapper.addEventListener("click", openSortWrapper);
    sortWrapper.addEventListener("keydown", (e) => {
        if(e.code == "NumpadEnter" || e.code == "Enter") {
            openSortWrapper();
        }
    });


  function openSortWrapper() {
    sortSelect.classList.toggle("open");
  }


  for (const value of document.querySelectorAll(".sortWrapper__options-value")) {

    value.setAttribute("tabindex", "0");

    value.addEventListener("click", () => {
        sortMedias(value);
        sortSelect.focus();
    });

    value.addEventListener("keydown", (e) => {
        console.log(e.code);
        if(e.code == "NumpadEnter") {
            sortMedias(value);
            sortSelect.focus();
        }
    });
    
    // eslint-disable-next-line no-inner-declarations
    function sortMedias(value) {

        if (!value.classList.contains("selected")) {
            value.parentNode.querySelector(".sortWrapper__options-value.selected").classList.remove("selected");
            value.classList.add("selected");
            value.closest(".sortWrapper__select").querySelector(".sortWrapper__select-trigger h3").textContent = value.textContent;
            console.log(value.textContent);
        }

        if(value.textContent == "Date") {
            while( galleryContainer.firstChild) {
                 galleryContainer.removeChild( galleryContainer.firstChild);
            }
            const sortPics = newList.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            // galleryContainer.removeChild(childNodes);

            console.log(sortPics);
            showGallery(sortPics);
            sortSelect.focus();

        }
        if(value.textContent == "Titre") {
            while( galleryContainer.firstChild) {
                galleryContainer.removeChild( galleryContainer.firstChild);
           }
            const sortPics = newList.sort(function (a, b) {
                return a.title.localeCompare(b.title);

            });
            // galleryContainer.removeChild(childNodes);

            console.log(sortPics);
            showGallery(sortPics);
            sortSelect.focus();

        }
        if(value.textContent == "Popularité") {
            while( galleryContainer.firstChild) {
                galleryContainer.removeChild( galleryContainer.firstChild);
           }
            const sortPics = newList.sort(function (a, b) {
                return b.likes - a.likes;

            });
            // galleryContainer.removeChild(childNodes);

            console.log(sortPics);
            showGallery(sortPics);
            sortSelect.focus();

        }

        
        lightbox();
        liking();
        sortWrapper.focus();
    }
    
  }

  window.addEventListener("click", function(e) {
    // const select = document.querySelector('.custom-select')
    if (!sortSelect.contains(e.target)) {
        sortSelect.classList.remove("open");
        sortWrapper.focus();
    }
  });
}