import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 근육 강도 타입 정의
export type StrengthLevel = 'very_weak' | 'weak' | 'normal' | 'strong' | 'very_strong';

// 근육 상태 인터페이스
export interface MuscleState {
  [muscleId: string]: StrengthLevel;
}

// 스토어 인터페이스
interface MuscleStore {
  // 상태
  muscleStates: MuscleState;
  selectedMuscle: string | null;
  viewSide: 'front' | 'back';
  
  // 액션
  setMuscleStrength: (muscleId: string, strength: StrengthLevel) => void;
  selectMuscle: (muscleId: string | null) => void;
  setViewSide: (side: 'front' | 'back') => void;
  resetAllMuscles: () => void;
  loadMuscleData: (data: MuscleState) => void;
  
  // 로컬스토리지 저장/로드
  exportData: () => string;
  importData: (jsonString: string) => void;
}

/**
 * Zustand 스토어: 근육 상태 관리
 * - persist 미들웨어로 로컬스토리지 자동 저장
 * - 모든 근육의 강도 상태 관리
 * - 선택된 근육 및 보기 방향 관리
 */
export const useMuscleStore = create<MuscleStore>()(
  persist(
    (set, get) => ({
      // 초기 상태
      muscleStates: {},
      selectedMuscle: null,
      viewSide: 'front',
      
      // 근육 강도 설정
      setMuscleStrength: (muscleId, strength) => {
        set((state) => ({
          muscleStates: {
            ...state.muscleStates,
            [muscleId]: strength
          }
        }));
      },
      
      // 근육 선택
      selectMuscle: (muscleId) => {
        set({ selectedMuscle: muscleId });
      },
      
      // 보기 방향 변경
      setViewSide: (side) => {
        set({ viewSide: side });
      },
      
      // 모든 근육 초기화
      resetAllMuscles: () => {
        set({ muscleStates: {}, selectedMuscle: null });
      },
      
      // 근육 데이터 로드
      loadMuscleData: (data) => {
        set({ muscleStates: data });
      },
      
      // JSON으로 내보내기
      exportData: () => {
        const state = get();
        return JSON.stringify({
          muscleStates: state.muscleStates,
          exportDate: new Date().toISOString()
        }, null, 2);
      },
      
      // JSON에서 가져오기
      importData: (jsonString) => {
        try {
          const data = JSON.parse(jsonString);
          if (data.muscleStates) {
            set({ muscleStates: data.muscleStates });
          }
        } catch (error) {
          console.error('Invalid JSON data:', error);
          alert('잘못된 JSON 형식입니다.');
        }
      }
    }),
    {
      name: 'muscle-storage', // 로컬스토리지 키 이름
    }
  )
);
