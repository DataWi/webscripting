class Calculator {
  constructor() {
    this.state = this.#instantiateSate();
    this.buttons = this.#instantIateButtons();
    this.display = document.getElementById("display");
    this.history = document.getElementById("history");
  }

  #instantIateButtons = () => {
    // Instantiate Map of Buttons
    const buttons = new Map();
    buttons.set("btn1", document.getElementById("btn1"));
    buttons.set("btn2", document.getElementById("btn2"));
    buttons.set("btn3", document.getElementById("btn3"));
    buttons.set("btn4", document.getElementById("btn4"));
    buttons.set("btn5", document.getElementById("btn5"));
    buttons.set("btn6", document.getElementById("btn6"));
    buttons.set("btn7", document.getElementById("btn7"));
    buttons.set("btn8", document.getElementById("btn8"));
    buttons.set("btn9", document.getElementById("btn9"));
    buttons.set("btn0", document.getElementById("btn0"));
    buttons.set("btnDot", document.getElementById("btnDot"));
    buttons.set("btnPlus", document.getElementById("btnPlus"));
    buttons.set("btnMinus", document.getElementById("btnMinus"));
    buttons.set("btnMultiply", document.getElementById("btnMultiply"));
    buttons.set("btnDivide", document.getElementById("btnDivide"));
    buttons.set("btnEquals", document.getElementById("btnEquals"));
    buttons.set("btnClear", document.getElementById("btnClear"));
    buttons.set("btnClearHistory", document.getElementById("btnClearHistory"));

    // add event listeners to buttons
    buttons.forEach((value, key) => {
      value.addEventListener("click", (e) => {
        if (key === "btnClear") {
          this.clear();
        } else if (key === "btnEquals") {
          this.equals();
        } else if (key === "btnPlus") {
          this.updateOperator("+");
        } else if (key === "btnMinus") {
          this.updateOperator("-");
        } else if (key === "btnMultiply") {
          this.updateOperator("*");
        } else if (key === "btnDivide") {
          this.updateOperator("/");
        } else if (key === "btnClearHistory") {
          this.clearHistory();
        } else {
          let id;
          if (this.state.operator === "") id = "firstNumber";
          else id = "secondNumber";
          this.updateNumber(id, e.target.innerHTML);
        }
      });
    });
    return buttons;
  };

  #instantiateSate = () => {
    // Instantiate State
    const state = {
      firstNumber: "",
      secondNumber: "",
      operator: "",
      result: 0,
      historyString: "",
      tmpNumber: 0,
    };
    return state;
  };

  updateNumber = (key, value) => {
    // append value to string
    this.state[key] += value;
    // update display
    this.updateDisplay(this.state[key]);
  };

  updateOperator = (value) => {
    if (this.state.secondNumber !== "")
      this.state.secondNumber = this.state.historyString = "";
    if (this.state.tmpNumber && this.state.firstNumber === "") {
      this.state.firstNumber = this.state.tmpNumber;
    }
    // update operator
    this.state.operator = value;
    this.state.historyString = this.state.firstNumber + " " + value + " ";
    this.updateDisplay(this.state.firstNumber + " " + this.state.operator);
  };

  clear = (partial = false) => {
    if (!partial) {
      this.display.value = "0";
      this.state.result = 0;
      this.state.tmpNumber = 0;
    }
    this.state.firstNumber = "";
    this.state.secondNumber = "";
    this.state.operator = "";
  };

  equals = () => {
    // calculate result based on operator
    switch (this.state.operator) {
      case "+":
        this.state.result =
          parseFloat(this.state.firstNumber) +
          parseFloat(this.state.secondNumber);
        break;
      case "-":
        this.state.result =
          parseFloat(this.state.firstNumber) -
          parseFloat(this.state.secondNumber);
        break;
      case "*":
        this.state.result =
          parseFloat(this.state.firstNumber) *
          parseFloat(this.state.secondNumber);
        break;
      case "/":
        this.state.result =
          parseFloat(this.state.firstNumber) /
          parseFloat(this.state.secondNumber);
        break;
    }

    this.state.tmpNumber = this.state.result;

    // round result to 2 decimal places
    this.state.result = this.state.result.toFixed(2);
    // update display
    this.updateDisplay(this.state.result);
    this.state.historyString +=
      this.state.secondNumber + " = " + this.state.result;

    this.updateHistory();
    this.clear(true);
  };

  updateDisplay = (number) => {
    // update display
    this.display.value = number;
  };

  // add history if not more than 5 entries are available
  updateHistory = () => {
    if (this.history.childElementCount < 7) {
      const p = document.createElement("p");
      p.innerHTML = this.state.historyString;
      p.classList.add("ml-2");
      this.history.appendChild(p);
      this.state.historyString = "";
    } else {
      this.history.removeChild(this.history.firstChild);
      const p = document.createElement("p");
      p.innerHTML = this.state.historyString;
      p.classList.add("ml-2");
      this.history.appendChild(p);
      this.state.historyString = "";
    }
  };

  clearHistory = () => {
    this.history.innerHTML = "";
  };
}

new Calculator();
