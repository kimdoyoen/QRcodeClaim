const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const config = require('./config.js');
const mongoose = require("mongoose");

const options = {
  cors: {
    origin: ['http://localhost:3000'],
    method: ['POST'],
  }
};
const io = require('socket.io')(http, options);

io.on('connection', function (socket, err) {
  console.log("user connected");

  socket.on('init', function(data) {
    console.log(data);
    socket.emit("connected", "socket connected");
  });
});

app.use(function(req, res, next) {
  req.io = io;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/qrcode", require("./router/qrcode.js"));
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