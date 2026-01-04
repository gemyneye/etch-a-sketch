const sketchBox = document.querySelector("#grid-squares");
const selectedGridSize = document.querySelector(".grid-number");
const styleSelector = document.querySelector(".canvas");
let canvasMode = document.querySelector('input[name="pen-style"]:checked').value;

const gridClear = () => { 
    const pixelBoxClear = sketchBox.getElementsByClassName("drawn");
    
    while(pixelBoxClear.length > 0){ 
        pixelBoxClear[0].style.setProperty("--alpha", "0");
        pixelBoxClear[0].classList.remove("drawn"); 
    } 
} 

//select the canvas drawing mode

styleSelector.addEventListener('change', (event) => {
    if(event.target.type !== "radio") return;
    canvasMode = event.target.value;
    console.log(canvasMode);
    gridClear();
});

const buttonSelected = document.querySelector(".grid-enter");
const buttonClear = document.querySelector(".clear-screen");
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    // const g = Math.floor(Math.random() * 256);
    // const b = Math.floor(Math.random() * 256);
    return `${r}`;
}

console.log(selectedGridSize.value);
console.log(randomColor());


//create grid size
buttonSelected.addEventListener('click', () => {
    const inputGridSize = parseInt(selectedGridSize.value);
    if (inputGridSize <1 || inputGridSize > 100) { alert("Please enter a number greater than 1 and less than 101");return;}
    
    while(sketchBox.firstChild) {
        sketchBox.removeChild(sketchBox.firstChild);
    }
    createGrid(inputGridSize);
}
);

buttonClear.addEventListener('click', gridClear);

function createGrid(size){
    
    let squareSize = 512/size;
    sketchBox.style.setProperty("--square-size", `${squareSize}px`);
    for (let i = 0; i < (size**2); i++) {
    const pixelBox = document.createElement("div");
    pixelBox.classList.add("square");
    pixelBox.style.setProperty("--alpha", "0");
    sketchBox.appendChild(pixelBox);
}
}

sketchBox.addEventListener('mouseover', (event) => {
    if(!event.target.classList.contains("square")) return;
    if(canvasMode === "basic") {
        if(event.target.classList.contains("drawn")) return;
        event.target.style.setProperty("--ink-r", "0");
        event.target.style.setProperty("--ink-g", "0");
        event.target.style.setProperty("--ink-b", "0");
        event.target.style.setProperty("--alpha", "1");
        event.target.classList.add("drawn");
    }
    else if(canvasMode === "random"){
    //Random color drawing
        if(event.target.classList.contains("drawn")) return;
        event.target.style.setProperty("--ink-r", randomColor());
        event.target.style.setProperty("--ink-g", randomColor());
        event.target.style.setProperty("--ink-b", randomColor());
        event.target.style.setProperty("--alpha", "1");
        event.target.classList.add("drawn");
    }
    // Shading drawing
    
    else if(canvasMode === "shade") {
        let drawnSquare = parseFloat(window.getComputedStyle(event.target).getPropertyValue("--alpha"));
        if(drawnSquare < 1) {
            drawnSquare += .1;
            event.target.style.setProperty("--ink-r", "0");
            event.target.style.setProperty("--ink-g", "0");
            event.target.style.setProperty("--ink-b", "0");
            event.target.style.setProperty("--alpha", drawnSquare);
            event.target.classList.add("drawn");
        }
    }
    else {
        return;
    }
});
