/*
		Your Name: Zoe Chalk
		Last Modified Date: 12/9/2023
		File: event_registration.js
		File Description: This file is for ticket registration form functionality.
*/



let numberOfTickets = document.getElementById('numTickets');
let totalCost =  document.getElementById('totalCost');
let customerName = document.getElementById('name');
let email = document.getElementById('email');
let timer = document.getElementById('timer');
let emailRegex = /^\S+@\S+\.\S+$/;
let interval;
let valid;

let startTime = 10;
let time = startTime * 60;

// Set the minimum and maximum number of tickets able to be purchased
let minTickets = 1;
let maxTickets = 3;
// Set variables for the ticket cost
let costPerTicket = 5.00;
let ticketSurcharge = 0.50;

//utility
function changeColor (id, color) {
	id.style.backgroundColor = color;
}

//form validation
function validateForm () {

	if (customerName.value == "") {
		changeColor(customerName, "red");
		document.getElementById('msgname').textContent = "Name is required.";
		valid = false;
	} else if (customerName.value) {
		changeColor(customerName, "green");
		document.getElementById('msgname').textContent = "";
		valid = true;
	}
	if (email.value == "") {
		changeColor(email, "red");
		document.getElementById('msgemail').textContent = "Email is required";
		valid = false;
	} else if (!emailRegex.test(email.value)) {
		changeColor(email, "red");
        document.getElementById('msgemail').textContent = "Not a valid e-mail address."
		valid = false;

    } else if (emailRegex.test(email.value)) {
		changeColor(email, "green");
		document.getElementById('msgemail').textContent = "";
		valid = true;
	}
	console.log(valid);
}


//total
function calculateTotal() {
	let total = (numberOfTickets.value * costPerTicket) + ticketSurcharge;
	totalCost.setAttribute('value', "$" + total + '0');
	
	if (numberOfTickets.value > 3) {
		document.getElementById('msgTickets').textContent = "Only 3 Tickets per person";
		changeColor(numberOfTickets, "red");
		document.getElementById('contactInformation').style.display = 'none';

		
	} else {
		document.getElementById('contactInformation').style.display = 'block';
		document.getElementById('msgTickets').textContent = "";
		changeColor(numberOfTickets, "green");
	}
}

//purchase 
function completePurchase() {
	validateForm();
	if (valid) {
		alert("Thank you for your purchase.");
		clearInterval(interval);
	}
}

//timer - used functions to capture interval id to stop timer as required
function setTimerHTML() {
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;
	
	if ( minutes == 0 && seconds == 0 ) {
		timer.innerText = '00:00';
		alert("Time Has Run Out... \nKind of embarassing... \n10 minutes... \nDown the drain... \nOh well... \nWhat's 10 more?");
		window.location.href = 'event_registration.html'
	} if (seconds < 10) {
		seconds = "0" + seconds;
	} 

	timer.innerText = minutes + ":" + seconds
	time--;
};

function startClock () {
interval = window.setInterval(setTimerHTML, 1000);
};


startClock();

/*** YOUR CODE STARTS BELOW HERE ***/
