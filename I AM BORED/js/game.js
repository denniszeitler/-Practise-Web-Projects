const characterName = document.getElementById("charactername");
const character = document.getElementById("charactermiddle");
const characterleft = document.getElementById("characterleft");
const characterright = document.getElementById("characterright");
const eye = document.getElementsByClassName("eye");
const task = document.getElementById("task");
const challenge = document.getElementById("challenge");
const level = document.getElementById("level");
const experience = document.getElementById("experience");
const exp = document.getElementById("exp");
const timer = document.getElementById("timer");
const savedcharacter = JSON.parse(localStorage.getItem("character"));


const tasks = [
    { task: "Do 10 Pushups", exp: 10, timer: 2 },
    { task: "Go outside and walk for 15 Minutes", exp: 30, timer: 15 },
    { task: "Make a fruit salad", exp: 20, timer: 10 },
    { task: "Listen to one of your favourite Songs", exp: 10, timer: 4 }
];

const stats = [
    {level: 1, exp: 10},
    {level: 2, exp: 40},
    {level: 3, exp: 100},
    {level: 4, exp: 200},
    {level: "MAX", exp: 400},
];


function ReturnLevel() {

    var formatedexperience = parseInt(experience.innerText.substring(5,experience.innerText.length));

    for(var i= 0; i < stats.length; i++){
        if(formatedexperience <= stats[i].exp){
            break;
        }
        
    };
    level.innerHTML = "Level: " + stats[i].level;
};

window.onload = function(){
    UpdateStats();
    loadCharacter();
    showtask();
    ReturnLevel();
};

function loadCharacter() {
    console.log(savedcharacter);
    characterName.innerText = savedcharacter[0];
    characterleft.classList.add(savedcharacter[1]);
    character.classList.add(savedcharacter[1]);
    characterright.classList.add(savedcharacter[1]);
    eye[0].classList.add(savedcharacter[2]);
    eye[1].classList.add(savedcharacter[2]);
};

function UpdateStats(){
    level.innerText = "Level " + savedcharacter[3];
    experience.innerText = "EXP: " + savedcharacter[4];
}


function showtask(){
    console.log(tasks);
    const randomIndex = Math.floor(Math.random() * tasks.length); 
    const singletask = tasks[randomIndex];

    challenge.textContent = singletask.task;
    exp.textContent = singletask.exp;
    timer.textContent = singletask.timer + " minutes to complete";

    task.onclick = function() {
        StartTask(singletask.timer, singletask.exp);
    };

};

const countdown = document.getElementById("countdown");


function StartTask(time, exp) {
    var count = time * 60; // in Sekunden umrechnen
    var interval = setInterval(function(){
        var minutes = Math.floor(count / 60); // Minuten berechnen
        var seconds = count % 60; // Sekunden berechnen

        // Formatierung der Minuten und Sekunden (z.B. "01:30" für 1 Minute und 30 Sekunden)
        var formattedTime = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);

        countdown.innerText = formattedTime; // Countdown-Anzeige aktualisieren

        count--; // Countdown verringern

        if (count < 0) {
            clearInterval(interval); // Timer stoppen
            savedcharacter[4] = savedcharacter[4] + exp;
            localStorage.setItem("character", JSON.stringify(savedcharacter));
            location.reload();
        }
    }, 1000);
}



function OpenShop() {
    location.replace("./shop.html");
}

