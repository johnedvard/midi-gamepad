# MidiGamepad

Convert your gamepad into a midi controller.
Run `npm run start:electron` to open an Electron window.

- Listen to gamepad events through the browser API
- Send the signals through a websocket to the local node server
- Open virtual MIDI-ports, "Gamepad Input" and "Gamepad Output"
- Convert the gamepad events into MIDI signals

Other applications and DAWs such as Ableton Live can receive MIDI signals from the application. MIDI-map the buttons to the DAW, and control it.

## Electron build

Are you seeing errors like below?

```
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. This version of Node.js requires
NODE_MODULE_VERSION $ABC. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd

Take a look at this article, [Native Node Modules](https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules), for more info.
