import React, { Component } from "react";
import DisplayControl from "./components/DisplayControl";
import ControlPanel from "./components/ControlPanel";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: [],
      operator: undefined,
      expression: [],
      firstValue: undefined,
      secondValue: undefined,
      priorityOperator: undefined,
      finalResult: undefined,
      historicalExpressions: [],
    };
  }

  clearDisplay = () => {
    this.setState({ display: [] });
  };

  updateExpression = (operatorVal) => {
    const { display, expression } = this.state;
    const displayValue = display.join("");
    const updatedExpression = [...expression, displayValue, operatorVal].join("");
    this.setState({ expression: updatedExpression });
  };
  
  addDecimal = () => {
    const { display } = this.state;
    if (display.includes('.')){
      console.log('Cannot have two decimals in one expression');
    } else {
      this.setState({ display: [...display, '.'] });
    }
  };

  updateDisplay = (clickedNum) => {
    const { display } = this.state;
    if (display.length === 0 && clickedNum === "0") {
      console.log("first number cannot be 0");
    } else {
      this.setState({ display: [...display, clickedNum] });
    }
  };

  updateOperator = (clickedOperator) => {
    this.setState({ operator: clickedOperator });
  };

  updateFirstValue = (value) => {
    this.setState({ firstValue: value });
  };

  updateSecondValue = (value) => {
    this.setState({ secondValue: value });
  };

  evaluate = (operation, num1, num2) => {
    if (operation === "+") {
      return num1 + num2;
    } else if (operation === "-") {
      return num1 - num2;
    } else if (operation === "*") {
      return num1 * num2;
    } else if (operation === "/") {
      return num1 / num2;
    } else {
      console.log("What's this operation?", operation);
    }
  };

  updatePriorityOperator = (operatorVal) => {
    this.setState({ priorityOperator: operatorVal });
  };

  evaluateWithEqual = ({
    display,
    firstValue,
    secondValue,
    operator,
    priorityOperator,
    expression
  }) => {
    const displayValue = display.join("");
    const value = Number(displayValue);
    let finalResult;
    if (!priorityOperator) {
      finalResult = this.evaluate(operator, firstValue, value);
    } else {
      const result = this.evaluate(priorityOperator, secondValue, value);
      finalResult = this.evaluate(operator, firstValue, result);
    }
    const updatedExpression = [...expression, value, '=', finalResult].join("");
    this.setState({ finalResult: finalResult, expression: updatedExpression });
    this.clearDisplay();
  };

  processCalculation = (operatorVal) => {
    const { display, firstValue, secondValue, operator, priorityOperator } = this.state;
    const displayValue = display.join("");
    const value = Number(displayValue);
    if (operatorVal === "=") {
      this.evaluateWithEqual(this.state);
    } else {
      if (!firstValue) {
        this.updateFirstValue(value);
        this.updateOperator(operatorVal);
        this.clearDisplay();
      } else if (firstValue && !secondValue) {
        if (operatorVal === "+" || operatorVal === "-") {
          const result = this.evaluate(operator, firstValue, value);
          this.updateFirstValue(result);
          this.updateOperator(operatorVal);
          this.clearDisplay();
        } else if (operatorVal === "*" || operatorVal === "/") {
          this.updateSecondValue(value);
          this.updatePriorityOperator(operatorVal);
          this.clearDisplay();
        } else {
          console.log("What operator did you press?", operatorVal);
          console.log(this.state);
        }
      } else if (firstValue && secondValue) {
        if (operatorVal === "+" || operatorVal === "-") {
          const result = this.evaluate(priorityOperator, secondValue, value);
          const finalResult = this.evaluate(operator, firstValue, result);
          this.updateFirstValue(finalResult);
          this.setState({
            secondValue: undefined,
            priorityOperator: undefined,
          });
          this.updateOperator(operatorVal);
          this.clearDisplay();
        } else if (operatorVal === "*" || operatorVal === "/") {
          const result = this.evaluate(priorityOperator, secondValue, value);
          this.updateSecondValue(result);
          this.updatePriorityOperator(operatorVal);
          this.clearDisplay();
        } else {
          console.log("What operator did you press?", operatorVal);
          console.log(this.state);
        }
      } else {
        console.log("What operator did you press?", operatorVal);
        console.log(this.state);
      }
    }
  };

  reset = (itemToReset) => {
    const { expression, display } = this.state;
    if (itemToReset === "all") {
      this.setState({
        display: [],
        firstValue: undefined,
        secondValue: undefined,
        operator: undefined,
        expression: [],
        priorityOperator: undefined,
        finalResult: undefined,
      })
      console.log('Everything should be reset');
    } else if (itemToReset === expression || itemToReset === display) {
      this.setState({ itemToReset: [] });
    } else {
      this.setState({ itemToReset: undefined });
    }
  };

  clear = () => {
    this.setState({ display: [] });
  }

  saveExpression = (value) => {
    const { expression, historicalExpressions } = this.state;
    this.setState({ historicalExpressions: [...historicalExpressions, expression]});
  }

  backspace = () => {
    const { display } = this.state;
    let updatedDisplay = [...display];
    updatedDisplay.pop();
    this.setState({ display: updatedDisplay });
  }

  toggleHistory = (target) => {
    const historyBox = document.querySelector('.history');
    const calculatingBox = document.querySelector('.CalculatingBox input');
    historyBox.classList.toggle('hidden');
    calculatingBox.classList.toggle('hidden');
  }

  onClick = (e) => {
    const digits = /\d/;
    const { finalResult } = this.state;
    if (finalResult !== undefined) {
      this.saveExpression();
      if (e.target.value.match(digits)) {
        this.reset("all");
        this.updateDisplay(e.target.value);
      } else if (e.target.className.includes("operator")) {
        const newFirstValue = finalResult;
        this.reset('all');
        this.updateFirstValue(newFirstValue);
        this.updateOperator(e.target.value);
        const newExpression = [newFirstValue, e.target.value].join("");
        this.setState({ expression: newExpression });
        // this.updateExpression(e.target.value);
      } else if (e.target.value === "reset" || e.target.value ===  "clear") {
        this.reset("all");
      } else if (e.target.value === '.'){
        this.reset('all');
        this.addDecimal();
      } else if (e.target.value === 'History') {
        this.toggleHistory();
      } else {
        console.log("Create a case to handle me!");
      }
    } else {
      if (e.target.value.match(digits)) {
        this.updateDisplay(e.target.value);
      } else if (e.target.className.includes("operator")) {
        // this.updateOperator(e.target.value);
        if (this.state.display.length === 0) {
          console.log("Cannot use operator without numbers first.");
        } else {
          this.updateExpression(e.target.value);
          this.processCalculation(e.target.value);
          // this.clearDisplay();
        }
      } else if (e.target.value === 'clear'){
        this.clear();
      } else if(e.target.value === 'backspace'){
        this.backspace();
      } else if(e.target.value === '.'){
        this.addDecimal();
      } else if (e.target.value === 'History'){
        this.toggleHistory();
      } else {
        console.log('Create a case to handle me!');
        console.log(e.target);
      }
    }
  };

  render() {
    const { display, operator, expression, finalResult, historicalExpressions } = this.state;
    const displayValue = display.join("");

    console.log(this.state);

    return (
      <div className="App">
        <div className="DisplayBackground">
          <h1> React Calculator </h1>
          <DisplayControl
            displayValue={displayValue}
            result={finalResult}
            operatorValue={operator}
            expression={expression}
            historicalExpressions = {historicalExpressions}
          />
        </div>
        <ControlPanel onClick={this.onClick} />
      </div>
    );
  }
}

export default App;
