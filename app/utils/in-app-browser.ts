import { Linking, Alert, Platform } from "react-native"
import { InAppBrowser } from "react-native-inappbrowser-reborn"

async function sleep(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
export async function openLink(url: string) {
  try {
    if (await InAppBrowser.isAvailable()) {
      const result =
        Platform.OS === "ios"
          ? //* Ios일 때 적용
            await InAppBrowser.open(url, {
              // iOS Properties
              dismissButtonStyle: "cancel",
              preferredBarTintColor: "#453AA4",
              preferredControlTintColor: "white",
              readerMode: false,
              animated: true,
              modalPresentationStyle: "fullScreen",
              modalTransitionStyle: "coverVertical",
              modalEnabled: true,
              enableBarCollapsing: false,
              // Specify full animation resource identifier(package:anim/name)
              // or only resource name(in case of animation bundled with app).
              animations: {
                startEnter: "slide_in_right",
                startExit: "slide_out_left",
                endEnter: "slide_in_left",
                endExit: "slide_out_right",
              },
              headers: {
                "my-custom-header": "my custom header value",
              },
            })
          : //* Android일 때 적용
            await InAppBrowser.open(url, {
              // Android Properties
              showTitle: true,
              toolbarColor: "#6200EE",
              secondaryToolbarColor: "black",
              navigationBarColor: "black",
              navigationBarDividerColor: "white",
              enableUrlBarHiding: true,
              enableDefaultShare: true,
              forceCloseOnRedirection: false,
              // Specify full animation resource identifier(package:anim/name)
              // or only resource name(in case of animation bundled with app).
              animations: {
                startEnter: "slide_in_right",
                startExit: "slide_out_left",
                endEnter: "slide_in_left",
                endExit: "slide_out_right",
              },
              headers: {
                "my-custom-header": "my custom header value",
              },
            })
      await sleep(800)
      Alert.alert(JSON.stringify(result))
    } else Linking.openURL(url)
  } catch (error) {
    Alert.alert(error.message)
  }
}
