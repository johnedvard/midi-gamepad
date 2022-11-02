const midiInterface = require("./midiInterface.js");
const gameSocket = require("./gameSocket.js");

const initMidiInterface = () => {
  console.log("create");
  midiInterface.createMidiInterface();
  gameSocket.createGameSocket();
};
exports.initMidiInterface = initMidiInterface;
