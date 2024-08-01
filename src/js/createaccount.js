/* DT207G - Backend-baserad webbutveckling
 * Moment 4
 * Linn Eriksson, VT24
 */

"use strict";

//URL for the API and other variables.
let url = "http://127.0.0.1:4000/api/register";
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitAccount = document.getElementById("submitaccount");
let message = document.getElementById("registermessage");

//On load run init.
window.onload = init();

//Init-function. Adds an eventlistener to submit-button.
function init() {
    submitAccount.addEventListener("click", createAccount);
}

//Use fetch to create account
function createAccount (event) {
    event.preventDefault();

    //Variables.
    let username = usernameInput.value;
    let password = passwordInput.value;
    let jsonString = JSON.stringify({
        username: username,
        password: password
    })

    //Fetch with post.
    fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: jsonString
    })
    .then(response => {
        if(response.status != 201) {
            //Show error message if account creation fails.
            message.innerHTML = "Kontot kunde inte skapas!";
            return;
        } else {
            //Show information that account was created.
            message.innerHTML = "Kontot har skapats. <a href='login.html'>Logga in</a> på inloggningssidan.";
        }
        return response.json()
        .then(clearForm)
        .catch(err => console.log(err))
    })
}

//Clear form.
function clearForm() {
    usernameInput.value = "";
    passwordInput.value = "";
}