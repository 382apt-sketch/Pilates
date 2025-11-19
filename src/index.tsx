import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';

const app = new Hono();

// 정적 파일 서빙
app.use('/static/*', serveStatic({ root: './' }));

// 메인 HTML 페이지
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>근육 강도 시각화 & 자세 분석</title>
      <meta name="description" content="근육 강도를 입력하고 자세 이상을 자동으로 분석하세요">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        /* 로딩 스피너 */
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <div id="root">
        <!-- React 앱이 여기에 마운트됩니다 -->
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; gap: 20px;">
          <div class="spinner"></div>
          <p style="color: #666;">근육 강도 분석 앱을 로딩중입니다...</p>
        </div>
      </div>
      <script type="module" src="/static/client.js"></script>
    </body>
    </html>
  `);
});

// API: 헬스체크
app.get('/api/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'muscle-analyzer'
  });
});

export default app;
