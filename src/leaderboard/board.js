const setButtonLeftAttr = (value) => {
	const buttonGroup = document.querySelector(".button-group");

  if(value === '50%'){
    document.querySelector('.allRank').classList.add('notVisible')
    document.querySelector('.skorPengguna').classList.remove('notVisible')
    console.log('Sebelah Kanan')
  }else if(value === '4px'){
    document.querySelector('.allRank').classList.remove('notVisible')
    document.querySelector('.skorPengguna').classList.add('notVisible')
    console.log('Sebelah Kiri')
  }
	buttonGroup.dataset.left = value;
};

const buttonClick = (value) => {
	setButtonLeftAttr(value);
};