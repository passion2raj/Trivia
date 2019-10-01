
var card = $("#quiz-area");
var countStartNumber = 30;
var timer;


// Question set
var questions = [{
  question: "What is Full Form of HTML?",
  answers: ["Hypertension Mellitus", "Hot mail Ltd.", "HyperText Markup Langauge", "Hello Tame Mali Lo"],
  correctAnswer: "HyperText Markup Langauge",
  image: "assets/images/HTML.png"
}, {
  question: "What is Full form of CSS?",
  answers: ["Cascading Style Sheet", "Coronary Spectum System", "Come Slow Speed", "Cat Song Sambha"],
  correctAnswer: "Cascading Style Sheet",
  image: "assets/images/CSS.png"
}, {
  question: "What is Full form of MEAN?",
  answers: ["Meaning", "Mongo Express Angular Node", "Mom Eat ALL Nuts", "Mongo and Node"],
  correctAnswer: "Mongo Express Angular Node",
  image: "assets/images/MEAN.png"
}, {
  question: "What is Full form of MERN?",
  answers: ["Mongo Express Return Node", "Mom Eat Round Noodles", "Mongo Express React Node", "Me Not"],
  correctAnswer: "Mongo Express React Nod",
  image: "assets/images/MEAN.png"
}, {
  question: "What is Full form of SQL ?",
  answers: ["Structured Query langauge", "Sequlize", "System Quality Label", "Sorry Queue Line"],
  correctAnswer: "Structured Query langauge",
  image: "assets/images/SQL.png"
}, {
  question: "What is Full form of CRUD?",
  answers: ["Crude Oil Co.", "Creative Reactive Design", "Create Read Update Delete", "Cat and Rabbit"],
  correctAnswer: "Create Read Update Delete",
  image: "assets/images/CRUD.png"
}, {
  question: "What is Full form of OOP?",
  answers: ["Object Oriented Programming", "Ohh Papa", "Onion Oil Potato", "OOPS"],
  correctAnswer: "Object Oriented Programming",
  image: "assets/images/OOP.png"
}, {
  question: "What is Full form of UX/UI?",
  answers: ["Update X Update I", "Ex User Internet User", "You EX You I ", "User Experience User Interface"],
  correctAnswer: "User Experience User Interface",
  image: "assets/images/UXUI.png"
}];



var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").text(this.counter);
    if (this.counter === 0) {
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(this.countdown.bind(this), 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").text(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {

    clearInterval(window.timer);

    $("#counter-number").text(this.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(window.timer);

    card.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(this.counter);

    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    this.incorrect++;

    clearInterval(window.timer);

    card.html("<h2>Nope!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(window.timer);

    this.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion.bind(game)();
});
