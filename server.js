const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

/* Body Parser Middleware */
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

/* Database Configuration */
const db = require("./config/keys").mongoURI;

/* Connect to MongoDB */
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

/* Passport Middleware */
app.use(passport.initialize());
/* Passport Config */
require("./config/passport")(passport);
/* Routes */
app.use("/api/users", users);


/* Process.env.port is for Heroku when deployed */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
