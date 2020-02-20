/* --- KNOWN BUGS ---
1. Player isn't required to enter a word. Ideally minimal input should be 1 character.
2. Player isn't required to enter a letter. "Empty" input counts as one lost life.
3. I didn't include a message notifying the player when he enters a word that exceeds the max input length. Therefore the input may be "cut off" without the player knowing about it (since the input field only displays asterisks).
*/

// --- VARIABLES ---

      var answer;
      var display;
      var letter;
      var wrongAnswer;
      var score;
      var spanLetter;

// --- FUNCTION CALLS ---

      document.getElementById("startbutton").addEventListener("click", startGame);
      document.getElementById("retrybutton").addEventListener("click", startGame);

// --- FUNCTIONS ---

      function pageLoad(){
            document.getElementById("gameonword").style.display = "none";
            document.getElementById("gameonletter").style.display = "none";
            document.getElementById("score").style.visibility = "hidden";
            document.getElementById("retry").style.display = "none";
      };

      function startGame(){
            score = 10;
            display = [];

            

            document.getElementById("startgame").style.display = "none";
            document.getElementById("retry").style.display = "none";
            
            document.getElementById("display").innerHTML = "";
            document.getElementById("penalties").innerHTML = score;
            
            document.getElementById("gameonword").style.display = "block";
            document.getElementById("end").innerHTML = "";
            document.getElementById("image").src = "css/assets/hangman0.png";
            
            document.getElementById("word").value = "";
            document.getElementById("wordbutton").addEventListener("click", enterWord);
      }

      // Prompts user for a word (answer) and stores each letter in an array.
      function enterWord(){
            
            document.getElementById("score").style.visibility = "visible";
            answer = document.getElementById("word").value;
            answer = Array.from(answer);

            for(var i = 0; i < answer.length; i++){
                  display[i] = "-";
            }

            displayString();

            document.getElementById("gameonword").style.display = "none";
            document.getElementById("gameonletter").style.display = "block";

            document.getElementById("letterbutton").addEventListener("click", gameLoop);
      }

      // Prompts user for a letter.
      function enterLetter(){
            letter = document.getElementById("letter").value;

            document.getElementById("letter").value = "";
            return letter;
      }

      //Checks if letter occurs in answer. If so, letter is shown in corresponding display.
      function checkLetter(){
            wrongAnswer = true;

            for(var i = 0; i < answer.length; i++){
                  if(letter === answer[i]){
                        display[i] = answer[i];
                        
                        wrongAnswer = false;
                  }
            }

            displayString();

            if(wrongAnswer){
                  score--;

                  var imageId = (10-score).toString();

                  document.getElementById("image").src = "css/assets/hangman"+ imageId + ".png";

                  document.getElementById("penalties").innerHTML = score;
                  return score;
            }
      }

      function gameLoop(){
            enterLetter();
            checkLetter(letter);
            var gameOver = gameEnd();

            if (score <= 0){
                  document.getElementById("score").style.display = "none";
                  document.getElementById("gameonletter").style.display = "none";
                  document.getElementById("retry").style.display = "block";
                  document.getElementById("end").innerHTML = "You suck :(";
                  return;
            } else if (gameOver == true) {      
                  document.getElementById("score").style.display = "none";
                  document.getElementById("gameonletter").style.display = "none";
                  document.getElementById("retry").style.display = "block";
                  document.getElementById("end").innerHTML = "You have won!";
                  return;
            }
      }

      function displayString(){
            document.getElementById("display").innerHTML = display.join("");
      }

      function gameEnd(){
            for (var i = 0; i < answer.length; i++){
                  if (answer[i] !== display[i]){
                        return false;
                  }
            }
            return true;
      }