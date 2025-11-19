import React from 'react';
import { useMuscleStore, StrengthLevel } from '../store/muscleStore';
import musclesData from '../data/muscles.json';
import postureRulesData from '../data/postureRules.json';

/**
 * 근육 선택 패널 컴포넌트
 * - 선택된 근육의 강도를 설정하는 패널
 * - 5단계 강도 버튼 제공
 */
const SelectorPanel: React.FC = () => {
  const { selectedMuscle, muscleStates, setMuscleStrength } = useMuscleStore();

  // 선택된 근육 정보
  const selectedMuscleData = selectedMuscle 
    ? musclesData.find(m => m.id === selectedMuscle)
    : null;

  // 현재 강도
  const currentStrength = selectedMuscle ? muscleStates[selectedMuscle] : undefined;

  // 강도 레벨 목록
  const strengthLevels = Object.entries(postureRulesData.strength_levels) as [string, any][];

  // 강도 선택 핸들러
  const handleStrengthSelect = (strength: StrengthLevel) => {
    if (selectedMuscle) {
      setMuscleStrength(selectedMuscle, strength);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        근육 강도 선택
      </h2>

      {selectedMuscleData ? (
        <div className="space-y-6">
          {/* 선택된 근육 정보 */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-lg text-gray-900 mb-1">
              {selectedMuscleData.label_ko}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {selectedMuscleData.label_en}
            </p>
            <p className="text-sm text-gray-700">
              {selectedMuscleData.description}
            </p>
          </div>

          {/* 현재 강도 표시 */}
          {currentStrength && (
            <div className="text-center py-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">현재 강도</div>
              <div className="text-lg font-bold text-gray-900">
                {postureRulesData.strength_levels[currentStrength as keyof typeof postureRulesData.strength_levels]?.label_ko || '보통'}
              </div>
            </div>
          )}

          {/* 강도 선택 버튼 */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-700 mb-2">
              강도 선택:
            </div>
            {strengthLevels.map(([key, level]) => {
              const isSelected = currentStrength === key;
              return (
                <button
                  key={key}
                  onClick={() => handleStrengthSelect(key as StrengthLevel)}
                  className={`w-full py-4 px-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg border-2 border-gray-400"
                        style={{ backgroundColor: level.color }}
                      />
                      <span className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                        {level.label_ko}
                      </span>
                    </div>
                    {isSelected && (
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 힌트 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">💡 팁</p>
                <p>여러 근육의 강도를 입력하면 자세 분석이 더 정확해집니다.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <p className="text-lg font-medium mb-2">근육을 선택하세요</p>
          <p className="text-sm">
            왼쪽 인체 맵에서 근육을 클릭하거나<br />
            아래 목록에서 선택하세요
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectorPanel;
