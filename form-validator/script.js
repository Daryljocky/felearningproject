const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function arrSubtraction(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.filter((i) => !b.includes(i));
  }
  throw new TypeError("arguments must be array");
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max ) {
        console.log('dayu')
        showError(
            input,
            `${getFieldName()} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

function checkRequired(inputArr) {
    let requiredArr = [];
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(
                input,
                `${getFieldName(input)} is required`
            );
            requiredArr.push(input);
        }
    })

    requiredArr = arrSubtraction(inputArr, requiredArr);

    return requiredArr;
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    } else {
        showSuccess(input2);
    }
}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit',function (e) {
    e.preventDefault();
    let requiredArr = checkRequired([username, email, password, password2]);
    if (requiredArr !== false) {
        requiredArr.forEach(function (input) {
            switch (input.id) {
                case username.id:
                    checkLength(username, 3, 15);
                    break;
                case password.id:
                    checkLength(password, 6, 25);
                    break;
                case email.id:
                    checkEmail(email);
                    break;
                case password2.id:
                    checkPasswordsMatch(password, password2);
            }
        })
    }
})