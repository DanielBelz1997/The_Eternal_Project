const { Userlogin } = require("../data/database");
const path = require("path");
const bcrypt = require("bcrypt");
const HomePage = "http://127.0.0.1:8080/index.html";

const handleNewUser = async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;
  if (!(username && email && password && repeatPassword))
    return res.status(400).json({ message: "All fileds are required." });
  // check for duplicate usernames in the db
  const duplicate = await Userlogin.findAll({ where: { user_name: username } });
  if (duplicate.length > 0) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    //store the new user
    const newUser = await Userlogin.create({
      user_name: username,
      user_pwd: hashedPwd,
      user_mail: email,
      user_rule: 1000,
    });

    console.log(`new user created!: ${username}`);
    res.redirect(HomePage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
