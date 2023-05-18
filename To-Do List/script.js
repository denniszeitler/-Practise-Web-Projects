/*TO DO:!
- Kommentieren :)
- strike klasse evtl. bei addtask schon hinzufügen



*/


let input; // Input-Feld für title & task
let error; // Ausgabe in <p> Tag von Fehlermeldungen

window.onload = function() {
    input = document.getElementById("new-task");
    error = document.getElementById("error");
    savedlists();
};

function addtask() {
    const taskdiv = document.getElementById("taskdiv");
    const ul = taskdiv.querySelector("ul");
    const li = document.createElement("li");
    li.textContent = input.value;

    if (input.value.length == 0) {
        error.textContent = "no text entered";
        return;
    }

    if (ul.children.length === 0) {
        input.placeholder = "Add your Tasks";
        li.textContent = input.value;
        li.classList.add("title");
        ul.appendChild(li);
    } else {
        li.textContent = input.value;
        ul.appendChild(li);
    }

    input.value = ""; // clear Input-Feld
}

function savelist() {
    const taskdiv = document.getElementById("taskdiv");
    const ul = taskdiv.querySelector("ul");
    let tasknr = localStorage.length;
    let uniqueKey = 'task-' + tasknr;
    const items = ul.querySelectorAll('li');
    let tasks = [];

    if (ul.textContent.trim() === '') {
        error.textContent = "list has no entries";
        return;
    }

    if (ul.id.startsWith("task")) {
        uniqueKey = ul.id;
    }

    for (let i = 0; i < items.length; i++) {
        tasks.push(items[i].textContent);
    }

    localStorage.setItem(uniqueKey, JSON.stringify(tasks));
    ul.innerHTML = ""; // clear List
    input.placeholder = "Enter a title first";
    ul.removeAttribute("id");
    savedlists();
}

function loadlist(uniqueKey) {
    const taskdiv = document.getElementById("taskdiv");
    const ul = taskdiv.querySelector("ul");
    const requestedtask = JSON.parse(localStorage.getItem(uniqueKey));
    input.placeholder = "Add your tasks";
    ul.innerHTML = "";

    if (ul.classList.contains(uniqueKey)) {
        console.log("list already opened");
    } else {
        ul.id = uniqueKey;
    }

    for (let i = 0; i < requestedtask.length; i++) {
        const li = document.createElement("li");
        li.textContent = requestedtask[i];
        console.log(li.textContent);
        li.addEventListener('click', function() {
            if (this.classList.contains("strike")) {
                this.classList.remove("strike");
            } else {
                this.classList.add("strike");
            }
        });
        ul.appendChild(li);
    }

    ul.classList.remove(uniqueKey);
}

function deletelist() {
    const taskdiv = document.getElementById("taskdiv");
    const ul = taskdiv.querySelector("ul");
    if (ul.id == 0) {
        error.textContent = "no list opened";
        return;
    }
    ul.innerHTML = "";
    localStorage.removeItem(ul.id);
    input.placeholder = "Enter a title first";
    savedlists();
}

function savedlists() {
    const savediv = document.getElementById("save-row");
    savediv.innerHTML = ""; // reset savedlists Liste!

    for (let key in localStorage) {
        if (key.startsWith('task-')) {
            const storedlist = createStoredList(key);
            savediv.appendChild(storedlist);
        }
    }
}

function createStoredList(key) {
    const storedData = JSON.parse(localStorage.getItem(key));
    const storedlist = document.createElement("div");
    storedlist.textContent = storedData[0];
    storedlist.href = '#';
    storedlist.classList.add("save-object");
    storedlist.onclick = function() {
        loadlist(key);
    };
    storedlist.id = key;
    return storedlist;
}
