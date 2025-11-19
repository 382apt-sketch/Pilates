import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/global.css';

/**
 * 클라이언트 사이드 엔트리 포인트
 * - React 앱을 DOM에 마운트
 */
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
