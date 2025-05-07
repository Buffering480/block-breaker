import * as PIXI from 'pixi.js';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_COLOR,
  PADDLE_BOTTOM_MARGIN,
} from '../constants';

export class Paddle extends PIXI.Graphics {
  private speed = 450; // px/s

  constructor() {
    super();

    this.beginFill(PADDLE_COLOR);
    this.drawRect(0, 0, PADDLE_WIDTH, PADDLE_HEIGHT);
    this.endFill();

    // 画面中央に配置
    this.x = (GAME_WIDTH - PADDLE_WIDTH) / 2;
    this.y = GAME_HEIGHT - PADDLE_HEIGHT - PADDLE_BOTTOM_MARGIN;
  }

  update(dt: number, input: { left: boolean; right: boolean }) {
    if (input.left) this.x -= this.speed * dt;
    if (input.right) this.x += this.speed * dt;
    this.x = Math.max(0, Math.min(GAME_WIDTH - PADDLE_WIDTH, this.x));
  }
}
