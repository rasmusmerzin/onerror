const uncaught = require("uncaught");
uncaught.start();
uncaught.addListener((error) => {
  const remap = {};
  Object.getOwnPropertyNames(error).forEach(
    (prop) => (remap[prop] = error[prop])
  );
  document.getElementById("stack").innerText = error.stack;
  const body = JSON.stringify(remap, null, 2);
  document.getElementById("error").innerText = body;
  fetch("http://localhost:8000", {
    method: "POST",
    body,
  });
});
