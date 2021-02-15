const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const screen = document.querySelector("[data-screen]");
const previousScreen = document.querySelector("[data-screen-previous]");

let currentOperand = "";
let previousOperand = "";
let operator = null;

window.addEventListener("keydown", setInput);

deleteButton.addEventListener("click", (button) => {
  deleteNumber();
  updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  clear();
  updateDisplay();
});

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => {
    setOperation(button.textContent);
    updateDisplay();
  })
);

numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
    updateDisplay();
  })
);
equalsButton.addEventListener("click", () => {
  operate();
  updateDisplay();
});

function appendNumber(number) {
  if (number === "." && screen.textContent.includes(".")) return;
  screen.textContent = screen.textContent.toString() + number.toString();
}

function updateDisplay() {
  screen.textContent = screen.textContent;
  previousScreen.textContent = screen.previousOperand;
}

function setOperation(operator) {
  if (screen.textContent === "") return;
  if (screen.previousOperand !== "") {
    operate();
  }
  screen.operator = operator;
  screen.previousOperand = screen.textContent + " " + operator;

  screen.textContent = "";

  screen.currentOperand = "";
}
function operate() {
  let computation;
  const prev = parseFloat(screen.previousOperand);
  const current = parseFloat(screen.textContent);

  if (isNaN(prev) || isNaN(current)) return;

  switch (screen.operator) {
    case "+":
      computation = add(current, prev);
      break;
    case "-":
      computation = subtract(current, prev);
      break;
    case "x":
      computation = multiply(current, prev);
      break;
    case "÷":
      computation = divide(current, prev);
      break;
    default:
      return;
  }
  // console.log(prev + " " + screen.operator + " " + current + " = " + computation);
  screen.textContent = computation;
  if (screen.textContent.includes(".")) {
    screen.textContent = computation.toFixed(2);
  }
  screen.operator = undefined;
  screen.previousOperand = "";
}

function clear() {
  screen.textContent = "";
  previousScreen.textContent = "";
  currentOperand = "";
  screen.previousOperand = "";
  operator = null;
}
function deleteNumber() {
  screen.textContent = screen.textContent.toString().slice(0, -1);
}

const add = function (a, b) {
  return a + b;
};
const subtract = function (prev, current) {
  return current - prev;
};
const multiply = function (a, b) {
  return a * b;
};
const divide = function (prev, current) {
  if (prev === 0) {
    alert("Cannot divide by 0.");
    clear();
    return null;
  } else return current / prev;
};


function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "x";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "+") return "+";
}

function setInput(e) {
  console.log("e: " + e.key);
  if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
    appendNumber(e.key);
    updateDisplay();
  }
  if (e.key === "=" || e.key === "Enter") {
    operate();
    updateDisplay();
  }
  if (e.key === "Backspace") {
    deleteNumber();
    updateDisplay();
  }
  if (e.key === "Escape") {
    clear();
    updateDisplay();
  }
  if ( e.key === "+" || e.key === "-" || e.key === "*" || e.key === "÷" || e.key === "/") {
    setOperation(convertOperator(e.key));
    updateDisplay();
  }
}


