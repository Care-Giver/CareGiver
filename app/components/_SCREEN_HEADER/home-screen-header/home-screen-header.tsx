import React from "react"
import { View, Image, Pressable, StatusBar, Platform, ViewStyle } from "react-native"
import { images } from "#images"
import { styles } from "./styles"
import { HEADER_ROOT } from "../common-styles"
import { CARE_NATURAL_BLUE, SHADOW_1, palette } from "#theme"
import { observer } from "mobx-react-lite"
import { navigate } from "#navigators"
import { useStores } from "#models"

const $dot: ViewStyle = {
  borderRadius: 6,
  width: 6,
  height: 6,
  backgroundColor: CARE_NATURAL_BLUE,
  position: "absolute",
}

export const HomeScreenHeader = observer(function HomeScreenHeader(props) {
  const {
    notificationStore: { hasClientUncheckedNoti },
  } = useStores()
  return (
    <>
      <StatusBar
        backgroundColor={palette.black}
        barStyle={Platform.select({
          ios: "dark-content",
          android: "light-content",
        })}
        animated
      />
      <View {...props} style={[HEADER_ROOT, SHADOW_1]}>
        {/* //? 케어기버 로고 */}
        <Image style={styles.careGiverLogo} source={images.care_giver_logo_162x20} />

        {/* //? 알람 버튼 */}
        <Pressable
          onPress={() => {
            // navigate("test-push-notification-screen")
            navigate("notification-screen")
          }}
          style={{
            marginLeft: "auto",
            marginRight: 16,
          }}
        >
          {hasClientUncheckedNoti && <View style={$dot} />}
          <Image style={styles.bell} source={images.bell} />
        </Pressable>
      </View>
    </>
  )
})
