"use strict";

const enumrateBtn = document.querySelector(".enumrate_button");
let port = Math.trunc(Math.random() * 10000);

// the back needed for that operation
let localIP = 0;

const SendToMetasploit = function () {
  const ipDefAddress = document.querySelector(".search").value;
  return ipDefAddress, port, localIP;
};

enumrateBtn.addEventListener("click", SendToMetasploit);
