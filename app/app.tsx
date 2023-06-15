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

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

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
  const [areImagesLoaded] = useAssets(Object.values(images))

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      setupRootStore().then(setRootStore)
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rootStore || !isNavigationStateRestored || !areImagesLoaded) return null

  // otherwise, we're ready to render the app
  return (
    <ToggleStorybook>
      <RootStoreProvider value={rootStore}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ErrorBoundary catchErrors={"always"}>
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
          </ErrorBoundary>
        </SafeAreaProvider>
      </RootStoreProvider>
    </ToggleStorybook>
  )
}

export default App
