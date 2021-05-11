// ******************LIGHTBOX***************************************
// Selection des éléments requis
const gallery = document.querySelectorAll(".gallery__sample img"),
previewBox = document.querySelector(".preview-box"),
previewImg = previewBox.querySelector("img"),
closeIcon = previewBox.querySelector(".imgBox__close"),
currentImg = previewBox.querySelector(".current-img"),
totalImg = previewBox.querySelector(".total-img");
shadow = document.querySelector(".shadow");

// console.log(gallery);


window.onload = function openLightbox() {  // Une fois la fenêtre chargée
    for(let i = 0; i < gallery.length; i++) {

        let newIndex = i; // On passe i comme valeur à la variable newIndex
        let clickImgIndex;

        gallery[i].onclick = () => {

            clickImgIndex = newIndex; // On passe l'index de l'image cliquée à la variable clickImgIndex

            function preview() { 
                let selectedImgUrl = gallery[newIndex].src; // Obtenir l'url de l'image cliquée
                previewImg.src = selectedImgUrl; // Passe la source de l'image cliquée dans la lightbox
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
