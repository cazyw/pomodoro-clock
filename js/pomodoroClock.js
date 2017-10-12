/* eslint-disable */

let sessionTime = 1500
let breakTime = 300
let timer
let status = "session"

const updateDisplay = () => {
  let mins = Math.floor(sessionTime / 60)
  let secs = Math.floor(sessionTime % 60)
  if (mins < 10) {
    mins = "0" + mins
  }
  if (secs < 10) {
    secs = "0" + secs
  }
  document.getElementById("time-set").innerHTML = `${mins} minutes ${secs} seconds` 
  document.getElementById("countdown").innerHTML = `${mins}:${secs}`
}

const fillButton = () => {
  let pathCirc = document.getElementsByTagName("path")[0].classList
  if (!pathCirc.contains("drawing-session")) {
    let circ = document.querySelector("#circ-drawing")
    circ.style.setProperty("--my-transition-time", `${sessionTime}s`)
    pathCirc.remove("paused")
    pathCirc.add("drawing-session")
    timer = setInterval(countDown, 1000);
  }
}

const countDown = () => {
  if (sessionTime === 1) {
    clearInterval(timer)
    document.getElementById("circ-drawing").add("drawing-break")
    fillButton()
  }
  sessionTime -= 1;
  updateDisplay()
  console.log(sessionTime)
}

const clearTime = () => {
  clearInterval(timer)
  sessionTime = parseInt(document.getElementById("session-time").innerText) * 60
  updateDisplay()
  let pathCirc = document.getElementById("circ-drawing").classList
  pathCirc.remove("drawing-session")
  pathCirc.remove("drawing-break")
  pathCirc.remove("paused")
  // let line = document.getElementById("circ-drawing-session")
  pathCirc.style.setProperty("--circle-offset", 628.406494140625)
}

const pauseTime = () => {
  clearInterval(timer)
  let path = document.getElementById("circ-drawing")
  let offset = getComputedStyle(path).strokeDashoffset
  console.log(offset)
  // let pathCirc = document.getElementsByTagName("path")[0].classList
  // path.remove("drawing-session")
  // path.remove("drawing-break")
  path.classList.add("paused")
  path.style.setProperty("--circle-offset", offset)
  if (path.classList.contains("drawing-session")) {
    path.style.setProperty("stroke", "orange")
  } else if (path.classlist.contains("drawing-break")) {
    path.style.setProperty("stroke", "#68D39E")
  }
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
  updateDisplay()
  
}