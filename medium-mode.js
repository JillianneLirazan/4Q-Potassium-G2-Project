const words = [
    { word: "physics", hint: "FAVORITE subject ng lahat" }, 
        { word: "corrupt", hint: "top skill ni marcos" },
        { word: "chicken", hint: "available everyday sa canteen" },
        { word: "closure", hint: "post-breakup thing" }, 
        { word: "economy", hint: "bagsak sa pilipinas" },
        { word: "fiction", hint: "favorite ni willow" },
        { word: "hygiene", hint: "need ni flint and hans" },
        { word: "warrant", hint: "recent duterte issue" },
        { word: "weekend", hint: "restday(?)" },
        { word: "poverty", hint: "resulta ng leadership ni marcos" },
    ];
    
    let currentWord = "";
    let currentHint = "";
    let jumbled = "";
    let score = 0;
    let lives = 5; 
    let wordsCorrect = 0;
    let isGameActive = true;
    let usedWords = [];
    let highscore=document.getElementById("highscore");

    function shuffleWord(word) { 
        const arr = word.split("");
        for (let i = arr.length - 1; i > 0; i--){ 
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
        }
        return arr.join("");
    }

    if(localStorage.getItem("jumblescore")){
        highscore.innerText=localStorage.getItem("jumblescore");
    }else{
        highscore.innerText=0;
    }

    function startGame() {
        if (wordsCorrect === 10) {
            document.getElementById("message").textContent = 
                `Congratulations! You've unscrambled all 10 words! Final score: ${score}`;
                if(score >= localStorage.getItem("jumblescore")){
                    localStorage.setItem("jumblescore", score);
                }
                isGameActive = false;
                disableInput();
            return;
        }
        
        if (lives <= 0) {
            document.getElementById("message").textContent = 
                "Game over! You ran out of lives. Final score: " + score;
            isGameActive = false;
            disableInput();
            return;
        }

        isGameActive = true;
        
        // Filter out used words
        const availableWords = words.filter(wordObj => !usedWords.includes(wordObj.word));
        
        if (availableWords.length === 0) {
            // All words have been used, reset for another round
            usedWords = [];
            startGame();
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableWords.length);
        currentWord = availableWords[randomIndex].word;
        currentHint = availableWords[randomIndex].hint;
        usedWords.push(currentWord);
        jumbled = shuffleWord(currentWord);
        
        while(jumbled === currentWord) {
            jumbled = shuffleWord(currentWord);
        }

        document.getElementById("jumble").textContent = jumbled;
        document.getElementById("message").textContent = "";
        document.getElementById("scoreDisplay").textContent = `Score: ${score} | Words: ${wordsCorrect}/10`;
        document.getElementById("guessInput").value = "";
        updateStatus();
    }

    function checkGuess() {
        if (!isGameActive) return;

        const guess = document.getElementById("guessInput").value.toLowerCase().trim();

        if (guess === "hint") {
            getHint();
            return;
        }
        
        if (guess === currentWord) {
            if (isGameActive) {
                score += 10;
                wordsCorrect++;
                document.getElementById("message").textContent = "Correct! +10 points";
                if(score >= localStorage.getItem("jumblescore")){
                    localStorage.setItem("jumblescore", score);
                }
                // Update the display immediately
                updateStatus();
            }
            
            if (wordsCorrect === 10) {
                document.getElementById("message").textContent = 
                    "Congratulations! You've unscrambled all 10 words! Final score: " + score;
                isGameActive = false;
                disableInput();
                return;
            }
            setTimeout(startGame, 1000);
        } else {
            if (isGameActive) {
                lives--;
                document.getElementById("message").textContent = "Incorrect! Try again.";
                if (lives <= 0) {
                    document.getElementById("message").textContent = 
                        "Game over! You ran out of lives. Final score: " + score;
                    isGameActive = false;
                    disableInput();
                }
            }
        }
        
        updateStatus();
    }

    function getHint() {
        if (!isGameActive) return;

        document.getElementById("message").textContent = `Hint: ${currentHint}`;
        score = Math.max(0, score - 5);
        updateStatus();
    }

    function restartGame() {
        lives = 5;
        wordsCorrect = 0;
        score = 0;
        usedWords = [];
        isGameActive = true;
        enableInput();
        startGame();
    }

    function updateStatus() {
        document.getElementById("livesDisplay").textContent = `Lives: ${lives}`;
        document.getElementById("scoreDisplay").textContent = `Score: ${score} | Words: ${wordsCorrect}/10`;
    }

    function disableInput() { 
        document.getElementById("guessInput").disabled = true;
        document.querySelector(".container").classList.add("game-over");
    }

    function enableInput() {
        document.getElementById("guessInput").disabled = false;
        document.querySelector(".container").classList.remove("game-over");
    }
    function displayHiScore(){
document.getElementById('hiScore').textContent = hiScore;
}

    window.onload = startGame;
