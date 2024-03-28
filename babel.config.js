module.exports = {
  presets: ["babel-preset-expo"],
  env: {
    production: {},
  },
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "#components": "./app/components/index",
          "#models": "./app/models/index",
          "#navigators": "./app/navigators/index",
          "#screens": "./app/screens/index",
          "#theme": "./app/theme/index",
          "#LEGACY_api": "./app/services/LEGACY_api/index",
          "#api": "./app/services/api/index",
          "#images": "./assets/images/index",
          "#fonts": "./assets/fonts/index",

          //* 예외들
          //! storybook 은 절대로 절대경로 설정하지 말것!
        },
      },
    ],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],

    "react-native-reanimated/plugin", //! Reanimated plugin has to be listed last.
  ],
}
