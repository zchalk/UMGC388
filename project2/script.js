//global dom elements
let submitButton = document.getElementById('submitBtn');
let resetButton = document.getElementById('resetBtn');
let form = document.getElementById('form');

//alert text placeholder variable
let alertText = '';

//using these in global scope as they are reused in multiple functions
let alpha = /^[a-z]+$/i;
let numeric = /^[0-9]+$/;
let alphaNumeric =  /^[\w\-\s]+$/;
let emailRegex = /^\S+@\S+\.\S+$/;


//creating state drop down dynamically rather than 1 million select tags in html
let stateArray = ['','Alabama','Alaska','American Samoa','Arizona','Armed Forces America','Armed Forces Europe','Armed Forces Pacific','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

for (const state of stateArray) {
    let stateInput = document.getElementById('state');
    let newStateOption = document.createElement('option');

    newStateOption.innerText = state;
    newStateOption.setAttribute('value', state);
    stateInput.appendChild(newStateOption);
};

//first and last name validation function, values are grabbed in local scope only as they are not reused in other functions. checks for blank first then ensures alpha characters only
function nameValidation (event) {
    event.preventDefault();

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;

    if (firstName == '' || lastName == '' ) {
        alertText = alertText + "\nFirst and Last Name cannot be blank."
    } 
    else if ( !alpha.test(firstName) || !alpha.test(lastName)) {
        alertText = alert + "\nFirst and Last Name must be letters only, no numbers.";
    };
};

//address validation function, values are grabbed in local scope only as they are not reused in other functions. checks for blank first then ensures corresponding character sets are used ** # of characters in zip code is not checked here but is instead limited by the input field
function addressValidation (event) {
    event.preventDefault();

    let zipCode = document.getElementById('zipCode').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;

    if (zipCode == '' || address == '' || city == '' || state == '' ) {
        alertText = alertText + "\nAddress fields cannot be blank: Street Address, City, State and Zip Code.";
    } else if (!alphaNumeric.test(address)) {
        alertText = alertText + "\nAddress must be alphanumeric.";
    } else if (!alpha.test(city)) {
        alertText = alertText + "\nCity must be letters only, no numbers.";
    } else if (!numeric.test(zipCode)) {
        alertText = alertText + "\nZip code must be numbers only, no letters.";
    };
};

// phone validation function, values are checked first to ensure they are no blank and then against the numeric character set to ensure they are numbers. length is enforced through input length.
function phoneValidation (event) {
    event.preventDefault();

    let areaCode = document.getElementById('areaCode').value;
    let phoneNumber = document.getElementById('phoneNumber').value;

    if (areaCode == '' || phoneNumber == '') {
        alertText = alertText + "\nPhone number cannot be blank.";
    } else if (!numeric.test(areaCode) || !numeric.test(phoneNumber)) {
        alertText = alertText + "\nPhone number must be number only, no letters.";
    };
}

//email validation function first blank fields are check, then checked against email regex, then using the split method name and doman are checked for length, lastly emails are matched
function emailValidation (event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let confirmEmail = document.getElementById('confirmEmail').value;
    let emailSplitPeriod = email.split('.');
    let emailSplitAt = emailSplitPeriod[0].split('@');

    if (email == '' || confirmEmail == '') {
        alertText = alertText + "\nE-mail fields cannot be blank: E-mail and Confirm E-mail.";
    } else if (!emailRegex.test(email)) {
        alertText = alertText + "\nNot a valid e-mail address."
    } else if (emailSplitAt[0].length > 64 || emailSplitAt[1].length > 252) {
        alertText = alertText + "\nE-mail length invalid - too long.";
    } else if (!(email === confirmEmail)) {
        alertText = alertText + "\nE-mails do not match.";
    }

}

//meal validation function, radio array is pulled from dom, each radio is checked for value if it is checked a counter goes up. if the counter remains at 0 then the error message is thrown
function mealValidation (event) {
    event.preventDefault();

    let mealRadios = document.getElementsByName('meals');
    let radioCount = 0;

    for (meal of mealRadios) {
        if (meal.checked) {
            radioCount++;
        };
    };
    if (radioCount == 0) {
        alertText = alertText + "\nOne meal option must be selected.";
    };
};

//contact validation function, checkbox array is pulled from dom, each checkbox is checked for value if it is checked a counter goes up. if the counter remains at > 2 then the error message is thrown
function contactValidation (event) {
    event.preventDefault();

    let contactCheckboxes = document.getElementsByName('checkbox');
    let checkboxCount = 0;

    for (checkbox of contactCheckboxes) {
        if (checkbox.checked) {
            checkboxCount++
        };
    };
    if (checkboxCount < 2) {
        alertText = alertText + "\nSelect at least two contact methods.";
    };
};

//reset function, named function used rather than anonymous for reusability in formValidation function
function resetForm () {

    form.reset();
};

//form validation function calls all other validation methods, once all functions have run an alert is thrown with either the errors from the form or a validation message giving confirmation to the user of a successful submission. the form is then reset upon success.
function formValidation (event) {

    nameValidation(event);
    addressValidation(event);
    phoneValidation(event);
    emailValidation(event);
    mealValidation(event);
    contactValidation(event);
    
    //Single alert rather than having multiple single alerts that only give user first issue in list, this was user can get all issues at once to remedy. Splice is to remove first line break.
    if (alertText !== '') {
        alert((alertText.slice(1)));
        alertText = '';
    } else {
        alert("Thank you for your submission. You have successfully completed the form.");
        resetForm();
    }
};

submitButton.addEventListener('click', formValidation);
resetButton.addEventListener('click', resetForm);

