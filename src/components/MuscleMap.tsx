import React, { useEffect, useRef } from 'react';
import { useMuscleStore } from '../store/muscleStore';
import musclesData from '../data/muscles.json';
import postureRulesData from '../data/postureRules.json';

/**
 * 근육 맵 컴포넌트
 * - SVG 인체 일러스트 표시
 * - 근육 클릭 시 선택 처리
 * - 강도에 따라 색상 변경
 */
const MuscleMap: React.FC = () => {
  const { viewSide, muscleStates, selectMuscle, selectedMuscle } = useMuscleStore();
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // 강도에 따른 색상 매핑
  const getColorForStrength = (strength: string | undefined): string => {
    if (!strength) return postureRulesData.strength_levels.normal.color;
    
    const levelKey = strength as keyof typeof postureRulesData.strength_levels;
    return postureRulesData.strength_levels[levelKey]?.color || postureRulesData.strength_levels.normal.color;
  };

  // SVG 로드 및 이벤트 바인딩
  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    // SVG 파일 로드
    const svgPath = viewSide === 'front' ? '/static/body-front.svg' : '/static/body-back.svg';
    
    fetch(svgPath)
      .then(res => res.text())
      .then(svgText => {
        container.innerHTML = svgText;
        
        const svgElement = container.querySelector('svg');
        if (!svgElement) return;

        // SVG 크기 조정
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', 'auto');
        svgElement.style.maxHeight = '600px';

        // 모든 근육 영역에 이벤트 리스너 및 색상 적용
        const muscleRegions = svgElement.querySelectorAll('.muscle-region');
        
        muscleRegions.forEach(region => {
          const muscleId = region.getAttribute('data-muscle');
          if (!muscleId) return;

          // 강도에 따른 색상 적용
          const strength = muscleStates[muscleId];
          const color = getColorForStrength(strength);
          (region as SVGElement).style.fill = color;

          // 선택된 근육 하이라이트
          if (selectedMuscle === muscleId) {
            (region as SVGElement).style.stroke = '#3b82f6';
            (region as SVGElement).style.strokeWidth = '3';
          }

          // 클릭 이벤트
          region.addEventListener('click', () => {
            selectMuscle(muscleId);
          });
        });
      })
      .catch(error => {
        console.error('SVG 로드 실패:', error);
        container.innerHTML = '<p class="text-red-600">SVG 파일을 로드할 수 없습니다.</p>';
      });

    // 클린업
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [viewSide, muscleStates, selectMuscle, selectedMuscle]);

  // 현재 보이는 쪽의 근육 목록
  const visibleMuscles = musclesData.filter(m => m.side === viewSide);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {viewSide === 'front' ? '전면' : '후면'} 근육 맵
        </h2>
        <div className="text-sm text-gray-600">
          근육을 클릭하여 선택하세요
        </div>
      </div>

      {/* SVG 컨테이너 */}
      <div 
        ref={svgContainerRef} 
        className="flex justify-center items-center bg-gray-50 rounded-lg p-4 min-h-[400px]"
      />

      {/* 색상 범례 */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">강도 색상 범례</h3>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(postureRulesData.strength_levels).map(([key, level]) => (
            <div key={key} className="flex flex-col items-center">
              <div 
                className="w-12 h-12 rounded-lg border-2 border-gray-300 mb-1"
                style={{ backgroundColor: level.color }}
              />
              <span className="text-xs text-gray-600 text-center">{level.label_ko}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 현재 보이는 근육 리스트 */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          {viewSide === 'front' ? '전면' : '후면'} 근육 목록 ({visibleMuscles.length}개)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {visibleMuscles.map(muscle => (
            <button
              key={muscle.id}
              onClick={() => selectMuscle(muscle.id)}
              className={`text-left px-3 py-2 rounded-lg border transition ${
                selectedMuscle === muscle.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: getColorForStrength(muscleStates[muscle.id]) }}
                />
                <span className="text-sm font-medium">{muscle.label_ko}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MuscleMap;
