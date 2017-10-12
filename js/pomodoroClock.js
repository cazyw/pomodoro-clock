/* eslint-disable */

let sessionTime = 1500
let breakTime = 300
let timer
let status = "Session"

const updateDisplay = (type) => {
  let mins, secs
  if(type === "Session") {
    mins = Math.floor(sessionTime / 60)
    secs = Math.floor(sessionTime % 60)
    
  } else {
    mins = Math.floor(breakTime / 60)
    secs = Math.floor(breakTime % 60)
  }
  if (mins < 10) {
    mins = "0" + mins
  }
  if (secs < 10) {
    secs = "0" + secs
  }
  document.getElementById("time-set").innerHTML = `${type}: ${mins} minutes ${secs} seconds` 
  document.getElementById("countdown").innerHTML = `${mins}:${secs}`
}

const fillButton = () => {
  let pathCirc = document.getElementsByTagName("path")[0].classList
  if (status === "Session" && !pathCirc.contains("drawing-session")) {
    let circ = document.querySelector("#circ-drawing")
    circ.style.setProperty("--my-transition-time", `${sessionTime}s`)
    document.getElementById("circ-drawing").style.setProperty("stroke", "orange")
    pathCirc.remove("paused")
    pathCirc.add("drawing-session")
    timer = setInterval(countDown, 1000);
  } else if (status === "Break" && !pathCirc.contains("drawing-break")) {
    let circ = document.querySelector("#circ-drawing")
    circ.style.setProperty("--my-transition-time", `${breakTime}s`)
    document.getElementById("circ-drawing").style.setProperty("stroke", "#68D39E")
    pathCirc.remove("paused")
    pathCirc.add("drawing-break")
    timer = setInterval(countDown, 1000);
  }
}

const countDown = () => {
  let pathCirc = document.getElementById("circ-drawing").classList
  if (pathCirc.contains("drawing-session")){
    if(sessionTime === 1) {
      clearInterval(timer)
      document.getElementById("circ-drawing").classList.remove("drawing-session")
      document.getElementById("circ-drawing").classList.add("drawing-break")
      document.getElementById("circ-drawing").style.setProperty("--my-transition-time", `${breakTime}s`)
      document.getElementById("circ-drawing").style.setProperty("stroke", "#68D39E")
      status = "Break"
      timer = setInterval(countDown, 1000);
      sessionTime = parseInt(document.getElementById("session-time").innerText) * 60 + 1
    }
    sessionTime -= 1
  } else if (pathCirc.contains("drawing-break")){
    if (breakTime === 1){
      clearInterval(timer)
      document.getElementById("circ-drawing").classList.remove("drawing-break")
      document.getElementById("circ-drawing").classList.add("drawing-session")
      document.getElementById("circ-drawing").style.setProperty("--my-transition-time", `${sessionTime}s`)
      document.getElementById("circ-drawing").style.setProperty("stroke", "orange")
      status = "Session"
      timer = setInterval(countDown, 1000);
      breakTime = parseInt(document.getElementById("break-time").innerText) * 60 + 1
    } 
    breakTime -= 1
  }
  updateDisplay(status)
  console.log(sessionTime, breakTime)

}

const clearTime = () => {
  clearInterval(timer)
  sessionTime = parseInt(document.getElementById("session-time").innerText) * 60
  updateDisplay("Session")
  let pathCirc = document.getElementById("circ-drawing").classList
  pathCirc.remove("drawing-session")
  pathCirc.remove("drawing-break")
  pathCirc.remove("paused")
  let line = document.getElementById("circ-drawing")
  line.style.setProperty("--circle-offset", line.getTotalLength())
}

const pauseTime = () => {
  clearInterval(timer)
  let path = document.getElementById("circ-drawing")
  let offset = getComputedStyle(path).strokeDashoffset
  console.log(offset)
  // let pathCirc = document.getElementsByTagName("path")[0].classList
  let pathCirc = document.getElementById("circ-drawing").classList
  path.style.setProperty("--circle-offset", offset)
  if (pathCirc.contains("drawing-session")) {
    path.style.setProperty("stroke", "orange")
    pathCirc.remove("drawing-session")
  } else if (pathCirc.contains("drawing-break")) {
    path.style.setProperty("stroke", "#68D39E")
    pathCirc.remove("drawing-break")
  }
  pathCirc.add("paused")
}

const changeTime = (id) => {
  console.log(id);
  if(document.getElementById("circ-drawing").classList.length === 0) {
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
    breakTime = parseInt(document.getElementById("break-time").innerText) * 60
    updateDisplay("Session")

  }
  
  
}