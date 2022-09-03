let seletor = (e)=>document.querySelector(e);

seletor('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = seletor('#searchInput').value;
    // console.log('input',input);

    if(input !== ''){
        clearInfo();
        showWarning('...carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d55105130400e0aa9b93c6da0895e63b&units=metric&land=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        console.log(json);

        if(json.cod === 200){
            showInfo({
                name: json.name,
                pais: json.sys.country,
                temperatura: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização: "'+input+'"');
        }

    } else {
        clearInfo();
    }
});

function showInfo(json){
    showWarning('');
    seletor('.titulo').innerHTML = `${json.name}, ${json.pais}`;
    seletor('.tempInfo').innerHTML = `${json.temperatura} <sup>ºC</sup>`;
    seletor('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    seletor('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    seletor('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
    seletor('.resultado').style.display = 'block';
    // console.log(json.windAngle-90);
}

function showWarning(msg){
    seletor('.aviso').innerHTML = msg;
}

function clearInfo(){
    seletor('.resultado').style.display = 'none';
    seletor('.aviso').innerHTML = '';
}