const { spawn } = require("child_process");
module.exports = {
  send(recipient, subject, content) {
    const sendmail = spawn("sendmail", [recipient]);
    sendmail.stdin.write(`Subject: ${subject}\n${content}`);
    sendmail.stdin.end();
  },
};
