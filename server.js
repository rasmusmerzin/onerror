const http = require("http");
const uncaught = require("uncaught");
const mail = require("./mail");

const RECIPIENT = process.env.RECIPIENT;
if (!RECIPIENT) {
  console.error("RECIPIENT environment variable empty");
  process.exit(1);
}

uncaught.start();
uncaught.addListener(function (error) {
  const remap = {};
  Object.getOwnPropertyNames(error).forEach(
    (prop) => (remap[prop] = error[prop])
  );
  const content = JSON.stringify(obj, null, 2);
  mail.send(RECIPIENT, "server error", content);
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
    let content;
    try {
      content = JSON.stringify(JSON.parse(body), null, 2);
    } finally {
      content = body;
    }
    mail.send(RECIPIENT, "client error", content);
  });
};

http.createServer(listener).listen(8000);
