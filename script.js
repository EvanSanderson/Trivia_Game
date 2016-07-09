$(document).ready(function() {
  console.log("test");
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


var number = Math.floor(Math.random() * (2 - 0 + 1)) + 0;


function loadQuestion() {
  // var number = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
  console.log(number);
  $(".questions").html(questions[number]["question"]);
  console.log(questions[number]["question"]);
}

function loadAnswers() {
  $("ul").each(function() {
    for(i=0;i<3;i++){
      $("<li/>").appendTo(this)
      $("li").eq(i).html(questions[number].answers[i]);
    }
  })
}

// function nextQuestion() {
//   // // questions.splice(number, 1);
//   // var newNumber = number - 1;
//   // $(".questions").html(questions[newNumber]["questions"]);
//   // loadAnswers();
// }
    loadQuestion();
    loadAnswers();

    $("li").on({
      click: function() {
        var userClick = $(this).html();
        var rightAnswer = questions[number].answerKey;
              if(userClick === rightAnswer){
                  $("#answer").html("<p>You got it right!</p>")
              } else {
                $("#answer").html("<p>Wrong! Sorry! Try again.</p>")
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
});
