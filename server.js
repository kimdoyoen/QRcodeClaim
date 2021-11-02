const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const config = require('./config.js');
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/qrcode", require("./router/qrcode.js"));
app.use("/api/engineer", require("./router/engineer.js"));
app.use("/api/claim", require("./router/claim.js"));

const port = 5000;

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB Connecting...");
    http.listen(port, function () {
      console.log("listening on", port);
    });
  })
  .catch((err) => console.log(err));
  
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.get("*", function (req, res) {
res.sendFile(path.join(__dirname, "/client/build/index.html"));
});