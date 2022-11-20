let audio=document.getElementById('audio-sound');
let playback=document.querySelector('.playback-button');
let currentText=document.querySelector('.current-time');
let duractionText=document.querySelector('.duraction-time');
let timebar=document.querySelector('#timebar');
let volumebar=document.querySelector('#volumebar');
let volumebefore=0.7;

function playpause(){
  if(audio.paused==true){
    audio.play();
    document.querySelector('.playback-button').childNodes[0].classList.remove('fa-circle-play');
    document.querySelector('.playback-button').childNodes[0].classList.add('fa-circle-pause');
    //playback.style.backgroundImage = "url(assets/img/pause-button.png)";
    // let myInterval=setInterval(function(){
    //   bar.value=Number(bar.value)+Number(bar.step); console.log(bar.value);
    // }, 1000);
  }
  else {
    audio.pause();
    document.querySelector('.playback-button').childNodes[0].classList.remove('fa-circle-pause');
    document.querySelector('.playback-button').childNodes[0].classList.add('fa-circle-play');
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
duractionText.innerHTML=sectotime(audio.duration);
audio.volume=volumebar.value;
timebar.step=Math.floor(100/Math.floor(audio.duration)*100)/100;
playback.addEventListener("click", playpause, false);
}


