/* eslint-disable */

let timer
let time = {
  sessionTime: 1500,
  breakTime: 300,
  status: "session",
  breakColor: "rgb(30, 150, 255)",
  sessionColor: "rgb(255, 165, 0)"
}

const updateDisplay = () => {
  let mins = Math.floor(time[time.status + "Time"] / 60)
  let secs = Math.floor(time[time.status + "Time"] % 60)
  if (mins < 10) {
    mins = "0" + mins
  }
  if (secs < 10) {
    secs = "0" + secs
  }
  document.getElementById("countdown").innerHTML = `${mins}:${secs}`
  document.getElementById("state").innerHTML = time.status.toUpperCase()
}

const operateTime = () => {
  if (document.getElementById("circ-drawing").classList.contains("paused") ||
      document.getElementById("circ-drawing").classList.length === 0) {
    fillButton()
  } else {
    pauseTime()
  }
}

const fillButton = () => {
  let path = document.getElementById("circ-drawing")
  if (!path.classList.contains("drawing-session") && !path.classList.contains("drawing-break")){
    path.style.setProperty("--my-transition-time", `${time[time.status + "Time"]}s`)
    path.classList.add(`drawing-${time.status}`)
    path.classList.remove("paused")
    document.getElementById("operate").innerHTML = `<i class="fa fa-pause" aria-hidden="true"></i>`
    document.body.style.setProperty("border", '5px solid orange')
    if (time.status === "session"){
      document.getElementById("circ-drawing").style.setProperty("stroke", "orange")
    } else {
      document.getElementById("circ-drawing").style.setProperty("stroke", "#FFCB00")
    }
    timer = setInterval(countDown, 1000)
  }
}

const countDown = () => {
  let pathClass = document.getElementById("circ-drawing").classList
  if (pathClass.contains("drawing-session")){
    if(time.sessionTime === 1) {
      clearInterval(timer)
      document.getElementById("circ-drawing").classList.remove("drawing-session")
      document.getElementById("circ-drawing").classList.add("drawing-break")
      document.getElementById("circ-drawing").style.setProperty("--my-transition-time", `${time.breakTime}s`)
      document.getElementById("circ-drawing").style.setProperty("stroke", "#FFCB00")
      document.getElementById("operate").innerHTML = `<i class="fa fa-pause" aria-hidden="true"></i>`
      time.status = "break"
      document.body.style.setProperty("border", '5px solid #FFCB00')
      timer = setInterval(countDown, 1000);
      time.sessionTime = parseInt(document.getElementById("session-time").innerText) * 60 + 1
    }
    time.sessionTime -= 1
  } else if (pathClass.contains("drawing-break")){
    if (time.breakTime === 1){
      clearInterval(timer)
      document.getElementById("circ-drawing").classList.remove("drawing-break")
      document.getElementById("circ-drawing").classList.add("drawing-session")
      document.getElementById("circ-drawing").style.setProperty("--my-transition-time", `${time.sessionTime}s`)
      document.getElementById("circ-drawing").style.setProperty("stroke", "orange")
      document.body.style.setProperty("border", '5px solid orange')
      document.getElementById("operate").innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`
      time.status = "session"
      timer = setInterval(countDown, 1000);
      time.breakTime = parseInt(document.getElementById("break-time").innerText) * 60 + 1
    } 
    time.breakTime -= 1
  }
  updateDisplay()
  console.log(time.sessionTime, time.breakTime)
  
}

const clearTime = () => {
  clearInterval(timer)
  time.sessionTime = parseInt(document.getElementById("session-time").innerText) * 60
  time.status = "session"
  updateDisplay()
  let pathClass = document.getElementById("circ-drawing").classList
  pathClass.remove("drawing-session")
  pathClass.remove("drawing-break")
  pathClass.remove("paused")
  let path = document.getElementById("circ-drawing")
  document.body.style.setProperty("border", '5px solid orange')
  path.style.setProperty("--circle-offset", path.getTotalLength())
  document.getElementById("operate").innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`
}

const pauseTime = () => {
  clearInterval(timer)
  document.getElementById("operate").innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`
  let path = document.getElementById("circ-drawing")
  let offset = getComputedStyle(path).strokeDashoffset
  path.style.setProperty("--circle-offset", offset)
  console.log(offset)
  let pathClass = document.getElementById("circ-drawing").classList
  if (pathClass.contains("drawing-session")) {
    path.style.setProperty("stroke", "orange")
    pathClass.remove("drawing-session")
  } else if (pathClass.contains("drawing-break")) {
    path.style.setProperty("stroke", "#FFCB00")
    pathClass.remove("drawing-break")
  }
  pathClass.add("paused")
}

const changeTime = (id) => {
  console.log(id);
  let breakDisplay = parseInt(document.getElementById("break-time").innerText)
  let sessDisplay = parseInt(document.getElementById("session-time").innerText)
  if(document.getElementById("circ-drawing").classList.length === 0) {
    if (id === "break-minus" && breakDisplay > 1) {
      document.getElementById("break-time").innerHTML = breakDisplay - 1
    } else if (id === "break-plus" && breakDisplay < 45) {
      document.getElementById("break-time").innerHTML = breakDisplay + 1
    } else if (id === "session-minus" && sessDisplay > 1) {
        document.getElementById("session-time").innerHTML = sessDisplay - 1
    } else if (id === "session-plus" && sessDisplay < 45) {
      document.getElementById("session-time").innerHTML = sessDisplay + 1
    }
    time.sessionTime = parseInt(document.getElementById("session-time").innerText) * 60
    time.breakTime = parseInt(document.getElementById("break-time").innerText)* 60
    updateDisplay()
  }
}