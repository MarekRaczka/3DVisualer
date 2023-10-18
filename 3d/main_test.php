<!doctype html>
<html><head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<title>Rysowanie wykresów funkcji 2d</title>
</head>
	<body>
		<canvas style="border:1px solid black;" id="obrazek" width="800" height="600"></canvas>
		<input type="text" name="function" id="function" value="" />
		<input type="submit" name="button" id="button" value="Rysuj" />
		<button id="clear">czyść</button><br />
		Kolor linii: <select id="color">
		<option value="green">Zielony</option>
		<option value="red">Czerwony</option>
		<option value="blue">Niebieski</option>
		</select><br/>
		<script type="text/javascript" src="jquery-1.4.2.js"></script>
		<script type="text/javascript" src="main.js"></script>
	</body>
</html> 

<script>

var canvas = document.getElementById('obrazek');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var range = 100;
var bl = 1;
var rangex = w/range;
var rangey = h/range;
var color = "green";

function grid()
{
	ctx.strokeStyle = "black";
	for(i=1;i<=Math.floor(rangex*2);i++)
	{
		ctx.lineWidth = 1/6;
		ctx.beginPath();
		ctx.moveTo((range/2)*i,0);
		ctx.lineTo((range/2)*i,h);
		ctx.closePath();
		ctx.stroke();
	}
	for(i=1;i<=Math.floor(rangey*2);i++)
	{
		ctx.lineWidth = 1/6;
		ctx.beginPath();
		ctx.moveTo(0,(range/2)*i);
		ctx.lineTo(w,(range/2)*i);
		ctx.closePath();
		ctx.stroke();
	}
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(0,h/2);
	ctx.lineTo(w,h/2);
	ctx.closePath();
	ctx.stroke();
 
	ctx.beginPath();
	ctx.moveTo(w/2,0);
	ctx.lineTo(w/2,h);
	ctx.closePath();
	ctx.stroke();
	for(i=-(rangex/2);i<=(rangex/2);i++)
	{
		ctx.fillText(i,(i+(rangex/2))*range,h/2);
	}
	ctx.save();
}
grid();

ctx.closePath();
ctx.stroke();

function start_settings()
{
	ctx.translate(w/2, h/2);
	ctx.scale(range,range);
}
start_settings();

function plot()
{
	ctx.strokeStyle = color;
	ctx.lineWidth = 1/50;
	var f = document.getElementById("function").value;
	var fun1 = new Function("x", "return "+f);
	ctx.beginPath();
	for(x=-rangex;x<=rangex;x+=0.01)
	{
		y = fun1(x);
		if(y!='')
		{
			if (isNaN(y) || (y == Number.NEGATIVE_INFINITY) ||
			(y == Number.POSITIVE_INFINITY) || (Math.abs(y) > 2e5)) {
			bl = 2;
			y = 0.0;
			}
			if (bl > 0)
			{
				if (bl == 1)
				{
					ctx.moveTo(x, -y);
				}
				--bl;
			}
			else {
				ctx.lineTo(x, -y);
			}
		}
 
	}
	ctx.stroke();
}

document.getElementById("button").onclick = plot;

</script>