import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { GameLoop, init, initInput } from 'kontra';
import { Axis } from '../shared/axis';
import { ControllerService } from './controller.service';
import { GameSocketService } from './game-socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  gameLoop!: GameLoop;
  axis!: Axis;
  constructor(
    private controllerService: ControllerService,
    private gameSocketService: GameSocketService
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const { canvas, context } = init('game');
    initInput();
    console.log('create game');
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
  }
}
