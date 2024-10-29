function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    if (operator === "/" && b === 0) {
        return "ERROR";
    }
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    };
}

const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
let firstOperand = "";
let secondOperand = "";
let operator = null;
let currentFirstSign = "positive";
let currentSecondSign = "positive";
let currentOperand = "";
display.textContent = updateDisplay();
construct();


window.addEventListener('keydown', function(e) {
    const key = document.querySelector(`button[value='${e.key}']`);
    key.click();
})

function construct() {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.classList.contains("operand")) {
                appendOperand(button.value);
            }
            else if (button.classList.contains("clear")) {
                firstOperand = "";
                operator = "";
                secondOperand = "";
            }
            else if (button.classList.contains("operator")) {
                if (operator) {
                    firstOperand = Number(firstOperand);
                    secondOperand = Number(secondOperand);
                    firstOperand = operate(firstOperand, secondOperand, operator).toString();
                    operator = "";
                    secondOperand = "";
                }
                operator = button.value;
            }
            else if (button.classList.contains("decimal")) {
                if (currentOperand === "first" && !firstOperand.includes(".")) {
                    firstOperand += ".";
                }
                else if (currentOperand === "second" && !secondOperand.includes(".")) {
                    secondOperand += ".";
                }
            }
            else if (button.classList.contains("equals")) {
                if (secondOperand) {
                    firstOperand = Number(firstOperand);
                    secondOperand = Number(secondOperand);
                    firstOperand = operate(firstOperand, secondOperand, operator).toString();
                    operator = "";
                    secondOperand = "";
                }
            }
            else if (button.classList.contains("delete")) {
                if (operator) {
                    secondOperand = secondOperand.substring(0, secondOperand.length - 1);
                }
                else {
                    firstOperand = firstOperand.substring(0, firstOperand.length - 1);
                }
            }
            if (operator) {
                currentOperand = "second";
            }
            else {
                currentOperand = "first";
            }
            if (firstOperand.length > 9) {
                firstOperand = firstOperand.substring(0, 9);
            }
            if (secondOperand.length > 9) {
                secondOperand = secondOperand.substring(0, 9);
            }
            display.textContent = updateDisplay();
        })
    })
}

function updateDisplay() {
    if (operator && secondOperand) {
        return secondOperand;
    }
    else if (!firstOperand) {
        return "0";
    }
    else {
        return firstOperand;
    }
}

function appendOperand(value) {
    if (operator) {
        if (value === "0" && display.textContent === "0") {
            firstOperand = "";
        }
        else {
            secondOperand += value;
        } 
    }
    else {
        if (value === "0" && display.textContent === "0") {
            firstOperand = "";
        }
        else {
            firstOperand += value;
        }
    }
}