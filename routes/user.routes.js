const { Router } = require("express");
const User = require("../models/User.model");

const router = Router();

router.get("/user-profile", (req, res, next) => {
  const { username, companies } = req.session.currentUser;
  res.render("user/user-profile", { username, companies });
});

module.exports = router;
