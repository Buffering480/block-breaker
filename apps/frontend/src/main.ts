// apps/frontend/src/main.ts
import * as PIXI from 'pixi.js';
import { GAME_WIDTH, GAME_HEIGHT } from './game/constants';
import { InputManager } from './game/InputManager';
import { Paddle } from './game/entities/Paddle';
import { Ball } from './game/entities/Ball';

// ❶ Pixi アプリケーションを作成（まだオプションは渡さない）
const app = new PIXI.Application();

async function init() {
  // ❷ 非同期で初期化（v8 推奨）
  await app.init({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: 0x1099bb, // 青っぽい背景
    antialias: true,
  });

  // ❸ HTML のコンテナに Canvas を追加
  const container = document.getElementById('game-container');
  if (!container) {
    console.error('Error: #game-container が見つかりません');
    return;
  }
  container.appendChild(app.canvas); // v8 では .canvas

  // ❹ ゲームオブジェクト生成
  const input = new InputManager();
  const paddle = new Paddle();
  const ball = new Ball(paddle);

  app.stage.addChild(paddle, ball);

  // ❺ ゲームループ
  app.ticker.add((ticker) => {
    const dt = ticker.deltaMS / 1000; // 実経過秒
    paddle.update(dt, input.getState());
    if (input.consumeFire()) ball.fire();
    ball.update(dt);
  });

  console.log('PixiJS Application Initialized!');
}

init();
