function etchASketch() {
  let mouseDown = false;
  document.body.onmousedown = () => (mouseDown = true);
  document.body.onmouseup = () => (mouseDown = false);
  let grid = {
    gridSizePixels: 1024,
    numOfCells: 16,
    gridBox: document.getElementById("grid-box"),
    cellSizePixels: 0,
  };

  function setup() {
    let dragging;
    createGrid();
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", resetGrid);

    return grid;
  }

  function createGrid() {
    grid.cellSizePixels = Math.floor(grid.gridSizePixels / grid.numOfCells);
    grid.gridBox.setAttribute(
      "style",
      `grid-template-columns:repeat(${grid.numOfCells}, ${grid.cellSizePixels}px);grid-template-rows:repeat(${grid.numOfCells}, ${grid.cellSizePixels}px);`
    );

    for (i = 0; i < Math.pow(grid.numOfCells, 2); i++) {
      newGrid = document.createElement("div");
      newGrid.style.width = `${grid.cellSizePixels}px`;
      newGrid.style.height = `${grid.cellSizePixels}px`;
      newGrid.classList.add("grid-box");
      grid.gridBox.appendChild(newGrid);
    }
  }

  function resetGrid() {
    cells = Array.from(grid.gridBox.children);
    cells.forEach((cell) => {
      cell.remove();
    });
    grid.numOfCells = 0;
    while (grid.numOfCells < 16 || grid.numOfCells > 100) {
      grid.numOfCells = prompt("Etch-A-Sketch Cell Count?\n(16-100)");
    }
    createGrid();
  }

  function listen() {
    grid.gridBox.addEventListener("mouseover", (e) => {
      if (mouseDown) {
        handleDraw(e);
      }
    });
    grid.gridBox.addEventListener("mousedown", (e) => {
      handleDraw(e);
    });
  }

  function handleDraw(e) {
    e.target.style.backgroundColor = "teal";
  }
  setup();
  listen();
}
etchASketch();
