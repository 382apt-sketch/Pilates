# 💪 근육 강도 시각화 & 자세 분석 웹앱

사용자의 근육 강도를 시각적으로 입력하고, 자세 이상을 자동으로 분석하는 웹 애플리케이션입니다.

## 🌟 주요 기능

### ✅ 완료된 기능

1. **인체 근육 맵 시각화 (2D SVG)**
   - 전면/후면 인체 일러스트
   - 15개 주요 근육 부위 표시
   - 클릭 가능한 인터랙티브 SVG

2. **근육 강도 선택**
   - 5단계 강도 레벨 (매우 약함 ~ 매우 강함)
   - 색상으로 강도 시각화
   - 실시간 색상 업데이트

3. **자세 분석 엔진**
   - 7가지 자세 이상 자동 감지
     - 말린 어깨 (라운드 숄더)
     - 거북목
     - 골반 전방/후방 경사
     - 굽은 등 (후만증)
     - 무릎 외반
     - 하부 교차 증후군
   - 심각도 점수 계산
   - 원인 근육 표시

4. **PDF 다운로드**
   - 근육 강도 현황 요약
   - 자세 분석 결과
   - 추천 운동/스트레칭 포함

5. **전문가 모드**
   - JSON Export/Import
   - 데이터 백업 및 공유
   - 설정 파일 관리

6. **로컬스토리지 저장**
   - 자동 저장/로드
   - 브라우저 종료 후에도 데이터 유지

## 🚀 URL 및 접근 정보

### 개발 환경 (Sandbox)
- **URL**: https://3000-i7pg3vh2uudp7x9e0xy02-583b4d74.sandbox.novita.ai
- **API Health Check**: https://3000-i7pg3vh2uudp7x9e0xy02-583b4d74.sandbox.novita.ai/api/health
- **상태**: ✅ Active

### GitHub 저장소
- **저장소**: (GitHub 설정 후 추가 예정)

## 📊 데이터 구조

### 근육 데이터 (muscles.json)
```json
[
  {
    "id": "pec_major",
    "label_ko": "대흉근",
    "label_en": "Pectoralis Major",
    "side": "front",
    "svg_region_id": "m_pec_major",
    "default_strength": "normal",
    "description": "가슴의 큰 근육으로 팔을 앞으로 움직이고 회전시킵니다."
  }
  // ... 15개 근육 데이터
]
```

### 자세 규칙 (postureRules.json)
```json
{
  "rules": [
    {
      "id": "rounded_shoulders",
      "name_ko": "말린 어깨 (라운드 숄더)",
      "triggers": {
        "weak": ["mid_trap", "lower_trap", "rhomboids"],
        "strong": ["pec_major", "anterior_delt"]
      },
      "recommended_exercises": ["페이스풀", "백 익스텐션", ...]
    }
    // ... 7가지 자세 규칙
  ],
  "strength_levels": {
    "very_weak": { "value": -2, "label_ko": "매우 약함", "color": "#ff4d4d" },
    "weak": { "value": -1, "label_ko": "약함", "color": "#ff944d" },
    "normal": { "value": 0, "label_ko": "보통", "color": "#f2f2f2" },
    "strong": { "value": 1, "label_ko": "강함", "color": "#8cc6ff" },
    "very_strong": { "value": 2, "label_ko": "매우 강함", "color": "#1e90ff" }
  }
}
```

## 🎯 사용 방법

1. **근육 선택**
   - 전면/후면 버튼으로 보기 전환
   - SVG 맵에서 근육 클릭 또는 목록에서 선택

2. **강도 입력**
   - 오른쪽 패널에서 5단계 중 선택
   - 여러 근육의 강도를 입력

3. **자세 분석 확인**
   - 자동으로 자세 이상 감지
   - 심각도와 추천 운동 확인

4. **PDF 다운로드**
   - "PDF 다운로드" 버튼 클릭
   - 분석 결과 저장

5. **데이터 관리 (전문가 모드)**
   - "전문가 모드" 버튼 클릭
   - JSON Export/Import로 데이터 백업

## 🛠 기술 스택

### Frontend
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Zustand** - 상태 관리
- **TailwindCSS v4** - 스타일링
- **jsPDF** - PDF 생성
- **html2canvas** - HTML to Canvas 변환

### Backend
- **Hono** - 경량 웹 프레임워크
- **Cloudflare Pages** - 엣지 배포 플랫폼
- **Vite** - 빌드 도구

### 데이터
- **JSON 기반** - 확장 가능한 데이터 구조
- **로컬스토리지** - 클라이언트 사이드 저장

## 📁 프로젝트 구조

```
webapp/
├── src/
│   ├── components/        # React 컴포넌트
│   │   ├── App.tsx        # 메인 앱
│   │   ├── MuscleMap.tsx  # 근육 맵
│   │   ├── SelectorPanel.tsx  # 강도 선택
│   │   ├── PostureAnalysis.tsx  # 자세 분석
│   │   ├── PDFGenerator.tsx  # PDF 생성
│   │   └── ExportImportPanel.tsx  # 데이터 관리
│   ├── data/              # JSON 데이터
│   │   ├── muscles.json   # 근육 정보
│   │   └── postureRules.json  # 자세 규칙
│   ├── store/             # Zustand 스토어
│   │   └── muscleStore.ts
│   ├── utils/             # 유틸리티
│   │   └── postureAnalysis.ts  # 분석 엔진
│   ├── styles/            # 스타일
│   │   └── global.css
│   ├── index.tsx          # Hono 서버
│   └── client.tsx         # React 엔트리
├── public/
│   └── static/
│       ├── body-front.svg  # 전면 SVG
│       └── body-back.svg   # 후면 SVG
├── dist/                  # 빌드 결과물
├── wrangler.jsonc         # Cloudflare 설정
├── vite.config.ts         # Vite 설정
├── package.json           # 의존성 관리
├── ecosystem.config.cjs   # PM2 설정
└── README.md              # 프로젝트 문서
```

## 🚀 개발 및 배포

### 로컬 개발
```bash
# 의존성 설치
npm install

# 빌드
npm run build

# 개발 서버 시작 (PM2)
pm2 start ecosystem.config.cjs

# 서버 테스트
curl http://localhost:3000
```

### Cloudflare Pages 배포
```bash
# 빌드 및 배포
npm run deploy

# 프로덕션 배포 (프로젝트명 지정)
npm run deploy:prod
```

### 유용한 명령어
```bash
# 포트 정리
npm run clean-port

# Git 커밋
npm run git:commit "커밋 메시지"

# 서버 상태 확인
pm2 list

# 로그 확인
pm2 logs muscle-analyzer --nostream
```

## 📈 향후 개발 계획

### Phase 1 (완료) ✅
- [x] 기본 근육 맵 (2D SVG)
- [x] 강도 선택 UI
- [x] 자세 분석 엔진
- [x] PDF 생성
- [x] 전문가 모드

### Phase 2 (예정)
- [ ] 3D 근육 모델 (Three.js)
- [ ] 더 많은 근육 부위 (30-40개)
- [ ] 통증 부위 표시 기능
- [ ] 운동 비디오 링크
- [ ] 다국어 지원 (영어, 일본어)

### Phase 3 (예정)
- [ ] 계정 시스템
- [ ] 클라우드 저장 (Cloudflare D1)
- [ ] 진행 상황 추적
- [ ] 전문가 상담 연결
- [ ] 모바일 앱

## ⚠️ 주의사항

이 애플리케이션은 **참고용**이며, 전문가의 정확한 진단을 대체할 수 없습니다.
- 통증이나 불편함이 있다면 의료 전문가와 상담하세요
- 운동을 시작하기 전에 전문가의 조언을 구하세요
- 개인의 건강 상태에 따라 결과가 다를 수 있습니다

## 📝 라이선스

이 프로젝트는 개인 학습 및 참고용으로 제작되었습니다.

## 👨‍💻 개발자

- **개발**: Claude (Anthropic AI Assistant)
- **프로젝트 관리**: 사용자 협업
- **배포**: Cloudflare Pages
- **개발 환경**: GenSpark Sandbox

## 📞 문의

문제가 발생하거나 제안사항이 있다면 이슈를 등록해주세요.

---

**마지막 업데이트**: 2024-11-19
**버전**: 1.0.0
**상태**: ✅ 프로덕션 준비 완료
