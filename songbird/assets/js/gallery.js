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
  item.addEventListener('click', function playpause(e){console.log(e.target);
    document.querySelectorAll('.audio-player')[index].children[0].src=birds[Math.trunc(index/6)][index%6]['audio'];
    let audio=e.target.parentElement.parentElement.parentElement.children[0];
    audio.onloadedmetadata= function(){
      e.target.parentNode.nextElementSibling.children[1].children[1].innerHTML=sectotime(audio.duration);
      document.querySelectorAll('.timebar')[index].step=Math.floor(100/Math.floor(audio.duration)*100)/100;
    }
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
  });
});