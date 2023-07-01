# 케어기버 프론트 앱 개발 가이드 - v230602 (최수민 작성)

![CG 헤더](https://cdn.myportfolio.com/dd18ab34-b0c4-483d-8da5-b3f0b4e33fa4/d4362c69-bc87-4a9e-9969-6ca662882061_rwc_16x0x1886x728x4096.png?h=90d6074126a6c3b537cae45b61fbf85a "CG 헤더")

---

## 개발환경

- node 16.15.0
- npm 8.5.5
- cocoapods 1.12.1

## 주의사항

- 패키지 설치 또는 추가시, npm 대신 _yarn 을 사용주세요_

## 앱 실행 방법

1.  `yarn install`
2.  `yarn ios` 또는 `yarn android`
3.  (Metro 서버가 끊긴경우) `yarn start-metro`

## 작업 관련 명령어

- 컴포넌트 생성: `yarn component 컴포넌트명`
- 스크린 생성: `yarn screen 스크린명`
- 모델 생성: `yarn model 모델명`

## 기타 명령어

- 캐시 삭제: `yarn c `
