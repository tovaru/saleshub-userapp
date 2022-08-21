const express = require("express");
const { users } = require("../models");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.login = (request, response) => {
	// Check if reached maximum attempts
	if (request.session.attemptCount == 5) {
		response.status(404).send({
			message: "Reached maximum number of attempts."
		})
		return;
	}

	// Capture the input fields
	let email = request.body.email;
	let password = request.body.password;
	if (email && password) {
		// Look for an account that matches the email and password
    	User.findAll({ 
			where: { 
				email: email, 
				password: password
			} 
		})
			.then(data => {
				if (data && data.length == 1) {
					console.log("User with id " + data[0].id + " logged in.");
					// Authenticate the user
					request.session.loggedin = true;
					request.session.username = data[0].name;
					request.session.userId = data[0].id;
					request.session.userRole = data[0].role;
					request.session.attemptCount = 0;
					response.send({
						message: `Logged succesfully!`
					});
				} else {
					// Count current failed attempts
					if (!request.session.attemptCount) {
						request.session.attemptCount = 1;
					} else {
						request.session.attemptCount++;
					}
					response.status(404).send({
						message: `Incorrect Username and/or Password! Attempts: ${request.session.attemptCount}`,
					});
				}
			})
			.catch(err => {
				response.status(500).send({
					message:
						err.message || "Some error occurred while retrieving user details."
				});
			});
	} else {
		response.status(400).send('Please enter Username and Password!');
		response.end();
	}
}

exports.getLoggedUser = (request, response) => {
	if (request.session.loggedin) {
		response.send(request.session.username);
	} else {
		response.send(null);
	}
}

exports.isLoggedIn = (request, response) => {
	response.send(request.session.loggedin);
}