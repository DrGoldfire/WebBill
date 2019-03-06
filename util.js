// Set up some globals that library.js will need.
// The game's X pixmap format images, parsed into ImageData and mapped by name.
let gPixmaps = new Map();
let gImages = new Map();
// The "active" frame buffer (canvas) is the one we're currently rendering into,
// *not* the one that is currently being shown.
let gActiveCanvas = 1;
// The timer that sets off the game update.
let gTimer = null;
// The rate of the game update timer (in milliseconds)
let gTimerRate = 0;

// Utility functions for library.js.
function active_canvas() {
  return document.getElementById("canvas" + gActiveCanvas);
}
function active_context() {
  return active_canvas().getContext("2d");
}

// Event handlers for the mouse inside the game canvas.
document.getElementById("canvas0").onmousedown =
document.getElementById("canvas1").onmousedown =
function(event) {
  ccall("Game_button_press", null, ["number", "number"],
    [event.offsetX, event.offsetY]);
};
document.getElementById("canvas0").onmouseup =
document.getElementById("canvas1").onmouseup =
function(event) {
  ccall("Game_button_release", null, ["number", "number"],
    [event.offsetX, event.offsetY]);
};

// Click handlers for our action buttons.
document.getElementById("btnNewGame").onclick = function() {
  _js_stop_timer();
  document.getElementById("btnPause").style.display = "inline";
  document.getElementById("btnResume").style.display = "none";

  ccall("Game_start", null, ["number"], [1]);
};

document.getElementById("btnPause").onclick = function() {
  this.style.display = "none";
  document.getElementById("btnResume").style.display = "inline";
  _js_stop_timer();
};
document.getElementById("btnResume").onclick = function() {
  this.style.display = "none";
  document.getElementById("btnPause").style.display = "inline";
  _js_start_timer(gTimerRate);
};

document.getElementById("btnWarp").onclick = function() {
  ccall("Game_warp_to_level", null, ["number"],
    [prompt("Warp to level:")]);
};
