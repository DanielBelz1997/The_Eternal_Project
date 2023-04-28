const { Userlogin, DataValues } = require("../data/database");
const path = require("path");
let theCurrentUser = {};
const logOutPage = "http://127.0.0.1:8080/logout.ejs";

const handleLogout = async (req, res) => {
  // on client also delete the access token
  // set it to zero or null somthing like that

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content to send back
  const refreshToken = cookies.jwt;
  //  is refresh token in db?
  theCurrentUser = await Userlogin.findOne({
    refresh_token: refreshToken,
  });

  if (!theCurrentUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false });
    return res.sendStatus(204);
  }

  // delete refresh token in the DB:
  theCurrentUser.refreshToken = "";
  await theCurrentUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false }); // secure: true - for https (production)
  console.log("cookies deleted!");

  res.redirect(logOutPage);
};

module.exports = { handleLogout };
