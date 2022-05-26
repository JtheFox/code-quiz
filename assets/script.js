let currQuestion, points, time;
let timeLimit = 50;
let maxPoints = 100;
let timer;

/* this is a shorthand function like in jquery
takes in query paramater and boolean value representing the use of querySelectorAll
*/
function $(selector, all = false) {
    if (all) return document.querySelectorAll(selector);
    else return document.querySelector(selector);
}


/* quiz init function
display quiz window, set global variables to quiz initial values
set element displays to initial values
*/
function startQuiz() {
    console.log('Starting quiz');
    $('.quiz-window').style.display = 'flex';
    currQuestion = points = 0;
    time = timeLimit;
    $('#timer').innerText = time;
    $('#question-total').textContent = questionList.length;
    displayQuestion(questionList[currQuestion]);

    // create timer
    timer = setInterval(function () {
        time--;
        $('#timer').innerText = time;
        if (time < 10) {
            $('#timer').innerText = `0${time}`;
        }
        if (time < 0) {
            finishQuiz();
        }
    }, 1000);
}

/* quiz end function
clear timer interval, hide quiz window, display hiscores input
*/
function finishQuiz() {
    clearInterval(timer);
    console.log(`Quiz complete, you got ${points} points with ${time} seconds remaining`);
    $('.quiz-window').style.display = 'none';
}

function evalAnswer(event) {
    // get the answer choice clicked by the user
    let ansChoice = event.currentTarget.textContent;

    // compare user answer to correct answer of current question
    // calculate points/time change based on maximum value divided by number of questions
    if (ansChoice === questionList[currQuestion].answer) {
        points += maxPoints / questionList.length;
        console.log('Correct');
    } else {
        time -= timeLimit / questionList.length;
        console.log('Wrong');
    }

    // if current question is the last question, finish the quiz
    // otherwise, move to next question
    if (currQuestion + 1 === questionList.length) {
        finishQuiz();
    } else {
        currQuestion++;
        displayQuestion(questionList[currQuestion]);
    }
}

/* question display function
change question number, question and answer choices element displays
*/
function displayQuestion(question) {
    $('#question-num').textContent = currQuestion + 1;
    $('#quiz-question').textContent = question.question;
    for (let [i, li] of $('li', true).entries()) {
        li.textContent = question.choices[i];
    }
}

// create event listeners
$('.quiz-start').addEventListener('click', startQuiz);
$('#quiz-exit').addEventListener('click', finishQuiz);
$('#submit-hiscore').addEventListener('click', submitHiscore);
for (let li of $('li', true)) {
    li.addEventListener('click', evalAnswer);
}
