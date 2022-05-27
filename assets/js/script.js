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
    $('.clear-hiscores').style.display = 'none';
    $('.quiz-window').style.display = 'flex';
    currQuestion = points = 0;
    time = timeLimit;
    $('#timer').innerText = time;
    $('#question-total').textContent = questionList.length;
    displayQuestion(questionList[currQuestion]);

    // create timer
    timer = setInterval(function () {
        time--;
        if (time < 0) finishQuiz;
        
        $('#timer').innerText = time;
        if (time < 10) $('#timer').innerText = `0${time}`;
    }, 1000);
}

/* quiz end function
clear timer interval, hide quiz window, display hiscores input
*/
function finishQuiz() {
    clearInterval(timer);
    if(time < 0) time = 0;
    $('.quiz-window').style.display = 'none';
    $('.clear-hiscores').style.display = 'block';

    // hiscore input modal
    $('#final-score').textContent = points;
    $('#final-time').textContent = time;
    $('.modal').style.display = 'block';
}

/* evaluate user answer choice function
get answer choice selected by user, compare it to correct answer for current question
deduce time/add points based on result, move to next question/finish quiz
*/
function evalAnswer(event) {
    // return if answer choice wasn't clicked
    if (event.target.tagName.toLowerCase() !== 'li') return;
    // get the answer choice clicked by the user
    let ansChoice = event.target.textContent;

    // compare user answer to correct answer of current question
    // calculate points/time change based on maximum value divided by number of questions
    if (ansChoice === questionList[currQuestion].answer) {
        points += maxPoints / questionList.length;
    } else {
        time -= timeLimit / questionList.length;
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

/* hiscore submit function
create user object, get, add to, and set hiscores from localStorage
*/
function submitHiscore() {
    let user = {
        initials: $('#initials').value?.substring(0,4).toUpperCase() || 'ANON',
        score: points
    }
 
    let hiscores = JSON.parse(localStorage.getItem('hiscores')) || [];
    hiscores.push(user);
    hiscores.sort((a, b) => { return b.score - a.score; }); // sort by highest score first
    localStorage.setItem('hiscores', JSON.stringify(hiscores));
    updateHiscores();
    $('.modal').style.display = 'none';
    $('#initials').value = '';
}

/* hiscore update function
get hiscores from localStorage, create display elements for each and append them to the display area
*/
function updateHiscores() {
    let hiscores = JSON.parse(localStorage.getItem('hiscores')) || [];
    $('.hiscores-list').innerHTML = '';
    // get top 5 scores
    for (let user of hiscores.slice(0,5)) {
        // create hiscore display elements
        let hiscoreUser = document.createElement('div');
        hiscoreUser.classList.add('user-score');
        let userName = document.createElement('p');
        userName.innerText = user.initials;
        let userScore = document.createElement('p');
        userScore.innerText = user.score;
        // append elements
        hiscoreUser.appendChild(userName);
        hiscoreUser.appendChild(userScore);
        $('.hiscores-list').appendChild(hiscoreUser);
    }
}

function clearHiscores() {
    localStorage.removeItem('hiscores');
}

// create event listeners
$('.quiz-start').addEventListener('click', startQuiz);
$('#quiz-exit').addEventListener('click', finishQuiz);
$('#submit-hiscore').addEventListener('click', submitHiscore);
$('#quiz-answers').addEventListener('click', evalAnswer);
$('.clear-hiscores').addEventListener('click', function() { localStorage.removeItem('hiscores'); updateHiscores(); });

// display hiscores on page load
updateHiscores();

// use max values for text description
$('#description').innerHTML = `Click the button to start the quiz.<br>
    You will have ${timeLimit} seconds to answer ${questionList.length} questions.<br>
    Good luck!`