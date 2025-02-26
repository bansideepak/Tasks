const countElement = document.getElementById("count");

let count = 0;

function inc() {
  count++;
  updateDisplay();
}

function dec() {
  count--;
  updateDisplay();
}

function reset() {
  count = 0;
  updateDisplay();
}

function updateDisplay() {
  countElement.textContent = count;
}
