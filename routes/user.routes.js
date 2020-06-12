const { Router } = require("express");
const User = require("../models/User.model");
const alphaKey = "AKW7U8FI1GS9YXYK";

const router = Router();

router.get("/user-profile", async (req, res, next) => {
  try {
    const { username, companies, _id } = req.session.currentUser;
    const userLogged = User.findById(_id);
    console.log(userLogged);
    //const companies = userLogged;
    res.render("user/user-profile", { username, companies, alphaKey });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
