// apps/frontend/src/game/InputManager.ts
type InputState = { left: boolean; right: boolean; fire: boolean };

export class InputManager {
  private state: InputState = { left: false, right: false, fire: false };

  private readonly keyMap: Record<string, keyof InputState> = {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    Space: 'fire',
  };

  private onKeyDown = (e: KeyboardEvent) => this.setKey(e, true);
  private onKeyUp = (e: KeyboardEvent) => this.setKey(e, false);

  constructor() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  private setKey(e: KeyboardEvent, isDown: boolean) {
    const key = this.keyMap[e.code];
    if (!key) return;
    if (key === 'fire' && isDown) e.preventDefault(); // スクロール防止
    this.state[key] = isDown;
  }

  /** 参照専用の現在状態 */
  getState(): Readonly<InputState> {
    return this.state;
  }

  /** fire キーの立ち上がりを消費する（単発トリガー） */
  consumeFire(): boolean {
    if (this.state.fire) {
      this.state.fire = false;
      return true;
    }
    return false;
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }
}
