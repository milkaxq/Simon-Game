buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
gameStarted = false;
level = 0;

$(document).keypress(function (e) {
  if (gameStarted === false) {
    gameStarted = true;
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  level += 1;
}

$(".btn").click(function () {
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] != userClickedPattern[currentIndex]) {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
  if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
