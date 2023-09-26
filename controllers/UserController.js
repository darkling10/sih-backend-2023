import { validationResult } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const userRegistration = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ json: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    // see if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    user = new User({
      name,
      email,
      password,
    });

    user.save();
    console.log("User Created successfully")

    const myToken = await user.getAuthToken()
    

    return res.status(200).json({ token: myToken });
  } catch (errors) {
    return res.status(400).json({ errors: errors });
  }
};


const userLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // see if user exists
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const myToken = await user.getAuthToken();
    res.status(200).json({ message: "Login success", token: myToken });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

export { userRegistration,userLogin };
