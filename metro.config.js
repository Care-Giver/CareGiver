// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.resolver = {
  ...config.resolver,
  requireCycleIgnorePatterns: [
    // Ignore warnings like: "WARN  Require cycle: app/navigators/index.ts -> app/navigators/app-navigator.tsx -> app/navigators/cl-stack-navigator.tsx -> app/screens/index.ts -> app/screens/test-iamport/test-iamport-screen.tsx -> app/navigators/index.ts"
    /app\/.*/,
    // Ignore warnings like: "WARN  Require cycle: node_modules/@react-native-firebase/remote-config/lib/index.js -> node_modules/@react-native-firebase/remote-config/lib/modular/index.js -> node_modules/@react-native-firebase/remote-config/lib/index.js"
    /node_modules\/.*/,
  ],
}

module.exports = config
