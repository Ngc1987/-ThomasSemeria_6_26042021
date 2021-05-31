const params = new URLSearchParams(window.location.search);
const photographerId = params.get("id");
const galleryContainer = document.querySelector(".gallery");



if (params && params.get("id")) {

    fetchPhotographer(photographerId).then(function(result) {
        if(result === undefined) {
            // Prévoir une erreur (Cas de figure si id ne correspond à personne)
        } else {
            // console.log(result);

            fetchMediaByPhotographer(photographerId).then(function(mediaList) {
                // console.log(mediaList);
                const newList = mediaList.map((element) => {
                    return new Media(element);
                })
                console.log(newList);

                // console.log(newList);
                sortBy(newList);
                showGallery(newList);
                openLightbox();
                liking();
                showTotalLikesAndPrice();
            });
        }
    })
} else {
        // Prévoir une erreur (fonction)
}


function fetchPhotographer(photographerId) {

    return new Promise((resolve, reject) => {

        fetch('./json/photographes.json').then(function(response) {
        
            response.json().then(function(json) {
    
                photographData = json;
                const result = photographData.photographers.find(data => data.id == photographerId);
                console.log(result);
                showHeaderPhotograph(photographerId);
              
                resolve(result);
            });
        });
    })
}

function showHeaderPhotograph(photographerId) {
    console.log(photographData.photographers);
    console.log(photographerId);

    const photographers = photographData.photographers;

    for(i= 0; i < photographers.length; i++) {
        if(photographers[i].id == photographerId) {
            const name = document.querySelector(".photographPage__head__descript--name");
            const city = document.querySelector(".photographPage__head__descript--city");
            const phrase = document.querySelector(".photographPage__head__descript--phrase");
            const tags = document.querySelector(".photographPage__head__descript--tags");
            name.innerHTML = photographers[i].name;
            city.innerHTML = `${photographers[i].city}, ${photographers[i].country}`;
            phrase.innerHTML = photographers[i].tagline;

            const photographersTags = photographers[i].tags;

            for(tag = 0; tag < photographersTags.length; tag++) {
                const tagLink = document.createElement("a");
                tagLink.setAttribute("href", `index.html?tag=${photographersTags[tag]}`)
                tagLink.textContent = `#${photographersTags[tag].toLowerCase()}`;
                tags.appendChild(tagLink);
            }

            const photo = document.querySelector(".photographPage__head__id--photo");
            const photographerPortrait = document.createElement("img");
            photographerPortrait.setAttribute("src", `images/Photographs/${photographers[i].portrait}`);
            photo.appendChild(photographerPortrait);


            const photographPrice = document.querySelector(".likeAndPrice__price");
            photographPrice.innerHTML = `${photographers[i].price}€ / jour`
        }
    }
}


function fetchMediaByPhotographer(photographerId) {

    return new Promise((resolve, reject) => {

        fetch('./json/photographes.json').then(function(response) {
        
            response.json().then(function(json) {
    
              photographData = json;
              const result = photographData.media.filter(data => data.photographerId == photographerId);

              console.log(result);
              resolve(result);
            //   sortBy(result);

            });
        });
    })

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
        

        const name = document.createElement("div");
        name.setAttribute("class", "gallery__sample__descript--name");
        name.innerHTML = this.title;

        // const price = document.createElement("div");
        // price.setAttribute("class", "gallery__sample__descript--price");
        // price.innerHTML = this.price;
        

        const like = document.createElement("div");
        like.setAttribute("class", "gallery__sample__descript--like unliked");
        like.innerHTML = this.likes;

        const heart = document.createElement("i");
        heart.setAttribute("class", "fas fa-heart gallery__sample__descript--heart unliked");

        
        if(this.source.includes("mp4")) {
            const video = document.createElement("video");
            video.setAttribute("src", "images/photographersImages/"+ this.source);
            video.setAttribute("poster", `images/photographersImages/mini${this.source.replace("mp4", "jpg")}`);
            video.setAttribute("aria-label", this.title);
            video.setAttribute("alt", this.title);
            span.appendChild(video);  
            video.onclick = function() {
                video.setAttribute("controls", "");
                video.setAttribute("autoplay", "");
            }
        }

        if(this.source.includes("jpg")) {
            const image = document.createElement("img");
            image.setAttribute("src", "images/photographersImages/"+ this.source);  
            image.setAttribute("alt", this.title);  
            image.setAttribute("aria-label", this.title);  
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



function openLightbox() { 
    
    // Selection des éléments requis
    const gallery = document.querySelectorAll(".gallery__sample img, video"),
    previewBox = document.querySelector(".preview-box"),
    previewImg = previewBox.querySelector("img"),
    closeIcon = previewBox.querySelector(".imgBox__close"),
    currentImg = previewBox.querySelector(".current-img"),
    shadow = document.querySelector(".shadow");// Une fois la fenêtre chargée
    
    for(let i = 0; i < gallery.length; i++) {


        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");

        

        let newIndex = i; // On passe i comme valeur à la variable newIndex
        let clickImgIndex;

        gallery[i].onclick = () => {

            
            previewBox.setAttribute('aria-hidden', false);
            doc.setAttribute('aria-hidden', true);

            prevBtn.focus();  
            clickImgIndex = newIndex; // On passe l'index de l'image cliquée à la variable clickImgIndex
            // currentImg.children[0].remove();

            function preview() { 
                let selectedItemUrl = gallery[newIndex].src; // Obtenir l'url de l'image cliquée
                previewImg.src = selectedItemUrl; // Passe la source de l'image cliquée dans la lightbox
                console.log(selectedItemUrl);
                console.log(currentImg.children[0]);

                if(selectedItemUrl.includes("mp4")) {
                    currentImg.children[0].remove();
                    const video = document.createElement("video");
                    const error = document.createElement("p");
                    error.innerHTML = "Votre navigateur ne prend pas en charge ce format de vidéo. Pensez à le mettre à jour";
                    video.setAttribute("src", selectedItemUrl);
                    video.setAttribute("autoplay", "");
                    video.setAttribute("controls", "");
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
            shadow.style.display = "block"
            document.querySelector("body").style.overflow = "hidden";

            
            function closeLightBox() {

                previewBox.setAttribute('aria-hidden', true);
                doc.setAttribute('aria-hidden', false);

                previewBox.classList.remove("show");
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
                newIndex = clickImgIndex; // Assigner index de la première image cliquée à la variable newIndex
                shadow.style.display = "none"
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
            })
        };    
    }
}






function showGallery(list) {
    // const galleryContainer = document.querySelector(".gallery");

    list.forEach((media) => {
        galleryContainer.appendChild(media.getHtml())
    })

    // sortBy(list);
}


function liking() {
    
    const likes = document.querySelectorAll(".gallery__sample__descript--like");

    likes.forEach(like => {

    like.onclick = function classToggle() {

        this.classList.toggle('liked');
        this.classList.toggle('unliked');

        if(this.classList.contains("liked")) {
            like.innerText ++ ;
            like.classList.add("liked");
            like.nextElementSibling.classList.add("likedHeart");
            like.classList.remove("unliked");
    
        } else if (this.classList.contains("unliked")) {
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
    const likes = document.querySelectorAll(".gallery__sample__descript--like");

    let sum = 0;

        for(like = 0; like < likes.length; like++){

            let likeValue = parseInt(likes[like].textContent);
            // console.log(likeValue);
        
            sum = sum + likeValue;
    }

    totalLikes.innerHTML = sum + ` <i class="fas fa-heart"></i>`;
}


// **************************** BOUTON TRI PHOTOS ***************************
// **************************************************************************
const sortWrapper = document.querySelector(".sortWrapper");
const sortSelect = document.querySelector(".sortWrapper__select");

// sortWrapper.addEventListener("click", function() {
//   sortSelect.classList.toggle("open");
// })
function sortBy(newList) { 
  document.querySelector('.sortWrapper').addEventListener('click', function() {
    this.querySelector('.sortWrapper__select').classList.toggle('open');
  })


  for (const value of document.querySelectorAll(".sortWrapper__options--value")) {

    value.addEventListener('click', function() {

        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.sortWrapper__options--value.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.sortWrapper__select').querySelector('.sortWrapper__select--trigger span').textContent = this.textContent;
            console.log(this.textContent);
        }

        if(this.textContent == "Date") {
            while( galleryContainer.firstChild) {
                 galleryContainer.removeChild( galleryContainer.firstChild);
            }
            const sortPics = newList.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            })
            // galleryContainer.removeChild(childNodes);

            console.log(sortPics);
            showGallery(sortPics);

        }
        if(this.textContent == "Titre") {
            while( galleryContainer.firstChild) {
                galleryContainer.removeChild( galleryContainer.firstChild);
           }
            const sortPics = newList.sort(function (a, b) {
                return a.title.localeCompare(b.title);

            })
            // galleryContainer.removeChild(childNodes);

            console.log(sortPics);
            showGallery(sortPics);

        }
        if(this.textContent == "Popularité") {
            while( galleryContainer.firstChild) {
                galleryContainer.removeChild( galleryContainer.firstChild);
           }
            const sortPics = newList.sort(function (a, b) {
                return b.likes - a.likes;

            })
            // galleryContainer.removeChild(childNodes);

            console.log(sortPics);
            showGallery(sortPics);

        }

        
        openLightbox();
        liking();
    })
  }

  window.addEventListener('click', function(e) {
    // const select = document.querySelector('.custom-select')
    if (!sortSelect.contains(e.target)) {
        sortSelect.classList.remove('open');
    }
  });
}