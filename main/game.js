function main() {
    var canvas;

    function init() {
        document.write('<canvas id="myCanvas" width="1000" height="500" ></canvas>');
        document.write('<style>\n' +
            '        * { padding: 0; margin: 0; }\n' +
            '        canvas { background-image: url("fire.jpg"); display: block; margin: 150px auto; }\n' +
            '    </style>');
        document.getElementById("startButton").style.display = "none";
        var ctx = canvas.getContext("2d");
        canvas = document.getElementById("myCanvas");
    }

    init();


}