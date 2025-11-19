# 💪 근육 강도 시각화 & 자세 분석 웹앱

사용자의 근육 상태를 시각화하고, 자세 이상을 자동으로 분석하여 맞춤형 운동을 추천하는 웹 애플리케이션입니다.

## 🌐 URL 정보

- **개발 서버**: https://3000-i7pg3vh2uudp7x9e0xy02-583b4d74.sandbox.novita.ai
- **프로젝트 이름**: webapp
- **GitHub**: (추후 업데이트 예정)

## ✨ 주요 기능

### 완료된 기능
- ✅ 15개 주요 근육 부위 데이터 (전면/후면)
- ✅ 2D SVG 인체 일러스트 (클릭 가능한 근육 영역)
- ✅ 5단계 근육 강도 선택 (매우 약함 ~ 매우 강함)
- ✅ 실시간 색상 변경 (강도에 따른 시각적 피드백)
- ✅ 7가지 자세 이상 자동 분석
  - 말린 어깨 (라운드 숄더)
  - 거북목
  - 골반 전방 경사
  - 골반 후방 경사
  - 굽은 등 (후만증)
  - 무릎 외반 (X자 다리)
  - 하부 교차 증후군
- ✅ 자세별 추천 운동 및 스트레칭
- ✅ PDF 리포트 다운로드
- ✅ 로컬스토리지 자동 저장/로드
- ✅ 전문가 모드 (JSON Export/Import)
- ✅ 반응형 디자인 (모바일 지원)

### 진행 중인 기능
- 🔄 UI/UX 개선 및 애니메이션 추가
- 🔄 3D 인체 모델 (Three.js) 추가

### 미완료 기능
- ❌ 전문가용 규칙 편집 패널
- ❌ 근육 데이터 JSON 편집 UI
- ❌ 클라우드 저장 기능 (계정 시스템)

## 📊 기능별 URI 정리

### 메인 페이지
- **URL**: `/`
- **기능**: 전체 앱 인터페이스
- **설명**: 근육 맵, 선택 패널, 자세 분석 결과를 모두 포함

### API 엔드포인트
- **Health Check**: `/api/health`
  - **Method**: GET
  - **Response**: `{ "status": "ok", "timestamp": "2024-11-19T..." }`

### 정적 파일
- **SVG 일러스트**: 
  - `/static/body-front.svg` (전면 인체)
  - `/static/body-back.svg` (후면 인체)
- **CSS**: `/static/style.css`

## 🗄️ 데이터 구조

### 근육 데이터 (muscles.json)
```json
{
  "id": "pec_major",
  "label_ko": "대흉근",
  "label_en": "Pectoralis Major",
  "side": "front",
  "svg_region_id": "m_pec_major",
  "default_strength": "normal",
  "description": "가슴의 큰 근육..."
}
```

### 자세 규칙 (postureRules.json)
```json
{
  "id": "rounded_shoulders",
  "name_ko": "말린 어깨",
  "triggers": {
    "weak": ["mid_trap", "lower_trap"],
    "strong": ["pec_major", "anterior_delt"]
  },
  "recommended_exercises": [...]
}
```

### 강도 레벨
- `very_weak` (-2): #ff4d4d (빨강)
- `weak` (-1): #ff944d (주황)
- `normal` (0): #f2f2f2 (회색)
- `strong` (1): #8cc6ff (하늘색)
- `very_strong` (2): #1e90ff (파랑)

## 💾 스토리지 서비스

현재는 **로컬스토리지**만 사용합니다:
- `muscle-storage`: 근육 상태 데이터 저장
- 자동 저장/로드 (Zustand persist)

향후 확장 계획:
- Cloudflare KV: 사용자 설정 저장
- Cloudflare D1: 히스토리 및 분석 데이터
- Cloudflare R2: PDF 리포트 백업

## 📱 사용 방법

### 1. 근육 강도 입력
1. 전면/후면 전환 버튼으로 보기 선택
2. 근육 맵에서 원하는 근육 클릭
3. 오른쪽 패널에서 강도 선택 (매우 약함 ~ 매우 강함)
4. 색상이 자동으로 변경됨

### 2. 자세 분석 확인
- 여러 근육의 강도를 입력하면 자동으로 자세 이상 분석
- 심각도, 원인 근육, 추천 운동 확인

### 3. PDF 다운로드
- "PDF 다운로드" 버튼 클릭
- 근육 상태 + 자세 분석 리포트 생성

### 4. 데이터 백업 (전문가 모드)
- "전문가 모드" 버튼 클릭
- JSON 파일로 내보내기/가져오기
- 클립보드 복사/붙여넣기로 공유 가능

## 🚀 배포 정보

### 현재 상태
- **플랫폼**: Cloudflare Pages (예정)
- **개발 환경**: Sandbox (PM2 + Wrangler)
- **기술 스택**: 
  - Backend: Hono (TypeScript)
  - Frontend: React 19 + Zustand
  - Styling: TailwindCSS
  - PDF: jsPDF
  - Build: Vite

### 로컬 개발
```bash
npm run build          # 프로젝트 빌드
pm2 start ecosystem.config.cjs  # 개발 서버 시작
pm2 logs muscle-webapp --nostream  # 로그 확인
```

### 프로덕션 배포 (예정)
```bash
npm run deploy:prod    # Cloudflare Pages 배포
```

## 🎯 추천 다음 단계

1. **UI 개선**
   - 애니메이션 효과 추가
   - 근육 호버 시 정보 툴팁
   - 자세 분석 차트 시각화

2. **기능 확장**
   - 3D 인체 모델 추가 (Three.js)
   - 통증 부위 표시 기능
   - 히스토리 추적 (시간별 변화)

3. **전문가 모드 고도화**
   - 근육 데이터 직접 편집 UI
   - 자세 규칙 커스터마이징
   - PDF 템플릿 편집

4. **클라우드 기능**
   - 사용자 계정 시스템
   - Cloudflare D1 데이터베이스 연동
   - 데이터 동기화

## ⚠️ 주의사항

- 이 앱은 **참고용**이며, 전문가의 진단을 대체할 수 없습니다
- 통증이나 불편함이 있다면 의료 전문가와 상담하세요
- 운동 전 전문 트레이너의 지도를 받는 것이 좋습니다

## 📄 라이선스

이 프로젝트는 개인/교육 목적으로 자유롭게 사용 가능합니다.

---

© 2024 근육 강도 시각화 & 자세 분석 웹앱
