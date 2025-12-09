# 이미지 파일 구조 및 관리 가이드

이 폴더는 웹사이트에서 사용되는 모든 이미지 파일을 보관합니다.

## 📁 폴더 구조

```
images/
├── logo/           # 로고 이미지
│   └── logo.png    # 메인 로고 (권장: 1024x1024px) - PNG만 사용
├── hero/           # 메인 히어로 섹션 이미지
│   └── main-banner.webp  # 메인 배너 (권장: 1920x1080px 이상)
├── about/          # About 페이지 이미지
│   ├── banner.webp  # About 배너
│   └── team.webp    # 팀 사진
├── products/       # 제품 이미지
│   ├── product-1.webp
│   └── product-2.webp
├── portfolio/      # 포트폴리오 이미지
│   ├── project-1.webp
│   ├── project-2.webp
│   ├── project-3.webp
│   ├── project-4.webp
│   ├── project-5.webp
│   └── project-6.webp
└── courses/        # AI 강좌 관련 이미지
    ├── ai-education.webp
    └── product-manufacturing.webp

```

## 🖼️ 이미지 교체 방법

### 1. 로고 교체 (PNG만 사용)
- 파일명: `logo/logo.png`
- 권장 크기: 1024x1024px (정사각형)
- 형식: **PNG만** (투명 배경 지원)
- 용도: 네비게이션 바, 푸터

### 2. 메인 배너 교체
- 파일명: `hero/main-banner.webp`
- 권장 크기: 1920x1080px 이상
- 형식: **WebP**
- 용도: 메인 페이지 히어로 섹션

### 3. About 페이지 이미지
- `about/banner.webp` - About 페이지 상단 배너
- `about/team.webp` - 팀 사진
- 권장 크기: 1920x1080px
- 형식: **WebP**

### 4. 제품 이미지
- 폴더: `products/`
- 파일명: `product-1.webp`, `product-2.webp`
- 권장 크기: 800x600px 이상
- 형식: **WebP**

### 5. 포트폴리오 이미지
- 폴더: `portfolio/`
- 파일명: `project-1.webp` ~ `project-6.webp`
- 권장 크기: 1024x1024px
- 형식: **WebP**

### 6. 강좌 이미지
- 폴더: `courses/`
- 파일명: `ai-education.webp`, `product-manufacturing.webp`
- 권장 크기: 1024x1024px
- 형식: **WebP**

## ⚠️ 주의사항

1. **파일 형식**: 
   - 로고: **PNG만** 사용 (투명 배경 지원)
   - 나머지 모든 이미지: **WebP만** 사용 (최적화된 웹 포맷)
2. **파일 크기**: 각 이미지 500KB 이하 권장 (웹 최적화)
3. **파일명**: 영문, 숫자, 하이픈(-)만 사용 (공백, 한글 사용 금지)
4. **이미지 변환**: JPG/PNG → WebP 변환 권장
   - 온라인 도구: https://squoosh.app/
   - 또는 Photoshop, GIMP 등에서 직접 WebP로 저장

## 🔄 현재 필요한 이미지 목록

아래 이미지들을 준비해서 해당 폴더에 넣어주세요:

**PNG 파일 (로고만):**
- [ ] `logo/logo.png` - 회사 로고 (PNG)

**WebP 파일 (나머지 전부):**
- [x] `hero/main-banner.webp` - 메인 페이지 배너 ✅
- [ ] `about/banner.webp` - About 페이지 배너
- [ ] `about/team.webp` - 팀 사진
- [ ] `products/product-1.webp` - 제품 이미지 1
- [ ] `products/product-2.webp` - 제품 이미지 2
- [ ] `portfolio/project-1.webp` - 포트폴리오 프로젝트 1
- [ ] `portfolio/project-2.webp` - 포트폴리오 프로젝트 2
- [ ] `portfolio/project-3.webp` - 포트폴리오 프로젝트 3
- [ ] `portfolio/project-4.webp` - 포트폴리오 프로젝트 4
- [ ] `portfolio/project-5.webp` - 포트폴리오 프로젝트 5
- [ ] `portfolio/project-6.webp` - 포트폴리오 프로젝트 6
- [ ] `courses/ai-education.webp` - AI 강좌 대표 이미지
- [ ] `courses/product-manufacturing.webp` - 제품 제조 이미지

## 📝 이미지 추가 후 할 일

이미지 파일을 추가한 후에는 별도 작업이 필요 없습니다. 
HTML/JS 파일에서 자동으로 로컬 경로를 참조하도록 설정되어 있습니다.

