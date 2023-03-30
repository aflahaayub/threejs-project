const btnSiswa = document.querySelector('.btn-petunjuk .btn-siswa')
const btnGuru = document.querySelector('.btn-petunjuk .btn-guru')


btnSiswa.onclick=()=>{
  document.getElementById('content').style.height = '100%'
  document.querySelector('.content .title-content').innerHTML = 'Petunjuk Siswa'
  document.querySelector('.content .pages').classList.remove('notShow')
  document.querySelector('.content .isi-content').classList.remove('notShow')
  document.querySelector('.siswa-pages .penggunaan-0 .right-side ').innerHTML = 'Ketika pengguna membuka halaman materi, terdapat beberapa tombol yang dapat dipilih sesuai materi yang ingin pengguna pelajari. Dianjurkan untuk pengerjaan evaluasi dilakukan setelah materi satu, dua, dan tiga sudah selesai dipelajari.' //penggunaan-0 right-side -> change
  document.querySelector('.siswa-pages .penggunaan-1 .right-side').innerHTML = 'Ketika materi dibuka, pengguna dapat menggerakan sisi kamera dengan cara menggeser kanan dan kiri dengan "menekan tombol mouse" serta menekan shift pada keyboard. Sedangkan untuk handphone dan tablet, pengguna dapat "menggeser layar kaca". Selain itu, peserta didik juga dapat membesarkan maupun mengecilkan ukuran model 3D dengan cara menggunakan "scroll wheel pada mouse" jika menggunakan laptop, "pinch to zoom" menggunakan dua jari jika peserta didik mengakses media dengan handphone.Pengguna dapat menyentuh tombol bertulis angka yang ada pada layar sehingga materi dapat berlanjut sesuai dengan susunan materi.'
  document.querySelector('.siswa-pages .penggunaan-5 .right-side').innerHTML = 'Pada bagian paling akhir pada materi, tombol selanjutnya akan membawa pengguna ke fitur kuis. pengguna dapat memilih apakah akan melakukan kuis atau kembali ke halaman utama, tetapi pembelajaran pada materi akan diulang dari awal. '
  document.getElementById('changeImg').src = "/textures/Home/pages/kuis.jpg"
  document.querySelector('.siswa-pages .penggunaan-6 .right-side').innerHTML = 'Kuis memiliki 15 soal dengan pengerjaan selama 25 detik per soal. Kuis dapat dilakukan berulang kali sampai pengguna puas dengan nilai yang di dapat.'

  btnSiswa.classList.add('notShow')
  btnGuru.classList.add('notShow')
}

btnGuru.onclick=()=>{
  document.getElementById('content').style.height = '100%'
  document.querySelector('.content .pages').classList.remove('notShow')
  document.querySelector('.content .isi-content').classList.remove('notShow')
  //////
  document.querySelector('.content .title-content').innerHTML = 'Petunjuk Guru'
  document.querySelector('.siswa-pages .materi').classList.add('dis-none') //materi -> dis-none
  document.querySelector('.siswa-pages .cp').classList.add('dis-none')//cp -> dis-none
  document.querySelector('.siswa-pages .history .left-side').innerHTML = 'Halaman leaderboard merupakan fitur yang digunakan untuk melihat nilai-nilai peserta didik. Pada halaman ini terdapat nama-nama peserta didik, nilai quiz pada tiap materi, serta nilai evaluasi. Nilai tersusun berdasarkan perolehan nilai tertinggi sampai nilai terendah para peserta didik.'

  document.querySelector('.siswa-pages .penggunaan-0 .right-side').innerHTML = 'Terdapat tiga materi yang dapat diakses oleh peserta didik. Pada fitur materi juga terdapat remedial dan final. Remedial dapat guru anjurkan untuk para peserta didik yang memiliki nilai kuis kurang dari 75. Final dapat guru anjurkan untuk peserta didik setelah para peserta didik menyelesaikan kuis-kuis pada tiap materi.' //penggunaan-0 right-side -> change
  document.querySelector('.siswa-pages .penggunaan-1 .right-side').innerHTML = 'Ketika peserta didik sedang mengakses materi-materi, guru dapat membantu, menjawab pertanyaan-pertanyaan yang diajukan oleh peserta didik, serta memberikan pertanyaan sehingga guru dan peserta didik dapat melakukan diskusi bersama. Selain itu, guru juga dapat menjelaskan materi lebih dalam menggunakan objek 3D yang terdapat pada media.'//penggunaan-1 right-side -> change
  document.querySelector('.siswa-pages .penggunaan-2').classList.add('dis-none')//penggunaan-2 penggunaan-3 penggunaan-4 -> notshow
  document.querySelector('.siswa-pages .penggunaan-3').classList.add('dis-none')//penggunaan-2 penggunaan-3 penggunaan-4 -> notshow
  document.querySelector('.siswa-pages .penggunaan-4').classList.add('dis-none')//penggunaan-2 penggunaan-3 penggunaan-4 -> notshow
  document.querySelector('.siswa-pages .penggunaan-5 .right-side').innerHTML = 'Pada akhir materi, guru dapat mengajak peserta didik untuk membuka kuis. '
  //penggunaan-5 right-side -> change
  document.getElementById('changeImg').src = "/textures/Home/pages/board.jpg"
  document.querySelector('.siswa-pages .penggunaan-6 .right-side').innerHTML = 'Setelah kuis selesai dikerjakan, guru dapat memantau nilai-nilai para peserta didik di halaman leaderboard. Jika salah satu peserta didik memiliki nilai dibawah 75, guru dapat menganjurkan peserta didik tersebut untuk melakukan kuis kembali di halaman remedial. '
  // document.querySelector('.content .pages').classList.remove('notShow')
  // document.querySelector('.content .isi-content').classList.remove('notShow')
  btnSiswa.classList.add('notShow')
  btnGuru.classList.add('notShow')
}

