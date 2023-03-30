
const score = [user.quizOneScore, user.quizTwoScore, user.quizThreeScore, user.evaluationScore]

let materiTwoBtn = document.querySelector('.materiTwo')
let materiThreeBtn = document.querySelector('.materiThree')
let evaluasiBtn = document.querySelector('.evaluasi')
// let notif = document.querySelector('.alertNotice')

if(user.quizOneScore > 75){
    console.log('lanjut materi 2')
    materiTwoBtn.href = '/materiTwo.html'
}

if(user.quizTwoScore > 75){
    console.log('lanjut materi 2')
    materiThreeBtn.href = '/materiThree.html'
}

if(user.quizThreeScore > 75){
    console.log('lanjut evaluasi')
    evaluasiBtn.href = '/evaluasi'
}

materiTwoBtn.onclick = ()=>{
    // document.querySelector('.alert').classList.remove('notVisible')
    if(user.quizOneScore !== 0 && user.quizOneScore < 76){
        alert('Kamu harus remedial terlebih dahulu untuk melanjutkan ke materi selanjutnya.')
        // notif.innerHTML = 'Kamu harus remedial terlebih dahulu untuk melanjutkan ke materi selanjutnya.'
    }else if(user.quizOneScore === 0){
      alert('Silahkan lakukan kuis 1 terlebih dahulu!')
        // notif.innerHTML ='Silahkan lakukan kuis 1 terlebih dahulu!'
    }
}
materiThreeBtn.onclick = ()=>{
  // document.querySelector('.alert').classList.remove('notVisible')
    if(user.quizTwoScore!== 0 && user.quizTwoScore < 76){
        // notif.innerHTML = 'Kamu harus remedial terlebih dahulu untuk melanjutkan ke materi selanjutnya.'
        alert('Kamu harus remedial terlebih dahulu untuk melanjutkan ke materi selanjutnya.')
    }else if(user.quizTwoScore === 0){
      alert('Silahkan lakukan kuis 2 terlebih dahulu!')
        // notif.innerHTML ='Silahkan lakukan kuis 2 terlebih dahulu!'
    }
}
evaluasiBtn.onclick = ()=>{
  // document.querySelector('.alert').classList.remove('notVisible')
    if(user.quizThreeScore!== 0 && user.quizThreeScore < 76){
        // notif.innerHTML = 'Kamu harus remedial terlebih dahulu untuk melanjutkan ke materi selanjutnya.'
        alert('Kamu harus remedial terlebih dahulu untuk melanjutkan ke materi selanjutnya.')
    }else if(user.quizThreeScore === 0){
      alert('Silahkan lakukan kuis 3 terlebih dahulu!')
        // notif.innerHTML ='Silahkan lakukan kuis 3 terlebih dahulu!'
    }
}