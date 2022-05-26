// create questions


/* this is a shorthand function like in jquery
takes in query paramater and boolean value representing the use of querySelectorAll
*/
function $ (query, all = false) {
    if (all) return document.querySelectorAll(query);
    else return document.querySelector(query);
}

// create event listeners
$('.quiz-start').addEventListener('click', startQuiz);
for (let li of $('li', true)) {
    li.addEventListener('click', evalAnswer)
}

function startQuiz() {
    console.log('Starting quiz');
}

function evalAnswer(event) {
    let ansChoice = event.currentTarget.textContent;
    console.log(ansChoice);
}

function displayQuestion(currQuestion) {
    $('#quiz-question').textContent = currQuestion.question;
    for (let [i, li] of $('li', true)) {
        li.textContent = currQuestion.choices[i];
    }
}