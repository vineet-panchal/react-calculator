import { useState } from 'react';
import './App.css';

function App() {
  const [answer, setAnswer] = useState(""); // initializing use state for the answer to be used and set
  const [expression, setExpression] = useState(""); // initializing use state for the expression to be used and set

  const btnClick = (symbol: string) => { // function for when each button is clicked
    if (symbol === "clear") {  
      setAnswer(""); // set answer to nothing
      setExpression("0"); // set expression to 0
    } else if (symbol === "negative") {
      if (answer === "") return; // if there is no answer, do nothing
      setAnswer(answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer); // check if there is a negative, if there is a negative remove it, else add it to the answer
    } else if (symbol === "modulo") {
      if (answer === "") return; // if there is no answer, do nothing
      setAnswer((parseFloat(answer) / 100).toString()); // set the answer to the calculated percent of the answer
    } else if (symbol === "+" || symbol === "/" || symbol === "*" || symbol === "-") {
      setExpression(expression.trim() + " " + symbol + " "); // add symbol to expression
    } else if (symbol === "=") {
      const e = expression.trim(); // cut off the last part of the expression, its an empty space
      if (e.charAt(e.length - 1) === "+" 
        || e.charAt(e.length - 1) === "-" 
        || e.charAt(e.length - 1) === "*" 
        || e.charAt(e.length - 1) === "/") 
      { return; } // if the last character of the experession is an operation: do nothing
      const parts = e.split(" "); // split up the expression by each space
      const newParts = [];
      for (let i = parts.length - 1; i >= 0; i--) { // loop through each part backwards
        if (["*", "/", "+"].includes(parts[i]) && (parts[i - 1] === "+" || parts[i - 1] === "-" || parts[i  - 1] === "*" || parts[i - 1] === "/")) { // if parts is a multiplication/division sign and the next part is an addition/subtraction sign or multiplication continue;
          newParts.unshift(parts[i]);
          let j = 0;
          let k = i - 1;
          while (parts[k] === "+" || parts[k] === "-" || parts[k] === "*" || parts[k] === "/") {
            k--;
            j++;
          } i -= j;
        } else {
          newParts.unshift(parts[i]);
        }
      }
      const newExpression = newParts.join(" ");
      if (newExpression.charAt(0) === "+" || newExpression.charAt(0) === "-" || newExpression.charAt(0) === "*" || newExpression.charAt(0) === "/") {
        setAnswer(eval(answer + newExpression) as string);
      } else {
        setAnswer(eval(newExpression) as string);
      } setExpression("");
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") { // if the expression doesnt start with 0
        setExpression(expression + symbol); // add 0 to the expression
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop(); // split the expression by the operators and get the last number
      if (!lastNumber) return; // if there is no previous number, do nothing
      if (lastNumber?.includes(".")) return; // if the last number has a decimal, dont add another
      setExpression(expression + symbol); // add . to the end of the expression
    } else { // if the symbol is a number
      if (expression.charAt(0) === "0") { // if the expression starts with 0
        setExpression(expression.slice(1) + symbol); // slice and add symbol to the expression
      } else {
        setExpression(expression + symbol); // add number to the expression
      }
    }
  };

  return (
    <> 
      <h1 className='title'>React Calculator</h1>
      <div className='calculator'>
        <div id='display'>
          <div className='formula-screen' >{expression}</div>
          <div className='output-screen' >{answer}</div>
        </div>
        <div className='buttons'>
          <button 
            id="clear"
            value="AC" 
            onClick={() => btnClick("clear")}
          >AC</button>
          <button 
            id='positive-negative'
            onClick={() => btnClick("positive-negative")}
          >+/-</button>
          <button
            id='modulo'
            onClick={() => btnClick("modulo")}
          >%</button>
          <button 
            id='divide' 
            value='/'
            onClick={() => btnClick("/")}
          >/</button>
          <button 
            id='seven' 
            value='7'
            onClick={() => btnClick("7")}
          >7</button>
          <button 
            id='eight' 
            value='8'
            onClick={() => btnClick("8")}
          >8</button>
          <button 
            id='nine' 
            value='9'
            onClick={() => btnClick("9")}
          >9</button>
          <button 
            id='multiply' 
            value='*'
            onClick={() => btnClick("*")}
          >*</button>
          <button 
            id='four' 
            value='4'
            onClick={() => btnClick("4")}
          >4</button>
          <button 
            id='five' 
            value='5'
            onClick={() => btnClick("5")}
          >5</button>
          <button 
            id='six' 
            value='6'
            onClick={() => btnClick("6")}
          >6</button>
          <button 
            id='subtract' 
            value='-'
            onClick={() => btnClick("-")}
          >-</button>
          <button 
            id='one' 
            value='1'
            onClick={() => btnClick("1")}
          >1</button>
          <button 
            id='two' 
            value='2'
            onClick={() => btnClick("2")}
          >2</button>
          <button 
            id='three' 
            value='3'
            onClick={() => btnClick("3")}
          >3</button>
          <button 
            id='add' 
            value='+'
            onClick={() => btnClick("+")}
          >+</button>
          <button 
            className='horizontal-btn' 
            id='zero' 
            value='0'
            onClick={() => btnClick("0")}
          >0</button>
          <button 
            id='decimal' 
            value='.'
            onClick={() => btnClick(".")}
          >.</button>
          <button 
            id='equals' 
            value='='
            onClick={() => btnClick("=")}
          >=</button>
        </div>
      </div>
    </>
  )
};

export default App;