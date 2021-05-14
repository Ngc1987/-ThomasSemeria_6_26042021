const params = new URLSearchParams(window.location.search);
const photographerId = params.get("id");

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

                // console.log(newList);
                showGallery(newList);
                openLightbox();
                liking();
                showTotalLikesAndPrice();
            });
        }
    })


    // showHeaderPhotograph(photographerId) {

    // }


} 
    else {
        // Prévoir une erreur (fonction)
    }


function fetchPhotographer(photographerId) {

    return new Promise((resolve, reject) => {

        fetch('./json/photographes.json').then(function(response) {
        
            response.json().then(function(json) {
    
                photographData = json;
                const result = photographData.photographers.find(data => data.id == photographerId);
                
                
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
                const span = document.createElement("span");
                span.textContent = `#${photographersTags[tag].toLowerCase()}`;
                tags.appendChild(span);
            }

            const photo = document.querySelector(".photographPage__head__id--photo");
            const photographerPortrait = document.createElement("img");
            photographerPortrait.setAttribute("src", `images/Photographs/${photographers[i].portrait}`);
            photo.appendChild(photographerPortrait);


            const photographPrice = document.querySelector(".likeAndPrice__price");
            photographPrice.innerHTML = `${photographers[i].price}€ / jour`




            // photographers[i].tags.forEach(function(tag)) {
            //     const span = document.createElement("span");
            //     span.textContent = `#${photographTag[tag].toLowerCase()}`;
            //     span.appendChild(tag);
            //     tags.appendChild(span);
            // }

            // for(let t = 0; t < photographTag.length; t++) {

            //     // photographTagLow =photographTag.toLowerCase();
          
            //     const span = document.createElement("span");
            //     span.textContent = `#${photographTag[t].toLowerCase()}`;
            //     item.classList.add(`${photographTag[t].toLowerCase()}`)
            //     tagContainer.appendChild(span);
            //   }
        }
    }
    

}


function fetchMediaByPhotographer(photographerId) {

    return new Promise((resolve, reject) => {

        fetch('./json/photographes.json').then(function(response) {
        
            response.json().then(function(json) {
    
              photographData = json;
              const result = photographData.media.filter(data => data.photographerId == photographerId);
              
              resolve(result);
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

        const imgContainer = document.createElement("div");
        imgContainer.setAttribute("class", "image");

        const span = document.createElement("span");

        const descript = document.createElement("div");
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
            span.appendChild(video);  
            video.onclick = function() {
                video.setAttribute("controls", "");
                video.setAttribute("autoplay", "");
            }
        }

        if(this.source.includes("jpg")) {
            const image = document.createElement("img");
            image.setAttribute("src", "images/photographersImages/"+ this.source);  
            span.appendChild(image);
        }


        article.appendChild(imgContainer);
        imgContainer.appendChild(span);
        
        
        article.appendChild(descript);
        descript.appendChild(name);
        // descript.appendChild(price);
        descript.appendChild(like);
        descript.appendChild(heart);


        return article;
    }


}

/* <article class="gallery__sample">

        <div classe="image"><img src="images/Mimi/Travel_Lonesome_resultat.jpg" alt=""></div>

        <div class="gallery__sample__descript">
        <div class="gallery__sample__descript--name">Solitude</div>
        <div class="gallery__sample__descript--price">70 €</div>
        <div class="gallery__sample__descript--like unliked">12</div>
    <i class="fas fa-heart gallery__sample__descript--heart unliked"></i>

    </div>
</article> */

function openLightbox() { 
    
    // Selection des éléments requis
    const gallery = document.querySelectorAll(".gallery__sample img, video"),
    previewBox = document.querySelector(".preview-box"),
    previewImg = previewBox.querySelector("img"),
    closeIcon = previewBox.querySelector(".imgBox__close"),
    currentImg = previewBox.querySelector(".current-img"),
    totalImg = previewBox.querySelector(".total-img");
    shadow = document.querySelector(".shadow");// Une fois la fenêtre chargée
    console.log(currentImg.children[0]);
    
    for(let i = 0; i < gallery.length; i++) {

        let newIndex = i; // On passe i comme valeur à la variable newIndex
        let clickImgIndex;

        gallery[i].onclick = () => {

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
                    video.setAttribute("src", selectedItemUrl);
                    video.setAttribute("autoplay", "");
                    video.setAttribute("controls", "");
                    currentImg.appendChild(video);
                }
                if(selectedItemUrl.includes("jpg")) {
                    currentImg.children[0].remove();    
                    const img = document.createElement("img");
                    img.setAttribute("src", selectedItemUrl);
                    currentImg.appendChild(img);
                }
            
            }

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



function showGallery(list) {
    const galleryContainer = document.querySelector(".gallery");

    list.forEach((media) => {
        galleryContainer.appendChild(media.getHtml())
    })
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
            like.classList.remove("unliked");
                
                
    
        } else if (this.classList.contains("unliked")) {
            like.innerText --;
            like.classList.add("unliked");
            like.classList.remove("liked");
        }
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
            console.log(likeValue);
        
            sum = sum + likeValue;
    }

    totalLikes.innerHTML = sum + ` <i class="fas fa-heart"></i>`;



}