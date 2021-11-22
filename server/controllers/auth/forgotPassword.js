const crypto = require("crypto");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const person = require("../../models/models");

const forgotPassword = async (req, res) => {
  console.log(process.env.HOST);
  let user;
  let token;
  let userUpdate;
  let { email } = req.body;
  try {
    const user = await person
      .find({ email }, (error, response) => {
        if (error) {
          return res.status(400).json(error.message);
        } else {
          if (response === null) {
            return res.json({ message: "no such user" });
          }
          return response;
        }
      })
      .clone();
    token = crypto.randomBytes(20).toString("hex");
    userUpdate = await person
      .findOneAndUpdate(
        { email },
        { resetToken: token, expireToken: Date.now() + 900000 },
        (err, respose) => {
          if (err) {
            console.log(err.message + "  failed here");
          } else {
            console.log("saved token");
          }
        }
      )
      .clone();
  } catch (error) {
    if (error) console.log(error.message);
  }
  const transporter = nodemailer.createTransport({
    service: process.env.HOST,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
    tls: { rejectUnauthorized: false },
  });
  let mailOptions = {
    from: "podiousplus@gmail.com",
    to: email,
    subject: "reset password",
    text: `you requested to change your password. If it's you then click the link http://localhost:3000/ForgotPassword/${token} \n
            link expires in 15 minutes`,
  };
  const send = transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.log(err.message);
      console.log("failed");
      res.status(422).json("there was an error");
    } else {
      res.json({ message: "check mail for next steps" });
    }
  });
};
module.exports = forgotPassword;
