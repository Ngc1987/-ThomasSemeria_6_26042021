// ***********************************************************************
// ********************** COMPTEUR J'AIME ********************************
// ***********************************************************************
const like = document.querySelectorAll(".gallery__sample__descript__like");
// const likes = [like];
    
    like.forEach(like => {
      like.onclick = function classToggle() {

        // let liked = false
        // liked = true
        // liked =! liked;


        // function classToggle() {
          this.classList.toggle('liked');
          this.classList.toggle('unliked');
      }
      // document.querySelector('#div').addEventListener('click', classToggle);
      
        if(this.className == "liked") {
          // like.innerText += 1 ;
          // liked = true;
          like.classList.add("liked");
          like.classList.remove("unliked");
          like.style.fontSize = "20px";
          
          

        } else if (this.className == "unliked") {
          like.innerText --;
          // liked = false;
          like.classList.add("unliked");
          like.classList.remove("liked");
          like.style.fontSize = "30px";


          // switch (this.classList) {

          //   case "unliked":
              // like.innerText ++ ;
          //     // liked = true;
          //     like.classList.add("liked");
          //     like.classList.remove("unliked");
          //     break;
            
          //   case "liked":

          //     like.innerText --;
          //     // liked = false;
          //     like.classList.add("unliked");
          //     like.classList.remove("liked");
          //     break;

          //     }


        }
      
      // }
    });
    


console.log(like);

