
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    let rangex = canvas.width/40;
    let rangey = canvas.height/20
    let number = -20;
    truthTableRPN = {
    '(' : 0,
    '+' : 1,
    '-' : 1,
    ')' : 1,
    '*' : 2,
    '/' : 2,
    '%' : 2,
    '^': 3
    }
    arrayFunction =[]
    stos =[]

    drawNet()
    drawNumericalInterval()
    drawAxes()
    ctx.translate(centerX, centerY);

    function drawAxes(){
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.stroke();
        ctx.closePath()
    }
    
    function drawNumericalInterval(){
        for(i=0; i<=canvas.width; i+=rangex) {
            ctx.beginPath();
            ctx.fillText(number, i, centerY - 9)
            number++
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.font = "10px Arial"
            ctx.strokeStyle = "black";
            ctx.moveTo(i, centerY - 5);
            ctx.lineTo(i, centerY + 5);
            ctx.stroke();
        }

        number = 10

        for(i=0; i<=canvas.height; i+=rangey) {
            ctx.beginPath();
            ctx.fillText(number, centerX - 9, i )
            number--
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.font = "10px Arial"
            ctx.strokeStyle = "black";
            ctx.moveTo(centerX - 5, i);
            ctx.lineTo(centerX + 5, i);
            ctx.stroke();
        }
    }

    function drawNet(){
        for(i=0; i<=canvas.width; i+=rangex){
            ctx.moveTo(i, 0);
            ctx.strokeStyle = "rgba(180, 180, 180, 0.2)";
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
            ctx.closePath()
        }
        for(i=0; i<=canvas.height; i+=rangey) {
            ctx.moveTo(0, i);
            ctx.strokeStyle = "rgba(180, 180, 180, 0.2)";
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
            ctx.closePath()
        }
    }

    function getValue(znak){
        let returnvalue = truthTableRPN[znak] ?? -1
        return returnvalue
    }

    function createRPNUserFunction(){
        const myFunction = document.querySelector("#myFunction").value
        const check = document.querySelector(".siemka")
        myFunction.replace(/\s/g, '');
        charArray = myFunction.match(/([\w\d]+)|[-\+\*\/\^\(\)]/g)

        for(i=0; i< charArray.length; i++){
            console.log(stos)
            console.log(arrayFunction)

            char = charArray[i]
            if (/[a-z0-9]/.test(char)){
                arrayFunction.push(char)
            }
            else if(i == 0 && char == '-'){
                stos.push(char)
                arrayFunction.push(0)
            }
            else if(stos[stos.length-1] == '(' && char == '-'){
                stos.push(char)
                arrayFunction.push(0)
            }
            else if(char === ')'){
                while(stos[stos.length-1] !== '('){
                    arrayFunction.push(stos[stos.length-1])
                    stos.pop()
                }
                stos.pop()
            }
            else if(char == '+' || char == '-' || char == '/' || char == '*' || char == '^' || char == '%'){
                while (getValue(char) <= getValue(stos[stos.length-1])) {
                arrayFunction.push(stos[stos.length-1])
                stos.pop()}
                stos.push(char)
            }
            else stos.push(char)
        }

        arrayFunction.push(stos[0])
        stos=''
        for (var i = 0; i < arrayFunction.length; i++) {
            if(arrayFunction[i] == '^') arrayFunction[i] = arrayFunction[i].replace('^', "**");
        }
        
        return arrayFunction
        
        // check.innerHTML += "pokaż stos: "+stos+'<br>'
        // check.innerHTML += "pokaż wyjście: "+arrayFunction+'<br>'
        // arrayFunction =[]
        // stos =[]
    }

    function changeValuesOfX(number, func){
            let temparrayFunction = func.slice();
            for(i=0; i < temparrayFunction.length; i++){
                if(temparrayFunction[i] == 'x') temparrayFunction[i] = number;
            }
            return temparrayFunction
    }

    function countYParameterFunction(func){
        stos = []

        for(i=0; i < func.length; i++){
            if(/[0-9]/.test(func[i])){
                stos.push(func[i])
            }
            else{
                a = stos[stos.length-1]
                stos.pop()
                b = stos[stos.length-1]
                stos.pop()
                stos.push(mathCalc(Number(b),Number(a), func[i]))
            }
        }
        return stos.pop()
    }

    function mathCalc(firstVar, secondVar, operator){
        switch(operator){
            case '**':
                return result = firstVar ** secondVar
            break;
            case '%':
                return result = firstVar % secondVar
            break;
            case '*':
                return result = firstVar * secondVar
            break;
            case '/':
                return result = firstVar / secondVar
            break;
            case '+':
                return result = firstVar + secondVar
            break;
            case '-':
                return result = firstVar - secondVar
            break;
        }
    }

    function drawFunctionGraph(arrayFunction){
        counter = 0
        let color = document.querySelector('#color').value;
        let rangex = canvas.width/40;
        let rangey = canvas.height/20
        let maxPlusX = centerX
        let maxMinusY = -centerY
        let maxMinusX = -centerX
        let maxPlusY = centerY
        for (let number = -20; number <= 20; number+=0.1) {
            array = changeValuesOfX(number, arrayFunction)
            y = (countYParameterFunction(array))
            x = number* rangex
            y *= -rangey
            console.log(x, y);

            if(counter == 0 && y>=maxMinusY && y<=maxPlusY && x>maxMinusX && x<maxPlusX){
                ctx.beginPath()
                ctx.strokeStyle = color
                ctx.moveTo(tempX, tempY);
                ctx.lineTo(x, y)
                ctx.stroke() 
                i++
                counter++
            }

            else if(counter>0) {
                ctx.strokeStyle = color
                ctx.lineTo(x, y)
                ctx.stroke()
                ctx.moveTo(x, y); 
                i++
                counter++
            }
            else{
                tempX = x
                tempY = y
                continue
            } 

            ctx.closePath()
        }
    }

    function clearReact(){
        ctx.translate(-centerX, -centerY);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        number = -20;
        drawNet()
        drawNumericalInterval()
        drawAxes()
        ctx.translate(centerX, centerY);
    }

    function createNewGraphFunction(){
        arrayFunction = createRPNUserFunction()
        drawFunctionGraph(arrayFunction)
        arrayFunction =[]
        stos =[]
    }
