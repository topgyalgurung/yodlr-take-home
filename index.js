var debug = require("debug")("frontend-code-challenge");
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("./lib/logger");
var cors = require("cors");

var users = require("./routes/users");

var app = express();
var log = logger(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// serve React app from build folder when accessing any route that isnt handled by API
// app.use(express.static(path.join(__dirname, "client", "dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

app.use("/users", users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {
  log.error(err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.set("port", process.env.PORT || 3000);
const PORT = app.get("port");
// var server = app.listen(app.get("port"), function () {
//   log.info(
//     "Express server listening on http://localhost:%d",
//     server.address().port
//   );
// });

const server = app.listen(PORT, () => {
  log.info(`Express server listening on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    log.error(`PORT ${PORT} is already in use. Please use a different route`);
  } else {
    log.error(`Failed to start server: ${err.message}`);
  }
});

// Add listeners to clean up resources (e.g., database connections) when the server shuts down.
process.on("SIGTERM", () => {
  log.info("SIGTERM signal received. Closing server gracefully...");
  server.close(() => {
    log.info("Server closed.");
    process.exit(0);
  });
});
