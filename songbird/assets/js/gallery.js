import birdsData from './birdsData.js';
const birds=birdsData;
let count=-1;
for(let i=0;i<birds.length;i++){
  for(let j=0;j<birds[i].length;j++){
    count++;
    let birdcard=document.querySelector('.bird-card').cloneNode(true);
    document.querySelector('.gallery').append(birdcard);
    if(i==0 && j==0)document.querySelector('.bird-card').remove();
    document.querySelectorAll('.info-img')[count].childNodes[0].src=birds[i][j]['image'];
    document.querySelectorAll('.info-title')[count].innerHTML=birds[i][j]['name'];
    document.querySelectorAll('.sub')[count].innerHTML=birds[i][j]['species'];
    //document.querySelectorAll('.audio-player')[count].children[0].src=birds[i][j]['audio'];
    document.querySelectorAll('.description')[count].innerHTML=birds[i][j]['description'];
  }
}
function sectotime(sec){
  return Math.floor(Math.floor(sec) / 60).toString().padStart(2, '0') + ':' + (Math.floor(sec) % 60).toString().padStart(2, '0');
}


const allaudio = document.querySelectorAll('.audio-player');
allaudio.forEach((item,index) => {
  item.addEventListener('click', function playpause(e){
    if(!document.querySelectorAll('.audio-player')[index].children[0].src.includes('.mp3')){
    document.querySelectorAll('.audio-player')[index].children[0].src=birds[Math.trunc(index/6)][index%6]['audio'];}
    let audio=e.target.parentElement.parentElement.parentElement.children[0];
    audio.onloadedmetadata= function(){
      e.target.parentNode.nextElementSibling.children[1].children[1].innerHTML=sectotime(audio.duration);
      document.querySelectorAll('.timebar')[index].step=Math.floor(100/Math.floor(audio.duration)*100)/100;
    }
      if(e.target.tagName=='I'){
    if(audio.paused==true){
      audio.play();
      e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-circle-pause');
    }
    else {
      audio.pause();
      e.target.classList.remove('fa-circle-pause');
      e.target.classList.add('fa-circle-play');
    }
    }
    audio.addEventListener("timeupdate", function(){
      if(!document.querySelectorAll('.timebar')[index].classList.contains('changing')){
        document.querySelectorAll('.timebar')[index].value=Math.floor(audio.currentTime)/Math.floor(audio.duration)*100;}
        document.querySelectorAll('.current-time')[index].innerHTML=sectotime(audio.currentTime);
      if(audio.currentTime==audio.duration){
        document.querySelectorAll('.playback-button')[index].childNodes[0].classList.remove('fa-circle-pause');
        document.querySelectorAll('.playback-button')[index].childNodes[0].classList.add('fa-circle-play');
        document.querySelectorAll('.current-time')[index].innerHTML='00:00';
      }
    }, false);



    document.querySelectorAll('.timebar')[index].addEventListener("change", function(){
      audio.currentTime=document.querySelectorAll('.timebar')[index].value*audio.duration/100;
      //console.log(bar.value*audio.duration/100);
        
      }, false);
      
      
      
      document.querySelectorAll('.timebar')[index].addEventListener("mousedown", function(){
        document.querySelectorAll('.timebar')[index].classList.add("changing");  
        }, false);
      
      
      
        document.querySelectorAll('.timebar')[index].addEventListener("mouseup", function(){
          document.querySelectorAll('.timebar')[index].classList.remove("changing"); 
        }, false);
  
  
  
  });











});
