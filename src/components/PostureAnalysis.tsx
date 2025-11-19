import React, { useMemo } from 'react';
import { useMuscleStore } from '../store/muscleStore';
import { analyzePosture, getSeverityColor, getSeverityLabel } from '../utils/postureAnalysis';
import PDFGenerator from './PDFGenerator';

/**
 * 자세 분석 결과 컴포넌트
 * - 근육 상태를 기반으로 자세 이상 분석
 * - 감지된 자세 문제와 추천 운동 표시
 */
const PostureAnalysis: React.FC = () => {
  const { muscleStates } = useMuscleStore();

  // 자세 분석 실행
  const postureIssues = useMemo(() => {
    return analyzePosture(muscleStates);
  }, [muscleStates]);

  const muscleCount = Object.keys(muscleStates).length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">자세 분석 결과</h2>
          <p className="text-gray-600 mt-1">{muscleCount}개 근육 데이터 기반 분석</p>
        </div>
        {muscleCount > 0 && <PDFGenerator postureIssues={postureIssues} />}
      </div>

      {muscleCount === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600 font-medium mb-2">근육 데이터가 없습니다</p>
          <p className="text-sm text-gray-500">근육 강도를 입력하면 자세 분석이 시작됩니다</p>
        </div>
      ) : postureIssues.length === 0 ? (
        <div className="text-center py-12 bg-green-50 rounded-lg border-2 border-green-200">
          <p className="text-xl text-green-800 font-bold mb-2">✨ 균형 잡힌 근육 상태입니다!</p>
          <p className="text-green-700">현재 근육 데이터로는 특별한 자세 이상이 감지되지 않았습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {postureIssues.map((issue, index) => (
            <div key={issue.id} className="border-2 rounded-lg p-6" style={{ borderColor: getSeverityColor(issue.severity) }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{issue.name_ko}</h3>
                  <p className="text-sm text-gray-600">{issue.name_en}</p>
                </div>
                <div className="px-4 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: getSeverityColor(issue.severity) }}>
                  <div className="text-xs">심각도</div>
                  <div className="text-lg">{getSeverityLabel(issue.severity)}</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700">{issue.description_ko}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="text-sm font-semibold text-green-800 mb-3">추천 운동 / 스트레칭</h4>
                <div className="grid grid-cols-2 gap-2">
                  {issue.recommended_exercises.map((exercise, i) => (
                    <div key={i} className="bg-white rounded px-3 py-2 text-sm text-gray-700">{i + 1}. {exercise}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostureAnalysis;
