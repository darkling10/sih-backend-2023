import { validationResult } from "express-validator";
import User from "../models/userModel.js";

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

export { userRegistration };
