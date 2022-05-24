const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const path = require('path');

const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
  credentials: true
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set database
const db = require("./app/models");
db.sequelize.sync().then(() => {
  console.log("Re-synced db.");
});

// implement login functionality
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// include model routes
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);

// welcome route
// app.get("/", (req, res) => {W
//   res.json({ message: "Welcome to the User Account Manager." });
// });
app.get('/', function(request, response) {
	// If the user is logged in
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
