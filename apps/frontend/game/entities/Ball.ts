// apps/frontend/src/game/entities/Ball.ts
import * as PIXI from 'pixi.js';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  BALL_RADIUS,
  BALL_COLOR,
  START_BALL_SPEED,
} from '../constants';
import { Paddle } from './Paddle';

export class Ball extends PIXI.Graphics {
  private vx = 0;
  private vy = 0;
  private fired = false;
  private readonly speed = START_BALL_SPEED;

  constructor(private paddle: Paddle) {
    super();
    this.beginFill(BALL_COLOR);
    this.drawCircle(0, 0, BALL_RADIUS);
    this.endFill();
    this.resetPosition();
  }

  private resetPosition() {
    // パドル中央に載せる
    this.x = this.paddle.x + this.paddle.width / 2;
    this.y = this.paddle.y - BALL_RADIUS - 5;
    this.vx = this.vy = 0;
    this.fired = false;
  }

  fire() {
    if (this.fired) return;
    // 斜め 45°で発射
    const angle = (-45 * Math.PI) / 180;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
    this.fired = true;
  }

  update(dt: number) {
    if (!this.fired) {
      // 発射前はパドルに追従
      this.x = this.paddle.x + this.paddle.width / 2;
      return;
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // 左右壁
    if (this.x - BALL_RADIUS < 0 || this.x + BALL_RADIUS > GAME_WIDTH) {
      this.vx *= -1;
      this.x = Math.max(
        BALL_RADIUS,
        Math.min(GAME_WIDTH - BALL_RADIUS, this.x)
      );
    }
    // 上壁
    if (this.y - BALL_RADIUS < 0) {
      this.vy *= -1;
      this.y = BALL_RADIUS;
    }
    // TODO: 下に落ちたらゲームオーバー処理
    if (this.y - BALL_RADIUS > GAME_HEIGHT) {
      this.resetPosition();
    }
  }
}
