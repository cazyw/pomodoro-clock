/* eslint-disable */

let sessionTime = 900
let breakTime = 300
let timer

const fillButton = () => {
  let pathCirc = document.getElementsByTagName("path")[0].classList
  if (!pathCirc.contains("drawing")) {
    let circ = document.querySelector("#circ-drawing")
    circ.style.setProperty("--my-transition-time", `${sessionTime}s`)
    pathCirc.add("drawing")
    pathCirc.remove("paused")
    timer = setInterval(countDown, 1000);
  }
}

const countDown = () => {
  if (sessionTime === 0) {
    clearInterval(timer)
  }
  sessionTime -= 1;
  let mins = Math.floor(sessionTime / 60)
  let secs = Math.floor(sessionTime % 60)
  if (mins < 10) {
    mins = "0" + mins
  }
  if (secs < 10) {
    secs = "0" + secs
  }
  document.getElementById("time-set").innerHTML = `${mins} minutes ${secs} seconds` 
  console.log(sessionTime)
}

const clearTime = () => {
  clearInterval(timer)
  sessionTime = parseInt(document.getElementById("session-time").innerText) * 60
  let mins = Math.floor(sessionTime / 60)
  let secs = Math.floor(sessionTime % 60)
  if (mins < 10) {
    mins = "0" + mins
  }
  if (secs < 10) {
    secs = "0" + secs
  }
  document.getElementById("time-set").innerHTML = `${mins} minutes ${secs} seconds` 
  let pathCirc = document.getElementsByTagName("path")[0].classList
  pathCirc.remove("drawing")
  pathCirc.remove("paused")
  let line = document.getElementById("circ-drawing")
  line.style.setProperty("--circle-offset", 628.406494140625)
}

const pauseTime = () => {
  clearInterval(timer)
  let line = document.getElementById("circ-drawing")
  let offset = getComputedStyle(line).strokeDashoffset
  console.log(offset)
  let pathCirc = document.getElementsByTagName("path")[0].classList
  pathCirc.remove("drawing")
  line.style.setProperty("--circle-offset", offset)
  pathCirc.add("paused")
}

const changeTime = (id) => {
  console.log(id);
  if (id === "break-minus") {
    if (parseInt(document.getElementById("break-time").innerText) > 1) {
      document.getElementById("break-time").innerHTML = parseInt(document.getElementById("break-time").innerText) - 1
    }
  } else if (id === "break-plus") {
    document.getElementById("break-time").innerHTML = parseInt(document.getElementById("break-time").innerText) + 1
  } else if (id === "session-minus") {
    if (parseInt(document.getElementById("session-time").innerText) > 1) {
      document.getElementById("session-time").innerHTML = parseInt(document.getElementById("session-time").innerText) - 1
    }
  } else if (id === "session-plus") {
    document.getElementById("session-time").innerHTML = parseInt(document.getElementById("session-time").innerText) + 1
  }
  sessionTime = parseInt(document.getElementById("session-time").innerText) * 60
  let mins = Math.floor(sessionTime / 60)
  let secs = Math.floor(sessionTime % 60)
  if (mins < 10) {
    mins = "0" + mins
  }
  if (secs < 10) {
    secs = "0" + secs
  }
  document.getElementById("time-set").innerHTML = `${mins} minutes ${secs} seconds` 
  
}