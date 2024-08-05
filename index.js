
 let blocks = document.getElementsByClassName("block");
    let HScore = document.getElementById("highscore");

    let score = 0;
    let mergedValue = 0;

    var highscore = 0;

    let gameoverscreen = document.querySelector('#gameover');

    function updateHighScore() {
      if (score > highscore) {
        highscore = score;
        localStorage.setItem("highscore", highscore);
      }
    }

    function getHighscore() {
      highscore = localStorage.getItem("highscore");
      HScore.innerHTML = "Best: " + highscore;
    }

    function Color() {
      for (let i = 0; i < blocks.length; i++) {
        let number = parseInt(blocks[i].textContent);

        if (number === 2) {
          blocks[i].style.backgroundColor = "rgb(238, 228, 218)";
          blocks[i].style.color = "#776e65";
        } else if (number === 4) {
          blocks[i].style.backgroundColor = "rgb(237, 224, 200)";
          blocks[i].style.color = "#776e65";
        } else if (number === 8) {
          blocks[i].style.backgroundColor = "rgb(242, 177, 121)";
          blocks[i].style.color = "#f9f6f2";
        } else if (number === 16) {
          blocks[i].style.backgroundColor = "rgb(245, 149, 99)";
          blocks[i].style.color = "#f9f6f2";
        } else if (number === 32) {
          blocks[i].style.backgroundColor = "rgb(246, 124, 95)";
          blocks[i].style.color = "#f9f6f2";
        } else if (number === 64) {
          blocks[i].style.backgroundColor = "rgb(246, 94, 59)";
          blocks[i].style.color = "#f9f6f2";
        } else if (number === 128) {
          blocks[i].style.backgroundColor = "rgb(237, 207, 114)";
          blocks[i].style.color = "#f9f6f2";
        } else if (number === 256) {
          blocks[i].style.backgroundColor = "rgb(237, 204, 97)";
          blocks[i].style.color = "#f9f6f2";
        } else if (number === 512) {
          blocks[i].style.backgroundColor = "rgb(237, 200, 80)";
          blocks[i].style.color = "#f9f6f2";
        } else if (number === 1024) {
          blocks[i].style.backgroundColor = "rgb(237, 197, 63)";
          blocks[i].style.color = "#f9f6f2";
        } else if (number === 2048) {
          blocks[i].style.backgroundColor = "rgb(237, 194, 46)";
          blocks[i].style.color = "#f9f6f2";
        } else if (isNaN(number)) {
          blocks[i].style.backgroundColor = "#cdc1b4";
          blocks[i].style.color = "#cdc1b4";
        } else if(number>2048) {
          blocks[i].style.backgroundColor = "black";
          blocks[i].style.color = "#f9f6f2";
        }
      }
    }

    function Random_Num(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function NumberProbability() {
      return Math.random() < 0.8 ? 2 : 4;
    }

    let dn1 = 0;
    let dn2 = 0;

    function Initialize() {
      let randomNum1 = Random_Num(1, 16);
      let randomNum2 = Random_Num(1, 16);

      let minus = randomNum1 - randomNum2;

      console.log("First " + randomNum1);
      console.log("Second " + randomNum2);

      if (randomNum1 === randomNum2) {
        Initialize();
      } else {
        dn1 = NumberProbability();
        dn2 = NumberProbability();
        blocks[randomNum1].textContent = dn1;
        blocks[randomNum2].textContent = dn2;
      }
      updateHighScore();
      getHighscore();
    }

    function AdditionAnimation(value) {
      if (value > 0) {
        let animation = document.getElementById("Animate");
        animation.style.display = "block";
        animation.textContent = '+' + value;
        setTimeout(function() {
          animation.style.display = "none";
        }, 400); 
      }
    }
      

    document.addEventListener("keyup", (e) => {
      if (e.code === "ArrowLeft" || e.key.toLowerCase() === "a") {
        moveLeft();
      } else if (e.code === "ArrowUp" || e.key.toLowerCase() === "w") {
        moveUp();
      } else if (e.code === "ArrowRight" || e.key.toLowerCase() === "d") {
        moveRight();
      } else if (e.code === "ArrowDown" || e.key.toLowerCase() === "s") {
        moveDown();
      }
    });

    function moveLeft() {
      mergedValue = 0;
      for (let i = 0; i < blocks.length; i += 4) {
        for (let j = i + 1; j < i + 4; j++) {
          if (blocks[j].textContent !== "") {
            let current = j;
            while (current > i && (blocks[current - 1].textContent === "" || blocks[current - 1].textContent === blocks[current].textContent)) {
              if (blocks[current - 1].textContent === "") {
                blocks[current - 1].textContent = blocks[current].textContent;
                blocks[current].textContent = ""; 
                blocks[current - 1].classList.add('move');
                blocks[current].classList.remove('move');
                current--;
              } else if (blocks[current - 1].textContent === blocks[current].textContent) {
                let sum = parseInt(blocks[current].textContent) * 2;
                blocks[current - 1].textContent = sum.toString();
                mergedValue += sum;
                blocks[current].textContent = ""; 
                blocks[current - 1].classList.add('move');
                blocks[current].classList.remove('move');
                break; 
              }
            }
          }
        }
      }
      generateNewNumber();
      Color();
      score += mergedValue;
      AdditionAnimation(mergedValue);
      document.querySelector(".score").textContent = "Score: " + score;
      
   
      updateHighScore();
      getHighscore();

      if (isGameOver()) {
        setTimeout(function() {
          gameoverscreen.style.display = 'block';
        }, 2000); 
      }
    }

    function moveUp() {
      mergedValue = 0;
      for (let i = 0; i < 4; i++) {
        for (let j = i + 4; j < 16; j += 4) {
          if (blocks[j].textContent !== "") {
            let current = j;
            while (current > i && (blocks[current - 4].textContent === "" || blocks[current - 4].textContent === blocks[current].textContent)) {
              if (blocks[current - 4].textContent === "") {
                blocks[current - 4].textContent = blocks[current].textContent;
                blocks[current].textContent = ""; 
                blocks[current - 4].classList.add('move');
                blocks[current].classList.remove('move');
                current -= 4;
              } else if (blocks[current - 4].textContent === blocks[current].textContent) {
                let sum = parseInt(blocks[current].textContent) * 2;
                blocks[current - 4].textContent = sum.toString();
                mergedValue += sum;
                blocks[current].textContent = ""; 
                blocks[current - 4].classList.add('move');
                blocks[current].classList.remove('move');
                break; 
              }
            }
          }
        }
      }
      generateNewNumber();
      Color();
      score += mergedValue;
      AdditionAnimation(mergedValue);
      document.querySelector(".score").textContent = "Score: " + score;
      
     
      updateHighScore();
      getHighscore();
      if (isGameOver()) {
        setTimeout(function() {
          gameoverscreen.style.display = 'block';
        }, 2000); 
      }
    }

    function moveRight() {
      mergedValue = 0;
      for (let i = 3; i < blocks.length; i += 4) {
        for (let j = i - 1; j > i - 4; j--) {
          if (blocks[j].textContent !== "") {
            let current = j;
            while (current < i && (blocks[current + 1].textContent === "" || blocks[current + 1].textContent === blocks[current].textContent)) {
              if (blocks[current + 1].textContent === "") {
                blocks[current + 1].textContent = blocks[current].textContent;
                blocks[current].textContent = ""; 
                blocks[current + 1].classList.add('move');
                blocks[current].classList.remove('move');
                current++;
              } else if (blocks[current + 1].textContent === blocks[current].textContent) {
                let sum = parseInt(blocks[current].textContent) * 2;
                blocks[current + 1].textContent = sum.toString();
                mergedValue += sum;
                blocks[current].textContent = ""; 
                blocks[current + 1].classList.add('move');
                blocks[current].classList.remove('move');
                break; 
              }
            }
          }
        }
      }
      generateNewNumber();
      Color();
      score += mergedValue;
      AdditionAnimation(mergedValue);
      document.querySelector(".score").textContent = "Score: " + score;
     
      
      updateHighScore();
      getHighscore();
      if (isGameOver()) {
        setTimeout(function() {
          gameoverscreen.style.display = 'block';
        }, 2000); 
      }
    }

    function moveDown() {
      mergedValue = 0;
      for (let i = 12; i < blocks.length; i++) {
        for (let j = i - 4; j >= 0; j -= 4) {
          if (blocks[j].textContent !== "") {
            let current = j;
            while (current < i && (blocks[current + 4].textContent === "" || blocks[current + 4].textContent === blocks[current].textContent)) {
              if (blocks[current + 4].textContent === "") {
                blocks[current + 4].textContent = blocks[current].textContent;
                blocks[current].textContent = ""; 
                blocks[current + 4].classList.add('move');
                blocks[current].classList.remove('move');
                current += 4;
              } else if (blocks[current + 4].textContent === blocks[current].textContent) {
                let sum = parseInt(blocks[current].textContent) * 2;
                blocks[current + 4].textContent = sum.toString();
                mergedValue += sum;
                blocks[current].textContent = ""; 
                blocks[current + 4].classList.add('move');
                blocks[current].classList.remove('move');
                break; 
              }
            }
          }
        }
      }
      generateNewNumber();
      Color();
      score += mergedValue;
      AdditionAnimation(mergedValue);
      document.querySelector(".score").textContent = "Score: " + score;
    
      
      updateHighScore();
      getHighscore();
      if (isGameOver()) {
        setTimeout(function() {
          gameoverscreen.style.display = 'block';
        }, 2000); 
      }
    }

    function generateNewNumber() {
      let emptyBlocks = [];
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].textContent === "") {
          emptyBlocks.push(blocks[i]);
        }
      }
      if (emptyBlocks.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyBlocks.length);
        emptyBlocks[randomIndex].textContent = Math.random() < 0.8 ? "2" : "4";
        emptyBlocks[randomIndex].classList.add('new');
      }
      Color();
    }

    function isGameOver() {
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].textContent === "") {
          return false; 
        }
      }

  
      for (let i = 0; i < blocks.length; i++) {
        if (i % 4 !== 3 && blocks[i].textContent === blocks[i + 1].textContent) {
          return false; 
        }
      }

        
      for (let i = 0; i < blocks.length - 4; i++) {
        if (blocks[i].textContent === blocks[i + 4].textContent) {
          return false; 
        }
      }
      return true;
    }


    window.onload = function () {
      Initialize();
      Color();
      updateHighScore();
      getHighscore();
    }
    

    function reset(){
        let choice = confirm("Do you want to restart the game?");
        
        if(choice === true){
            for (let i = 0; i <blocks.length; i++){
                blocks[i].textContent = "";
                Color();
            }
            Initialize();
            score = 0;
            document.querySelector(".score").textContent = "Score: " + score;
            Color();
        }
    }

    function tryagain(){   
        gameoverscreen.style.display = 'none';
      if(true){
      for (let i = 0; i <blocks.length; i++){
              blocks[i].textContent = "";
              Color();
      } 
          Initialize();
          score = 0;
          document.querySelector(".score").textContent = "Score: " + score;
          Color();
      }
  }