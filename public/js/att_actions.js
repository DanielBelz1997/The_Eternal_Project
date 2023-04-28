"use strict";

const whoami = document.querySelector(".whoamiBtn");
const upload = document.querySelector(".uploadBtn");
const getuid = document.querySelector(".getuidBtn");
const ps = document.querySelector(".psBtn");
const migrate = document.querySelector(".migrateBtn");
const pe = document.querySelector(".peBtn");
const hashdump = document.querySelector(".hashdumpBtn");
const search = document.querySelector(".searchBtn");
const clearsys = document.querySelector(".clearsysBtn");
const sysinfo = document.querySelector(".sysinfoBtn");

const actionsArr = [
  whoami,
  upload,
  getuid,
  ps,
  migrate,
  pe,
  hashdump,
  search,
  clearsys,
  sysinfo,
];

// function that sends the string to the meterpreter shell
for (let action = 0; action < actionsArr.length; action++) {
  actionsArr[action].addEventListener("click", function () {
    console.log(actionsArr[action].textContent);
  });
}

// getting the output and sending it back to the text input box (next)
