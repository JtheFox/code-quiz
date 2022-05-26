let currQuestion, points, time;
const timeLimit = 50;

/* this is a shorthand function like in jquery
takes in query paramater and boolean value representing the use of querySelectorAll
*/
function $(selector, all = false) {
    if (all) return document.querySelectorAll(selector);
    else return document.querySelector(selector);
}

// create timer
let timer = setInterval(function () {
    time--;
    $('#timer').innerText = time;
    if (time < 10) {
        $('#timer').innerText = `0${time}`;
    }
    if (time < 0) {
        finishQuiz();
    }
}, 1000);

function startQuiz() {
    console.log('Starting quiz');
    $('.quiz-window').style.display = 'flex';
    currQuestion = points = 0;
    time = timeLimit;
    $('#timer').innerText = time;
    $('#question-total').textContent = questionList.length;
    displayQuestion(questionList[currQuestion]);
}

function finishQuiz() {
    clearInterval(timer);
    console.log(`Quiz complete, you got ${points} points with ${time} seconds remaining`);
    $('.quiz-window').style.display = 'none';
}

function evalAnswer(event) {
    let ansChoice = event.currentTarget.textContent;
    if (ansChoice === questionList[currQuestion].answer) {
        points += 20;
        console.log('Correct');
    } else {
        time -= 10;
        console.log('Wrong');
    }

    if (currQuestion + 1 === questionList.length) {
        finishQuiz();
    } else {
        currQuestion++;
        displayQuestion(questionList[currQuestion]);
    }
}

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
for (let li of $('li', true)) {
    li.addEventListener('click', evalAnswer);
}
