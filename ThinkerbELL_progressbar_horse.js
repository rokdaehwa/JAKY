var T=10000;
var tbar = document.getElementById("TBar"); 
var tpointer = document.getElementById("TPointer");

function moveTBar() {
  var width = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } 
    else {
      width+=(1000/T); 
      tbar.style.width = width + '%'; 
      tpointer.style.width = width + '%';
    }
  }
}
moveTBar();
