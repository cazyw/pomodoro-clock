const fillButton = () => {
  let pathCirc = document.getElementsByTagName("path")[0].classList
  if (pathCirc.contains("drawing")) {
    pathCirc.remove("drawing")
    document.getElementById("time-set").innerHTML = "unset"
  } else {
    // let time = prompt("Time in seconds: ")
    let circ = document.querySelector("#circ-drawing")
    let time = parseInt(document.getElementById("session-time").innerText) * 60
    document.getElementById("time-set").innerHTML = `${time / 60} minutes ${time % 60} seconds`
    circ.style.setProperty("--my-transition-time", `${time}s`)
    pathCirc.add("drawing")
    setInterval(countDown, 1000);
  }
}

const countDown = () => {
  
}

const changeTime = (id) => {
  console.log(id);
  if (id === "break-minus") {
    if (parseInt(document.getElementById("break-time").innerText) > 0) {
      document.getElementById("break-time").innerHTML = parseInt(document.getElementById("break-time").innerText) - 1
    }
  } else if (id === "break-plus") {
      document.getElementById("break-time").innerHTML = parseInt(document.getElementById("break-time").innerText) + 1
  } else if (id === "session-minus") {
    if (parseInt(document.getElementById("session-time").innerText) > 0) {
      document.getElementById("session-time").innerHTML = parseInt(document.getElementById("session-time").innerText) - 1
    }
  } else if (id === "session-plus") {
      document.getElementById("session-time").innerHTML = parseInt(document.getElementById("session-time").innerText) + 1
  }
}