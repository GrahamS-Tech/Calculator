let input = document.getElementById("input");
let display = document.getElementById("display");
let history = document.getElementById("history");
let var1 = 0;
let var2 = 0;
let operator = "";
let memory = null;

document.addEventListener("keydown", function (event) {
  commandButton(event.key);
});

Array.from(document.getElementsByClassName("button")).forEach((button) => {
  button.addEventListener("click", () => {
    commandButton(button.id);
  });
});

function commandButton(userInput) {
  if (isNaN(userInput) === false) {
    input.value += userInput;
    return;
  }
  switch (userInput) {
    case "+":
    case "-":
    case "*":
    case "/":
      if (operator === "") {
        display.value = `${input.value} ${userInput}`;
        var1 = input.value;
        input.value = "";
      } else {
        display.value = `${display.value.slice(0, -1)}${userInput}`;
        input.value = "";
      }
      if (userInput === "Enter") {
        userInput.preventDefault();
      }
      operator = userInput;
      break;
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
    case "memory-clear":
      memory = null;
      break;
    case "equals":
    case "Enter":
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
        history.value = ""
          ? (history.value = `${display.value} ${input.value}`)
          : (history.value += `\n ${display.value} ${input.value}`);
      }
      break;
  }
}
