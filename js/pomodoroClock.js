/* eslint-disable */
let timer
let time = {
  sessionTime: 1500,
  breakTime: 300,
  status: "session",
  breakColor: "rgb(97, 181, 253)",
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
    startTimer()
  } else {
    pauseTimer()
  }
}

const startDrawing = (adding, removing) => {
  let path = document.getElementById("circ-drawing")
  path.style.setProperty("--my-transition-time", `${time[time.status + "Time"]}s`)
  path.style.setProperty("stroke", `${time[time.status + "Color"]}`)
  path.classList = ""
  path.classList.add(`drawing-${adding}`)
  document.body.style.setProperty("border", `5px solid ${time[time.status + "Color"]}`)
  time[removing + "Time"] = parseInt(document.getElementById(removing + "-time").innerText) * 60
  document.getElementById("operate").innerHTML = `<i class="fa fa-pause" aria-hidden="true"></i>`
}

const startTimer = () => {
  let path = document.getElementById("circ-drawing")
  if (!path.classList.contains("drawing-session") && !path.classList.contains("drawing-break")){
    time.status === "session" ? startDrawing("session", "break") : startDrawing("break", "session")
    timer = setInterval(countDown, 1000)
  }
}

const countDown = () => {
  
  if (time.sessionTime === 0 || time.breakTime === 0) {
    clearInterval(timer)
    let oldStatus = time.status
    let newStatus = (time.status === "session") ? "break" : "session"
    time.status = newStatus
    updateDisplay()
    startDrawing(newStatus, oldStatus)
    timer = setInterval(countDown, 1000)
  } else {
    time[time.status + "Time"] -= 1
    updateDisplay()
    console.log(time.sessionTime, time.breakTime)
  }
}

const clearTime = () => {
  clearInterval(timer)
  time.sessionTime = parseInt(document.getElementById("session-time").innerText) * 60
  time.status = "session"
  updateDisplay()
  document.getElementById("circ-drawing").classList = ""
  document.body.style.setProperty("border", '5px solid rgb(255, 165, 0)')
  let path = document.getElementById("circ-drawing")
  path.style.setProperty("--circle-offset", path.getTotalLength())
  document.getElementById("operate").innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`
}

const pauseTimer = () => {
  clearInterval(timer)
  document.getElementById("operate").innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`
  let path = document.getElementById("circ-drawing")
  let offset = getComputedStyle(path).strokeDashoffset
  path.style.setProperty("--circle-offset", offset)
  path.style.setProperty("stroke", `${time[time.status + "Color"]}`)
  let pathClass = document.getElementById("circ-drawing").classList
  pathClass.remove(`drawing-${time.status}`)
  pathClass.add("paused")
}

const changeTime = (id) => {
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