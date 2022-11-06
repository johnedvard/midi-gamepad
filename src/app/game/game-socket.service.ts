import { Injectable } from '@angular/core';
import { Axis } from '../shared/axis';
import { ControllerEvent } from '../types/ControllerEvent';

const THRESHOLD = 0.25;
@Injectable({
  providedIn: 'root',
})
export class GameSocketService {
  socket: WebSocket;
  prevAxis: Axis = { leftAxis: { x: 0, y: 0 }, rightAxis: { x: 0, y: 0 } };
  constructor() {
    this.socket = new WebSocket('ws://localhost:4300');

    // Connection opened
    this.socket.addEventListener('open', (event) => {
      this.socket.send(
        JSON.stringify({ name: 'hello', data: { msg: 'hellor server' } })
      );
    });

    // Listen for messages
    this.socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
    });
  }

  sendAxis(axis: Axis) {
    if (Math.abs(axis.leftAxis.x) > THRESHOLD) {
      const axisData = { name: 'leftAxisX', data: { x: axis.leftAxis.x } };
      this.socket.send(JSON.stringify(axisData));
    }
    if (Math.abs(axis.leftAxis.y) > THRESHOLD) {
      const axisData = { name: 'leftAxisY', data: { y: axis.leftAxis.y * -1 } };
      this.socket.send(JSON.stringify(axisData));
    }

    if (Math.abs(axis.rightAxis.x) > THRESHOLD) {
      const axisData = { name: 'rightAxisX', data: { x: axis.rightAxis.x } };
      this.socket.send(JSON.stringify(axisData));
    }
    if (Math.abs(axis.rightAxis.y) > THRESHOLD) {
      const axisData = {
        name: 'rightAxisY',
        data: { y: axis.rightAxis.y * -1 },
      };
      this.socket.send(JSON.stringify(axisData));
    }
    this.prevAxis = axis; // NB! changing reference
  }

  sendButtonClick(controllerEvent: ControllerEvent) {
    const controllerData = {
      name: 'button-' + controllerEvent.gamepadExtras.buttonName,
      data: controllerEvent,
    };
    this.socket.send(JSON.stringify(controllerData));
  }
}
