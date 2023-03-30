const resSignUp = document.querySelector('.res-sign-up')
const resSignIn = document.querySelector('.res-sign-in')
const signUpContainer = document.querySelector('.sign-up-container')
const signInContainer = document.querySelector('.sign-in-container')
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

addEventListener('resize', ()=>{
  console.log(window.innerWidth)
  if(window.innerWidth >= 768 ){
    resSignUp.classList.add('notVisible')
    resSignUp.onclick= ()=>{
      container.classList.add("right-panel-active");
    }

    resSignIn.classList.add('notVisible')
    resSignIn.onclick = ()=>{
      container.classList.remove("right-panel-active");
    }
  }else{
    document.querySelector('.switch-in').classList.remove('notVisible')
    document.querySelector('.switch-up').classList.remove('notVisible')
  }
})

// when create account click, transform rotate y 180deg, transition: transform 0.6s