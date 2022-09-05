let selec = (e)=>document.querySelector(e);
let selecAll = (e)=>document.querySelectorAll(e);

//  Dados iniciais
// precisamos de uma copia do que tem no tabuleiro
let square = {
    a1:'', a2:'', a3:'',
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''
};

let player = '';
let warning = '';
let playing = false;

reset();

//  Eventos
selec('.reset').addEventListener('click', reset);

selecAll('.item').forEach(item => {
    item.addEventListener('click', itemClique);
});

// Funções
function itemClique(evento){
    let item = evento.target.getAttribute('data-item');

    if( playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

function reset(){
    warning = '';

    let random = Math.floor( Math.random() * 2 );
    if(random === 0){
        player = 'x';
    } else {
        player = 'o';
    }

    for (let key in square) {
        square[key] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare(){

    for (let key in square) {
        let item = selec(`div[ data-item=${key}]`);

        // if(square[key] !== ''){
        //     item.innerHTML = square[key];
        // } else {
        //     item.innerHTML = '';
        // }
        item.innerHTML = square[key];
        checkGame();
    }
}

function renderInfo(){
    selec('.vez').innerHTML = player;
    selec('.resultado').innerHTML = warning;
}

function togglePlayer(){
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame(){
    if(checkWinnerfor('x')){
        warning = "O 'x' venceu";
        playing = false;
    } else if( checkWinnerfor('o') ) {
        warning = "O 'o' venceu";
        playing = false;
    } else if(isFull()){
        warning = "Deu empate";
        playing = false;
    }

}

function checkWinnerfor(player){

    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a3,b2,c1',
        'a1,b2,c3'
    ];

    for(let w in pos){
        let pArray = pos[w].split(','); // 'a1, a2, a3'

        // DE:
        // pArray.every((option)=>{
        //     if( square[option] === player ){
        //         return true;
        //     } else {
        //         return false;
        //     }

        // });

        // PARA:
        let hasWon = pArray.every( option => (square[option] === player) );
        if(hasWon){
            return true;
        }
    }

    return false;

}

function isFull(){

    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }

    return true;

}