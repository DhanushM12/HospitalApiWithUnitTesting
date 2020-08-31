const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");
//to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded());
//to initialize Passport
app.use(passport.initialize());
//use express router
app.use("/", require("./routes"));
//app.get("/", (req, res) => res.send("<h1>Hello World!</h1>"));
//to bind and listen the connections on the specified host and port
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
