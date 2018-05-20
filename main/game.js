function main() {

    const MAX_ANIMATION_DURATION = 60;
    const CELL_PADDING = 5;
    var fieldWidth = 5;
    var fieldHeight = 5;
    var cellSizeX;
    var cellSpaceX;
    var cellSizeY;
    var cellSpaceY;
    var openedCellCount;
    var firstOpenedCell, secondOpenedCell;

    class Cell {
        constructor(posX, posY) {
            this.posX = posX;
            this.posY = posY;
            this.state = MAX_ANIMATION_DURATION;
            this.opened = false;
            this.locked = false;
        }

        static _getEasing(x) {
            return x * x * (3 - 2 * x);
        }

        getFraction() {
            console.log(Cell._getEasing(this.state / MAX_ANIMATION_DURATION));
            return Cell._getEasing(this.state / MAX_ANIMATION_DURATION);
        }

        open(whatToDo) {
            const thisCell = this;
            const timerId = setInterval(function () {
                thisCell.state--;
                if (thisCell.state === 0) {
                    thisCell.opened = true;
                    clearTimeout(timerId);
                    const timerId2 = setInterval(function () {
                        thisCell.state++;
                        if (thisCell.state === MAX_ANIMATION_DURATION) {
                            clearTimeout(timerId2);
                            whatToDo();
                        }
                        drawField();
                    }, 16);
                }
                drawField();
            }, 16);
        }

        close(whatToDo) {
            const thisCell = this;
            const timerId = setInterval(function () {
                thisCell.state--;
                if (thisCell.state === 0) {
                    thisCell.opened = false;
                    clearTimeout(timerId);
                    const timerId2 = setInterval(function () {
                        thisCell.state++;
                        if (thisCell.state === MAX_ANIMATION_DURATION) {
                            clearTimeout(timerId2);
                            whatToDo();
                        }
                        drawField();
                    }, 16);
                }
                drawField();
            }, 16);
        }
    }


    var field;


    initCanvas();
    initGameField(fieldWidth, fieldHeight);

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    document.addEventListener("mousedown", onMouseDown, false);

    drawField();

    function onMouseDown(e) {
        drawField();
        const rect = canvas.getBoundingClientRect();
        let relativeX = e.x - rect.left;
        let relativeY = e.y - rect.top;

        let cellX = Math.trunc(relativeX / cellSpaceX);
        let cellY = Math.trunc(relativeY / cellSpaceY);

        if (cellX >= 0 && cellX < fieldWidth && cellY >= 0 && cellY < fieldHeight) {
            let cell = field[cellY][cellX];
            if (cell.locked || openedCellCount >= 2) return;
            cell.locked = true;
            openedCellCount++;
            const thisBrickIsSecond = openedCellCount === 2;
            if (thisBrickIsSecond) secondOpenedCell = cell;
            else firstOpenedCell = cell;
            cell.open(function () {
                if (thisBrickIsSecond) {
                    firstOpenedCell.close(function () {
                    });
                    firstOpenedCell.locked = false;
                    secondOpenedCell.close(function () {
                        openedCellCount = 0;
                    });
                    secondOpenedCell.locked = false;
                }
            });
        }
    }

    function clearField() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawField() {
        clearField();
        for (let y = 0; y < fieldHeight; y++)
            for (let x = 0; x < fieldWidth; x++) {
                let cell = field[y][x];
                let cellDrawHalfWidth = cellSizeX / 2 * cell.getFraction();
                let cellDrawHalfHeight = cellSizeY / 2;
                let cellCenterX = CELL_PADDING + cell.posX * cellSpaceX + cellSpaceX / 2;
                let cellCenterY = CELL_PADDING + cell.posY * cellSpaceY + cellSpaceY / 2;

                ctx.beginPath();
                ctx.rect(cellCenterX - cellDrawHalfWidth, cellCenterY - cellDrawHalfHeight, cellDrawHalfWidth * 2, cellDrawHalfHeight * 2);
                if (cell.opened) ctx.fillStyle = cell.color;
                else ctx.fillStyle = "#000000"
                ctx.fill();
                ctx.closePath();
            }
    }

    function initGameField(sizeX, sizeY) {
        openedCellCount = 0;
        if ((sizeX * sizeY) % 2 === 1) sizeX++;

        cellSpaceX = ((1000 - CELL_PADDING * 2) / sizeX);
        cellSpaceY = ((500 - CELL_PADDING * 2) / sizeY);

        cellSizeX = cellSpaceX - CELL_PADDING * 2;
        cellSizeY = cellSpaceY - CELL_PADDING * 2;

        let idsArray = new Array((sizeX * sizeY) / 2);
        for (let i = 0; i < idsArray.length; i++)
            idsArray[i] = i;

        field = new Array(sizeY);
        for (let y = 0; y < sizeY; y++) {
            field[y] = new Array(sizeX);
            for (let x = 0; x < sizeX; x++) {
                let cell = new Cell(x, y);
                cell.color = "#0000FF";
                field[y][x] = cell;
            }
        }

        fieldWidth = sizeX;
        fieldHeight = sizeY;
    }

    function initCanvas() {
        document.write('<canvas id="myCanvas" width="1000" height="500" ></canvas>');
        document.write('<style>\n' +
            '        * { padding: 0; margin: 0; }\n' +
            '        canvas { background-image: url("fire.jpg"); display: block; margin: 150px auto; }\n' +
            '    </style>');
    }
}