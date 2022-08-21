module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    var router = require("express").Router();
    // Login user
    router.post("/", auth.login);
    router.get("/username", auth.getLoggedUser);
    router.get("/", auth.isLoggedIn);
    app.use('/api/auth', router);
  };