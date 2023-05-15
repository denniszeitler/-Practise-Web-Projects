var input; //Input-Feld für title & task
var taskdiv; //DIV für unordered list
var ul; 
var li; // li[0] = title, rest to-do Punkte
var error; // Ausgabe in <p> Tag von Fehlermeldungen

window.onload = function() {
    input = document.getElementById("new-task");
    taskdiv = document.getElementById("taskdiv");
    ul = taskdiv.querySelector("ul");
    li = document.createElement("li");
    error = document.getElementById("error");
    savedlists();
};



function addtask() {
    li.textContent = input.value;
    if(input.value.length == 0){
        error.textContent = "Es wurde kein Text eingegeben";
        return;
    }

    if (ul.children.length === 0){
        input.placeholder = "Add your Tasks";
        li.textContent = input.value;
        li.classList.add("title");
        ul.appendChild(li);
    } else {
        li.textContent = input.value;
        ul.appendChild(li);
    }

    input.value = ""; //clear Input-Feld
};

function savelist() {
    var tasknr = localStorage.length;
    var uniqueKey = 'task-' + tasknr;
    var items = ul.querySelectorAll('li');
    var tasks = [];

    if(ul.textContent.trim() === '') {
        error.textContent = "list has no entries";
        return;
    }

    if(ul.id.startsWith("task")) {
        uniqueKey = ul.id;
    }

    for(var i = 0; i < items.length; i++){
        tasks.push(items[i].textContent);
    }

    localStorage.setItem(uniqueKey, JSON.stringify(tasks));
    ul.innerHTML = ""; //clear List
    input.placeholder = "Enter a title first";
    ul.removeAttribute("id");
    savedlists();
};

function loadlist(uniqueKey) {
    var requestedtask = JSON.parse(localStorage.getItem(uniqueKey));
        input.placeholder = "Add your tasks";
        ul.innerHTML = "";


    if(ul.classList.contains(uniqueKey)) {
        console.log("list already opened");
    } else {
        ul.id = uniqueKey;
    }

    for(var i = 0; i < requestedtask.length; i++){
        li.textContent = requestedtask[i];
        li.addEventListener('click', function(){
            if(this.classList.contains("strike")){
                this.classList.remove("strike");
            } else {
                this.classList.add("strike");
            }
        });
        ul.appendChild(li);
    }

    ul.classList.remove(uniqueKey);
};

function deletelist() {

    if(ul.id == 0){
        error.textContent = "no list opened";
        return;
    }
    ul.innerHTML = "";
    localStorage.removeItem(ul.id);
    input.placeholder = "Enter a title first";
    savedlists();
};

function savedlists() {
    var savediv = document.getElementById("save-row");
        savediv.innerHTML = ""; //reset savedlists Liste!

    for (let key in localStorage) {
        if (key.startsWith('task-')) {        
            var storedlist = createStoredList(key);
            savediv.appendChild(storedlist);
        }
    }
};



function createStoredList(key) {
    var storedData = JSON.parse(localStorage.getItem(key));
    var storedlist = document.createElement("div");
        storedlist.textContent = storedData[0];
        storedlist.href = '#';
        storedlist.classList.add("save-object");
        storedlist.onclick = function() {
            loadlist(key);
    };
        storedlist.id = key;
        return storedlist;
};


