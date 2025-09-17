module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        "root": ["."],
        "extensions": [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json"
        ],
        "alias": {
          "@app/screen": "./src/screen",
          "@app/res": "./src/res",
          "@app/store": "./src/store",
          "@app/config": "./src/config",
          "@app/helper": "./src/helper",
          "@app/navigator": "./src/navigator",
          "@app/component": "./src/component",
          "@app/container": "./src/container",
          "@app/util": "./src/util",
          "@app/FormElements": "./FormElements"
        }
      }
    ],
    'react-native-reanimated/plugin'
  ],
};
