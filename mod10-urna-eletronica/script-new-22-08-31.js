let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

// limpar a tela
// pegar as infos da etapa atual
// preencher o que precisa ser preenchido
function comecarEtapa(){
    
    let etapa = etapas[etapaAtual];

    let numeroHtml = ``;
    numero = '';
    votoBranco = false;

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

    console.log('finalizou de digitar o voto: ', numero);

    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else {
            return false;
        }
    });

    console.log('candidato', candidato);

    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br>Partido: ${candidato.partido}`;
        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += '<div class="d-1-image small">';
            } else {
                fotosHtml += '<div class="d-1-image">';
            }
            fotosHtml += `  <img src="images/${candidato.fotos[i].url}" alt="">`;
            fotosHtml += `  ${candidato.fotos[i].legenda}`;
            fotosHtml += '</div>';

        }
        lateral.innerHTML = fotosHtml;
    } else { // VOTO NULO
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso-grande">Voto Nulo</div>`;

    }

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

    // console.log('numero:', numero);
}

function branco(){
    console.log('clicou: branco');

    numero = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = `<div class="aviso-grande">Voto em Branco</div>`;
    lateral.innerHTML = '';

    // if( numero === ''){
    //     votoBranco = true;
    //     seuVotoPara.style.display = 'block';
    //     aviso.style.display = 'block';
    //     numeros.innerHTML = '';
    //     descricao.innerHTML = `<div class="aviso-grande">Voto em Branco</div>`;
    // } else {
    //     alert('Para votar em branco não pode ter digitado nenhum número');
    // }
}
function corrige(){
    console.log('clicou: corrige');
    comecarEtapa();
}

function confirma(){
    console.log('clicou: confirma');
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco === true){
        console.log('confirmando como BRANCO');
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        });
    } else if(numero.length === etapa.numeros) {
        console.log('confirmando como:', numero);
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    
    if(votoConfirmado){
        etapaAtual++;
        console.log( etapas[etapaAtual] );

        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            console.log('FIM');
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();