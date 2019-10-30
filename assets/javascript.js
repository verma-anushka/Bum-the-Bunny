// var holes = [];

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const bunnies = document.querySelectorAll('.bunny');

let btn = document.querySelector('.button');
let lastHole;
let score;
let clicked = 0;
let gameOver = false;

// $(document).ready(function() {
//     var btn = $(".button");
//     btn.click(function() {
//       btn.toggleClass("paused");
//       return false;
//     });
//   });



function getTime(minTime, maxTime){
    return Math.floor(Math.random() * (maxTime - minTime) + minTime);
}

function selectHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    if( hole === lastHole ){
        return selectHole(holes);
    }
    lastHole = hole;
    return hole;
}

function hop(){
    const time = getTime(500, 1500);
    const hole = selectHole(holes);
    hole.classList.add('up');

    clicked = 0;
    setTimeout(() => {
        hole.classList.remove('up');
        if(!gameOver){
            hop();
        }
    }, time);
}

function startGame(){
    // btn.classList.toggle("paused");
    btn.classList.add("hide");
    scoreBoard.textContent = 0;
    score = 0;
    gameOver = false;
    hop();
    setTimeout(() => gameOver = true, 60000);
}

function hammer(event){
    clicked++;
    this.classList.remove('up');
    // if(!event.isTrusted){
    //     return;
    // }
    if( clicked === 1 ){
        score++;
        scoreBoard.textContent = score;    
    }
}

bunnies.forEach(bunny => bunny.addEventListener('click', hammer));