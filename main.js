/**
 * Calculator object
 */
const calculator = {
    displayValue: '0',
    firstOperand: null,
    awaitSecondOperand: false,
    operator: null
};

/**
 * Functions
 */
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

function inputDigit(digit) {
    const { displayValue, awaitSecondOperand } = calculator;

    if (awaitSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.awaitSecondOperand = false;
    } else {
        // Overwrite `displayValue` if the current value us '0' otherwise append to it
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

function inputDecimal(dot) {
    if (calculator.awaitSecondOperand === true) return;

    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
        // Append the decimal point
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (nextOperator == '√') {
        const result = Math.sqrt(displayValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
        console.log(calculator);
        return;
    }

    // If a new operator is clicked
    if (operator && calculator.awaitSecondOperand)  {
        // Replace old operator with new
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.awaitSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '%': (firstOperand, secondOperand) => firstOperand % secondOperand,

    '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
     calculator.displayValue = '0';
     calculator.firstOperand = null;
     calculator.awaitSecondOperand = false;
     calculator.operator = null;
     console.log(calculator);
}

/**
 * Key Presses
 */
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event; // const target = event.target

    // If the element that was clicked is not a button...
    if (!target.matches('button')) {
    // exit the function
    return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

