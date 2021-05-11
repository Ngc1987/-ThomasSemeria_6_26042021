// ***********************************************************************
// ********************** COMPTEUR J'AIME ********************************
// ***********************************************************************
const like = document.querySelectorAll(".gallery__sample__descript--like");

// const likes = [like];
    
    like.forEach(like => {
      like.onclick = function classToggle() {

        // let liked = false
        // liked = true
        // liked =! liked;

        // this.classList.contains
        // function classToggle() {
          this.classList.toggle('liked');
          this.classList.toggle('unliked');

          if(this.classList.contains("liked")) {
            like.innerText ++ ;
            // liked = true;
            like.classList.add("liked");
            like.classList.remove("unliked");
            nextElementSibling.classList.add("liked");
            nextElementSibling.classList.remove("unliked");
            
            
  
          } else if (this.classList.contains("unliked")) {
            like.innerText --;
            // liked = false;
            like.classList.add("unliked");
            like.classList.remove("liked");
            nextElementSibling.classList.add("unliked");
            nextElementSibling.classList.remove("liked");
      }
      // document.querySelector('#div').addEventListener('click', classToggle);
      
        


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

