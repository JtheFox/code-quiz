const Quiz = class {
    constructor() {
        // https://stackoverflow.com/questions/31559469/how-to-create-a-simple-javascript-timer
        this.time = 60;
        this.timer = setInterval(function () {
            console.log(this.time);
            document.getElementById('timer').innerHTML = '00:' + time;
            this.time--;
            if (this.time < 0) {
                clearInterval(timer);
            }
        }, 1000);        
    }
}

function timer() {
    new Quiz();
}

timer();