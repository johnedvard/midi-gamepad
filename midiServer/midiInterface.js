const midi = require("midi");

let input;
let output;
let leftThumbstick = { x: 0, y: 0 };
let rightThumbstick = { x: 0, y: 0 };
const gamepadMap = {
  south: 0,
  east: 1,
  west: 2,
  north: 3,
  leftshoulder: 4,
  rightshoulder: 5,
  lefttrigger: 6,
  righttrigger: 7,
  select: 8,
  start: 9,
  leftstick: 10,
  rightstick: 11,
  dpadup: 12,
  dpaddown: 13,
  dpadleft: 14,
  dpadright: 15,
};

const MAX_VOLUME = 127;
const MIN_VOLUME = 0;

const createMidiInterface = () => {
  // Set up a new input.
  input = new midi.Input();
  output = new midi.Output();

  // Configure a callback.
  input.on("message", (deltaTime, message) => {
    console.log(`m: ${message} d: ${deltaTime}`);
  });

  output.openVirtualPort("Gamepad Output");
  input.openVirtualPort("Gamepad Input");
};

const getControlerNumber = ({ thumbstick, axisKey, buttonName }) => {
  if (thumbstick === leftThumbstick) {
    if (axisKey === "x") return 1;
    return 2;
  }
  if (thumbstick === rightThumbstick) {
    if (axisKey === "x") return 3;
    return 4;
  }
  if (buttonName) return gamepadMap[buttonName];
};

const sendButtonMessage = (msg) => {
  output.sendMessage([
    177,
    getControlerNumber({ buttonName: msg?.data?.gamepadExtras?.buttonName }),
    1,
  ]);
};

const sendThumbstickMessage = (msg) => {
  let thumbstick = null;
  let axisKey = "";
  if (msg.name === "leftAxisX") {
    thumbstick = leftThumbstick;
    axisKey = "x";
  } else if (msg.name === "leftAxisY") {
    thumbstick = leftThumbstick;
    axisKey = "y";
  }
  if (msg.name === "rightAxisX") {
    thumbstick = rightThumbstick;
    axisKey = "x";
  } else if (msg.name === "rightAxisY") {
    thumbstick = rightThumbstick;
    axisKey = "y";
  }
  if (!thumbstick || !axisKey) return;
  thumbstick[axisKey] += Number(msg.data[axisKey]) * 2;
  if (thumbstick[axisKey] >= MAX_VOLUME) thumbstick[axisKey] = MAX_VOLUME;
  else if (thumbstick[axisKey] <= MIN_VOLUME) thumbstick[axisKey] = MIN_VOLUME;
  output.sendMessage([
    176,
    getControlerNumber({ thumbstick, axisKey }),
    thumbstick[axisKey],
  ]);
};

const sendMidiMessage = (rawData) => {
  const msg = JSON.parse(rawData);
  if (!output) return;
  if (msg.name.match("Axis")) return sendThumbstickMessage(msg);
  if (msg.name.match("button-")) return sendButtonMessage(msg);
};

exports.createMidiInterface = createMidiInterface;
exports.sendMidiMessage = sendMidiMessage;
