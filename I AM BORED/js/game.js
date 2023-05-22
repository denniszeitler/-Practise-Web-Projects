const characterName = document.getElementById("charactername");
const character = document.getElementById("character");
const hair = document.getElementById("hair");
const challenge = document.getElementById("challenge");
const exp = document.getElementById("exp");
const savedcharacter = JSON.parse(localStorage.getItem("character"));


const tasks = [
    { task: "Do 10 Pushups", exp: 10 },
    { task: "Go outside and walk for 15 Minutes", exp: 30 },
    { task: "Make a fruit salad", exp: 20 },
    { task: "Listen to one of your favourite Songs", exp: 10 }
];
// https://www.w3schools.com/howto/howto_js_countdown.asp





window.onload = function(){
    loadCharacter();
    showtask();
};

function loadCharacter() {
    console.log(savedcharacter);
    characterName.innerText = savedcharacter[0];
    hair.classList.add(savedcharacter[1]);
    character.classList.add(savedcharacter[2]);
};


function showtask(){
    console.log(tasks);
    const randomIndex = Math.floor(Math.random() * tasks.length); 
    const singletask = tasks[randomIndex];

    challenge.textContent = singletask.task;
    exp.textContent = singletask.exp;

};

