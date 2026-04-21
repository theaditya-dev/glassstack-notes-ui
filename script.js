// all variables and doc selection

let formcontainer = document.querySelector(".form-container");
let form = document.querySelector(".form-box");
let imgInput = form.querySelector('input[name="img"]');
let nameInput = form.querySelector('input[name="name"]');
let townInput = form.querySelector('input[name="town"]');
let purposeInput = form.querySelector('input[name="purpose"]');
let selectedCategory = form.querySelector('input[name="category"]:checked');
let addNote = document.querySelector("#add-note");
let closeForm = document.querySelector(".close-btn");

let stack = document.querySelector(".stack");
let upbtn = document.querySelector("#upbtn");
let downbtn = document.querySelector("#downbtn");


let categoryInputs = form.querySelectorAll('input[name="category"]');

//code starts from here

function saveToLocalStorage(obj) {
    // purana local storage data nikalo
    if (localStorage.getItem("tasks") === null) {
        let oldTasks = [];
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
    else {
        let oldTasks = localStorage.getItem("tasks");
        oldTasks = JSON.parse(oldTasks);
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
}

addNote.addEventListener("click", function () {
    formcontainer.style.display = "initial";
});

closeForm.addEventListener("click", function () {
    formcontainer.style.display = "none";
});

// form validation
form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let errors = [];
    let selectedCategory = form.querySelector('input[name="category"]:checked');

    if (!imgInput.value.trim()) errors.push("Image URL");
    if (!nameInput.value.trim()) errors.push("Full Name");
    if (!townInput.value.trim()) errors.push("Home Town");
    if (!purposeInput.value.trim()) errors.push("Purpose");
    if (!selectedCategory) errors.push("Category");

    if (errors.length > 0) {
        alert("Please fill: " + errors.join(", "));
        return;
    } else {
        alert("Form submitted successfully ✅");
    }
    let newTask = {
        img: imgInput.value,
        name: nameInput.value,
        town: townInput.value,
        purpose: purposeInput.value,
        category: selectedCategory.value
    };
    saveToLocalStorage({
        img: imgInput.value,
        name: nameInput.value,
        town: townInput.value,
        purpose: purposeInput.value,
        category: selectedCategory.value
    });
    createCard(newTask);   
    updatestack();
    form.reset();
    formcontainer.style.display = "none";
});

function createCard(data) {
    let stack = document.querySelector(".stack");
    let card = document.createElement("div");
    card.className = "card";

    let img = document.createElement("img");
    img.src = data.img;

    let name = document.createElement("h3");
    name.textContent = data.name;

    let town = document.createElement("p");
    town.innerHTML = `Home town <span>${data.town}</span>`;

    let purpose = document.createElement("p");
    purpose.innerHTML = `Bookings <span>${data.purpose}</span>`;

    let actions = document.createElement("div");
    actions.className = "actions";

    let callBtn = document.createElement("button");
    callBtn.className = "call";
    callBtn.textContent = "📞 Call";

    let msgBtn = document.createElement("button");
    msgBtn.className = "msg";
    msgBtn.textContent = "Message";

    actions.appendChild(callBtn);
    actions.appendChild(msgBtn);
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(town);
    card.appendChild(purpose);
    card.appendChild(actions);
    stack.appendChild(card);
}

function showcards() {
    let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    allTasks.forEach(function (task){
    createCard(task);
});
}

showcards();

function updatestack(){
    const cards = document.querySelectorAll(".stack .card");
    cards.forEach(function(card, index){
        card.style.zIndex = 3 - index;
    })
}
upbtn.addEventListener("click", function(){
    let firstChild = stack.firstElementChild;
    let lastChild = stack.lastElementChild;
    if(lastChild){
        stack.insertBefore(lastChild, firstChild);
        // update
        updatestack()
    }

})

downbtn.addEventListener("click", function(){
    let firstChild = stack.firstElementChild;
    if(firstChild){
        stack.appendChild(firstChild); 
        // update
        updatestack()
    }
})

