const mongoose = require("mongoose");
const user = require("../../models/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const signin = async (req, res) => {
  let checkUser;
  const { email, password } = req.body;
  try {
    checkUser = await user
      .findOne({ email }, (error, response) => {
        if (error) return res.json({ message: 1 });
        else {
          return response;
        }
      })
      .clone();
  } catch (error) {
    if (error) return res.status(500).json({ message: error.message });
  }
  if (!checkUser) return res.json({ message: 1 });
  const compare = await bcrypt.compare(password, checkUser.password);
  if (!compare) return res.json({ message: 2 });

  const token = jwt.sign(checkUser.toJSON(), process.env.SECRET, {
    expiresIn: "3h",
  });

  res
    .status(200)
    .json({ user: checkUser, token: token, time: Date.now() + 900000 });
};
module.exports = signin;
