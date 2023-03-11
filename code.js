let input = document.getElementById("input");
let display = document.getElementById("display");
let history = document.getElementById("history");
let var1 = 0;
let var2 = 0;
let operator = "";
let memory = null;

document.addEventListener("keydown", function (event) {
if (isNaN(event.key) === false) {
input.value += event.key;
}
else if ("+-*/".includes(event.key)) {
    if (operator === "") {
        display.value = `${input.value} ${event.key}`;
        var1 = input.value;
        input.value = "";
      } else {
        display.value = `${display.value.slice(0, -1)}${event.key}`;
        input.value = "";
      }
      operator = event.key;
    }
    else {
        if (event.key === "Enter") {
            event.preventDefault();
        }
        commandButton(event.key);
    }
    });

function commandButton(userInput) {
    switch (userInput) {
        case "c":
        case "Escape":
          input.value = "";
          display.value = "";
          var1 = 0;
          var2 = 0;
          operator = "";
          break;
        case "ce":
          input.value = "";
          break;
        case "del":
        case "Backspace":
          input.value = input.value.slice(0, -1);
          break;
        case "invert":
          input.value = input.value * -1;
          break;
        case "memory-save":
          memory = input.value;
          break;
        case "memory-recall":
          input.value = memory;
          break;
        case "equals":
        case "Enter":    
          equals();
          break;
        default :
        console.log(userInput);
      }
};

Array.from(document.getElementsByClassName("number-button")).forEach(
  (button) => {
    button.addEventListener("click", () => {
      input.value += button.id;
    });
  }
);

Array.from(document.getElementsByClassName("operator-button")).forEach(
  (button) => {
    button.addEventListener("click", () => {
      if (operator === "") {
        display.value = `${input.value} ${button.id}`;
        var1 = input.value;
        input.value = "";
      } else {
        display.value = `${display.value.slice(0, -1)}${button.id}`;
        input.value = "";
      }
      operator = button.id;
    });
  }
);

Array.from(document.getElementsByClassName("command-button")).forEach(
  (button) => {
    button.addEventListener("click", () => {
      switch (button.id) {
        case "c":
          input.value = "";
          display.value = "";
          var1 = 0;
          var2 = 0;
          operator = "";
          break;
        case "ce":
          input.value = "";
          break;
        case "del":
          input.value = input.value.slice(0, -1);
          break;
        case "invert":
          input.value = input.value * -1;
          break;
        case "memory-save":
          memory = input.value;
          break;
        case "memory-recall":
          input.value = memory;
          break;
        case "equals":
          equals();
          break;
      }
    });
  }
);

function equals() {
  if ((var1 === 0 && var2 === 0) || input.value === "" || operator === "") {
    return;
  } else {
    var2 = input.value;
    display.value += ` ${var2} =`;
    switch (operator) {
      case "+":
        input.value = Number(var1) + Number(var2);
        break;
      case "-":
        input.value = var1 - var2;
        break;
      case "*":
        input.value = var1 * var2;
        break;
      case "/":
        input.value = var1 / var2;
        break;
      case "":
        return;  
    }

    var1 = input.value;
    var2 = 0;
    operator = "";
    history.value = "" ?
    history.value = `${display.value} ${input.value}`:
    history.value += `\n ${display.value} ${input.value}`
  }
}
