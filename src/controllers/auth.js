const db = require("../models");
const jwt = require("jsonwebtoken");
let jwtSecretKey = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const signUp = async (req, res) => {
  try {
    const {
      email,
      firstName,
      message,
      password,
      confirmPassword,
      phone,
      countryRegion,
      lastName,
      termsAndServices,
    } = req.body;
    // if (password.length < 8 || confirmPassword.length < 8) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Password length should be greater than 7",
    //
    //       });
    // }
    const newUser = new db.userModel({
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      countryRegion,
      termsAndServices,
      message,
      phone,
      countryRegion,
    });
    newUser.password = await bcrypt
      .hash(password, saltRounds)
      .then((hash) => {
        console.log("Hash ", hash);
        return hash;
      })
      .catch((err) => console.error(err.message));
    await newUser.save();
    if (newUser._id) {
      const data = {
        userId: newUser._id,
        role: "user",
      };
      newUser.token = jwt.sign(data, jwtSecretKey, { expiresIn: "99y" });

      await newUser.save();
    }

    return res.status(201).json({
      success: true,
      message: "Account created Successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to create your account.",
      error: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const prevUser = await db.userModel.findOne({ email: email });
    if (prevUser?._id) {
      const decodedPassword = await bcrypt
        .compare(password, prevUser?.password)
        .then((res) => {
          console.log(res);
          return res;
        });
      if (decodedPassword) {
        return res.status(201).json({
          success: true,
          message: "User Logged Successfully",
          data: prevUser,
        });
      }
      else{
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials",
            error: "Invalid Credentials",
          });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "No user Registered with this email",
        error: "No user Registered with this email",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to Login your account.",
      error: error.message,
    });
  }
};
module.exports = {
  signUp,
  login,
};
// function validateUser(hash) {
//     bcrypt
//       .compare(password, hash)
//       .then(res => {
//         console.log(res) // return true
//       })
//       .catch(err => console.error(err.message))
// }
