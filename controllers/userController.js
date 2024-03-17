const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const controller = {
  async registerUser(req, res) {
    try {
      const { Name, Email, Password, ConfirmPassword, Age, Mobile } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Password, salt);

      const findexistingUser = await User.findOne({ Email: Email });

      if (!findexistingUser) {
        if (Password === ConfirmPassword) {
          const registeredData = await User.create({
            Name,
            Email,
            Password: hashedPassword,
            Age,
            Mobile,
          });

          res.status(200).json({
            status: true,
            message: "User registered successfully",
            registeredData,
          });
        } else {
          res
            .status(401)
            .json({ status: false, message: "Password doesn't match" });
        }
      } else {
        res.status(409).json({ status: false, message: "User already exist" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },

  async loginUser(req, res) {
    try {
      const { Email, Password } = req.body;

      const findexistingUser = await User.findOne({ Email: Email });

      if (findexistingUser) {
        const compare = await bcrypt.compare(
          Password,
          findexistingUser.Password
        );

        if (compare) {
          const token = jwt.sign({ id: findexistingUser._id }, "abcd", {
            expiresIn: "1hr",
          });

          res.status(201).json({
            status: true,
            message: "Login Successfully",
            token: token,
          });
        } else {
          res.status(401).json({ status: false, message: "Invalid password" });
        }
      } else {
        res.status(404).json({ status: false, message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
};

module.exports = controller;
