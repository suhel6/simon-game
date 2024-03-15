//to check if the game is on=1 or off=0
var playing = 0;
//index is the level of the game
var index = 0;
//array to store the values of the previous inputs
var array = new Array(25).fill("null");
var colour = ['green', 'red', 'yellow', 'blue'];
//position of the player
var followup = 0;




//disabling the keyboard once the game starts i.e., at playing = 1
$(document).keydown(function (event) {
    if (playing == 1) {
        event.preventDefault();
    }
});


//game starts
$(document).keypress(function () {
    playing = 1;
    index = 0;
    setTimeout(function () {
        generate(index);
    }, 500);
});

$("h1").click(function () {
    if(playing==0){
    playing = 1;
    index = 0;
    setTimeout(function () {
        generate(index);
    }, 500);}
});



function generate(i) {
    index++;
    if (index == 10) {
        win();                                          //finishing level 10, completes the game
    }
    else {
        $("h1").text("Level " + (i + 1));               //changing the heading to the current level
        var latest = Math.floor(Math.random() * 4);     //generating random number from 0-3 corresponding to the button
        array[i] = latest;                              //setting the array with new element of the pattern
        setTimeout(function () {
            ring(colour[latest]);
        }, 1000);                                       //ringing and modifying the css of the new element
    }
}



//function associated with the user activity
$(".btn").click(function () {
    if (playing == 1) {                                 //runs only when game is on
        var buttonid = $(this).attr("id");              //getting the id of the element which got pressed
        var $this = $(this);                            //selects the element that got clicked
        $this.addClass("pressed");                      //adding animation on the button
        var go = new Audio(buttonid + '.mp3');
        go.play();                                      //playing the corresponding audio
        setTimeout(function () {
            $this.removeClass("pressed");               //removing the animation after 500ms
        }, 100);
        if (colour[array[followup]] == buttonid) {      //checking if the clicked element followed the pattern or not
            followup++;                                 //increasing the index reached by player by one
            if (followup == index) {                    //if the player completes the level, level is increased by one and
                followup = 0;                           //followup goes to 0 i.e., the begining
                generate(index);                        //we run the random button generator again
            }
        }
        else {
            gameOver();                                 //if the followup done by the player is not in order, game is over
        }
    }
});


//game over function sets all values to their initial value
function gameOver() {
    array.fill("null");
    $("body").addClass("game-over");                     //adding animation
    setTimeout(function () {
        $("body").removeClass("game-over");              //removing animatiion
    }, 200);
    var dead = new Audio("wrong.mp3");
    dead.play();                                         //playing error song
    $("h1").html("YOUR SCORE: " + (index - 1) + "<br> press any key to restart");
    playing = 0;
    followup = 0;
}


//win function modifies values to their initial value
function win() {
    $("h1").html("YOU WON<br> press any key to restart");
    array.fill("null");
    playing = 0;
}


//plays the music and changes the animation of button having a class of colourClass
function ring(colourClass) {
    $('.' + colourClass).css('visibility', 'hidden');
    setTimeout(function () {
        $('.' + colourClass).css('visibility', 'visible')
    }, 100);

    var song = new Audio(colourClass + '.mp3');
    song.play();
}
