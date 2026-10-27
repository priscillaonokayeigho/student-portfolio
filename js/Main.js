const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

let tasks = [];

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.done) {
            li.classList.add("done");
        }

        li.addEventListener("click", function () {
            tasks[index].done = !tasks[index].done;
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            tasks.splice(index, 1);
            renderTasks();
        });

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (input.value.trim() === "") {
            return;
        }
        tasks.push({ text: input.value, done: false });
        input.value = "";
        renderTasks();
    });
}

function checkEmpty(fieldId, errorId, label) {
    const value = document.getElementById(fieldId).value.trim();
    const error = document.getElementById(errorId);

    if (value === "") {
        error.textContent = label + " can't be empty.";
        return false;
    }
    error.textContent = "";
    return true;
}

function checkEmail() {
    const value = document.getElementById ("email").value.trim();
    const error =document.getElementById("emailError");
    const pattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(value)) {
        error.textContent = "Enter a valid email, like name@example.com.";
        return false;
    }
    error.textContent ="";
    return true;
}

function checkPhone() {
    const value = document.getElementById("phone").value.trim();
    const error = document.getElementById("phoneError");
    const pattern = /^\d+$/;

    if (!pattern.test(value)) {
        error.textContent = "Phone number must contain digits only.";
        return false;
    }
    error.textContent = "";
    return true;
}


const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameOk = checkEmpty("name", "nameError", "Name");
        const emailOk = checkEmpty("email", "emailError", "Email") && checkEmail();
        const phoneOk = checkEmpty("phone", "phoneError", "Phone number") && checkPhone();
        const messageOk = checkEmpty("message", "messageError", "Message");

        if (nameOk && emailOk && phoneOk && messageOk) {
            document.getElementById("formStatus").textContent = "Message sent!";
        }
    });
}