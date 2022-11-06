import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { GameLoop, init, initInput } from '../shared/kontra';
import { Axis } from '../shared/axis';
import { ControllerService } from './controller.service';
import { GameSocketService } from './game-socket.service';
import { Subscription } from 'rxjs';
import { ControllerEvent } from '../types/ControllerEvent';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  gameLoop!: GameLoop;
  axis!: Axis;
  lastButtonPressed: string = '';
  controllerEventSubscription!: Subscription;
  constructor(
    private controllerService: ControllerService,
    private gameSocketService: GameSocketService
  ) {}

  listenForControllerEvents() {
    this.controllerEventSubscription = this.controllerService
      .listenForControllerEvents()
      .subscribe((evt: ControllerEvent) => {
        this.lastButtonPressed = evt.gamepadExtras.buttonName;
        this.gameSocketService.sendButtonClick(evt);
      });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const { canvas, context } = init('game');
    initInput();
    this.listenForControllerEvents();

    this.gameLoop = GameLoop({
      update: (dt) => {
        this.axis = this.controllerService.updateControllerInput();
        const { leftAxis, rightAxis } = this.axis;
        this.gameSocketService.sendAxis({ leftAxis, rightAxis });
      },
      render: () => {},
      blur: true,
    });
    this.gameLoop.start();
  }

  ngOnDestroy(): void {
    this.gameLoop.stop();
    this.controllerService.removeEventListeners();
    this.controllerEventSubscription?.unsubscribe();
  }
}
