const { User } = require("../models/user");
const passHash = require("password-hash");
const jwt = require("jsonwebtoken");

async function loginUser(req, resp, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    // password check
    ispasswordMatched = passHash.verify(password, user.password);
    if (ispasswordMatched) {
      // creating payload------->>>>
      const payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
      };
      // creating jwt token------->>>>>>
      const token = jwt.sign(payload, "JEEMAINS");
      return resp.json({ message: "login success", token: token });
    }
  }
  resp.status(400);
  return resp.json({ message: "LOGIN ERROR....invalid email or password" });
}

async function saveUsers(req, resp, next) {
  const userData = req.body;
  if (userData.password !== userData.repassword) {
    return next(new Error("password not matched"));
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    userData.password = passHash.generate(userData.password);
    const user = await new User(userData).save();
    return resp.json(user);
  } else {
    resp.status(400)
    return resp.json({message:"email already exists"})
  }
}
module.exports = { loginUser, saveUsers };