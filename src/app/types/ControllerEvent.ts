import { GamepadExtras } from './GamepadExtras';

export type ControllerEvent = {
  gamepad: Gamepad;
  button: GamepadButton;
  gamepadExtras: GamepadExtras;
};
