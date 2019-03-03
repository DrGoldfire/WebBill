mergeInto(LibraryManager.library, {
  js_ui_initialize: function(storyStr, rulesStr, logoPixmap) {
    storyStr = AsciiToString(storyStr);
    // The first line of these strings is a header we don't need.
    storyStr = storyStr.split("\n").splice(2).join(" ");
    document.getElementById("story").innerText = storyStr;

    rulesStr = AsciiToString(rulesStr);
    rulesStr = rulesStr.split("\n").splice(2).join("\n");
    document.getElementById("rules").innerText = rulesStr;

    _js_create_pixmap("logo", logoPixmap);
    let pixmap = gPixmaps.get("logo");
    let canvas = document.getElementById("logo_canvas");
    canvas.width = pixmap.width;
    canvas.height = pixmap.height;
    canvas.getContext("2d").putImageData(pixmap, 0, 0);
  },
  
  js_start_timer: function(millisecs) {
    gTimerRate = millisecs;
    gTimer = setInterval(cwrap("Game_update", null), millisecs);
  },

  js_stop_timer: function() {
    clearInterval(gTimer);
    gTimer = null;
  },

  js_is_timer_active: function() {
    return gTimer === null ? 0 : 1;
  },
  
  js_resize_canvas: function(size) {
    document.getElementById("canvas0").width = 
    document.getElementById("canvas0").height = 
    document.getElementById("canvas1").width = 
    document.getElementById("canvas1").height = size;
  },

  js_clear_canvas: function() {
    let context = active_context();
    let oldStyle = context.fillStyle;
    context.fillStyle = "white";
    context.fillRect(0, 0, active_canvas().width, active_canvas().height);
    context.fillStyle = oldStyle;
  },

  js_flip_canvas: function() {
    active_canvas().style.display = "block";
    gActiveCanvas = gActiveCanvas == 0 ? 1 : 0;
    active_canvas().style.display = "none";
  },

  js_set_cursor: function(name) {
    name = AsciiToString(name);
    let url = `bitmaps/${name}.cur`;
    document.getElementById("canvas0").style.cursor = `url(${url}), auto`;
    document.getElementById("canvas1").style.cursor = `url(${url}), auto`;
  },

  js_create_pixmap: function(name, pixmap) {
    name = (typeof name == "string") ? name : AsciiToString(name);

    let values = AsciiToString(getValue(pixmap, "*"));
    let [width, height, numColors, charsPerPixel] = values.split(" ");

    pixmap += 4;
    let colorMap = new Map();
    for (let i = 0; i < numColors; ++i) {
      let colorLine = AsciiToString(getValue(pixmap, "*"));
      let colorName = colorLine.substr(0, charsPerPixel);
      let [colorKey, color] = colorLine.substr(charsPerPixel).trimLeft().split(/[ \t]/);
      // Only the 'c' key and the hex RGB color format are supported,
      // because that's all XBill uses and I can't easily find a spec
      // for how the other values are meant to be used.
      switch (colorKey) {
        case "c":
          colorMap.set(colorName, color);
          break;
      }
      pixmap += 4;
    }

    let pixelColors = [];
    for (let i = 0; i < height; ++i) {
      let lineChars = AsciiToString(getValue(pixmap, "*")).split("");
      let lineColorStrings = lineChars.map((colorKey) => colorMap.get(colorKey));
      pixelColors.push(lineColorStrings);
      pixmap += 4;
    }

    let pixelArray = new Uint8ClampedArray(width * height * 4);
    let pixelArrayIndex = 0;
    for (let line of pixelColors) {
      for (let pixel of line) {
        if (pixel == "None") {
          pixelArray[pixelArrayIndex++] = 0;
          pixelArray[pixelArrayIndex++] = 0;
          pixelArray[pixelArrayIndex++] = 0;
          pixelArray[pixelArrayIndex++] = 0;
        } else {
          pixelArray[pixelArrayIndex++] = parseInt(pixel.substr(1, 2), 16);
          pixelArray[pixelArrayIndex++] = parseInt(pixel.substr(3, 2), 16);
          pixelArray[pixelArrayIndex++] = parseInt(pixel.substr(5, 2), 16);
          pixelArray[pixelArrayIndex++] = 0xff;
        }
      }
    }

    gPixmaps.set(name, new ImageData(pixelArray, width, height));
  },

  js_draw_pixmap: function(name, x, y) {
    // In a perfect world, this function would just call putImageData and we
    // could all go home early. But as it turns out, doing it that way doesn't
    // honor the alpha channel; it just overwrites the pixels unconditionally
    // and doesn't apply alpha at all. So in order to get transparency that
    // actually works, we have to write the pixels to the canvas ourselves.
    // Computers were a mistake.
    let pixmap = gPixmaps.get(AsciiToString(name));
    let canvas = active_canvas();
    let context = active_context();
    let targetImageData = context.getImageData(x, y, pixmap.width, pixmap.height);

    for (let row = 0; row < pixmap.height; ++row) {
      if (y + row < 0 || y + row > canvas.height) {
        continue;
      }
      for (let col = 0; col < pixmap.width; ++col) {
        if (x + col < 0 || x + col > canvas.width) {
          continue;
        }
        let imageDataOffset = (col + (row * pixmap.width)) * 4;
        // Fortunately the XPM format only supports a single level of
        // transparency (a pixel either is transparent or isn't), so we don't
        // have to do any blending or anything, just copy the pixel or don't.
        if (pixmap.data[imageDataOffset + 3] != 0) {
          targetImageData.data[imageDataOffset] = pixmap.data[imageDataOffset];
          targetImageData.data[imageDataOffset + 1] = pixmap.data[imageDataOffset + 1];
          targetImageData.data[imageDataOffset + 2] = pixmap.data[imageDataOffset + 2];
          targetImageData.data[imageDataOffset + 3] = pixmap.data[imageDataOffset + 3];
        }
      }
    }

    context.putImageData(targetImageData, x, y);
  },

  js_get_pixmap_width: function(name) {
    return gPixmaps.get(AsciiToString(name)).width;
  },

  js_get_pixmap_height: function(name) {
    return gPixmaps.get(AsciiToString(name)).height;
  },

  js_draw_line: function(startx, starty, endx, endy) {
    let context = active_context();
    context.lineCap = "round";
    context.lineJoin = "miter";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(startx - 1, starty - 1);
    context.lineTo(endx - 1, endy - 1);
    context.stroke();
  },

  js_draw_text: function(text, x, y) {
    let context = active_context();
    let oldFont = context.font;
    context.font = "1em monospace";
    context.fillText(AsciiToString(text), x, y);
    context.font = oldFont;
  },

  js_show_endgame_dialog: function(score, level) {
    alert(`Game over! You got to level ${level} with ${score} points.`);
  },

  js_show_entername_dialog: function() {
    let name = prompt("You earned a high score. Enter your name:");
    name = name.substring(0, 20);
    ccall("Game_add_high_score", null, ["string"], [name]);
  },

  js_update_high_scores: function(scores) {
    scores = AsciiToString(scores);
    scores = scores.split(/\n+/).splice(1);

    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");

    let headings = scores[0];
    for (let heading of headings.split(/ +/)) {
      let th = document.createElement("th");
      th.innerText = heading;
      tr.appendChild(th);
    }
    tbody.appendChild(tr);

    scores = scores.splice(1);
    for (let score of scores) {
      if (score.length) {
        tr = document.createElement("tr");
        for (let cell of score.split(/ +/)) {
          let td = document.createElement("td");
          td.innerText = cell;
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
    }

    document.getElementById("highscores_body").replaceWith(tbody);
  },

  wasm_js_scorelist_write: function(scorelist) {
    scorelist = AsciiToString(scorelist);
    localStorage.setItem("highscores", scorelist);
  },

  wasm_js_scorelist_read: function(scorelistPtr) {
    let scores = localStorage.getItem("highscores") || "";
    writeAsciiToMemory(scores, scorelistPtr);
  },
});
