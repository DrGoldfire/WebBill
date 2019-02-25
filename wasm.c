#include <stdlib.h>
#include <string.h>

#include "wasm.h"
#include "wasm_pixmaps.h"

#include "Game.h"
#include "xbill_strings.h"

extern void js_ui_initialize(const char* storyStr, const char* rulesStr, char** logoPixmap);

extern void js_start_timer(int ms);
extern void js_stop_timer(void);
extern int js_is_timer_active(void);

extern void js_set_cursor(const char* name);

extern void js_resize_canvas(int size);
extern void js_clear_canvas(void);

extern void js_create_pixmap(const char* name, char** pixmap);
extern void js_draw_pixmap(const char* name, int x, int y);
extern int js_get_pixmap_width(const char* name);
extern int js_get_pixmap_height(const char* name);

extern void js_draw_line(int startx, int starty, int endx, int endy);
extern void js_draw_text(const char* text, int x, int y);

extern void js_flip_canvas(void);

extern void js_show_endgame_dialog(int score, int level);

struct Picture {
  const char* name;
};

struct MCursor {
  const char* name;
};

static char** find_pixmap(const char* name) {
  for (int i = 0; i < NUM_PIXMAPS; ++i) {
    if (!strcmp(name, gPixmaps[i].name)) {
      return gPixmaps[i].pixmap;
    }
  }
  return NULL;
}

static void
wasm_ui_load_cursor(const char *name, int masked, MCursor **cursorp) {
  *cursorp = malloc(sizeof(struct MCursor));
  (*cursorp)->name = malloc(strlen(name));
  strcpy((char*)((*cursorp)->name), name);
}

static void
wasm_ui_set_cursor(MCursor *cursor) {
  js_set_cursor(cursor->name);
}

static void
wasm_ui_set_icon(Picture *icon) {
  // Only one image is ever set as the icon, so it's hardcoded in the HTML
  // as the favicon and we don't need to implement this function.
}

static void
wasm_ui_load_picture(const char *name, int trans, Picture **pict) {
  *pict = malloc(sizeof(struct Picture));
  (*pict)->name = malloc(strlen(name));
  strcpy((char*)((*pict)->name), name);
  char** pixmap = find_pixmap(name);
  if (pixmap) {
    js_create_pixmap(name, pixmap);
  }
}

static int
wasm_ui_picture_width(Picture *pict) {
	return js_get_pixmap_width(pict->name);
}

static int
wasm_ui_picture_height(Picture *pict) {
	return js_get_pixmap_height(pict->name);
}

static void
wasm_ui_draw_image(Picture *pict, int x, int y) {
  js_draw_pixmap(pict->name, x, y);
}

static void
wasm_ui_graphics_init(void) {
  js_ui_initialize(story_dialog_str, rules_dialog_str, logo_xpm);
}

static void
wasm_ui_clear_window(void) {
  js_clear_canvas();
}

static void
wasm_ui_refresh_window(void) {
  js_flip_canvas();
}

static void
wasm_ui_draw_line(int x1, int y1, int x2, int y2) {
  js_draw_line(x1, y1, x2, y2);
}

static void
wasm_ui_draw_string(const char *str, int x, int y) {
  js_draw_text(str, x, y);
}

static void
wasm_ui_start_timer(int ms) {
  js_start_timer(ms);
}

static void
wasm_ui_stop_timer(void) {
  js_stop_timer();
}

static int
wasm_ui_timer_active(void) {
	return js_is_timer_active();
}

static void
wasm_ui_popup_dialog(int index) {
  switch (index) {
    case DIALOG_ENDGAME:
      js_show_endgame_dialog(Game_score(), Game_level());
      break;
  }
}

static void
wasm_ui_main_loop(void) {
  // We don't need to explicitly run the event loop.
}

static void
wasm_ui_initialize(int *argc, char **argv) {
  // Nothing to initialize.
}

static void
wasm_ui_make_main_window(int size) {
  js_resize_canvas(size);
}

static void
wasm_ui_create_dialogs(Picture *logo, Picture *icon, Picture *about) {

}

static void
wasm_ui_set_pausebutton(int active) {
	
}

static void
wasm_ui_update_dialog(int index, const char *str) {

}

static struct UI_methods wasm_methods = {
	wasm_ui_set_cursor,
	wasm_ui_load_cursor,
	wasm_ui_load_picture,
	wasm_ui_set_icon,
	wasm_ui_picture_width,
	wasm_ui_picture_height,
	wasm_ui_graphics_init,
	wasm_ui_clear_window,
	wasm_ui_refresh_window,
	wasm_ui_draw_image,
	wasm_ui_draw_line,
	wasm_ui_draw_string,
	wasm_ui_start_timer,
	wasm_ui_stop_timer,
	wasm_ui_timer_active,
	wasm_ui_popup_dialog,
	wasm_ui_main_loop,
	wasm_ui_initialize,
	wasm_ui_make_main_window,
	wasm_ui_create_dialogs,
	wasm_ui_set_pausebutton,
	wasm_ui_update_dialog,
};

void
wasm_ui_setmethods(UI_methods **methodsp) {
	*methodsp = &wasm_methods;
}
