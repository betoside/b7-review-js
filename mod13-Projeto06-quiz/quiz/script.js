selec = (e)=>document.querySelector(e);
selecAll = (e)=>document.querySelectorAll(e);

// initial data
let currentQuestion = 0;
let correctAnswers = 0;
showQuestion();

// events
selec('.scoreArea button').addEventListener('click', resetEvent);


// functions
function showQuestion(){
    if( questions[currentQuestion]){
        let q = questions[currentQuestion];
        
        let pct = (currentQuestion / questions.length) * 100;
        selec('.progress--bar').style.width = Math.round(pct)+'%';

        selec('.scoreArea').style.display = 'none';
        selec('.questionArea').style.display = 'block';

        selec('.question').innerHTML = q.question;
        selec('.options').innerHTML = '';

        // OBS: forma com melhor performance de uso de memória do computer
        let optionsHtml = '';
        for(let i in q.options){
            optionsHtml += `<div class="option" data-op="${i}}"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;
        }
        selec('.options').innerHTML = optionsHtml;

        selecAll('.options .option').forEach(element => {
            element.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuizz();
    }

}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers++;
    }
    // nesse caso interessa saber apenas os acertos
    currentQuestion++;
    showQuestion();

}

function finishQuizz(){
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30){
        selec('.scoreText1').innerHTML = 'Tá ruim em!?';
        selec('.scorePct').style.color = '#f00';
    } else if(points >= 30 && points < 70){
        selec('.scoreText1').innerHTML = 'Tá bom!?';
        selec('.scorePct').style.color = '#ff0';
    } else if(points >= 70){
        selec('.scoreText1').innerHTML = 'Parabéns!';
        selec('.scorePct').style.color = '#0d630d';
    }
    
    selec('.scorePct').innerHTML = `Acertou ${points}%`;
    selec('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    selec('.scoreArea').style.display = 'block';
    selec('.questionArea').style.display = 'none';
    selec('.progress--bar').style.width = '100%';
}

function resetEvent(){
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}