const characterName = document.getElementById("charactername");
const character = document.getElementById("character");
const hair = document.getElementById("hair");
const savedcharacter = JSON.parse(localStorage.getItem("character"))

const colors = ["white","red","blue"];
const haircolors = ["blonde","red"];

let ibody = 0;
let ihair = 0;

console.log(savedcharacter.length);

window.onload = function(){
    characterexist();
    ChangeHairColor();
    ChangeBodyColor();
};



function characterexist(){
    if(savedcharacter.length > 0){
        location.replace("./game.html");
    }

};

function ChangeBodyColor(){

    if(character.className.length == 0){
        character.classList.add("color-" + colors[ibody]);
    }
    else{
        character.classList.remove(character.className); //clear current color
    }


    if(ibody == colors.length){
        ibody = 0; //Reset i
        character.classList.add("color-" + colors[ibody]);
        ibody++;
    }
    else {
        character.classList.add("color-" + colors[ibody]);
        ibody++;
    }
};

function ChangeHairColor(){

    if(hair.className.length == 0){
        hair.classList.add("color-" + haircolors[ihair]);
    }
    else{
        hair.classList.remove(hair.className);
    }


    if(ihair == haircolors.length){
        ihair = 0; //Reset i
        hair.classList.add("color-" + haircolors[ihair]);
        ihair++;
    }
    else {
        hair.classList.add("color-" + haircolors[ihair]);
        ihair++;
    }
};



function CreateCharacter(){
    let CharacterSettings = [];
    CharacterSettings.push(characterName.value, hair.className, character.className);
    // blank EXP einfügen!

    localStorage.setItem("character", JSON.stringify(CharacterSettings));
    location.replace("./game.html");
};