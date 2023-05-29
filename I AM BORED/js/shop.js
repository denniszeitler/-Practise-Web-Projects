const savedcharacter = JSON.parse(localStorage.getItem("character"));
const unlockables = document.getElementsByClassName("color-div");
const colors = JSON.parse(localStorage.getItem("colors"));
const eyecolors = JSON.parse(localStorage.getItem("eyecolors"));
const currentLevel = savedcharacter[5];


window.onload = function(){
    UnlockColors(currentLevel);
};

function GoBackToGame(){
    location.replace("./game.html");
};


function UnlockColors(level) {

    for (var i = 0; i < unlockables.length; i++){

        let levelAsInt = parseInt(unlockables[i].classList[2].substring(6,7));
        if(level >= levelAsInt){
            unlockables[i].innerHTML = "&#10004;";
            let newColor = (unlockables[i].classList[1]).substring(6,unlockables[i].classList[1].length);
            if(unlockables[i].classList[3] == "body"){
                colors.push(newColor);
                localStorage.setItem("colors", JSON.stringify(colors));
            } else {
                eyecolors.push(newColor);
                localStorage.setItem("eyecolors", JSON.stringify(eyecolors));
            };
        };
    };
};

