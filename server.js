const express = require("express");
const next = require("next");
const https = require("https");
const fs = require("fs");

const host = "0.0.0.0";

const app = next({
  dev: process.env.NODE_ENV !== "production",
});
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const expressApp = express();

  expressApp.all("*", (req, res) => handle(req, res));

  const hasCertificates =
    fs.existsSync("./certificates/localhost.key") &&
    fs.existsSync("./certificates/localhost.crt");

  const useHttps = hasCertificates && process.env.HTTPS === "true";

  console.log(
    `> env settings: ${process.env.HTTPS === "true" ? "HTTPS" : "HTTP"}`
  );
  console.log(
    `> has certificate files is ${hasCertificates ? "exist" : "not exist"}`
  );

  if (process.env.HTTPS === "true" && !hasCertificates) {
    console.warn(
      "You chose to launch with HTTPS, but can't exist a certificate. The server will launch with HTTP."
    );
  }

  if (useHttps) {
    const options = {
      key: fs.readFileSync("./certificates/localhost.key"),
      cert: fs.readFileSync("./certificates/localhost.crt"),
    };

    const server = https.createServer(options, expressApp);
    server.listen("443", host);
    console.log(`> Ready on https://localhost`);
  } else {
    expressApp.listen("3000", host);
    console.log(`> Ready on http://localhost:3000`);
  }
})();
