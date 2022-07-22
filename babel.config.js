module.exports = {
  presets: ["babel-preset-expo"],
  env: {
    production: {},
  },
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
        root: ["./app"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
  ],
}
