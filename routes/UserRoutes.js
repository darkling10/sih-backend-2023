import { Router } from "express";
import { check } from "express-validator";
import { userRegistration, userLogin } from "../controllers/UserController.js";

const router = Router();

router.get("/", (req, res) => {
  console.log("User route triggered");
  res.send("<h2>User route</h2>");
});

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please include valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  userRegistration
);

router.post(
  "/login",
  [
    check("email", "please include valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  userLogin
);

export { router as UserRoute };
