$(document).ready(function() {
  console.log("test");

var modal = $("#myModal");
var btn = $("#myBtn");
var span = $(".close");
var timeOutID;
var timeOutID2;

$(window).load(function() {
  modal.css("display", "block");
})

btn.on("click", function(){
  modal.css("display", "block");
})

span.on("click", function() {
  modal.css("display", "none");
})

// global variable contains questions and answer key values
  var questions = [
    {question:"<p> Some knave steps up and compares your smell to old milk. You dimly recall a stinger to throw back at him from Henry IV Part 1. </p> <br> <p> Thou art as _____ as butter.</p>",
    answers: ["stinky","odious","farty","runny", "fat"],
    answerKey: "fat",
    questionTime: 70
    },
    {question: "<p>Two rapscallions tell you that you have the brains and prowess of a field mouse.</p> <br> <p> What creature does Shakespeare use to describe those who lie venomously and are generally nasty buggers?</p>",
    answers: ["A snake", "An adder", "A stingfish", "A snapping turtle", "A toad"],
    answerKey: "A toad",
    questionTime: 50
  },
    {question: "<p>From the back of the crowd, you hear 'You liver pated lily! You lascivious leech! You little--'. <br> <p> You cut him off with this Shakespearean gem from All's Well That Ends Well: Your ___ breeds mites, much like ___.</p>",
    answers: ["breath/rotten flesh", "humours/sewage", "crouch/stale bread", "face/manure", "virginity/cheese",],
    answerKey: "virginity/cheese",
    questionTime: 50
  },
    {question: "<p>A thin woman sidles up to you and whispers in your ear something indecent about your mother.</p> <br><p>You have to spit something back, but your mind is blank. What would Titus Andronicus say? </p>",
    answers: ["Thy mother is an elderberry whore", "Avaunt! You spittewattle arse-licker!", "Ho-thou was't fathered by an infected newt", "Feast on my trousers, codswallow", "Villain, I have done thy mother"],
    answerKey: "Villain, I have done thy mother",
    questionTime: 40
  },
    {question: "<p> The crowd is calling for a Timon of Athens insult! Timon of Athens? Is that even a Shakespearean play? </p> <br> <p> It's tim-on to spit some Athenian insults! What do you say? </p>",
    answers: ["Methink’st thou art a general offence and every man should beat thee", "On my knee I give heaven thanks that I am not like to thee", "Thou halfpenny purse of wit, thou pigeon egg of discretion", "Stinkwattle! Odious foot-monger! Bearer of bile!", "I do wish thou were a dog, that I might love thee something"],
    answerKey: "I do wish thou were a dog, that I might love thee something",
    questionTime: 40
},
  {question: "<p> A hush comes over the crowd, and a wild Falstaff appears. Considered a Shakespearean put-down master, Falstaff is known for stringing insult onto insult until either he or his opponent collapse.</p><br><p> His only known weakness are insults he hasn't heard before (i.e. NOT FROM PLAYS THAT HE IS IN). What do you say?! Quick! He's about start!</p>",
  answers: ["Peace, ye fat guts", "Thou scullion! Thou rampallion!", "Thou whoreson obscene greasy tallow-catch!", "You sweat to death and lard the lean earth you walk upon", "Thou roguish unchin-snouted common-kissing canker-blossom!"],
  answerKey: "Thou roguish unchin-snouted common-kissing canker-blossom!",
  questionTime: 35
  }
  ]

var currentQuestion = 0;
var numPoints = 0;

var startTime = questions[currentQuestion].questionTime;
var interval;
var endTime = 0;

function timer() {

  if(endTime < startTime) {
    // subtracts a second from the starttime
    startTime -= 1;
    $("#timeCounter").html("You have " + startTime + "s left.");
  } else {
    clearInterval(interval);
    $("#timeCounter").html("<p>Time is out! </p>");
    setTimeout(resetGame, 2000);
  }

}


function timerGo() {
  // sets the timer going on a set interval
  interval = setInterval(timer, 1000);

};



function loadQuestion() {
  // loads the first question in the array
  $(".questions").html(questions[currentQuestion]["question"]);
  $("#pointCounter").html("0 points");
  // launches the timer
  timerGo();
}


function loadAnswers() {
  // loads the first answer set in the array
  $("ul").each(function() {
    for(i=0;i<questions[0].answers.length;i++){
      $("<li/>").appendTo(this);
      $("li").eq(i).html(questions[currentQuestion].answers[i]);
    }

  })
  // shuffles the lis so the answers are not always listed in the same order
  $("ul li").shuffle();
}


// this function gives the user points based upon the amount of time that has passed
function pointsGoUp() {
  if(startTime >= questions[currentQuestion].questionTime - (questions[currentQuestion].questionTime / 3)) {
  numPoints += 20;
} else if (startTime >= questions[currentQuestion].questionTime - ((questions[currentQuestion].questionTime / 3)*2) && startTime < questions[currentQuestion].questionTime - (questions[currentQuestion].questionTime / 3)) {
    numPoints += 10;
  } else {
    numPoints += 5;
  }
  $("#pointCounter").html(numPoints + " points");
}

// this function makes the points go down
function pointsGoDown() {
  numPoints -= 10;
  $("#pointCounter").html(numPoints + " points");
}

// loads the first question
    loadQuestion();
    loadAnswers();


    //  loads next Trivia question and answer set by iterating on current Question;
    function loadNextTrivia() {
      currentQuestion +=1;
      $(".questions").html(questions[currentQuestion]["question"]);
      clearInterval(interval);
      startTime = questions[currentQuestion].questionTime;
      timerGo();
      $("ul").each(function() {
        for(i=0;i<questions[currentQuestion].answers.length;i++){
          $("li").eq(i).show();
          $("li").eq(i).html(questions[currentQuestion].answers[i]);
        }
      })
      $("ul li").shuffle();
    };




// fades out the right or wrong answer prompt;
function fade_out() {
  $("#answer").html("");
}

// function to reset the game
function resetGame() {
  clearInterval(interval);
  currentQuestion = 0;
  numPoints = 0;
  loadQuestion();
  for(i=0;i<5;i++){
    $("li").eq(i).show();
    $("li").eq(i).html(questions[currentQuestion].answers[i]);
  }
}

function shakespearePop () {
var shakesText = ["<p>Thou art a beast!</p>", "<p>Way to lay the smacketh down!</p>", "<p>Thine insults are dope!</p>"];
var randNumber = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  $(".shakespeareText").html(shakesText[randNumber]);
  $(".shakespeare").addClass("not-off");
setTimeout(function() {
  $(".shakespeare").removeClass("not-off");
}, 5000);
}

// click and mouseover functions tied to lis (answers)
    $("li").on({
      click: function(e) {
        e.preventDefault();
        var userClick = $(this).html();
        var rightAnswer = questions[currentQuestion].answerKey;
              if(userClick === rightAnswer){
                  $("#answer").html("<p>You got it right!</p>");
                  setTimeout(fade_out, 5000);
                  // makes the pointsCounter div go up
                  pointsGoUp();
                  shakespearePop();
                  //this codes runs when you complete the game
                  if (currentQuestion === questions.length - 1) {
                    $("#answer").html("<p>TRUMEPTS! CHEERS! CAKE! YOU WIN!</p>");
                    modal.html("<div class='modal-content'><p>Thou hast beaten all opponents, and verily are a true insult master. Go forth, insult-knight, and use thy skills for good. Now - to celebrate! As Shakespeare himself once said, 'Cake for everyone!' You got " + numPoints + " points! </div><img src='cake.png'></img>");
                    modal.css("display", "block");
                  };
                  // loads the next question
                  clearTimeout(timeOutID);
                  clearTimeout(timeOutID2);
                  loadNextTrivia();
                  aFade();
                  if (currentQuestion === questions.length - 1) {
                    var $bossBattle = $("#bossBattle");
                    var backgroundInterval = setInterval(function() {
                      $bossBattle.toggleClass("backgroundRed");
                    }, 1000)
                    $("#bossBattle").html("<p>BOSS BATTLE!!!</p>");
                  }

              } else {
                $("#answer").html("<p>Wrong! Sorry! Try again.</p>");
                setTimeout(fade_out, 5000);
                pointsGoDown();
              };
              if(numPoints === -60) {
                $("#answer").html("<p>You got too many wrong. The crowd booed you out of the theater.</p>");
                resetGame();
                return;
              }
            },
      mouseover: function(e) {
            e.preventDefault();
            $(this).addClass("answerHover");
          },
      mouseleave: function(e) {
          e.preventDefault();
          $(this).removeClass("answerHover");
      }

    });

// fades a few answers out at differing rates when they ARENT the answer
  function aFade() {
    var qTotal = (questions[currentQuestion].questionTime) * 1000;
    var currentAnswers = [$("ul li").eq(0).html(), $("ul li").eq(1).html(), $("ul li").eq(2).html(), $("ul li").eq(3).html(), $("ul li").eq(4).html()];

      if(currentAnswers[0] !== questions[currentQuestion].answerKey) {
        timeOutID = setTimeout(function() {
          if(currentAnswers)
          $("ul li").eq(0).hide();
        }, qTotal/2);
      } else if(currentAnswers[0] === questions[currentQuestion].answerKey) {
        $("ul li").eq(0).show();
      }

      if(currentAnswers[1] !== questions[currentQuestion].answerKey) {
        timeOutID2 = setTimeout(function() {
          $("ul li").eq(1).hide();
        }, qTotal/4);
        console.log(timeOutID2);
      } else if(currentAnswers[0] === questions[currentQuestion].answerKey) {
        $("ul li").eq(1).show();
      }
  }



});
