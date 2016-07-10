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
    {question:"<p>What is two plus three?</p>",
    answers: ["2","3","5"],
    answerKey: "5"
    },
    {question: "What is an elephant?",
    answers: [2, "An animal", "fruit"],
    answerKey: "An animal"
  },
    {question: "What is Shakespeare's favorite food?",
    answers: ["Thai", "Indian", "BBQ"],
    answerKey: "Thai"
  }
  ]


// var number = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

var currentQuestion = 0;
var numPoints = 0;

function loadQuestion() {
  // loads the first question in the array
  $(".questions").html(questions[currentQuestion]["question"]);
}

function loadAnswers() {
  // loads the first answer set in the array
  $("ul").each(function() {
    for(i=0;i<3;i++){
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
      $("ul").each(function() {
        for(i=0;i<3;i++){
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
                  if (currentQuestion === 2) {
                    $("#answer").html("<p>You beat the game! Congrats!</p>");
                    return;
                  };
                  // loads the next question
                  loadNextTrivia();

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
});
