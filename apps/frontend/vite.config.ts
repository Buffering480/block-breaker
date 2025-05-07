import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'; // ★ インポート

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(), // ★ プラグインを追加するだけ！
    // 他のプラグイン (例: Reactプラグインなど)
  ],
  // resolve.alias の手動設定は不要になります
});
