// create questions and other variables
// questions from https://www.tutorialspoint.com/javascript/javascript_online_quiz.htm
const questionList = [
    {
        question: 'Which of the following type of variable is visible everywhere in your JavaScript code?',
        choices: [
            'global variable',
            'local variable',
            'Both of the above',
            'None of the above'
        ],
        answer: 'global variable'
    }, {
        question: 'Which of the following function of Array object reverses the order of the elements of an array?',
        choices: [
            'reverse()',
            'push()',
            'reduce()',
            'invert()'
        ],
        answer: 'reverse()'
    }, {
        question: 'Which of the following type of variable takes precedence over other if names are same?',
        choices: [
            'global variable',
            'local variable',
            'Both of the above',
            'None of the above'
        ],
        answer: 'local variable'
    }, {
        question: 'Which built-in method returns the calling string value converted to lower case?',
        choices: [
            'changeCase(lower)',
            'toLower()',
            'lowerCase()',
            'toLowerCase()'
        ],
        answer: 'toLowerCase()'
    }, {
        question: 'Which of the following function of String object is used to find a match between a regular expression and a string, and to replace the matched substring with a new substring?',
        choices: [
            'concat()',
            'match()',
            'replace()',
            'search()'
        ],
        answer: 'replace()'
    }
]
let currQuestion, points, time;
const timeLimit = 50;

/* this is a shorthand function like in jquery
takes in query paramater and boolean value representing the use of querySelectorAll
*/
function $(selector, all = false) {
    if (all) return document.querySelectorAll(query);
    else return document.querySelector(query);
}

// create event listeners
$('.quiz-start').addEventListener('click', startQuiz);
$('#quiz-exit').addEventListener('click', finishQuiz);
for (let li of $('li', true)) {
    li.addEventListener('click', evalAnswer);
}

function startQuiz() {
    console.log('Starting quiz');
    $('.quiz-window').style.display = 'flex';
    currQuestion = points = 0;
    time = timeLimit;
    $('#timer').innerText = time;
    // every time the quiz is opened, setInterval decreases +1 per instance
    // setInterval(function () {
    //     time--;
    //     $('#timer').innerText = time;
    //     if (time < 10) {
    //         $('#timer').innerText = `0${time}`;
    //     }
    //     if (time < 0) {
    //         finishQuiz();
    //     }
    // }, 1000);

    $('#question-total').textContent = questionList.length;
    displayQuestion(questionList[currQuestion]);
}

function finishQuiz() {
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