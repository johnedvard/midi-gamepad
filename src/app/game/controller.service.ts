import { Injectable } from '@angular/core';
import { gamepadAxis, onGamepad } from 'kontra';
import { Axis } from '../shared/axis';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  constructor() {
    this.listenForControllerEvents();
  }

  /**
   * One shot events such as button clikcs
   */
  listenForControllerEvents() {
    onGamepad('south', this.onSouth);
  }

  /**
   * Continous events, such as thumbstick position
   */
  updateControllerInput(): Axis {
    const leftAxisX = gamepadAxis('leftstickx', 0);
    const leftAxisY = gamepadAxis('leftsticky', 0);
    const rightAxisX = gamepadAxis('rightstickx', 0);
    const rightAxisY = gamepadAxis('rightsticky', 0);
    const leftAxis = { x: leftAxisX, y: leftAxisY };
    const rightAxis = { x: rightAxisX, y: rightAxisY };
    return { leftAxis, rightAxis };
  }

  removeEventListeners() {}
  onSouth = () => {};
}
