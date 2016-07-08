$(document).ready(function() {
  console.log("test");
  var questions = [
    {question:"<p>What is two plus three?</p>",
    answer1: 2,
    answer2: 3,
    answer3: 5},
    {question: "What is an elephant?",
    answer1: 2,
    answer2: "A fruit",
    answer3: "An animal"}
  ]
  console.log(questions[1]);

  function loadQuestion() {
    $(".questions").html(questions[1]["question"]);
    console.log(questions[1]["question"]);
  }

  loadQuestion();

    // $(".wrong").on("click", function() {
    //     console.log("button working");
    //     $("#answer").html("<p>You are wrong sucka</p>");
    // })
    //
    // $(".right").on("click", function() {
    //   console.log("right button working");
    //   $("#answer").html("<p>You are right!! WOO! </p>");
    //   $(".nextQuestion").css("visibility", "visible");
    //
    // })



// HAd a timer on each question, each question was worth 100 points, each second would eliminate a question,, and worth less points.
//make modular with dom loading a new one each time
});
