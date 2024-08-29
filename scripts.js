const buttons = document.querySelectorAll("button");
const pointsElement = document.querySelector("h2 span");

let memory = [];
let bufferIndex = 0;
let points = 0;

function resetColors() {
    buttons.forEach(button => {
        button.style.backgroundColor = "grey";
    });
}

function disableAll() {
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function undesableAll() {
    buttons.forEach(button => {
        button.disabled = false;
    });
}

async function flashButton(i) {
    buttons[i].style.backgroundColor = "yellow";
    await new Promise(r => setTimeout(r, 500));
    buttons[i].style.backgroundColor = "grey";
    await new Promise(r => setTimeout(r, 300));
}

async function playSequence() {
    disableAll();
    for (let i = 0; i < memory.length; i++) {
        await flashButton(memory[i] - 1);
    }
    undesableAll();
}

async function clickedButton(button) {
    const clickedIndex = [...buttons].indexOf(button);

    if (bufferIndex === 0 && clickedIndex === 4) {
        buttons[4].style.backgroundColor = "grey";
        buttons[4].innerText = "";
        bufferIndex++;
        memory.push(Math.floor(Math.random() * 9) + 1);
        await playSequence();
    } else if (bufferIndex > 0) {
        if (clickedIndex === memory[bufferIndex - 1] - 1) {
            bufferIndex++;
            if (bufferIndex > memory.length) {
                memory.push(Math.floor(Math.random() * 9) + 1);
                bufferIndex = 1;
                points++;
                pointsElement.textContent = points;
                await playSequence();
            }
        } else {
            alert("Game Over! You clicked the wrong button.");
            resetGame();
        }
    }
}

function resetGame() {
    resetColors();
    bufferIndex = 0;
    memory = [];
    points = 0;
    pointsElement.textContent = points;
    buttons[4].style.backgroundColor = "lime";
    buttons[4].innerText = "START!";
}

window.onload = () => {
    resetGame();
    buttons.forEach(button => {
        button.onclick = () => { clickedButton(button); };
    });
};
