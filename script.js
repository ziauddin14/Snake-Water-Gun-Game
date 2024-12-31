let userScore = 0;
let compScore = 0;
var msg = document.querySelector("#msg");

var userScorePara = document.querySelector("#user-score");
var compScorePara = document.querySelector("#comp-score");
var massegeContainer = document.querySelector(".msg-container");

let choices = document.querySelectorAll(".choice");

// let getCompChoice = () => {
//   const randomNumber = Math.floor(Math.random() * 3);
//   return choices[randomNumber].getAttribute("id");
// };
let player1Choice = null;  
let player2Choice = null;  

let player1Select = (choice) => {
  player1Choice = choice;
  msg.innerText = "Player 2, choose your move!";
  msg.style.fontSize = "28px"
};
let player2Select = (choice) => {
  player2Choice = choice;
  playGame(player1Choice, player2Choice);
};


var drawGame = () => {
  console.log("Game was draw");
  msg.innerText = "Game was draw!";
  msg.style.backgroundColor = "yellow";
  msg.style.color = "black";
};

var showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `Player 1 beats Player 2`;
    msg.style.backgroundColor = "green";
    msg.style.color = "black";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `Player 2 beats Player 1 `;
    msg.style.border = "1px solid black";
    msg.style.height = "30px";
    msg.style.backgroundColor = "#FF6865";
    msg.style.color = "white";
  }
  if (userScore === 5) {
    displayFinalWinner("Congratulations!Player 1 is winner!");
  } else if (compScore === 5) {
    displayFinalWinner("Congrats!Player 2  is winner!");
  }
};

var displayFinalWinner = (message) => {
  userScorePara.style.display = "none";
  compScorePara.style.display = "none";
  msg.style.display = "none";

  var finalMessage = document.createElement("div");
  finalMessage.innerText = message;
  finalMessage.style.fontSize = "36px";
  finalMessage.style.color = "#081b31";
  finalMessage.style.textAlign = "center";
  finalMessage.style.animation = "fadeIn 2s";

  document.body.appendChild(finalMessage);

  setTimeout(() => {
    finalMessage.innerText += "\n Click to Play Again!";
    finalMessage.addEventListener("click", () => {
      location.reload();
    });
  }, 3000);
};

let playGame = (player1Choice,player2Choice) => {
//   console.log("player 1 choice =", player1Choice);
//   console.log("player 2 choice =", player2Choice);

  if (player1Choice === player2Choice) {
    drawGame();
    return;
  } else {
    var player1Win = true;
    if (player1Choice === "snake") {
      player1Win = player2Choice === "gun" ? false : true;
    } else if (player1Choice === "water") {
      player1Win = player2Choice === "snake" ? false : true;
    } else {
      player1Win = player2Choice === "water" ? false : true;
    }
    showWinner(player1Win, player1Choice, player2Choice);
    resetTurn()
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if  (player1Choice === null) {
        player1Select(choice.getAttribute("id"))     
    }else if  (player2Choice === null) {
        player2Select(choice.getAttribute("id"))        
    }
  });
});


let resetTurn = () => {
    player1Choice = null; 
    player2Choice = null;  
    choices.forEach((choice) => {
      choice.disabled = false;  
    });
  };
  