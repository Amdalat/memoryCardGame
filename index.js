let carddivs = [];

const values = ['a', 'b', 'c', 'd', 'e'];
let doubledvals = randomfunc();
console.log(doubledvals);

let remainingcards = [];
let selected = [];
let count = 0;
let duration = 60;
let interval;

const containerdiv = document.getElementById('container');
const resultdiv = document.getElementById('result');
const timerdiv = document.getElementById('timer');
const startbtn = document.getElementById('start');
const restartbtn = document.getElementById('restart');

resultdiv.style.color = 'white';


function loadgame() {    
    timerdiv.innerHTML = timer();

    doubledvals.forEach((item) => {
        const card = document.createElement('div');
        card.innerHTML = `<p>${item[0]}</p>`;
        card.classList.add('card');
        card.id = item;
        card.classList.add('disabled');

        setTimeout(()=>{
            card.innerHTML = ``;
            card.classList.remove('disabled');

        }, 3000)

        containerdiv.appendChild(card);
        carddivs.push(card);
    });

    for (let i = 0; i < carddivs.length; i++) {
        remainingcards.push(carddivs[i]);
    }
    console.log(remainingcards);

    remainingcards.forEach(item => {
        item.addEventListener('click', (e)=>{
            const clic = e.currentTarget;
            console.log(clic);
            
            item.classList.add('clicked');
            gametracking(item);
        })
    })
}

function gametracking(item) {
    if (selected.length < 2) {
        selected.push(item);  
        // console.log(`You played ${item.id[0]}`);
    }

    if (selected.length == 2) {
        if (selected[0].id == selected[1].id) {
            selected.pop();
        } else{
            if (selected[0].id[0] == selected[1].id[0]) {
                count++;
                // console.log(`You played ${selected[0].id[0]} and ${selected[1].id[0]} <br> Pass. Current Score: ${count}`);

                for (let i = remainingcards.length - 1; i >= 0; i--) {
                    if (remainingcards[i].id[0] === selected[0].id[0]) {
                        remainingcards[i].innerHTML = `<p>${remainingcards[i].id[0]}</p>`
                        remainingcards[i].classList.add('disabled');
                        remainingcards.splice(i, 1);
                    }
                }

            } else {
                carddivs.forEach(item => {   
                    setTimeout(()=>{
                        if (item.classList == 'card clicked') {
                            item.classList.remove('clicked');
                        }
                    }, 1000)         
                })
                // console.log(`You played ${selected[0].id[0]} and ${selected[1].id[0]} <br> Miss. Current Score: ${count}`);
            }
            
            resultdiv.innerHTML = `Current Score:  ${count} <br>`;
            selected = [];
        }
    }

    if (count == 5) {
        resultdiv.innerHTML += `YOU WON`;
        clearInterval(interval);
        startbtn.disabled = true;
    }
}

function randomfunc() {
    let doubles = [];
    let scattered = [];;

    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < 2; j++) {
            doubles.push(values[i]+j);
        }
    }
    // console.log(doubles);    

    while (doubles.length !== 0) {
        let num = Math.floor(Math.random()*doubles.length);
        // console.log(num);
        scattered.push(doubles[num]);
        doubles.splice(num,1);
    }

    // console.log(scattered);
    return scattered;
}

function timer() {
    let min = Math.floor(duration / 60);
    let sec = duration % 60;

    if (duration <= 0) {
        clearInterval(interval);
        carddivs.forEach(item => {
            item.innerHTML = `<p>${item.id[0]}</p>`;
            item.classList.add('disabled');
            startbtn.disabled = true;
        })
        resultdiv.innerHTML += `YOU LOST`;
    } else{
        duration--;
    }


    (min < 10) ? min = '0'+ min : null;
    (sec < 10) ? sec = '0'+ sec : null;

    timerdiv.innerHTML = `<h1>${min}:${sec}</h1>`;

    return `<h1>${min}:${sec}</h1>`;
}

function countdown() {
    interval = setInterval(timer, 1000);
}

startbtn.addEventListener('click', ()=>{
    if (startbtn.innerText == 'Start') {
        setTimeout(countdown, 3000);
        // countdown();
        loadgame();
        startbtn.innerText = 'Pause';
        restartbtn.classList.remove('hide');
    } else if (startbtn.innerText == 'Pause') {
        clearInterval(interval);
        startbtn.innerText = 'Play';    
    } else if (startbtn.innerText == 'Play') {
        countdown();
        startbtn.innerText = 'Pause';    
    }
})

restartbtn.addEventListener('click', ()=>{
    clearInterval(interval);
    duration = 60;

    carddivs = [];
    doubledvals = randomfunc();
    remainingcards = [];
    selected = [];
    count = 0;
    resultdiv.innerHTML = '';
    containerdiv.innerHTML = '';
    startbtn.innerText = 'Pause';
    startbtn.disabled = false;

    setTimeout(countdown, 3000);
    loadgame();
})

// window.addEventListener('load', loadgame);