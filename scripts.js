const buttons = document.querySelectorAll("button");

let memory = [];
let bufferIndex = 0;

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

async function clickedButton(button) {
    disableAll();
    resetColors();
    if (!memory[bufferIndex]) {
        memory.push(Math.floor(Math.random() * 9) + 1);
    } else {
        if ([...buttons.values].indexOf(button)) {

        }
        memory.push(Math.floor(Math.random() * 9) + 1);
        bufferIndex++;
    }

}


window.onload = () => {
    resetColors();
    buttons[4].style.backgroundColor = "lime";
    buttons.forEach(button => {
        button.onclick = () => { clickedButton(button); };
    });
}