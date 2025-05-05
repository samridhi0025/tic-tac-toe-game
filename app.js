let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg =document.querySelector("#msg");
let turnO =  true;
const winPattern =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame =()=>{
    turnO = true;
    enabledBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Only proceed if box is empty
            if (turnO) {
                box.innerText = "O";
                box.classList.add("O"); // Add color for O
                turnO = false; // Change turn to X
            } else {
                box.innerText = "X";
                box.classList.add("X"); // Add color for X
                turnO = true; // Change turn to O
            }
            box.disabled = true; // Disable the box after it’s filled
            checkWinner(); // Check for winner or tie
        }
    });
});

const disabledBoxes =()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};
const enabledBoxes =()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("X","O");
    }
};
const showWinner =(winner)=>{
    msg.innerText= `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};
const showTie = () => {
    msg.innerText = `It's a Tie! 🤝`;
    msgContainer.classList.remove("hide");
    disabledBoxes(); // Disable all boxes for a tie
};

const checkWinner = () => {
    let winnerFound = false;

    // Check for winner first
    for (let pattern of winPattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                winnerFound = true; // Winner found, exit the loop
                return; // Exit early if there's a winner
            }
        }
    }

    // If no winner found, check for tie
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false; // If any box is empty, it's not a tie
        }
    });

    // If no winner and all boxes are filled, it's a tie
    if (!winnerFound && allFilled) {
        showTie(); // Show tie message
    }
};



newGamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);