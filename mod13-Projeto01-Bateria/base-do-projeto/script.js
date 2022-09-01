const seletor = (el)=>document.querySelector(el);
const seletorAll = (el)=>document.querySelectorAll(el);

document.body.addEventListener('keyup', (event)=>{
    // console.log('event.code: ', event.code.toLowerCase());
    playSound(event.code.toLowerCase());
});

seletor('.composer button').addEventListener('click', ()=>{
    let song = seletor('#input').value;
    if(song !== ''){
        let songArray = song.split('');
        playComposition(songArray);
    }
});

function playSound(sound){
    let audioElement = seletor(`#s_${sound}`);
    let keyElement = seletor(`div[data-key="${sound}"]`);
    console.log('sound: ', sound);
    console.log(keyElement);

    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if(keyElement){
        keyElement.classList.add('active');

        setTimeout(() => {
            keyElement.classList.remove('active');
        }, 300);
    }
}

function playComposition(songArray){
    let wait = 0;

    for(let songItem of songArray){

        setTimeout(() => {
            playSound(`key${songItem}`);
        }, wait);

        wait += 250;
    }
}