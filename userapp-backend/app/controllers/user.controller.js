const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.role) {
        res.status(400).send({
            message: `One or more fields are missing.`
        });
        return;
    }
    // Create a User
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

    // check if logged in
    if (!req.session.loggedin) {
        res.status(401).send({
            message: "You're not logged in."
        });
        return;
    }

    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    // check if logged in
    if (!req.session.loggedin) {
        res.status(401).send({
            message: "You're not logged in."
        })
        return;
    }

    const id = req.params.id;
    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    // check if logged in
    if (!req.session.loggedin) {
        res.status(401).send({
            message: "You're not logged in."
        });
        return;
    }

    const id = req.params.id;

    // check if user has admin permissions
    if (req.session.userRole !== "admin") {
        // check if it's at least its own account
        if (req.session.userId != id) {
            res.status(403).send({
                message: "You don't have permissions for that."
            });
            return;
        }
    }

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    // check if logged in
    if (!req.session.loggedin) {
        res.status(401).send({
            message: "You're not logged in."
        });
        return;
    }
    
    const id = req.params.id;

    // check if user has admin permissions or if it's same account deleting itself
    if (req.session.userRole !== "admin" || req.session.userId == id) {
        res.status(403).send({
            message: "You don't have permissions for that."
        });
        return;
    } 

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    // check if logged in
    if (!req.session.loggedin) {
        res.status(401).send({
            message: "You're not logged in."
        });
        return;
    }

    // check if user has admin permissions
    if (req.session.userRole !== "admin") {
        res.status(403).send({
            message: "You don't have permissions for that."
        });
        return;
    }
    
    // delete all but current session user
    User.destroy({
        where: {
            id: {
                [Op.ne]: req.session.userId
            }
        },
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};
