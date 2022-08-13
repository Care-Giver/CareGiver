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
          "@components": "./app/components",
          "@navigators": "./app/navigators",
          "@screens": "./app/screens",
          "@theme": "./app/theme",
          "@images": "./assets/images",
          "@fonts": "./assets/fonts",
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
