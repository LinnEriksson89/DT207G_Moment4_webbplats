/* DT207G - Backend-baserad webbutveckling
 * Moment 4
 * Linn Eriksson, VT24
 */

"use strict";

//URL for the API and other variables.
let url = "http://127.0.0.1:4000/api/protected";


//On load run init.
window.onload = init();

//Init-function. Checks if JWT exists and acts accordingly.
function init() {
    let token = localStorage.getItem("token");

    //If JWT doesn't exist redirect to login, if it exists fetch jobs and hide login-pages.
    if(!token) {
        window.location.href = "login.html";
    } else {
        hideContent();
        getData(token);
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

//Get information from API for logged in account.
function getData(token) {
    //Fetch data
    fetch(url, {
      headers: {
        "Authorization": "Bearer " + token
      }  
    })
    .then(response => {
        if(response.status != 200) {
            //Get maincontent-div, create a p-element and add text to it, add p to maincontent-div.
            const mainDiv = document.getElementById("maincontent");
            let paragraf = document.createElement("p");
            let text = document.createTextNode("Sorry, something went wrong. :(");
            paragraf.appendChild(text);
            mainDiv.appendChild(paragraf);
            return
        } 
        return response.json()
        .then(data => printContent(data))
        .catch(err=> console.log(err))
    })
}

//Print content in table-form.
function printContent(dataArray) {
    //Get main div.
    const mainDiv = document.getElementById("maincontent");

    //Make sure div is cleared.
    mainDiv.innerHTML = " ";

    //Create header and info.
    let header = document.createElement("h2");
    let headerText = document.createTextNode("Svenska län");
    header.appendChild(headerText);
    mainDiv.appendChild(header);

    let para = document.createElement("p");
    let paraText = document.createTextNode("Här listas svenska län och lite information om dessa.");
    para.appendChild(paraText);
    mainDiv.appendChild(para);

    let table = document.createElement("table");
    table.innerHTML = "<thead><tr><th>Län</th><th>Länskod</th><th>Residensstad</th><th>Antal kommuner</th></tr></thead>";
    let tablebody = document.createElement("tbody");

    dataArray.forEach(datapoint => {
        const tr = tablebody.insertRow();
        tr.innerHTML = `<td>${datapoint.name}</td><td>${datapoint.letter}</td><td>${datapoint.city}</td><td>${datapoint.municipalities}</td>`
    });
    
    table.appendChild(tablebody);
    mainDiv.appendChild(table);
}