import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import pkg from 'jsonwebtoken';
const { sign } = pkg;


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  var salt = bcrypt.genSaltSync(10);
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

UserSchema.methods.getAuthToken = async function (data) {
    let params = {
      id: this.id,
      email: this.email,
      name: this.name,
      userType: this.userType,
    };

    console.log("Inroke")
    var tokenValue = sign(params, process.env.JWTSECRETKEY, {
      expiresIn: "300000s",
    });
    
    return tokenValue;
  };

const User = mongoose.model("User", UserSchema);

export default User;
