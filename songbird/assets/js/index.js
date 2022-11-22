document.querySelector('.lang').addEventListener("click", function(e){
  if(e.target.innerHTML=='EN'){
    document.querySelector('.menu-list').children[0].children[0].innerHTML='Main';
    document.querySelector('.menu-list').children[1].children[0].innerHTML='Play';
    document.querySelector('.menu-list').children[2].children[0].innerHTML='Gallery';
    document.querySelector('.menu-list').children[3].innerHTML='RU';
    document.querySelector('.main-text').innerHTML='Welcome to the fascinating world of birds!';
    
    localStorage.setItem('lang', document.querySelector('.lang').innerHTML);
  }
  else{
    document.querySelector('.menu-list').children[0].children[0].innerHTML='Главная';
    document.querySelector('.menu-list').children[1].children[0].innerHTML='Играть';
    document.querySelector('.menu-list').children[2].children[0].innerHTML='Галерея';
    document.querySelector('.menu-list').children[3].innerHTML='EN';
    document.querySelector('.main-text').innerHTML='Добро пожаловать в увлекательный мир птиц!';
    
    localStorage.setItem('lang', document.querySelector('.lang').innerHTML);
  }
});

//localstorage save
if(localStorage.getItem('lang')==null){
  localStorage.setItem('lang', document.querySelector('.lang').innerHTML);
}
else{
  if(document.querySelector('.lang').innerHTML!=localStorage.getItem('lang'))
  document.querySelector('.lang').click();
}
