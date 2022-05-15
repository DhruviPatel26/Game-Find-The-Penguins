let score = 0, topscore = 0;
let gamescore = 0;
let _yeti, _penguins, _score, _current_score, _top_score, _game, counter = 0, gamearray = [];

$(document).ready(function () {

    //This code will run after your page loads
    _score = document.querySelector("#score");
    _current_score = document.querySelector("#current_score");
    _top_score = document.querySelector("#top_score");
    _game = document.querySelector("#game");

    gamestart();
    _top_score.innerHTML = prnttop_score();
});

const shuffleArray = function (array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

const prnttop_score = function () {
    if (!sessionStorage.getItem("top_score")) {
        sessionStorage.setItem("top_score", 0);
    }
    top_scoreCounter = sessionStorage.getItem("top_score");
    return top_scoreCounter;
};

var gamestart = function () {
    gamearray = [];
    counter = 0;
    for (let a = 0; a < 3; a++) {
        for (let b = 0; b < 3; b++) {
            let penguin_element = document.createElement("div");
            penguin_element.classList.add("penguin");
            ++counter;
            penguin_element.setAttribute("id", "penguin" + counter);
            gamearray.push(penguin_element);
        }
    }
    gamearray.pop();

    let yeti_element = document.createElement("div");
    yeti_element.classList.add("yeti");
    yeti_element.setAttribute("id", "yeti");
    gamearray.push(yeti_element);
    shuffleArray(gamearray);
    for (var a = 0; a < gamearray.length; a++) {
        _game.appendChild(gamearray[a]);
    }
    setclick();
}
var setclick = function () {

    _yeti = document.querySelector("#yeti");
    _penguins = document.querySelectorAll(".penguin");
    _penguins.forEach(function (_penguin) {
        _penguin.onclick = penguinClick;
    });
    _yeti.onclick = yetiClick;
}

const penguinClick = function () {

    if (!this.classList.contains("up")) {
        ++score;
        _current_score.innerHTML = score;
        this.classList.add("up");
        if (score > top_scoreCounter) {
            ++top_scoreCounter
            sessionStorage.setItem("top_score", top_scoreCounter);
            top_score.innerHTML = prnttop_score();
        }
        var x = document.createElement("AUDIO");
        x.setAttribute("src", "PenguinClick_audio.wav");
        x.setAttribute("controls", "controls");
        x.style.display = "none";
        _game.appendChild(x);
        x.play();
    }
}

const yetiClick = function () {
    console.log("yeti click");
    this.classList.add('up');
    var x = document.createElement("AUDIO");
    x.setAttribute("src", "YetiClick_audio.wav");
    x.setAttribute("controls", "controls");
    x.style.display = "none";
    _game.appendChild(x);
    x.play();
    setTimeout(resetGame, 2000);
}

const resetGame = function () {
    score = 0;
    _current_score.innerHTML = score;
    _game.innerHTML = "";
    gamestart();
};