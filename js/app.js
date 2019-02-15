
let dCards = document.getElementsByClassName("card");
let cards = [...dCards];
let cardOp = [];
let cardMatch = [];

let moves = 0;
let second = 0;
let minute = 0;
let hour = 0;
let timer = document.querySelector(".timer");
let interval;

let modal = document.getElementById("modal");
let close = document.getElementById("close");

let congratulations = document.querySelector(".congratulations");

document.body.onload = game();

/* This is main function */
function game() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
    resetTimer();
    /* resoring cards*/
    cards.sort((a, b) => .5 - Math.random());
    reset();
    /* Adding eventListenres */
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', displayCard);
        cards[i].addEventListener('click', cardOpen);
    }
    /* Closing Modal Box */
    close.onclick = function() {
        modal.style.display ="none";
    }
}


/* */
function reset() {
    document.getElementById("deck").innerHTML = ""        
    Array.prototype.forEach.call(cards, (item) => {    
        item.classList.remove('match', 'open', 'show','disable');
        document.getElementById("deck").appendChild(item)});
    cardMatch = [];
    cardOp = [];
}
/* */
function resetTimer() {
    second = 0;
    minute = 0;
    hour = 0;
    clearInterval(interval);
    timer.innerHTML = second + " secs " + minute + " mins";
}
/* */
function displayCard() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disable');
}

/* */
function cardOpen() {
    cardOp.push(this);
    if (cardOp.length === 2) {
        countMoves();
        if (cardOp[0].type === cardOp[1].type) {
            addMatched();
            match(); 
        }
        else 
            unmatch();
    }        
}
/* */
function match() {
    disableCards();
    setTimeout(function() {
        Array.prototype.forEach.call(cardOp, (item) => {
            item.classList.add('match');
            item.classList.remove('open', 'show');
        }); 
        cardOp = [];  
        if (cardMatch.length != 16) 
            enableCards();
        else congratulatYou();      
    }, 1000);   
}    
/* */
function congratulatYou() {
    clearInterval(interval);
    document.querySelector(".winTime").innerHTML = second + " secs " + minute + " mins";
    document.querySelector(".winMoves").innerHTML = moves;
    /* Opening Modal Box */
    modal.style.display = "block";
        
}
/* */
function unmatch() {
    Array.prototype.forEach.call(cardOp, (item) => {
        item.classList.add('unmatch');
    });   
    disableCards();
    setTimeout(function() {
        Array.prototype.forEach.call(cards, (item) => {
            item.classList.remove('open', 'show', 'disable', 'unmatch');
        });    
        enableCards();
    }, 1100);
   cardOp = [];
}
/* */
function disableCards() {
    Array.prototype.forEach.call(cards, (item) => {
        item.classList.add('disable');
    });
}
/* */
function enableCards() {
    Array.prototype.forEach.call(cards, (item) => {
        item.classList.remove('disable');
    });
}
/* */
function countMoves() {
    moves++;
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        interval = setInterval(myTimer, 1000);
    }   
}
/* */
function myTimer() {
    second++;
    if (second == 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }
    timer.innerHTML = second + "secs " + minute + " mins";
    document.querySelector('.moves').innerHTML = moves;
}
/* */
function addMatched() {
    Array.prototype.forEach.call(cardOp, (item) => {
        cardMatch.push(item)
    })
}
