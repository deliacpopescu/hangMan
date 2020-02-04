function HangMan() {
    const words = ["cars", "cat", "donkey", "star", "africa", "jaggermeister"];
    this.word = words[Math.floor(Math.random() * words.length)];
    this.lettersDOM = [];
    this.mistakes = 0;
}

HangMan.prototype.renderUnderScores = function () {
    for (let i = 0; i < this.word.length; i++) {
        const p = document.createElement("p");
        p.innerText = "_";
        p.classList.add("word");
        document.getElementById("letters").appendChild(p);
        this.lettersDOM.push(p);
    }

};

HangMan.prototype.getInputFromUser = function () {
    const obj = this;
    document.getElementById("input").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const text = event.target.value;

            if (text.length === 1) {
                console.log(text);
                obj.checkForLetter(text);
            }

            event.target.value = "";
        }
    });
};

HangMan.prototype.checkForLetter = function (letter) {
    if (this.word.includes(letter)) {
        this.matchLetter(letter);
    } else {
        console.log("not includes");
        this.updateMistakes();
    }
};

HangMan.prototype.matchLetter = function (letter) {
    for (const [index, wordLetter] of this.word.split("").entries()) {
        if (wordLetter === letter) {
            const p = this.lettersDOM[index];
            p.innerText = letter;
        }
    }
};

HangMan.prototype.updateMistakes = function () {
    const currentMistake = this.mistakes;
    this.mistakes = this.mistakes + 1;
    if (currentMistake < 3) {
        const mistakes = document.getElementById("mistakes");
        const currentText = mistakes.innerText;
        const newText = currentText.replace(currentMistake, this.mistakes);
        mistakes.innerText = newText;
    }
    else {
        this.showWord();
    }
};

HangMan.prototype.showWord = function () {
    let mistakes = document.getElementById("mistakes");
    mistakes.innerHTML = "you lose";
    for (const [index, wordLetter] of this.word.split("").entries()) {
        mistakes.innerText = "you lose";
        const p = this.lettersDOM[index];
        p.innerText = wordLetter;

    }

}
HangMan.prototype.resetWord = function () {
    const words = ["cars", "cat", "donkey", "star", "africa", "jaggermeister"];
    this.word = words[Math.floor(Math.random() * words.length)];
    this.renderUnderScores();
}
HangMan.prototype.resetUnderScors = function (){
    const div = document.getElementById("letters");
    div.querySelectorAll('*').forEach(n => n.remove())
}

HangMan.prototype.resetMistakes = function (){
    document.getElementById("mistakes").innerHTML="You have 0 mistakes";
    this.mistakes = 0;
}

document.getElementById("reset").addEventListener("click",resetButton());

const hangMan = new HangMan();
hangMan.renderUnderScores();
hangMan.getInputFromUser();
console.log(hangMan);
function resetButton(){
    hangMan.resetWord();
    hangMan.resetUnderScors();
    hangMan.resetMistakes();

    // this.renderUnderScores();
}



// const hangMan = new HangMan();
// hangMan.renderUnderScores();
// hangMan.getInputFromUser();
// console.log(hangMan);
