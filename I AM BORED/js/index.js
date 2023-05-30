const characterName = document.getElementById("charactername");
const character = document.getElementById("charactermiddle");
const characterleft = document.getElementById("characterleft");
const characterright = document.getElementById("characterright");
const eye = document.getElementsByClassName("eye");
const savedcharacter = JSON.parse(localStorage.getItem("character"));
const characterAction = localStorage.getItem("characterAction");



const PushColors = ["white","red","blue"];
const PushEyeColors = ["blonde","red"];
let colors = [];
let eyecolors = [];


if(!(characterAction == 0)) {
    localStorage.setItem("colors", JSON.stringify(PushColors));
    localStorage.setItem("eyecolors", JSON.stringify(PushEyeColors));
} 
colors = JSON.parse(localStorage.getItem("colors"));
eyecolors = JSON.parse(localStorage.getItem("eyecolors"));

let ibody = 0;
let ieye = 0;


window.onload = function(){
    ChangeEyeColor();
    ChangeBodyColor();
    characterexist();
};



function characterexist(){
    if(characterAction == 1){
        location.replace("./game.html");
    }

};

function ChangeBodyColor(){

    if(character.className.length == 0){
        character.classList.add("color-" + colors[ibody]);
        characterleft.classList.add("color-" + colors[ibody]);
        characterright.classList.add("color-" + colors[ibody]);
    }
    else{
        character.classList.remove(character.className);//clear current color
        characterleft.classList.remove(characterleft.className);
        characterright.classList.remove(characterright.className);
    }


    if(ibody == colors.length){
        ibody = 0; //Reset i
        character.classList.add("color-" + colors[ibody]);
        characterleft.classList.add("color-" + colors[ibody]);
        characterright.classList.add("color-" + colors[ibody]);
        ibody++;
    }
    else {
        character.classList.add("color-" + colors[ibody]);
        characterleft.classList.add("color-" + colors[ibody]);
        characterright.classList.add("color-" + colors[ibody]);
        ibody++;
    }
};

function ChangeEyeColor(){

    if(eye[0].className.length == 0){
        eye[0].classList.add("color-" + eyecolors[ieye]);
        eye[1].classList.add("color-" + eyecolors[ieye]);
    }
    else{
        eye[0].classList.remove("color-" + eyecolors[ieye - 1]);
        eye[1].classList.remove("color-" + eyecolors[ieye - 1]);
    }


    if(ieye == eyecolors.length){
        ieye = 0; //Reset i
        eye[0].classList.add("color-" + eyecolors[ieye]);
        eye[1].classList.add("color-" + eyecolors[ieye]);
        ieye++;
    }
    else {
        eye[0].classList.add("color-" + eyecolors[ieye]);
        eye[1].classList.add("color-" + eyecolors[ieye]);
        ieye++;
    }
};



function CreateCharacter(){

    let CharacterSettings = [];

    if(characterAction == 0){
        CharacterSettings.push(characterName.value, character.className, eye[0].className.substring(10,22), savedcharacter[3], savedcharacter[4], savedcharacter[5]);
    } else {
        CharacterSettings.push(characterName.value, character.className, eye[0].className.substring(10,22), 0, 0, 0);
        // blank EXP einfügen!
    }

    localStorage.setItem("character", JSON.stringify(CharacterSettings));
    localStorage.setItem("characterAction", "1"); 
    // 0 - edit
    // 1 - created
    location.replace("./game.html");
};