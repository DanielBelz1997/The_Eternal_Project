const { Userlogin, dataValues } = require("../data/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const HomePage = "http://127.0.0.1:8080/index.html";
let theCurrentUser = {};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res
      .status(400)
      .render(path.join(__dirname, "..", "pages", "emptyfileds.ejs"));
  }

  theCurrentUser = await Userlogin.findOne({
    where: { user_name: username },
  });

  if (!theCurrentUser) {
    return res
      .status(401)
      .render(path.join(__dirname, "..", "pages", "notAuth.ejs"));
  }

  const match = await bcrypt.compare(
    password,
    theCurrentUser.dataValues.user_pwd
  );
  if (!match) {
    return res
      .status(401)
      .render(path.join(__dirname, "..", "pages", "notAuth.ejs"));
  }

  const user_rule = theCurrentUser.user_rule
    ? Object.values(theCurrentUser.user_rule)
    : [];
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: theCurrentUser.user_name,
        user_rule: user_rule,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: theCurrentUser.user_name },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  theCurrentUser.refreshToken = refreshToken;
  await theCurrentUser.save();

  console.log(`refresh token added to: ${theCurrentUser.user_name}`);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.redirect(HomePage);
};

module.exports = { handleLogin, theCurrentUser };
