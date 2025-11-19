import postureRulesData from '../data/postureRules.json';
import type { MuscleState, StrengthLevel } from '../store/muscleStore';

// 자세 이상 결과 인터페이스
export interface PostureIssue {
  id: string;
  name_ko: string;
  name_en: string;
  description_ko: string;
  description_en: string;
  recommended_exercises: string[];
  severity: number; // 0-100, 심각도 점수
  triggeredBy: {
    weak: string[];
    strong: string[];
  };
}

// 강도 레벨을 숫자 값으로 변환
const strengthToValue = (strength: StrengthLevel | undefined): number => {
  if (!strength) return 0;
  
  const values: Record<StrengthLevel, number> = {
    'very_weak': -2,
    'weak': -1,
    'normal': 0,
    'strong': 1,
    'very_strong': 2
  };
  
  return values[strength] || 0;
};

/**
 * 자세 분석 엔진
 * - 근육 상태를 기반으로 자세 이상을 자동 감지
 * - 각 규칙의 조건을 확인하여 해당하는 자세 문제를 찾음
 */
export const analyzePosture = (muscleStates: MuscleState): PostureIssue[] => {
  const issues: PostureIssue[] = [];
  
  // 모든 규칙을 순회하며 조건 확인
  postureRulesData.rules.forEach(rule => {
    let isTriggered = false;
    let severityScore = 0;
    let weakCount = 0;
    let strongCount = 0;
    
    // 약한 근육 조건 확인
    rule.triggers.weak.forEach(muscleId => {
      const value = strengthToValue(muscleStates[muscleId]);
      if (value < 0) {
        weakCount++;
        severityScore += Math.abs(value) * 15; // 약할수록 점수 증가
      }
    });
    
    // 강한 근육 조건 확인
    rule.triggers.strong.forEach(muscleId => {
      const value = strengthToValue(muscleStates[muscleId]);
      if (value > 0) {
        strongCount++;
        severityScore += value * 15; // 강할수록 점수 증가
      }
    });
    
    // 최소한 약한 근육 1개 이상, 강한 근육 1개 이상 있어야 트리거
    const minWeakRequired = Math.min(rule.triggers.weak.length, 1);
    const minStrongRequired = Math.min(rule.triggers.strong.length, 1);
    
    if (weakCount >= minWeakRequired && strongCount >= minStrongRequired) {
      isTriggered = true;
      
      // 심각도 계산 (0-100)
      const maxPossibleScore = (rule.triggers.weak.length + rule.triggers.strong.length) * 30;
      const normalizedSeverity = Math.min(100, (severityScore / maxPossibleScore) * 100);
      
      issues.push({
        id: rule.id,
        name_ko: rule.name_ko,
        name_en: rule.name_en,
        description_ko: rule.description_ko,
        description_en: rule.description_en,
        recommended_exercises: rule.recommended_exercises,
        severity: Math.round(normalizedSeverity),
        triggeredBy: {
          weak: rule.triggers.weak.filter(id => strengthToValue(muscleStates[id]) < 0),
          strong: rule.triggers.strong.filter(id => strengthToValue(muscleStates[id]) > 0)
        }
      });
    }
  });
  
  // 심각도 순으로 정렬
  return issues.sort((a, b) => b.severity - a.severity);
};

/**
 * 근육 데이터 통계 계산
 */
export const getMuscleStatistics = (muscleStates: MuscleState) => {
  const values = Object.values(muscleStates).map(strengthToValue);
  
  if (values.length === 0) {
    return {
      total: 0,
      weak: 0,
      normal: 0,
      strong: 0,
      average: 0
    };
  }
  
  return {
    total: values.length,
    weak: values.filter(v => v < 0).length,
    normal: values.filter(v => v === 0).length,
    strong: values.filter(v => v > 0).length,
    average: values.reduce((a, b) => a + b, 0) / values.length
  };
};

/**
 * 자세 이상 심각도에 따른 색상 반환
 */
export const getSeverityColor = (severity: number): string => {
  if (severity >= 70) return '#dc2626'; // 빨간색 - 심각
  if (severity >= 40) return '#f59e0b'; // 주황색 - 중간
  return '#10b981'; // 초록색 - 경미
};

/**
 * 자세 이상 심각도 레이블
 */
export const getSeverityLabel = (severity: number): string => {
  if (severity >= 70) return '높음';
  if (severity >= 40) return '중간';
  return '낮음';
};
