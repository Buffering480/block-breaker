import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const app = express();

// ── ミドルウェア ───────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// ── ルーティング ─────────────────────────────
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello from Backend!');
});

// ── サーバ起動（Vercel ではスキップ） ─────────
const port = Number(process.env.PORT) || 3001;
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
  });
}

// Vercel Serverless Function 用エクスポート
export default app;
