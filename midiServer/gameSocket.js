const WebSocket = require("ws");
const midiInterface = require("./midiInterface.js");

const createGameSocket = () => {
  const wss = new WebSocket.Server({ port: 4300 });

  wss.on("connection", (ws) => {
    ws.on("message", (data) => {
      console.log("got data", data.toString());
      midiInterface.sendMidiMessage(data.toString());
    });

    ws.send("something");
  });
};

module.exports.createGameSocket = createGameSocket;
