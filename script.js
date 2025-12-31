const sketchBox = document.querySelector("#grid-squares");
let squareSize = 512/32;
sketchBox.style.setProperty("--square-size", `${squareSize}px`);

for (i = 0; i < (32**2); i++) {
    const pixelBox = document.createElement("div");
    pixelBox.classList.add("square");
    sketchBox.appendChild(pixelBox);
}