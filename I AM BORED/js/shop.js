const savedcharacter = JSON.parse(localStorage.getItem("character"));

function GoBackToGame(){
    location.replace("./game.html");
};


let color = document.getElementById("color");

console.log(savedcharacter[5]);
