let kuisOne = document.getElementsByClassName('detail')[0].children[0]
let kuisTwo = document.getElementsByClassName('detail')[0].children[1]
let kuisThree = document.getElementsByClassName('detail')[0].children[2]
let evaluation = document.getElementsByClassName('detail')[0].children[3]

const scors = [kuisOne, kuisTwo, kuisThree, evaluation]
for(let i = 0; i < scors.length; i++){
  let num = parseInt(scors[i].innerHTML)
  if(num !== 0 && num < 75 ){
    scors[i].style.color = 'red'
    if(scors[i] === kuisOne){
      const btn = document.createElement('a')
      const text = document.createTextNode('Kuis Satu')
      btn.classList.add('btn-remed')
      btn.appendChild(text)
      document.getElementById('notice').appendChild(btn)
      btn.href= '/quizOne'
    }else if(scors[i] === kuisTwo){
      const btn = document.createElement('a')
      const text = document.createTextNode('Kuis Dua')
      btn.setAttribute('href', '/quizTwo')
      btn.classList.add('btn-remed')
      btn.appendChild(text)
      document.getElementById('notice').appendChild(btn)
    }else if(scors[i] === kuisThree){
      const btn = document.createElement('a')
      const text = document.createTextNode('Kuis Tiga')
      btn.setAttribute('href', '/quizThree')
      btn.classList.add('btn-remed')
      btn.appendChild(text)
      document.getElementById('notice').appendChild(btn)
    }else{
      const btn = document.createElement('a')
      const text = document.createTextNode('Evaluasi')
      btn.setAttribute('href', '/evaluasi')
      btn.classList.add('btn-remed')
      btn.appendChild(text)
      document.getElementById('notice').appendChild(btn)
    }
  }
}

let allScors = kuisOne.innerHTML + kuisTwo.innerHTML + kuisThree.innerHTML + evaluation.innerHTML
if(parseInt(allScors) === 0){
    const p = document.createElement('p')
    const text = document.createTextNode('Silahkan memulai kuis dan evaluasi terlebih dahulu.')
    p.appendChild(text)
    document.getElementById('notice').appendChild(p)
}


  // else if(arr.length === 4 && ){
  //   const p = document.createElement('p')
  //   const text = document.createTextNode('Kamu tidak memiliki nilai remedial.')
  //   p.appendChild(text)
  //   document.getElementById('notice').appendChild(p)
  // }




// for(let scor of scors){
//   console.log(scor)
//   let num = parseInt(scor.innerHTML)
//   if(num !== 0 && num < 75 ){
//     scor.style.color = 'red'
//   }
// }
