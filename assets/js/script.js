const inputOne = document.querySelector('#from');
const inputTwo = document.querySelector('#to');
const coinOne = document.querySelector('#coins1');
const coinTwo = document.querySelector('#coins');
let moedas;
let euro;
let dolar;

inputOne.focus();

function getData () {
    axios('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
    .then( response => render(response.data))
    .catch( e => console.log(e));
}
getData();

setInterval(() => {getData()}, 31000);

function render(response){
    const coins = [ 'USDBRL', 'EURBRL']
    moedas = response;
    dolar = Number(response.USDBRL.bid);
    euro = Number(response.EURBRL.bid);
    for ( i of coins) updateValue(i, response[i]);
    updateTime();
}

function updateValue (parent, dados) {
    const container = document.querySelector(`#${parent} .insert`);
    container.removeChild(document.querySelector(`#${parent} .insert h3`));
    const valor = document.createElement('h3');
    valor.classList.add('cotation');
    valor.innerHTML = 'R$ ' + Number(dados.bid).toFixed(2);
    container.appendChild(valor);
}

function updateTime() {
    const myData = new Date();
    const dataPTBR = myData.toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
    const dates = document.querySelectorAll('.date');
    dates.forEach(e => { e.innerHTML = dataPTBR
    });
}

///// calcula

document.addEventListener( 'click', e => {
    e.preventDefault();
    if(e.target.id === 'calc') calculate();
    if(e.target.id === 'switch' || e.target.id === 'icon') invert();
});

document.addEventListener( 'keypress', e => {
    if(e.key === 'Enter') {
        e.preventDefault();
        calculate();
    }
});

function calculate () {
    let result;
    
    if(coinOne.value =='real'){
        if(coinTwo.value == 'dolar') result = Number(inputOne.value) / dolar;
        if(coinTwo.value == 'euro') result = Number(inputOne.value) / euro;
        if(coinTwo.value == 'real') result = 0.000;
    }
    if(coinOne.value =='dolar'){
        if(coinTwo.value == 'real') result = Number(inputOne.value) * dolar;
        if(coinTwo.value == 'euro') result = Number(inputOne.value) * dolar / euro;
        if(coinTwo.value == 'dolar') result = 0.000;
    }
    if(coinOne.value =='euro'){
        if(coinTwo.value == 'real') result = Number(inputOne.value) * euro;
        if(coinTwo.value == 'dolar') result = Number(inputOne.value) * euro / dolar;
        if(coinTwo.value == 'euro') result = 0.000;
    }
    inputTwo.value = result.toFixed(2);
};

function invert() {
    [coinOne.value, coinTwo.value] = [coinTwo.value, coinOne.value];
    console.log('oi');
    calculate();
}