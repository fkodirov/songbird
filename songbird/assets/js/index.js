import birdsData from './birdsData.js';
const birds=birdsData;
let audio=document.getElementById('audio-sound');
let playback=document.querySelector('.playback-button');
let currentText=document.querySelector('.current-time');
let duractionText=document.querySelector('.duraction-time');
let timebar=document.querySelector('.timebar');
let volumebar=document.querySelector('.volumebar');
let volumebefore=0.7;
let lvl=-1;
let answer;
let score=5;
let scoreAll=0;
const success=document.querySelector('#success');
const error=document.querySelector('#error');
const nextlvl=document.querySelector('.next-lvl-inner');
let questionTitle=document.querySelector('.question-title');
function random(){
  return Math.floor(Math.random() * 6);
}
function playpause(){
  if(audio.paused==true){
    audio.play();
    playback.childNodes[0].classList.remove('fa-circle-play');
    playback.childNodes[0].classList.add('fa-circle-pause');
    //playback.style.backgroundImage = "url(assets/img/pause-button.png)";
    // let myInterval=setInterval(function(){
    //   bar.value=Number(bar.value)+Number(bar.step); console.log(bar.value);
    // }, 1000);
  }
  else {
    audio.pause();
    playback.childNodes[0].classList.remove('fa-circle-pause');
    playback.childNodes[0].classList.add('fa-circle-play');
    //playback.style.backgroundImage = "url(assets/img/play-button.png)";
    // clearInterval(myInterval);
  }
}
function sectotime(sec){
  return Math.floor(Math.floor(sec) / 60).toString().padStart(2, '0') + ':' + (Math.floor(sec) % 60).toString().padStart(2, '0');
}


audio.addEventListener("timeupdate", function(){
  if(!timebar.classList.contains('changing')){
  timebar.value=Math.floor(audio.currentTime)/Math.floor(audio.duration)*100;}
  currentText.innerHTML=sectotime(audio.currentTime);
  if(audio.currentTime==audio.duration){
    document.querySelector('.playback-button').childNodes[0].classList.remove('fa-circle-pause');
    document.querySelector('.playback-button').childNodes[0].classList.add('fa-circle-play');
    currentText.innerHTML='00:00';
  }
}, false);


timebar.addEventListener("change", function(){
audio.currentTime=timebar.value*audio.duration/100;
//console.log(bar.value*audio.duration/100);
  
}, false);



timebar.addEventListener("mousedown", function(){
  timebar.classList.add("changing");  
  }, false);



timebar.addEventListener("mouseup", function(){
  timebar.classList.remove("changing"); 
  }, false);



volumebar.addEventListener("input", function(){
  audio.volume=volumebar.value;
  volumebefore=volumebar.value;
  if(volumebar.value==0){
    document.querySelector('.volume-button').childNodes[0].classList.remove('fa-volume-up');
    document.querySelector('.volume-button').childNodes[0].classList.add('fa-volume-mute');
  }
  else{
    document.querySelector('.volume-button').childNodes[0].classList.remove('fa-volume-mute');
    document.querySelector('.volume-button').childNodes[0].classList.add('fa-volume-up');
  }
  }, false);

  document.querySelector('.volume-button').addEventListener('click', function(){
    if(audio.volume!=0){
      document.querySelector('.volume-button').childNodes[0].classList.toggle('fa-volume-mute');
      document.querySelector('.volume-button').childNodes[0].classList.toggle('fa-volume-up');
      volumebefore=volumebar.value;
      audio.volume=0;
      volumebar.value=0;
    }
    else{
      audio.volume=volumebefore;
      volumebar.value=volumebefore;
      if(audio.volume!=0){
        document.querySelector('.volume-button').childNodes[0].classList.toggle('fa-volume-mute');
        document.querySelector('.volume-button').childNodes[0].classList.toggle('fa-volume-up');
      }
    }
    }, false);


window.onload = function() {
  newlvl();
  playback.addEventListener("click", playpause, false);
  answer=random();
  audio.src=birds[lvl][answer]['audio'];
  audio.onloadedmetadata= function(){
    duractionText.innerHTML=sectotime(audio.duration);
    timebar.step=Math.floor(100/Math.floor(audio.duration)*100)/100;
    timebar.value=0;
  }
  audio.volume=volumebar.value;
  
}

function addElement(elem,elemclass,inelem){
  let a=document.createElement(elem);
  a.className = elemclass;
  inelem.append(a);
}
function show(index){
document.querySelector('.answers-info').innerHTML=''; 
addElement('div','info-top',document.querySelector('.answers-info'));
  addElement('div','info-img',document.querySelector('.info-top'));
    addElement('img','',document.querySelector('.info-img'));
      document.querySelector('.info-img').childNodes[0].src=birds[lvl][index]['image'];
  addElement('div','info-top-right',document.querySelector('.info-top'));
    addElement('h4','info-title',document.querySelector('.info-top-right'));
      document.querySelector('.info-title').innerHTML=birds[lvl][index]['name'];
    addElement('p','sub',document.querySelector('.info-top-right'));
      document.querySelector('.sub').innerHTML=birds[lvl][index]['species'];
    let copyaudio=document.querySelector('.audio-player').cloneNode(true);
    copyaudio.querySelector('.volume-block').remove();
    copyaudio.querySelector('#audio-sound').src=birds[lvl][index]['audio'];
    document.querySelector('.info-top-right').append(copyaudio);
    document.querySelectorAll('.playback-button')[1].children[0].classList.remove('fa-circle-pause');
    document.querySelectorAll('.playback-button')[1].children[0].classList.add('fa-circle-play');
addElement('div','description',document.querySelector('.answers-info'));
document.querySelector('.description').innerHTML=birds[lvl][index]['description'];

let audio2=document.querySelectorAll('.audio-player')[1].childNodes[1];
let duractionText2=document.querySelectorAll('.duraction-time')[1];
let playback2=document.querySelectorAll('.playback-button')[1];
let currentText2=document.querySelectorAll('.current-time')[1];
let timebar2=document.querySelectorAll('.timebar')[1];
//let volumebar2=document.querySelectorAll('.volumebar')[1];
playback2.addEventListener("click", playpause2, false);
audio2.onloadedmetadata= function(){
  duractionText2.innerHTML=sectotime(audio2.duration);
  timebar2.step=Math.floor(100/Math.floor(audio.duration)*100)/100;
  timebar2.value=0;
}

audio2.addEventListener("timeupdate", function(){
  if(!timebar2.classList.contains('changing')){
  timebar2.value=Math.floor(audio2.currentTime)/Math.floor(audio2.duration)*100;}
  currentText2.innerHTML=sectotime(audio2.currentTime);
  if(audio2.currentTime==audio2.duration){
    document.querySelectorAll('.playback-button')[1].childNodes[0].classList.remove('fa-circle-pause');
    document.querySelectorAll('.playback-button')[1].childNodes[0].classList.add('fa-circle-play');
    currentText2.innerHTML='00:00';
  }
}, false);
  timebar2.addEventListener("change", function(){
  audio2.currentTime=timebar2.value*audio2.duration/100; 
  }, false);

  timebar2.addEventListener("mousedown", function(){
  timebar2.classList.add("changing");  
  }, false);
    
  timebar2.addEventListener("mouseup", function(){
  timebar2.classList.remove("changing"); 
  }, false); 

  function playpause2(){
    if(audio2.paused==true){
      audio2.play();
      playback2.childNodes[0].classList.remove('fa-circle-play');
      playback2.childNodes[0].classList.add('fa-circle-pause');
    }
    else {
      audio2.pause();
      playback2.childNodes[0].classList.remove('fa-circle-pause');
      playback2.childNodes[0].classList.add('fa-circle-play');
    }
  }

}


function newlvl(){
  lvl++;
  playback.addEventListener("click", playpause, false);
  answer=random();
  questionTitle.innerHTML='**********';
  document.querySelector('.question-img').children[0].src='./assets/img/bird.png';
  document.querySelector('.question-img').children[0].style.width='150px';
  document.querySelector('.question-img').children[0].style.height='150px';
  document.querySelector('.question-img').style.border='2px solid #979595c2';
  nextlvl.style.backgroundColor='#d6d2d2';
  audio.src=birds[lvl][answer]['audio'];
  audio.onloadedmetadata= function(){
    duractionText.innerHTML=sectotime(audio.duration);
    timebar.step=Math.floor(100/Math.floor(audio.duration)*100)/100;
    timebar.value=0;
  }
  audio.volume=volumebar.value;
  addElement('ul','answers-list',document.querySelector('.answers-variants'));
  for(let i=0; i<6;i++){
    addElement('li','answers-item',document.querySelector('.answers-list'));
    addElement('span','tracer',document.querySelectorAll('.answers-item')[i]);
    document.querySelectorAll('.answers-item')[i].innerHTML+=birds[lvl][i]['name'];
  }
  document.querySelector('.answers-info').innerHTML='<p style="padding: 10px; text-align: center;">Послушайте аудиодорожку.</p><p style="padding: 10px; text-align: center;">Выберите птицу из списка</p>';
  
  
  document.querySelector('.answers-list').addEventListener("click", function(e){
    if (parent !== null) {
      const index=[...e.target.closest('li').parentElement.children].indexOf(e.target)
      show(index);
      if(answer==index){
        if(error.paused!=true){
          error.pause();
          error.currentTime = 0;
        }
        if(questionTitle.innerHTML=='**********'){
        audio.pause();
        playback.childNodes[0].classList.remove('fa-circle-pause');
        playback.childNodes[0].classList.add('fa-circle-play');
        if(e.target.children[0].style.background==''){
        success.play();
        scoreAll+=score;
        e.target.children[0].style.background='#00d800';}
        }
        document.querySelector('.score-text').innerHTML=`Score: ${scoreAll}`;
        document.querySelector('.question-img').style.border='none';
        document.querySelector('.question-img').children[0].src=birds[lvl][answer]['image'];
        document.querySelector('.question-img').children[0].style.width='200px';
        document.querySelector('.question-img').children[0].style.height='155px';
        document.querySelector('.question-img').children[0].style.borderRadius='25px';
        questionTitle.innerHTML=birds[lvl][answer]['name'];
        nextlvl.style.backgroundColor='white';
        score=5;
      }
      else {
        if(questionTitle.innerHTML=='**********' && e.target.children[0].style.background==''){
        if(error.paused!=true){
          error.pause();
          error.currentTime = 0;
        }
        error.play();
        e.target.children[0].style.background='red';
        score--;
      }}
  
    }; 
  }, false);
}

nextlvl.addEventListener("click", function(){
  if(questionTitle.innerHTML=='**********' || questionTitle.innerHTML=='') return false;
  else if(lvl==5 && questionTitle.innerHTML!='**********'){
    document.querySelector('.question').style.display='none';
    document.querySelector('.answers-variants').style.display='none';
    document.querySelector('.answers-info').style.display='none';
    document.querySelector('.next-lvl').style.display='none';
    document.querySelector('.victory').style.display='flex';
    document.querySelector('.new-game').style.display='block';
    document.querySelector('.answers-inner').style.height='auto';
    document.querySelector('.victory').style.height='50vh';
    document.querySelector('.victory-text').innerHTML=`Вы набрали ${scoreAll} из 30!`;
  }
  else{
    document.querySelector('.answers-list').remove();
    document.querySelectorAll('.page')[lvl].classList.toggle('active');
    newlvl();
    document.querySelectorAll('.page')[lvl].classList.toggle('active');
    
  }
});

document.querySelector('.new-game-inner').addEventListener("click", function(){
  document.querySelector('.question').style.display='block';
  document.querySelector('.answers-variants').style.display='flex';
  document.querySelector('.answers-info').style.display='block';
  document.querySelector('.next-lvl').style.display='block';
  document.querySelector('.victory').style.display='none';
  document.querySelector('.new-game').style.display='none';
  document.querySelector('.answers-inner').style.height='';
  document.querySelector('.victory').style.height='';
  document.querySelectorAll('.page')[lvl].classList.toggle('active');
  lvl=-1;
  scoreAll=0;
  document.querySelector('.score-text').innerHTML=`Score: 0`;
  score=5;
  document.querySelector('.answers-list').remove();
  newlvl();
  document.querySelectorAll('.page')[lvl].classList.toggle('active');
});


