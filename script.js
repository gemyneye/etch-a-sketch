const sketchBox = document.querySelector("#grid-squares");
const selectedGridSize = document.querySelector(".grid-number");
const buttonSelected = document.querySelector(".grid-enter");
const buttonClear = document.querySelector(".clear-screen");
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
console.log(selectedGridSize.value);
console.log(randomColor());

buttonSelected.addEventListener('click', () => {
    const inputGridSize = parseInt(selectedGridSize.value);
    if (inputGridSize <1 || inputGridSize > 100) { alert("Please enter a number greater than 1 and less than 101");return;}
    
    while(sketchBox.firstChild) {
        sketchBox.removeChild(sketchBox.firstChild);
    }
    console.log(inputGridSize);
    createGrid(inputGridSize);
}
);

buttonClear.addEventListener('click', () => { 
    const pixelBoxClear = sketchBox.getElementsByClassName("drawn"); while(pixelBoxClear.length > 0){ 
        pixelBoxClear[0].classList.remove("drawn"); 
    } 
} 
);

function createGrid(size){
    
    let squareSize = 512/size;
    sketchBox.style.setProperty("--square-size", `${squareSize}px`);
    for (let i = 0; i < (size**2); i++) {
    const pixelBox = document.createElement("div");
    pixelBox.classList.add("square");
    sketchBox.appendChild(pixelBox);
}
}

sketchBox.addEventListener('mouseover', (event) => {
    if(!event.target.classList.contains("square")) return;
    event.target.classList.add("drawn");
})
