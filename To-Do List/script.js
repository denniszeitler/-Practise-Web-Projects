// Errorhandling!
// Function writeLog!
// verschönern!

function addtask(){

    var input = document.getElementById("new-task");
    var li = document.createElement("li");
    var taskdiv = document.getElementById("taskdiv");
    var ul = taskdiv.querySelector("ul");
        li.textContent = input.value;

        if(input.value.length == 0){
            var error = document.getElementById("error");
            error.classList.add("error");
            error.textContent = "Es wurde kein Text eingegeben";
            return
        }


    if (ul.children.length === 0){
        input.placeholder = "Add your Tasks";
        li.textContent = input.value;
        li.classList.add ("title");

        ul.appendChild(li);
    } else {
        li.textContent = input.value;
        ul.appendChild(li);

    }

    input.value = ""; //clear Input-Feld
};




function savelist(){

    var input = document.getElementById("new-task");
    var tasknr = localStorage.length;
    var uniqueKey = 'task-' + tasknr;
    var taskdiv = document.getElementById("taskdiv");
    var ul = taskdiv.querySelector("ul");
    var items = ul.querySelectorAll('li');
    var tasks = [];

    if(ul.textContent.trim() === ''){
        var error = document.getElementById("error");
        error.classList.add("error");
        error.textContent = "Liste hat keinen Inhalt";
        return
    }

    if(ul.id.startsWith("task")){
        uniqueKey = ul.id;

    }
    

    for(var i =0; i < items.length; i++){
        tasks.push(items[i].textContent);
    }

    localStorage.setItem(uniqueKey, JSON.stringify(tasks));
    ul.innerHTML = ""; //clear List
    input.placeholder = ("Enter a title first");
    savedlists();


};


function loadlist(uniqueKey){
    var requestedtask = JSON.parse(localStorage.getItem(uniqueKey));
    var taskdiv = document.getElementById("taskdiv");
    var ul = taskdiv.querySelector("ul");
    var input = document.getElementById("new-task");
        input.placeholder = ("Add your tasks");
    
        ul.innerHTML = "";
    

    if(ul.classList.contains(uniqueKey)){
        console.log("Liste bereits geöffnet!");

    }
    else{
        ul.id = uniqueKey;
    
        
    }
   
    for(var i =0; i < requestedtask.length; i++){
        var li = document.createElement("li");
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


function savedlists(){
    var savediv = document.getElementById("save-row");
    savediv.innerHTML =""; //reset savedlists Liste!

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



window.onload = function() {
    savedlists()
};

