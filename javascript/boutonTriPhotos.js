// **************************** BOUTON TRI PHOTOS ***************************
// **************************************************************************
const sortWrapper = document.querySelector(".sortWrapper");
const sortSelect = document.querySelector(".sortWrapper__select");

// sortWrapper.addEventListener("click", function() {
//   sortSelect.classList.toggle("open");
// })

document.querySelector('.sortWrapper').addEventListener('click', function() {
  this.querySelector('.sortWrapper__select').classList.toggle('open');
})


for (const value of document.querySelectorAll(".sortWrapper__options--value")) {
  value.addEventListener('click', function() {
      if (!this.classList.contains('selected')) {
          this.parentNode.querySelector('.sortWrapper__options--value.selected').classList.remove('selected');
          this.classList.add('selected');
          this.closest('.sortWrapper__select').querySelector('.sortWrapper__select--trigger span').textContent = this.textContent;
      }
  })
}


window.addEventListener('click', function(e) {
  // const select = document.querySelector('.custom-select')
  if (!sortSelect.contains(e.target)) {
      sortSelect.classList.remove('open');
  }
});

