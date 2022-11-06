import { Injectable } from '@angular/core';
import { gamepadAxis, gamepadMap, onGamepad } from '../shared/kontra';
import { Axis } from '../shared/axis';
import { Observable, Subject } from 'rxjs';
import { ControllerEvent } from '../types/ControllerEvent';
import { offGamepad } from 'kontra';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  gamepadKeys: string[] = [
    'south',
    'east',
    'west',
    'north',
    'leftshoulder',
    'rightshoulder',
    'lefttrigger',
    'righttrigger',
    'select',
    'start',
    'leftstick',
    'rightstick',
    'dpadup',
    'dpaddown',
    'dpadleft',
    'dpadright',
  ];
  controllerEvents$: Subject<ControllerEvent>;
  constructor() {
    console.log('init');
    this.controllerEvents$ = new Subject();
  }

  /**
   * One shot events such as button clikcs
   */
  listenForControllerEvents(): Observable<any> {
    onGamepad(this.gamepadKeys, this.onGamePadClick);
    return this.controllerEvents$.asObservable();
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

  removeEventListeners() {
    offGamepad(this.gamepadKeys);
  }
  onGamePadClick = (
    gamepad: Gamepad,
    button: GamepadButton,
    { buttonName }: { buttonName: string }
  ) => {
    this.controllerEvents$?.next({
      gamepad,
      button,
      gamepadExtras: { buttonName },
    });
  };
}
