const { Router } = require("express");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");

const router = Router();
const saltRounds = 10;

router.get("/login", (req, res, next) => res.render("auth/login"));
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.render("auth/login", {
        errorMessage: "Please, enter both, email and password to login.",
      });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.render("auth/login", {
        errorMessage: "Email is not registered. Try with other email.",
      });
      return;
    } else if (bcryptjs.compareSync(password, user.passwordHash)) {
      req.session.currentUser = user;
      res.redirect("/user-profile");
    } else {
      res.render("auth/login", { errorMessage: "Incorrect Password." });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //client side validation: all fields completed
    if (!username || !email || !password) {
      res.render("auth/signup", {
        errorMessage:
          "Las informaciones username, email y contraseña son mandatorias",
      });
      return;
    }
    //client side validation: password security level
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
      res.status(500).render("auth/signup", {
        errorMessage:
          "Password needs to have at least 6 chars, at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }
    //hashing the password
    const salt = await bcryptjs.genSalt(saltRounds);
    const hashedPassword = await bcryptjs.hash(password, salt);
    //Creamos el usuario con éxito
    const user = await User.create({
      username: username,
      email: email,
      passwordHash: hashedPassword,
    });
    console.log("User created succesfully!");
    //Crear session y redireccionar
    req.session.currentUser = user;
    res.redirect("/user-profile");
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).render("auth/signup", { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(400).render("auth/signup", {
        errorMessage: "Username o correo ya existen...",
      });
    } else {
      next(error);
    }
  }
});

//LOGOUT
router.post("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
