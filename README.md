# Demo

<p align="center">
  <a href="https://appetize.io/app/b_csiphbxyo7sh2lmebitrj7r5xq">
    <img width="436" height="885" alt="demo" src="https://github.com/user-attachments/assets/23e131b1-a043-4a30-aec3-8a1e356d02b6" />
  </a>
</p>

---

![CG 헤더](https://cdn.myportfolio.com/dd18ab34-b0c4-483d-8da5-b3f0b4e33fa4/d4362c69-bc87-4a9e-9969-6ca662882061_rwc_16x0x1886x728x4096.png?h=90d6074126a6c3b537cae45b61fbf85a "CG 헤더")


# Quick Start

```sh
yarn install;
yarn ios; # iOS 앱 실행
yarn android; # Android 앱 실행
```

# 개발환경

```sh
Node.js

- Version: Node.js 16.x or higher (project tested with v22.3.0)
- Package Manager: yarn classic
- Installation: Via nvm, Homebrew, or official installer

iOS Development Environment

macOS Requirements

- macOS: 12.0 (Monterey) or higher
- Xcode: 14.0 or higher (tested with Xcode 15.3)
- Command Line Tools: Latest version
  xcode-select --install

iOS Dependencies

- CocoaPods: 1.11.0 or higher
  sudo gem install cocoapods

- iOS Simulator: iOS 13.0+ (project minimum deployment target)
- Deployment Target: iOS 13.0 minimum
- Supported Architectures: arm64, x86_64

iOS SDK Compatibility

- iOS SDK: 17.4 (as configured in project)
- Swift: 5.0+
- Objective-C: Latest

Android Development Environment

Java Development Kit

- JDK: OpenJDK 11 or Oracle JDK 11

# Homebrew installation

brew install openjdk@11

Android Studio & SDK

- Android Studio: 2022.3.1 or higher
- Android SDK: API Level 33+ (compileSdkVersion 33)
- Build Tools: 33.0.0
- NDK: 21.4.7075529 (as configured in project)
- Target SDK: 34
- Min SDK: 21

Android SDK Components

# Required SDK components

- Android SDK Platform 33
- Android SDK Platform 34
- Android SDK Build-Tools 33.0.0
- Google Play Services
- Android Support Repository
- Google Repository

Gradle

- Gradle: 8.0.1 (as specified in project)
- Android Gradle Plugin: 7.4.2
- Kotlin: 1.8.10

Project-Specific Dependencies

Expo SDK

- Expo: 49.0.21
- Expo CLI: Latest
  yarn install -g @expo/cli

Key Native Dependencies

- React Native: 0.72.6
- Hermes: Enabled (JavaScript engine)
- Firebase: 33.1.0 BOM
- Google Maps: Latest
- KakaoSDK: 2.22.4
- Naver Login SDK: 4.2.1

Build Commands

Initial Setup

# Install dependencies

yarn install

# iOS setup

cd ios && pod install && cd ..

# Android setup (if needed)

cd android && ./gradlew clean && cd ..

iOS Build

# Simulator build

npx react-native run-ios --simulator "iPhone 15 Pro"

# Device build (requires Apple Developer account)

npx react-native run-ios --device

Android Build

# Debug build

npx react-native run-android

# Release build

cd android && ./gradlew assembleRelease

Environment Variables

Required Files

- .env file in project root (for react-native-config)
- ios/.xcode.env (for Node.js path configuration)
- android/app/google-services.json (for Firebase)
- ios/GoogleService-Info.plist (for Firebase)

Troubleshooting Tools

Cleanup Commands

# React Native cache

npx react-native clean --include android,cocoapods,metro,watchman,yarn

# iOS cleanup

rm -rf ios/build ios/Pods ios/Podfile.lock
cd ios && pod install && cd ..

# Android cleanup

cd android && ./gradlew clean && cd ..

# Node modules

rm -rf node_modules && yarn install

Doctor Command

npx react-native doctor
```

# 주의사항

- 라이브러리 설치 또는 추가시, `npm` 대신 _`yarn` 을 사용주세요_
- TBD

# 📱앱 실행 방법 (디버그 빌드)

(`yarn install` 이후)

## iOS: `yarn ios`

## Android: `yarn android`

# 작업 관련 명령어

- 컴포넌트 생성: `yarn component 컴포넌트명`
- 스크린 생성: `yarn screen 스크린명`
- 모델 생성: `yarn model 모델명`

# 기타 명령어

- 캐시 삭제(yarn, metro, ios, android): `yarn c `
- ios 빌드 캐시 삭제: `yarn c:i `
- android 빌드 캐시 삭제: `yarn c:a`

# 🛠️ Troubleshooting

## 디버그 빌드에서 문제 상황 발생시, 해결 방법

### 1. 빌드 에러가 발생한 경우 (... BUILD FAILED)

> 가장 먼저 해볼만 한 것은 캐시를 재거 하는 것입니다.

```sh
# iOS
yarn c && yarn c:i && yarn ios

# Android:
yarn c && yarn c:a && yarn android
```

<br/>

### 2. Metro 서버가 끊긴 경우

```sh
yarn start
```

<br/>

### 3. `8081` 포트가 이미 사용중인 경우

```
kill $(lsof -ti:8081)
```

<br/>

### 4. `pod install` 실패시

```shell
The Swift pod `ExpoModulesCore` depends upon `React-RCTAppDelegate`, which does not define modules.

...
Installing react-native-slider (4.4.2)
Installing react-native-webview (13.6.3)
[!] The following Swift pods cannot yet be integrated as static libraries:

The Swift pod `ExpoModulesCore` depends upon `React-RCTAppDelegate`, which does not define modules. To opt into those targets generating module maps (which is necessary to import them from Swift when building as static libraries), you may set `use_modular_headers!` globally in your Podfile, or specify `:modular_headers => true` for particular dependencies.
```

- ~~yarn install 이후, `node_modules/expo-modules-core/ExpoModulesCore.podspec` 경로로 이동한다.~~
- ~~Line 84: `s.dependency 'React-RCTAppDelegate' if reactNativeMinorVersion >= 71` 를 **주석 처리 한다.**~~
- ~~다시, `pod install` 시도 하면 정상적으로 성공한다.~~
- ~~만약 그래도 실패한다면 `rm -rf ~/Library/Developer/Xcode/DerivedData` 이후 다시 `pod install` 해볼 것.~~

#### 위 에러는 `Podfile` 에 다음과 같은 코드를 추가하여 해결 하였습니다. (2023. 12. 25 , @smnchoi)

```ruby
...
pod 'React-RCTAppDelegate', :path => '../node_modules/react-native/Libraries/AppDelegate' :modular_headers => true
pod 'ExpoModulesCore', :path => '../node_modules/expo-modules-core', :modular_headers => true
```

#### 설명:

- 종속관계에 있는 ExpoModulesCore 와 React-RCTAppDelegate 문제를 해결하기 위해선, `modular_headers => true` 각각 값을 할당해주면 됩니다.
- 하지만, 단순히
  ```
  pod 'ExpoModulesCore', :modular_headers => true
  pod 'React-RCTAppDelegate', :modular_headers => true
  ```
  이렇게 추가해주면, `multiple dependencies with different sources` 에러가 발생합니다.
- 이를 방지하기 위해, **`path`를 꼭 명시해줘야 합니다.**

<br/>
<br/>
<br/>

## 배포 관련 문제 상황 해결법

### 카카오 로그인 Android 오류 해결 (Feat. Upload Key and Signing Key)

#### 문제 상황

- debug 빌드 에서는 정상적으로 작동하던 카카오 로그인이, release 빌드에서는 작동하지 않음.
- `invalid android_key_hash or ios_bundle_id or web_site_url`

#### 원인 및 해결 방법

- `Kakao Developers > 내 애플리케이션 > 앱 설정 > 플랫폼` 에서, Android 의 "키 해시" 목록에 "release" 빌드 용 해시키가 존재하지 않았음.
- 구글은 **"Signing Key" (앱 서명 키)** 를 "직접" 관리 함. 즉, 내 환경에 있는 것이 아니라 Google Play Console 에서 확인 해야 함.
- 내 환경에서 **"Upload Key" (업로드 키)**를 사용하여 APK, AAB "release"빌드 를 추출했다 하더라도, 이때 사용된 키는 Upload Key 이므로, 해당 키를 통해 추출한 값을 해시키로 사용하면, 실제 Google Play 를 통해 배포된 앱을 사용하는 "테스터" 들은 문제에 직면 함.
- `Google Play Console > 내부 테스트` 를 통해 배포된 release 빌드 에서, 카카오 SDK 는 Upload Key 를 사용해서 키를 대조하는 것이 아니라, 배포 과정중에서 구글이 자체적으로 서명한 Signing Key 를 사용하여 대조하게 되기 때문임.
- 따라서, 이 Signing Key 를 Base64 인코딩 한 값을 Kakao Developers 대시보드에 등록해주어야 함.

#### 참고 자료

**Signing Key 와 Upload Key**

- https://github.com/crossplatformkorea/react-native-kakao-login/issues/244
- https://developer.android.com/studio/publish/app-signing#enroll (이거 한글로 보면 용어가 번역되어 있어서 오히려 더 헷갈림. 걍 영어로 볼 것.)
  > - **App signing key**: The key that is used to sign APKs that are installed on a user's device.
  > - **Upload key**: The key you use to sign the app bundle or APK before you upload it for app [signing with Google Play](https://developer.android.com/studio/publish/app-signing#app-signing-google-play)

**Base64 인코딩 방법**

- https://devtalk.kakao.com/t/topic/130144/2
- https://kakao-tam.tistory.com/53

```
echo "{SHA-1 인증서 지문}" | xxd -r -p | openssl base64
```

---
