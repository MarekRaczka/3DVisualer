<!DOCTYPE html>
<html>
<head>
    <title>Kartezjański układ współrzędnych z funkcją</title>
    <style>
        #canvas {
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <h2>Podaj funkcję: </h2>
    <input type="text" id="functionInput" placeholder="np. x*x+2*x-3">
    <button onclick="drawFunction()">Narysuj</button>
    <br>
    <h2>Przedział osi X:</h2>
    <label for="minX">Min X:</label>
    <input type="number" id="minX" value="-10">
    <label for="maxX">Max X:</label>
    <input type="number" id="maxX" value="10">
    <br>
    <h2>Przedział osi Y:</h2>
    <label for="minY">Min Y:</label>
    <input type="number" id="minY" value="-10">
    <label for="maxY">Max Y:</label>
    <input type="number" id="maxY" value="10">
    <br>
    <canvas id="canvas" width="400" height="400"></canvas>

    <script>
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var scaleX = 20;
        var scaleY = 20;

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function drawAxes() {
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(canvas.width, centerY);
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, canvas.height);
            ctx.strokeStyle = "black";
            ctx.stroke();

            // Oznaczenia na osi X
            var minX = parseFloat(document.getElementById('minX').value);
            var maxX = parseFloat(document.getElementById('maxX').value);
            var minY = parseFloat(document.getElementById('minY').value);
            var maxY = parseFloat(document.getElementById('maxY').value);
            var stepX = 1;
            var stepY = 1;

            for (var i = Math.floor(minX); i <= Math.ceil(maxX); i += stepX) {
                var xPos = centerX + i * scaleX;
                ctx.fillText(i, xPos, centerY + 15);
            }

            // Oznaczenia na osi Y
            for (var j = Math.floor(minY); j <= Math.ceil(maxY); j += stepY) {
                var yPos = centerY - j * scaleY;
                ctx.fillText(j, centerX + 5, yPos);
            }
        }

        function drawFunction() {
            clearCanvas();
            drawAxes();

            var functionInput = document.getElementById('functionInput').value;
            var minX = parseFloat(document.getElementById('minX').value);
            var maxX = parseFloat(document.getElementById('maxX').value);

            ctx.beginPath();
            var x = minX;
            var step = 0.01;

            while (x <= maxX) {
                var y = -eval(functionInput) * scaleY;
                ctx.lineTo(centerX + x * scaleX, centerY + y);
                x += step;
            }

            ctx.strokeStyle = "blue";
            ctx.stroke();
        }
    </script>
</body>
</html>