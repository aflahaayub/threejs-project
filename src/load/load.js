import './load.css'
const text = document.querySelector('.sec-text')
const textLoad = ()=>{
  setTimeout(()=>{
    text.textContent = "Experience"
  },0)
  setTimeout(()=>{
    text.textContent = "Knowledge"
  },4000)
  setTimeout(()=>{
    text.textContent = "Addiction"
  },8000)
}
textLoad()
setInterval(textLoad, 12000)

const loadingBar = ()=>{
  var i = 0;
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 75);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }

      if(width===100){
        document.querySelector('.btn-log').classList.add('ended')
      }
    }
  }
}

loadingBar()