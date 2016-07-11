$(document).ready(function() {
  console.log("test");
// shuffle funciton defined, courtesy of James Padolsey
(function($){

    $.fn.shuffle = function() {

        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });

        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });

        return $(shuffled);

    };

})(jQuery);

// global variable contains questions and answer key values
  var questions = [
    {question:"<p> Some knave steps up and compares your smell to old milk. What do you throw back at him? </p> <br> </p> Thou art as _____ as butter.</p>",
    answers: ["stinky","odious","farty","fat","runny"],
    answerKey: "fat"
    },
    {question: "<p>Two rapscallions tell you that you have the brains and prowess of a field mouse.</p> <br> <p> What creature would Shakespeare use to describe those who lie venomously and are generally nasty buggers?</p>",
    answers: ["A snake", "A toad", "An adder", "A stingfish", "A snapping turtle"],
    answerKey: "A toad"
  },
    {question: "<p>From the back of the crowd, you hear 'You liver pated lily! You lascivious leech! You little--'. <br> <p> You cut him off with this Shakespearean gem: Your ___ breeds mites, much like ___</p>",
    answers: ["virginity/cheese", "breath/rotten flesh", "humours/sewage", "crouch/stale bread", "face/manure"],
    answerKey: "virginity/cheese"
  },
    {question: "<p>A thin woman sidles up to you and whispers in your ear something indecent about your mother.</p> <br><p>You have to spit something back, but your mind is blank. What would Titus Andronicus say? </p>",
    answers: ["Thy mother is an elderberry whore", "Avaunt! You spittewattle arse-licker!", "Villain, I have done thy mother", "Ho-thou was't fathered by an infected newt", "Feast on my trousers, codswallow"],
    answerKey: "Villain, I have done thy mother"
  },
    {question: "<p> The crowd is calling for a Timon of Athens insult! Timon of Athens? Is that even a Shakespearean play? </p> <br> <p> It's tim-on to spit some Athenian insults! What do you say? </p>",
    answers: ["Methink’st thou art a general offence and every man should beat thee", "I do wish thou were a dog, that I might love thee something", "On my knee I give heaven thanks that I am not like to thee", "Thou halfpenny purse of wit, thou pigeon egg of discretion", "Stinkwattle! Odious foot-monger! Bearer of bile!"],
    answerKey: "I do wish thou were a dog, that I might love thee something"
},
  {question: "<p> A hush comes over the crowd, and a wild Falstaff appears. Considered a Shakespearean put-down master, Falstaff is known for stringing insult onto insult until either he or his opponent collapse.</p><br><p> His only known weakness are insults he hasn't heard before (i.e. NOT FROM SHAKESPEARE). What do you say?! Quick! He's about start!</p>",
  answers: ["Peace, ye fat guts", "Thou scullion! Thou rampallion!", "Thou whoreson obscene greasy tallow-catch!", "You sweat to death and lard the lean earth you walk upon", "Thou roguish unchin-snouted common-kissing canker-blossom!"],
  answerKey: "Thou roguish unchin-snouted common-kissing canker-blossom!"
  }
  ]


// var number = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
var startTime = 200;
var interval;
var endTime = 0;

function timer() {

  if(endTime < startTime) {
    // subtracts a second from the starttime
    startTime -= 1;
    $("#timeCounter").html(startTime);

  } else {
    clearInterval(interval);
    $("#timeCounter").html("<p>Time is out! </p>");
  }
}

function timerGo() {
  // sets the timer going on a set interval
  interval = setInterval(timer, 1000);

};


var currentQuestion = 0;
var numPoints = 0;

function loadQuestion() {
  // loads the first question in the array
  $(".questions").html(questions[currentQuestion]["question"]);
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
  $("ul li").shuffle();
}

function pointsGoUp() {
  numPoints += 20;
  $("#pointCounter").html(numPoints);
}

function pointsGoDown() {
  numPoints -= 20;
  $("#pointCounter").html(numPoints);
}

    loadQuestion();
    loadAnswers();

    // should load next Trivia question and answer set by iterating on current Question;
    function loadNextTrivia() {
      currentQuestion +=1;
      $(".questions").html(questions[currentQuestion]["question"]);
      clearInterval(interval);
      startTime -= 30;
      timerGo();
      $("ul").each(function() {
        for(i=0;i<5;i++){
          $("li").eq(i).html(questions[currentQuestion].answers[i]);
        }
      })
      $("ul li").shuffle();
    };



// click and mouseover functions tied to lis (answers)
    $("li").on({
      click: function() {
        var userClick = $(this).html();
        var rightAnswer = questions[currentQuestion].answerKey;
              if(userClick === rightAnswer){
                  $("#answer").html("<p>You got it right!</p>");
                  // makes the pointsCounter div go up
                  pointsGoUp();
                  //end of game prompt
                  if (currentQuestion === questions.length - 1) {
                    $("#answer").html("<p>You beat the game! Congrats!</p>");
                    return;
                  };
                  // loads the next question
                  loadNextTrivia();
                  if (currentQuestion === questions.length - 1) {
                    $("#bossBattle").html("<h6>BOSS BATTLE!!!</h6>");
                  }

              } else {
                $("#answer").html("<p>Wrong! Sorry! Try again.</p>");
                pointsGoDown();
              };
            },
      mouseover: function() {
            $(this).addClass("answerHover");
          },
      mouseleave: function() {
          $(this).removeClass("answerHover");
      }


    });


// HAd a timer on each question, each question was worth 100 points, each second would eliminate a question,, and worth less points.
//make modular with dom loading a new one each time
// 1. get the right question to advance the game to the next question
// 1a. Get the right set of answers to display as lis
// 2. create a point counter that has the right question advance the point counter
// 3. have wrong questions lower the point counter
// 4. create a shuffle mechanism that re orders the questions
// 4. create a shuffle mechanism  that re orders the respective answers

// 5. add function that ends game at a certain negative point threshold
//6. add styling
//7. add intro that sets up the game
//8. add descending point values for the timer going down
});
