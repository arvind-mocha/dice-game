'use strict';

var player1 = document.querySelector('#current--0');
var player2 = document.querySelector('#current--1');

var player1_current_score = 0;
var player2_current_score = 0;

var player1_score = 0;
var player2_score = 0; 


//Dice Roll

var dice_roll = function () {
    var roll = Math.ceil(Math.random() * 6);
    return roll;
};

//Players turn change

var p1_turn = function(){
    $('.player--0').addClass('player--active')
    $('.player--1').removeClass('player--active')
}

var p2_turn = function(){
    $('.player--0').removeClass('player--active')
    $('.player--1').addClass('player--active')
}

//One to switch turns

var switch_turns = function(){
    if ($('.player--0').hasClass('player--active')){
        p2_turn()
    }
    else{
        p1_turn()
    }
}

//Roll Dice button

document.querySelector('.btn--roll').addEventListener('click', () => {
    if(player1_score <= 100 || player2_score <= 100){
        var points = dice_roll();
        document.querySelector('.dice').setAttribute('src', `dice-${points}.png`);
        if (points != 1) {
            if ($('.player--0').hasClass('player--active')){
                player1_current_score += points;
                player1.innerText = player1_current_score;
            }
            else{
                player2_current_score += points;
                player2.innerText = player2_current_score;
            }
        }
        else{
            switch_turns()
            document.querySelector('.player--0 .current-score').innerHTML = 0
            document.querySelector('.player--1 .current-score').innerHTML = 0
            player1_current_score = 0
            player2_current_score = 0
        }
    }
    
});

//New game button

document.querySelector('.btn--new').addEventListener('click', () => {
    player1_score = 0
    player2_score = 0
    player1_current_score = 0
    player2_current_score = 0
    player1.innerHTML = player1_current_score
    player2.innerText = player2_current_score;
    document.querySelector('.player--0 .score').innerText = player1_score
    document.querySelector('.player--1 .score').innerText = player2_score
    p1_turn()
})

//Hold Button

document.querySelector('.btn--hold').addEventListener('click', () => {
    if(player1_score <= 100 || player2_score <= 100){
        if ($('.player--0').hasClass('player--active')){
            player1_score += player1_current_score  
            player1_current_score  = 0
            player1.innerHTML = player1_current_score
            document.querySelector('.player--0 .score').innerText = player1_score
            p2_turn()
        }else{
            player2_score += player2_current_score  
            player2_current_score = 0
            player2.innerText = player2_current_score;
            document.querySelector('.player--1 .score').innerText = player2_score
            p1_turn()
        }
    }
    victory()
});

function victory(){
    if(player1_score >= 100){
        document.querySelector('#name--0').innerText = 'Victory'
        document.querySelector('#name--1').innerText = 'lost'
    }else if(player2_score >= 100){
        document.querySelector('#name--1').innerText = 'Victory'
        document.querySelector('#name--0').innerText = 'lost'
    }
}

