var level = 0;
var check = false;
var gameSequence = [];
var userSequence = [];
var colours = ["red","blue","green","yellow"];

function reset(){
    level = 0;
    check = false;
    gameSequence = [];
    userSequence = [];
}

$(document).keydown(keyPressed);
function keyPressed(){
    if(!check){
        check = true , nextSequence();
    }
}

function checkSequence(currLevel){
    if(gameSequence[currLevel] === userSequence[currLevel]){
        if(currLevel === level - 1)
            setTimeout(nextSequence,1000) , userSequence = [];
    }
    else{
        $("h1").text("Game Over Press A Key To Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000);
        var audio = new Audio("wrong.mp3");
        audio.play();
        reset();
    }
}

function nextSequence(){
    level ++ ;
    $("h1").text("Level "+level);
    var randomIndex = Math.floor(Math.random()*4);
    var randomChosenColor = colours[randomIndex];
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);
    gameSequence.push(randomChosenColor); 
    console.log(gameSequence);
}

$(".DIV").click(clickHandler);
function clickHandler(){
    // console.log(this);
    var userChosenColor = this.id;
    makeSound(userChosenColor);
    animePressed(userChosenColor);
    userSequence.push(userChosenColor);
    checkSequence(userSequence.length - 1);
    console.log(userSequence);
}



function makeSound(colour){
    var audio = new Audio(colour+".mp3");
    audio.play();
}
function animePressed(colour){
    $("#"+colour).addClass("pressed");
    setTimeout(function(){
        $("#"+colour).removeClass("pressed");
    },500);
}

