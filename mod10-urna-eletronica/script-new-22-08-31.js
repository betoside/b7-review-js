let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';

// limpar a tela
// pegar as infos da etapa atual
// preencher o que precisa ser preenchido
function comecarEtapa(){
    
    let etapa = etapas[etapaAtual];

    let numeroHtml = ``;

    for(let i=0; i<etapa.numeros; i++){
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}

function atualizaInterface(){
    console.log('finalizou de digitar o voto');
}

function clicou(n){
    console.log('clicou', n);
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling != null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}
function branco(){
    console.log('clicou: branco');
}
function corrige(){
    console.log('clicou: corrige');
}
function confirma(){
    console.log('clicou: confirma');
}

comecarEtapa();