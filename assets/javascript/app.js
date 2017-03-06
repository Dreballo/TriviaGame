/*  Pseudocode for trivia game


1. [x] Declare Global Variables & Counters: Time, Correct Answers, Wrong Answers, etc.
2. [x] Create Questions & Answers: Declare the following arrays: questionArray, answerArray, emptyArray
3. [x] Create timer function: setInterval
4. [] Set onclick functions for userGuess from answers array
5. [] Create conditions for answers or no answer (Time up game over)

6. [x] Add points for correct answers
7. [x] Add points for incorrect answers
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

    var incorrectImageArray = ['assets/images/incorrect1.gif','assets/images/incorrect2.gif',
    'assets/images/incorrect3.gif','assets/images/incorrect4.gif',]

    console.log(jordanTrivia);

    //Global Variables

    var time = 24; //Time to countdown per question
    var intervalID; //Interval
    var count = -1; //traverse through jordanTrivia object questions
    var correct = 0; //counter for correct responses
    var incorrect = 0; //counter for incorrect responses
    var unanswered = 0;
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

        if (time === 0) {
            unanswered++;
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
        time = 24;
        intervalID = setInterval(countdown, 1000);


        if (count < jordanTrivia.length) {


            $('.question').html(jordanTrivia[count].question);


            $('.answer').empty();
            answerButtons();

        }

        //End of questions, show score, restart game with button
        else if (count > (jordanTrivia.length - 1)) {

            $('.question').empty();
            $('.answer').empty();
            $('.timer').empty();
            clearInterval(intervalID);
            time = 0;

            function endGame() {


                var gameOver = "<h1> Game Over! Here are the results:</h1>"

                $('.question').html(gameOver);

                var result = "<p> Correct answers:" + correct + "</p> <p> Incorrect answers: " + incorrect + "</p>" + "<p> Unanswered: " + unanswered + "</p>"

                $('.answer').html(result);

            }

            endGame();
            createReset();


        }

    }




    //Creating buttons for multiple choice questions

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
                showCorrectImage();
                clearInterval(intervalID);
                nextQuestion();
            } else {
                incorrect++;
                showIncorrectImage();
                clearInterval(intervalID);
                nextQuestion();
            }

        })

    };



    function createReset() {


        var reset = $(document.createElement('button'));
        reset.addClass('btn-lg btn-block');
        reset.text('Try Again');
        reset.appendTo('.answer');

        reset.on('click', function() {


            count = -1;
            correct = 0;
            incorrect = 0;
            unanswered = 0;

            reset.remove();

            nextQuestion();


        })

    }

    function showCorrectImage() {

        $(".image-holder").html("<img src=" + correctImageArray[count] + " width='400px'><p><h4>Correct!!! The answer is  " + jordanTrivia[count].answer + "</h4></p>");
        setTimeout(removeImage, 4000);


    }

    function showIncorrectImage() {

        $(".image-holder").html("<img src=" + incorrectImageArray[count] + " width='400px'><p><h4> Incorrect: The answer is  " + jordanTrivia[count].answer + "</h4></p>");
        setTimeout(removeImage, 4000);
    }

    function removeImage () {
    	$('.image-holder').empty();
    }



});
