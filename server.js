const http = require("http");
const uncaught = require("uncaught");

uncaught.start();
uncaught.addListener(function (error) {
  const remap = {};
  Object.getOwnPropertyNames(error).forEach(
    (prop) => (remap[prop] = error[prop])
  );
  console.error("SERVER ERROR", remap);
});

const listener = (req, res) => {
  res
    .writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:1234",
    })
    .end();

  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    console.warn("CLIENT ERROR", JSON.parse(body));
    throw Error("auto error");
  });
};

http.createServer(listener).listen(8000);
