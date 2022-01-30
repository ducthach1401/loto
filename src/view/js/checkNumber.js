let canvas = document.getElementById("canvas");
let papers = document.getElementById("papers");
let undo = document.getElementById("undo");
let clearAll = document.getElementById("clearAll");
let context = canvas.getContext("2d");

var window_height = 618;
var window_width = 770;

canvas.width = window_width;
canvas.height = window_height;
context.clearRect(0, 0, canvas.width, canvas.height);
let paths = [];
undo.disabled = true;
clearAll.disabled = true;

class Check {
  constructor(_xPoint, _yPoint, _radius) {
    this.xPoint = _xPoint;
    this.yPoint = _yPoint;
    this.radius = _radius;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.xPoint, this.yPoint, 5, 2 * Math.PI, false);
    context.strokeStyle = "red";
    context.lineWidth = 3;
    context.stroke();
  }
}



canvas.addEventListener("click", (e) => {
  const rect = papers.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  undo.disabled = false;
  clearAll.disabled = false;
  paths.push({x, y});
  let check = new Check(x, y, 10);
  check.draw(context);
})



undo.addEventListener("click", () => {
  
  paths.splice(-1, 1);
  if (paths.length === 0) {undo.disabled = true; clearAll.disabled = true;}
  context.clearRect(0, 0, canvas.width, canvas.height);
  paths.forEach(path => {
    let check = new Check(path.x, path.y, 10);
    check.draw(context);
  })
})


clearAll.addEventListener("click", () => {
  if (paths.length === 0) clearAll.disabled = true;
  else {
    paths = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
    undo.disabled = true;
    clearAll.disabled = true;
  }
})