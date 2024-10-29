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
let sign = "positive";
construct();

function construct() {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.classList.contains("operand")) {
                if (operator) {
                    secondOperand += button.value;
                }
                else {
                    firstOperand += button.value;
                }
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
                    firstOperand = operate(firstOperand, secondOperand, operator);
                    operator = "";
                    secondOperand = "";
                }
                operator = button.value;
            }
            else if (button.classList.contains("percent")) {
                
            }
            else if (button.classList.contains("decimal")) {

            }
            else if (button.classList.contains("equals")) {
                firstOperand = Number(firstOperand);
                secondOperand = Number(secondOperand);
                firstOperand = operate(firstOperand, secondOperand, operator);
                operator = "";
                secondOperand = "";
            }
            else if (button.classList.contains("sign")) {
                switchSign();
            }
            display.textContent = updateDisplay();
        })
    })
}

function updateDisplay() {
    if (operator && secondOperand) {
        return secondOperand;
    }
    else {
        return firstOperand;
    }
}