/* DT207G - Backend-baserad webbutveckling
 * Moment 4
 * Linn Eriksson, VT24
 */

"use strict";
//variables
const logoutbtn = document.getElementById("logoutbutton");

//On load run init.
window.onload = init();

//Init-function. Checks if JWT exists and acts accordingly.
function init() {

    //If JWT doesn't exist redirect to login, if it exists construct logout-function and hide login-pages.
    if(!localStorage.getItem("token")) {
        window.location.href = "login.html";
    } else {
        hideContent();
        logoutbtn.addEventListener("click", logout);
    }
}

//Hide content for login in etc when logged in.
function hideContent() {
    //Make a list of elements with class "login".
    let elements = document.getElementsByClassName("login");

    //Loop through list and hide them by setting display = none.
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

//Kill token in local storage and show content.
function logout(event) {
    event.preventDefault();

    localStorage.clear();
    window.location.href = "login.html";
}