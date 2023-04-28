"use strict";

const enumrateBtn = document.querySelector(".enumrate_button");
let port = Math.trunc(Math.random() * 10000);

// the back needed for that operation
let localIP = 0;

const SendToMetasploit = function () {
  const ipAttAddress = document.querySelector(".search").value;
  return ipAttAddress, port, localIP;
};

enumrateBtn.addEventListener("click", SendToMetasploit);
