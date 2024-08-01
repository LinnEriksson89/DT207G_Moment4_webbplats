/* DT207G - Backend-baserad webbutveckling
 * Moment 4
 * Linn Eriksson, VT24
 */

"use strict";

//URL for the API and other variables.
let url = "http://127.0.0.1:4000/api/login";
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("loginbutton");
const message = document.getElementById("loginmessage");

//On load run init.
window.onload = init();

//Init-function. Adds an eventlistener to submit-button.
function init() {
    submitButton.addEventListener("click", logIn);
}

//Use fetch to login.
function logIn (event) {
    event.preventDefault();
    
    //Variables.
    let username = usernameInput.value;
    let password = passwordInput.value;
    let jsonString = JSON.stringify({
        username: username,
        password: password
    })

    //Fetch with post to login.
    fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: jsonString
    })
    .then(response => {
        if(response.status != 200) {
            //Show error message if login failed.
            message.innerHTML = "Inloggningen misslyckades!";
        } else {
            //Show message that login was success.
            message.innerHTML = "Inloggningen lyckades!";
        }
    })
}