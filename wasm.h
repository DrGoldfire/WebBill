#ifndef WASM_H
#define WASM_H

#include "UI.h"

void wasm_ui_setmethods(UI_methods **methodsp);
extern void wasm_js_scorelist_write(char* scorelist);
extern void wasm_js_scorelist_read(char* scorelist);

#endif
