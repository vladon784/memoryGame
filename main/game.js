function main() {

    const MAX_ANIMATION_DURATION = 60;
    const CELL_PADDING = 25;
    var fieldWidth = 5;
    var fieldHeight = 5;
    var cellSizeX;
    var cellSpaceX;
    var cellSizeY;
    var cellSpaceY;

    class Cell {
        constructor(posX, posY) {
            this.posX = posX;
            this.posY = posY;
            this.state = 0;
        }

        getFraction() {
            return this.state / MAX_ANIMATION_DURATION;
        }
    }


    var field;


    initCanvas();
    initGameField(fieldWidth, fieldHeight);

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    function onMouseDown(e) {
        drawField();
    }

    document.addEventListener("mousedown", onMouseDown, false);

    function clearField() {
        ctx.beginPath();
        ctx.rect(0, 0, 1000, 500);
        ctx.fillStyle = "#00000000";
        ctx.fill();
        ctx.closePath();
    }

    function drawField() {
        clearField();
        for (let y = 0; y < fieldHeight; y++)
            for (let x = 0; x < fieldWidth; x++) {
                let cell = field[y][x];
                ctx.beginPath();
                ctx.rect(CELL_PADDING / 2 + cell.posX * cellSpaceX, CELL_PADDING / 2 + cell.posY * cellSpaceY, cellSizeX, cellSizeY);
                ctx.fillStyle = cell.color;
                ctx.fill();
                ctx.closePath();
            }
    }

    function initGameField(sizeX, sizeY) {
        if ((sizeX * sizeY) % 2 === 1) sizeX++;
        let idsArray = new Array((sizeX * sizeY) / 2);
        for (let i = 0; i < idsArray.length; i++)
            idsArray[i] = i;
        field = new Array(sizeY);
        for (let y = 0; y < sizeY; y++) {
            field[y] = new Array(sizeX);
            for (let x = 0; x < sizeX; x++) {
                let cell = new Cell(x, y);
                cell.color = "#000000";
                field[y][x] = cell;
            }
        }

        cellSpaceX = (1000 / sizeX);
        cellSpaceY = (500 / sizeY);

        cellSizeX = cellSpaceX - CELL_PADDING;
        cellSizeY = cellSpaceY - CELL_PADDING;

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