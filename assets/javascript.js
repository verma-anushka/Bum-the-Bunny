const game = document.getElementById("game");
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const bunnies = document.querySelectorAll('.bunny');

let btn = document.querySelector('.button');
let lastHole;
let score;
let clicked = 0;
let gameOver = false;

let hourglass = document.getElementById("hourglass-wrapper");
let sandTopUp = document.getElementById("sand-top-up");
let sandTopDown = document.getElementById("sand-top-down");
let sandBottomUp = document.getElementById("sand-bottom-up");
let sandBottomDown = document.getElementById("sand-bottom-down");
let pour = document.getElementById("pour");
let mask = document.getElementById("mask");

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
    game.style.marginLeft = "10px"
    hourglass.classList.remove("hide");
    sandTopUp.classList.add("sand-top-up");
    sandTopDown.classList.add("sand-top-down");
    sandBottomUp.classList.add("sand-bottom-up");
    sandBottomDown.classList.add("sand-bottom-down");
    pour.classList.add("pour");
    mask.classList.add("mask");
    scoreBoard.textContent = 0;
    score = 0;
    gameOver = false;
    hop();
    setTimeout(function(){
        gameOver = true;
        btn.classList.remove("hide");
        game.style.margin = "0 auto"
        hourglass.classList.add("hide");
        sandTopUp.classList.remove("sand-top-up");
        sandTopDown.classList.remove("sand-top-down");
        sandBottomUp.classList.remove("sand-bottom-up");
        sandBottomDown.classList.remove("sand-bottom-down");
        pour.classList.remove("pour");
        mask.classList.remove("mask");
        console.log("over");
    }, 60000);
}

function hammer(event){
    clicked++;
    this.classList.remove('up');
    if( clicked === 1 ){
        score++;
        scoreBoard.textContent = score;    
    }
}

bunnies.forEach(bunny => bunny.addEventListener('click', hammer));