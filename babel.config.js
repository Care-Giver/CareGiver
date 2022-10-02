module.exports = {
  presets: ["babel-preset-expo"],
  env: {
    production: {},
  },
  plugins: [
    // [
    //   "expo-notifications",
    //   // {
    //   //   icon: "./local/assets/notification-icon.png",
    //   //   color: "#ffffff",
    //   //   sounds: [
    //   //     "./local/assets/notification-sound.wav",
    //   //     "./local/assets/notification-sound-other.wav",
    //   //   ],
    //   // },
    // ],
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "#components": "./app/components",
          "#navigators": "./app/navigators",
          "#screens": "./app/screens",
          "#theme": "./app/theme",
          "#api": "./app/services/api",
          "#images": "./assets/images",
          "#fonts": "./assets/fonts",
          "#storybook": "./storybook",
          // ".": ["./*"],
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
  ],
}
