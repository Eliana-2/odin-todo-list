let menuIsHidden = true;

function showNav() {
  document.querySelector('.cover').style.visibility = 'visible';
  document.querySelector('.main').classList.add('main_mobile');
  document.querySelector('.sidebar').classList.add('sidebar_mobile');
}

function hidenav() {
  document.querySelector('.main').classList.remove('main_mobile');
  document.querySelector('.sidebar').classList.remove('sidebar_mobile');
  setTimeout(() => {
    document.querySelector('.cover').style.visibility = 'hidden';
  }, 499);
}

function menuListener() {
  if(menuIsHidden) {
    showNav();
  }
  else {
    hidenav();
  }
  menuIsHidden = !menuIsHidden;
}

export {menuListener}