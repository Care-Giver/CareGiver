# 케어기버 프론트 앱 개발 가이드 - v230602 (최수민 작성)

![CG 헤더](https://cdn.myportfolio.com/dd18ab34-b0c4-483d-8da5-b3f0b4e33fa4/d4362c69-bc87-4a9e-9969-6ca662882061_rwc_16x0x1886x728x4096.png?h=90d6074126a6c3b537cae45b61fbf85a "CG 헤더")

---

## 개발환경

- node v18.17.0
- npm 9.6.7
- cocoapods 1.14.3

## 주의사항

- 패키지 설치 또는 추가시, npm 대신 _yarn 을 사용주세요_

## 앱 실행 방법 (자동)

1.  `yarn install`
2.  `yarn ios` 또는 `yarn android`
3.  (Metro 서버가 끊긴경우) `yarn start-metro`

## pod install 실패시...

### The Swift pod `ExpoModulesCore` depends upon `React-RCTAppDelegate`, which does not define modules.

```
...
Installing react-native-slider (4.4.2)
Installing react-native-webview (13.6.3)
[!] The following Swift pods cannot yet be integrated as static libraries:

The Swift pod `ExpoModulesCore` depends upon `React-RCTAppDelegate`, which does not define modules. To opt into those targets generating module maps (which is necessary to import them from Swift when building as static libraries), you may set `use_modular_headers!` globally in your Podfile, or specify `:modular_headers => true` for particular dependencies.
```

- yarn install 이후, `node_modules/expo-modules-core/ExpoModulesCore.podspec` 경로로 이동한다.
- Line 84: `s.dependency 'React-RCTAppDelegate' if reactNativeMinorVersion >= 71` 를 **주석 처리 한다.**
- 다시, `pod install` 시도 하면 정상적으로 성공한다.
- 만약 그래도 실패한다면 `rm -rf ~/Library/Developer/Xcode/DerivedData` 이후 다시 `pod install` 해볼 것.

## 작업 관련 명령어

- 컴포넌트 생성: `yarn component 컴포넌트명`
- 스크린 생성: `yarn screen 스크린명`
- 모델 생성: `yarn model 모델명`

## 기타 명령어

- 캐시 삭제: `yarn c `

---

# 카카오 로그인 Android 오류 해결 (Feat. Upload Key and Signing Key)

## 문제 상황

- debug 빌드 에서는 정상적으로 작동하던 카카오 로그인이, release 빌드에서는 작동하지 않음.
- `invalid android_key_hash or ios_bundle_id or web_site_url`

## 원인 및 해결 방법

- `Kakao Developers > 내 애플리케이션 > 앱 설정 > 플랫폼` 에서, Android 의 "키 해시" 목록에 "release" 빌드 용 해시키가 존재하지 않았음.
- 구글은 **"Signing Key" (앱 서명 키)** 를 "직접" 관리 함. 즉, 내 환경에 있는 것이 아니라 Google Play Console 에서 확인 해야 함.
- 내 환경에서 **"Upload Key" (업로드 키)**를 사용하여 APK, AAB "release"빌드 를 추출했다 하더라도, 이때 사용된 키는 Upload Key 이므로, 해당 키를 통해 추출한 값을 해시키로 사용하면, 실제 Google Play 를 통해 배포된 앱을 사용하는 "테스터" 들은 문제에 직면 함.
- `Google Play Console > 내부 테스트` 를 통해 배포된 release 빌드 에서, 카카오 SDK 는 Upload Key 를 사용해서 키를 대조하는 것이 아니라, 배포 과정중에서 구글이 자체적으로 서명한 Signing Key 를 사용하여 대조하게 되기 때문임.
- 따라서, 이 Signing Key 를 Base64 인코딩 한 값을 Kakao Developers 대시보드에 등록해주어야 함.

## 참고 자료

Signing Key 와 Upload Key

- https://github.com/crossplatformkorea/react-native-kakao-login/issues/244
- https://developer.android.com/studio/publish/app-signing#enroll (이거 한글로 보면 용어가 번역되어 있어서 오히려 더 헷갈림. 걍 영어로 볼 것.)
  > - **App signing key**: The key that is used to sign APKs that are installed on a user's device.
  > - **Upload key**: The key you use to sign the app bundle or APK before you upload it for app [signing with Google Play](https://developer.android.com/studio/publish/app-signing#app-signing-google-play)

Base64 인코딩 방법

- https://devtalk.kakao.com/t/topic/130144/2
- https://kakao-tam.tistory.com/53

```
echo "{SHA-1 인증서 지문}" | xxd -r -p | openssl base64
```

---
