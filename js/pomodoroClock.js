const fillButton = () => {
  let canvas = document.getElementById("drawing").classList
  if (canvas.contains("drawing")) {
    canvas.remove("drawing")
  } else {
    let time = prompt("Time in seconds: ")
    let rect = document.querySelector("#drawing")
    rect.style.setProperty("--my-transition-time", `${time}s`)
    canvas.add("drawing")
  }
}