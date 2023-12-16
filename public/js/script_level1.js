---
---

var moves=0;
var qposx=1;
var qposy=6;

var perfect={};

perfect['1-1']='8-1';
perfect['1-2']='6-2';
perfect['1-3']='7-3';
perfect['1-4']='3-4';
perfect['1-5']='2-5';
perfect['1-6']='3-4';
perfect['1-7']='6-2';
perfect['1-8']='8-1';

perfect['2-1']='8-1';
perfect['2-2']='6-2';
perfect['2-3']='7-3';
perfect['2-4']='3-4';
perfect['2-5']='3-4';
perfect['2-6']='5-6';
perfect['2-7']='8-1';
perfect['2-8']='7-3';

perfect['3-1']='8-1';
perfect['3-2']='6-2';
perfect['3-3']='7-3';
perfect['3-4']='4-4';
perfect['3-5']='3-4';
perfect['3-6']='8-1';
perfect['3-7']='7-3';
perfect['3-8']='5-6';


perfect['4-1']='8-1';
perfect['4-2']='6-2';
perfect['4-3']='7-3';
perfect['4-4']='6-2';
perfect['4-5']='8-1';
perfect['4-6']='5-6';
perfect['4-7']='5-6';
perfect['4-8']='4-7';


perfect['5-1']='8-1';
perfect['5-2']='6-2';
perfect['5-3']='6-2';
perfect['5-4']='8-1';
perfect['5-5']='7-3';
perfect['5-6']='5-5';
perfect['5-7']='5-6';
perfect['5-8']='5-6';


perfect['6-1']='8-1';
perfect['6-2']='7-2';
perfect['6-3']='8-1';
perfect['6-4']='7-3';
perfect['6-5']='6-2';
perfect['6-6']='6-2';
perfect['6-7']='6-2';
perfect['6-8']='6-2';


perfect['7-1']='8-1';
perfect['7-2']='8-1';
perfect['7-3']='7-2';
perfect['7-4']='7-3';
perfect['7-5']='7-3';
perfect['7-6']='7-3';
perfect['7-7']='7-3';
perfect['7-8']='7-3';


perfect['8-2']='8-1';
perfect['8-3']='8-1';
perfect['8-4']='8-1';
perfect['8-5']='8-1';
perfect['8-6']='8-1';
perfect['8-7']='8-1';
perfect['8-8']='8-1';


(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  document.addEventListener('click', function(e) {
    var target = e.target;

    console.log(target)
    console.log(target.tagName)
    if(target.tagName=='TD' && moves%2==0){
      console.log(target.id)
      playerMove(target.id)
      return;
    }

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
  }, false);
})(document);

function placeQueen(){
  let st=`${qposx}-${qposy}`
  document.getElementById(st).innerHTML=String.fromCodePoint(0x265B);
}

function removeQueen(){
  let st=`${qposx}-${qposy}`
  document.getElementById(st).innerHTML="";
}

function createGrid(){
  console.log(document)
  let loader = document.getElementById('loader') 
  loader.classList.add("hidden");
  let container = document.getElementById('chess-board');
  for (let i = 1; i <= 8; i++) {
    let elementRow=document.createElement('tr');
    for (let j = 1; j <= 8; j++) {
      let element = document.createElement('td');
      element.className= ((i+j)%2==0) ? "dark" : "light";
      element.id=`${i}-${j}`
      // element.onclick='moveQueen(this.id)'
      elementRow.appendChild(element);
    }
    container.appendChild(elementRow)
  };
  placeQueen();
}
// console.log(container);

function gameEnd(){

  return qposx==8 && qposy==1;
}

function userWon(){

  return moves%2!=0;
}

function isValidMove(x,y){
  if(x<qposx || y>qposy){
    return false;
  }

  if(x==qposx && y==qposy){

    return false;
  }

  if(x==qposx || y==qposy){

    return true;
  }
  return x-qposx==qposy-y;
}

async function moveQueen(id){

  let x = parseInt(id.split('-')[0])
  let y = parseInt(id.split('-')[1])
  
  if(!isValidMove(x,y)){
    return false
  }

  console.log(x,y)

  removeQueen();
  qposx=x
  qposy=y
  placeQueen();
  moves++;

  console.log(moves)
  await new Promise(r => setTimeout(r, 200));

  if(gameEnd()){

    if(userWon()){
      if (window.confirm('Nice work there! You won! Let\'s move on to the next level')){
        window.location.href=`{{ site.baseurl }}/smokey`;
      };
    }else{
      if (window.confirm('Close one there! Let\s try one more time')){
        window.location.href=`{{ site.baseurl }}/start`;
      };
    }
  }
  return true
}

async function opponentMove(){

  let element = document.getElementById("loader");
  console.log(loader)
  element.classList.remove("hidden");
  await new Promise(r => setTimeout(r, 1000));
  let curr_id=`${qposx}-${qposy}`
  moveQueen(perfect[curr_id])
  element.classList.add("hidden");
}

async function playerMove(id){

  if(await moveQueen(id) && !gameEnd()){
    await opponentMove();
  }
}
