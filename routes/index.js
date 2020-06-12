const express = require("express");
const router = express.Router();
const alphaKey = "AKW7U8FI1GS9YXYK";
const mongoose = require("mongoose");

const Company = require("../models/company");
const User = require("../models/User.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const companies = await Company.find();
    if (req.session.currentUser) {
      const { username } = req.session.currentUser;
      res.render("index", { companies, alphaKey, username });
    }
    res.render("index", { companies, alphaKey });
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.render("add-company", req.session.currentUser);
});

router.post("/add", async (req, res, next) => {
  const user = req.session.currentUser;
  if (user) {
    const userId = req.session.currentUser._id;
    const newUserCompany = await Company.create(req.body);
    await User.findByIdAndUpdate(userId, {
      $push: { companies: newUserCompany },
    });
    await Company.findByIdAndDelete(newUserCompany._id);
    res.redirect("/user-profile");
  } else {
    Company.create(req.body).then(() => {
      console.log("Company added with success (2) !");
      res.redirect("/").catch((err) => `Error : ${err}`);
    });
  }
});

router.get("/delete/:id", (req, res, next) => {
  Company.findByIdAndDelete(req.params.id)
    .then((company) => {
      console.log(`${company.name} deleted!`);
      res.redirect("/");
    })
    .catch((err) => `Error : ${err}`);
});

router.post("/findOptions", (req, res, next) => {
  const { symbolName } = req.body;
  res.render("options", { symbolName });
});

module.exports = router;
