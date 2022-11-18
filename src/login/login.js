// import './login.css'

const resSignUp = document.querySelector('.res-sign-up')
const resSignIn = document.querySelector('.res-sign-in')
const signUpContainer = document.querySelector('.sign-up-container')
const signInContainer = document.querySelector('.sign-in-container')
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const mediaQuery = window.matchMedia('(max-width: 768px)')

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

if(mediaQuery.matches){
  resSignUp.classList.remove('notVisible')
  resSignUp.onclick= ()=>{
    container.classList.add("right-panel-active");
    // container.style.transform = 'rotateY(180deg)'
    // container.style.transition = 'transform 0.6s'
    // signUpContainer.style.transform = 'rotateY(180deg)'
    // signInContainer.style.display = 'none'
  }

  resSignIn.classList.remove('notVisible')
  resSignIn.onclick = ()=>{
    container.classList.remove("right-panel-active");
    // container.style.transform = 'rotateY(0deg)'
    // container.style.transition = 'transform 0.6s'
    // signInContainer.style.transform = 'none'
    // signUpContainer.style.display = 'none'
  }
}else{
  document.querySelector('.switch-in').classList.add('notVisible')
  document.querySelector('.switch-up').classList.add('notVisible')
  // resSignIn.classList.add('notVisible')
  // resSignUp.classList.add('notVisible')
}

// when create account click, transform rotate y 180deg, transition: transform 0.6s