// initial data 
let selec = (e)=>document.querySelector(e);
let selecAll = (e)=>document.querySelectorAll(e);

let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = selec('#tela');
let ctx = screen.getContext('2d');


// events
selecAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

/*
Passo a passo para desenhar no canvas:
- Quando o click do mouse ABAIXAR, ative o modo desenho.
- Quando o mouse se MOVER, se o modo desenho estiver ativado, desenhe.
- Quandoo click do mouse LEVANTAR, desative o modo desenho.
*/ 
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
selec('.clear').addEventListener('click', clearScreen);

// functions
function colorClickEvent(e){
    let color = e.target.getAttribute('data-color');
    // console.log('cor clicada: ', color);

    currentColor = color;
    selec('.color.active').classList.remove('active');
    e.target.classList.add('active');
}


function mouseDownEvent(e){
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e){
    if(canDraw){
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent(){
    canDraw = false;
}

function draw(x, y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop; 

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    console.log('width: ' + ctx.canvas.width, 'height: ' + ctx.canvas.height);
}