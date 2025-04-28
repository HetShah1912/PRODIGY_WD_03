let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#resetButton");
let newButton = document.querySelector("#newButton");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let click = 0;

let turnO = true;


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

boxes.forEach((box)=>{
    box.addEventListener("click", () => {
        click++;
        console.log("Clicked",click);
        if(turnO){
            box.classList.remove("xColor");
            box.innerHTML = "O";
            box.classList.add("oColor");
            turnO = false;
        }
        else{
            box.classList.add("oColor");
            box.innerHTML = "X";
            box.classList.add("xColor");
            turnO = true;
        }
        box.disabled = true;
        checkDraw();
        checkWinner();  
    });
});

const resetGame = () => {
    click = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is : ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkDraw = () => {
    if(click >= 9){
        msg.innerText = `The Game is Drawn`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    } 
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    };
    
}

newButton.addEventListener("click",resetGame);
resetButton.addEventListener("click",resetGame);
