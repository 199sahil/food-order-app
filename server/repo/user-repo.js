const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

const jwtSecret = process.env.JWT_SECRET;

// sign up
async function signUpUser(name, email, password) {
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // create user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  // create token
  const token = jwt.sign({ userId: user._id }, jwtSecret, {
    expiresIn: "7d",
  });
  // send token
  return { token, id: user._id };
}

// login
async function loginUser(email, password) {
  // find user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error({ error: "No User Found" });
  }
  // compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error({ error: "Invalid credentials" });
  }
  // create token
  const token = jwt.sign({ userId: user._id }, jwtSecret, {
    expiresIn: "7d",
  });

  // send token
  return { token, id: user._id };
}

// check session
async function checkSession(token) {
  const payload = jwt.verify(token, jwtSecret);
  const user = await User.findById(payload.userId).select("-password");
  return user;
}

//list all users
async function listUsers() {
  const users = await User.find();
  return users;
}

module.exports = { signUpUser, loginUser, checkSession, listUsers };
