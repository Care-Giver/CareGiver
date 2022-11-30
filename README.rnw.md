# rnw (React Native Web), 새로고침시 404 버그 수정하기

## refs

    - https://github.com/react-navigation/react-navigation/issues/10447
    - https://github.com/react-navigation/react-navigation/issues/9519
    - https://vercel.com/docs/project-configuration
    - https://stackoverflow.com/questions/67633057/expo-react-navigation-vercel-deep-linking-not-working

## 원인 및 해결법

Expo 문제가 아니라, deploy 플랫폼 설정 문제다.
vercel 을 사용하는 경우 다음과 같은 방법으로 해결할 수 있다.

1. web-build/ 폴더내에 vercel.json 파일 생성
2. 이후 다음과 같이 작성

```
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

이후, 다시 배포하면 해결된다.
