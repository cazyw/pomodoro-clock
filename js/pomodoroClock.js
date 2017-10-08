const fillButton = () => {
  let path_rect = document.getElementsByTagName("path")[0].classList
  let path_circ = document.getElementsByTagName("path")[1].classList
  if (path_rect.contains("drawing") && path_circ.contains("drawing")) {
    path_rect.remove("drawing")
    path_circ.remove("drawing")
    document.getElementById("time-set").innerHTML = "unset"
  } else {
    let time = prompt("Time in seconds: ")
    let rect = document.querySelector("#rect-drawing")
    let circ = document.querySelector("#circ-drawing")
    document.getElementById("time-set").innerHTML = `${time} seconds`
    rect.style.setProperty("--my-transition-time", `${time}s`)
    circ.style.setProperty("--my-transition-time", `${time}s`)
    path_rect.add("drawing")
    path_circ.add("drawing")
  }
  let myPath = document.getElementById("circ-drawing");
  var length = myPath.getTotalLength();
  console.log(length);
}