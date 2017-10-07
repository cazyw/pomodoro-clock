const fillButton = () => {
  let canvas = document.getElementById("drawing").classList
  if (canvas.contains("drawing")) {
    canvas.remove("drawing")
  } else {
    canvas.add("drawing")
  }
}