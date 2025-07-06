/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect } from "react"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import * as storage from "./utils/storage"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import { ErrorBoundary } from "./screens/ignite-basics/error/error-boundary"
import { useAssets } from "expo-asset"
import { images } from "#images"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import remoteConfig from "@react-native-firebase/remote-config"
import { BASE_URL, setBaseUrl } from "./services/api"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const queryClient = new QueryClient()

//* 호중 - 빌드에러로 인한 주석처리
// if (__DEV__) {
//   // @ts-ignore
//   import("react-query-native-devtools").then(({ addPlugin }) => {
//     addPlugin({ queryClient })
//   })
// }

/**
 * This is the root component of our app.
 */
function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  //* Do NOT use before the deployment
  // const {
  //   initialNavigationState,
  //   onNavigationStateChange,
  //   isRestored: isNavigationStateRestored,
  // } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)
  const isNavigationStateRestored = true
  // const [areImagesLoaded] = useAssets(Object.values(images))
  const areImagesLoaded = true
  // const [isRemoteConfigReady, setIsRemoteConfigReady] = useState(false)
  const isRemoteConfigReady = true

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      setupRootStore().then(setRootStore)

      // !NOTE: 개발용. Remote Config 캐싱 주기 설정. 캐싱 주기 기본값: 12시간
      // await remoteConfig().setConfigSettings({
      //   minimumFetchIntervalMillis: 3000, //! 3초로 수정
      // })

      // await remoteConfig()
      //   .setDefaults({
      //     baseUrl: "",
      //   })
      //   .then(() => remoteConfig().fetchAndActivate())
      //   .then((fetchedRemotely) => {
      //     if (fetchedRemotely) {
      //       console.debug(
      //         "[REMOTE CONFIG] >>>",
      //         "Configs were retrieved from the backend and activated.",
      //       )
      //       const parameters = remoteConfig().getAll()
      //       Object.entries(parameters).forEach(($) => {
      //         const [key, entry] = $
      //         console.log("Key: ", key)
      //         console.log("Source: ", entry.getSource())
      //         console.log("Value: ", entry.asString())

      //         if (key === "baseUrl") {
      //           console.debug(
      //             "[REMOTE CONFIG] SETTINGS...baseUrl >>>",
      //             //
      //             entry.asString(),
      //           )
      //           setBaseUrl(entry.asString())
      //           setIsRemoteConfigReady(true)
      //         }
      //       })
      //     } else {
      //       console.debug(
      //         "[REMOTE CONFIG] >>>",
      //         "No configs were fetched from the backend, and the local configs were already activated",
      //       )
      //       setIsRemoteConfigReady(false)
      //     }
      //   })
    })()
  }, [])

  // !NOTE: 개발용. 5초 주기로 BASE_URL 값 출력
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("Current BASE_URL >>>", BASE_URL)
  //   }, 5000)
  //   return () => clearInterval(interval)
  // }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.

  console.log("🚀 >>> rootStore", rootStore)
  console.log("🚀 >>> isNavigationStateRestored", isNavigationStateRestored)

  if (!rootStore || !isNavigationStateRestored || !areImagesLoaded || !isRemoteConfigReady)
    return null

  // otherwise, we're ready to render the app
  return (
    <QueryClientProvider client={queryClient}>
      <ToggleStorybook>
        <RootStoreProvider value={rootStore}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <ErrorBoundary catchErrors={"always"}>
              <KeyboardProvider>
                {/* // ! "GestureHandlerRootView" is added to fix Bottom Sheet problems on Android */}
                {/* // ? ref: https://github.com/gorhom/react-native-bottom-sheet/issues/895#issuecomment-1103363818 */}
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <BottomSheetModalProvider>
                    <AppNavigator
                    // initialState={initialNavigationState} //* Do NOT use before the deployment
                    // onStateChange={onNavigationStateChange} //* Do NOT use before the deployment
                    />
                  </BottomSheetModalProvider>
                </GestureHandlerRootView>
              </KeyboardProvider>
            </ErrorBoundary>
          </SafeAreaProvider>
        </RootStoreProvider>
      </ToggleStorybook>
    </QueryClientProvider>
  )
}

export default App
