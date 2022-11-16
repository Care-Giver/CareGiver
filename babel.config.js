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
          "#components": "./app/components",
          "#texts": "./app/components/basics/custom-texts/custom-texts.tsx",
          "#navigators": "./app/navigators",
          "#screens": "./app/screens",
          "#theme": "./app/theme",
          "#api": "./app/services/api",
          "#images": "./assets/images",
          "#fonts": "./assets/fonts",
          "#storybook": "./storybook",
          ".": ["./*"],
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
