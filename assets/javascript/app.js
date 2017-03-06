/*  Pseudocode for trivia game


1. [x] Declare Global Variables & Counters: Time, Correct Answers, Wrong Answers, etc.
2. [x] Create Questions & Answers: Declare the following arrays: questionArray, answerArray, emptyArray
3. [x] Create timer function: setInterval
4. [] Set onclick functions for userGuess from answers array
5. [] Create conditions for answers or no answer (Time up game over)

6. [] Add points for correct answers
7. [] Add points for incorrect answers
8. [] Add points for incomplete answers (if timeout is reached)
9. [x] show score at the end of the game
10.[x] reset button to start quiz over

*/


//Run JS program when page is loaded
$(document).ready(function() {

    //Object for Michael Jordan Questions and Answers


    var jordanTrivia = [{
            question: "Which of the following schools did Michael Jordan play for?",
            options: ['North Carolina', 'Michigan State', 'Villanova', 'Kansas'],
            answer: 'North Carolina'

        }, {
            question: "How many NBA Championships has Michael Jordan won?",
            options: ['3', '6', '8', '10'],
            answer: '6'
        }, {
            question: "Name the player below who was his teammate for the Chicago Bulls:",
            options: ['Horace Grant', 'Patrick Ewing', 'Charles Barkley', 'Steven Pippen'],
            answer: 'Horace Grant'
        }, {
            question: "In his last NBA Finals appearance, Michael Jordan led the Chicago Bulls to victory against which team?",
            options: ['Utah Jazz', 'LA Lakers', 'Seattle Supersonics', 'Phoenix Suns'],
            answer: 'Utah Jazz'
        },

    ];

    //image arrays

    var correctImageArray = ['assets/images/Correct1.gif', 'assets/images/Correct2.gif',
        'assets/images/Correct3.gif', 'assets/images/Correct4.gif'
    ];

    var incorrectImageArray = ['assets/images/incorrect1.gif']

    console.log(jordanTrivia);

    //Global Variables

    var time = 10; //Time to countdown per question
    var intervalID; //Interval
    var count = -1; //traverse through jordanTrivia object questions
    var correct = 0; //counter for correct responses
    var incorrect = 0; //counter for incorrect responses
    var userSelections //empty var for user selection




    startGame();

    //Starts game

    function startGame() {

        var $game = $('.question');

        $game.html('<h1>Let\'s test your basketball IQ</h1>');

        var startButton = $(document.createElement('button'));
        startButton.addClass('btn-lg btn-block start-button');

        startButton = startButton.html('Start Quiz');

        $game.append(startButton);

        $('.start-button').on('click', function(event) {

            startButton.remove();
            nextQuestion();
            audio();
        })
    }

    //function for timer and call countdown function

    function countdown() {

        time--;

        $('.timer').html('<h2>Time</h2> <p><h3>' + time + '</h3></p>');

        if (time < 1) {

            clearInterval(intervalID);
            nextQuestion();


        }

    }


    //function for playing audio file "Be like Mike"

    function audio() {

        $('#like-mike').get(0).play();

    }





    //Pulling questions and multiple choice answers

    function nextQuestion() {

        count++;
        time = 10;
        intervalID = setInterval(countdown, 1000);


        $('.question').html(jordanTrivia[count].question);
        //$('.answer').html('<ul>' + jordanTrivia[count].options + '</ul>');

        $('.answer').empty();
        answerButtons();

        //End of questions, show score, restart game with button

        if (count === jordanTrivia[count].question.length) {

            

            clearInterval(intervalID);


            var gameOver = $('div', { class: 'col-md-12 finale' });

            gameOver.append("<h1> Game Over! Here are the results:</h1>");

            var result = $('div', { class: 'col-md-12 results' });

            results.append("<p> Correct answers:" + correct + "</p> <p> Incorrect answers: " + incorrect + "</p>");

            createReset();


        }

    }




    //Creating radio buttons for multiple choice questions

    function answerButtons() {

        for (i = 0; i < jordanTrivia[count].options.length; i++) {

            var btn = $(document.createElement('button'));

            btn.addClass('btn-lg btn-block answer-buttons');

            var newButton = btn.html(jordanTrivia[count].options[i]);

            $('.answer').append(newButton);


        }

        //on click function for answer buttons and capturing user input
        $('.answer-buttons').on('click', function(event) {

            userSelections = $(this).text();
            if (userSelections === jordanTrivia[count].answer) {
                correct++;
                clearInterval(intervalID);
                nextQuestion();
            } else {
                incorrect++;
                clearInterval(intervalID);
                nextQuestion();
            }

        })

    };



    function createReset() {


        var reset = $(document.createElement('button', { class: 'reset-button' }));

        reset.click(function() {


            count = -1;
            correct = 0;
            incorrect = 0;

            nextQuestion();


        })

    }





});
