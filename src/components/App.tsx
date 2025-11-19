import React, { useState } from 'react';
import MuscleMap from './MuscleMap';
import SelectorPanel from './SelectorPanel';
import PostureAnalysis from './PostureAnalysis';
import ExportImportPanel from './ExportImportPanel';
import { useMuscleStore } from '../store/muscleStore';

/**
 * 메인 애플리케이션 컴포넌트
 * - 근육 맵, 선택 패널, 자세 분석을 포함
 * - 전문가 모드 토글 기능
 */
const App: React.FC = () => {
  const [showExpertMode, setShowExpertMode] = useState(false);
  const { viewSide, setViewSide, resetAllMuscles } = useMuscleStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 헤더 */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                💪 근육 강도 분석 & 자세 평가
              </h1>
              <p className="text-gray-600 mt-1">
                근육 상태를 입력하고 자세 이상을 자동으로 분석하세요
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowExpertMode(!showExpertMode)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                {showExpertMode ? '일반 모드' : '전문가 모드'}
              </button>
              <button
                onClick={() => {
                  if (confirm('모든 근육 데이터를 초기화하시겠습니까?')) {
                    resetAllMuscles();
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 전문가 모드 패널 */}
        {showExpertMode && (
          <div className="mb-6">
            <ExportImportPanel />
          </div>
        )}

        {/* 전면/후면 전환 버튼 */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow p-2 inline-flex gap-2">
            <button
              onClick={() => setViewSide('front')}
              className={`px-6 py-2 rounded-md font-medium transition ${
                viewSide === 'front'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전면
            </button>
            <button
              onClick={() => setViewSide('back')}
              className={`px-6 py-2 rounded-md font-medium transition ${
                viewSide === 'back'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              후면
            </button>
          </div>
        </div>

        {/* 그리드 레이아웃: 근육 맵 + 선택 패널 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 근육 맵 */}
          <div className="lg:col-span-2">
            <MuscleMap />
          </div>

          {/* 선택 패널 */}
          <div>
            <SelectorPanel />
          </div>
        </div>

        {/* 자세 분석 결과 */}
        <div>
          <PostureAnalysis />
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2024 근육 강도 시각화 & 자세 분석 웹앱</p>
          <p className="text-sm mt-1">전문가의 정확한 진단을 대체할 수 없습니다.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
