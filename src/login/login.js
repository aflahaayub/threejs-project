const resSignUp = document.querySelector('.res-sign-up')
const resSignIn = document.querySelector('.res-sign-in')
const signUpContainer = document.querySelector('.sign-up-container')
const signInContainer = document.querySelector('.sign-in-container')
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const form = document.getElementsByClassName('form');

signUpButton.addEventListener('click', () => {
	form[0].classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	form[0].classList.remove("right-panel-active");
});

const formSize = ()=>{
  if(window.innerWidth >= 768 ){
  resSignUp.classList.add('notVisible')
  resSignIn.classList.add('notVisible')
}else{
  resSignUp.classList.remove('notVisible')
  console.log(resSignUp.children)
  resSignUp.onclick= ()=>{
    form[0].classList.add("right-panel-active");
  }
  resSignIn.classList.remove('notVisible')
  resSignIn.onclick = ()=>{
    form[0].classList.remove("right-panel-active");
  }
  }
}

formSize()



addEventListener('resize', ()=>{
  formSize()
})