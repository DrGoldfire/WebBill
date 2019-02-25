WebBill
=======
This is a port of the game [XBill](http://xbill.org) to WebAssembly. That means it's the same game you (might) know and (with a non-zero probability) love, but with the original C code compiled to [WebAssembly](https://webassembly.org) and with a native web-based UI layer that I've built on top of it, so that the game executes natively in your web browser. Now you can fight the evil hacker Bill and his nefarious Wingdows virus from anywhere!


Building
--------
Follow the instructions in the [WebAssembly Developer's Guide](https://webassembly.org/getting-started/developers-guide) to install the Emscripten SDK and set up your environment. After that you should be able to run `./configure --enable-wasm && make` from this directory, then open xbill.html to run the game.

If you want to modify the build files, you will also need autoconf installed, but that isn't necessary to have otherwise.


Contributing
------------
Pull requests and issues are absolutely welcome. If you're looking for something to work on, check the open issues and see if anything there sounds interesting. If you have an idea that there isn't an issue on file for, that just means no one's thought of it yet; feel free to file it yourself and/or submit a PR. I do have a couple of rules though: I won't take anything that materially alters the game (this is a port, not a full fork), and I insist on leaving the old-school look and art assets in place, because the nostalgic charm they give the game is a large part of the point for me. Plus the idea of installing Wingdows on a Palm is hilarious so that's not negotiable.


License
-------
Like the original game, this port is distributed under the GNU General Public License, version 2.0 in this case. See the file LICENSE for the full license text.


Disclaimer
----------
This game is a silly joke. It barely even reaches the level of satire. Windows is my primary operating system. I did this entire project on a Windows machine. Please do not take anything about the game remotely seriously or interpret it as trying to convey any meaningful message, except of course that computers were a mistake.
