const left = document.getElementById("left");
const right = document.getElementById("right");
const button = document.getElementById("button");
const result = document.getElementById("result");

button.onclick = () => {
  if (!left.value) throw Error("division: base value not set");
  if (!right.value) throw Error("division: divider not set");
  if (right.value == 0) throw Error("division: divider can not be zero");
  result.value = left.value / right.value;
};
