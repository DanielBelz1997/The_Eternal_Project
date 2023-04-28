"use strict";

import { isLogin } from "../../controllers/authController";

const loginWindow = document.querySelector(".loginWindow");
const overlay = document.querySelector(".overlay");
const loginBtn = document.querySelector(".login");
const registerBtn = document.querySelector(".register");
const closeModalBtn = document.querySelector(".closeModalBtn");
const registerWindow = document.querySelector(".registerWindow");
const redBtn = document.querySelector(".redTeam");
const blueBtn = document.querySelector(".blueTeam");
const username = document.querySelector(".welcome_p");

username.textContent = isLogin;

let redTeam = false;
let blueTeam = false;

redBtn.addEventListener("click", function () {
  redTeam = true;
});

blueBtn.addEventListener("click", function () {
  blueTeam = true;
});
