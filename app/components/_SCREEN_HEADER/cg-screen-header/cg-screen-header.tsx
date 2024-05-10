import React from "react"
import { View, StyleSheet, Image, Pressable, StatusBar, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { CARE_NATURAL_BLUE, GIVER_CASUAL_NAVY, SHADOW_1 } from "#theme"
import { images } from "#images"
import { HEADER_ROOT } from "../common-styles"
import { navigate } from "#navigators"
import { useStores } from "#models"

const $dot: ViewStyle = {
  borderRadius: 6,
  width: 6,
  height: 6,
  backgroundColor: CARE_NATURAL_BLUE,
  position: "absolute",
}

export const CgScreenHeader = observer(function CgScreenHeader(props) {
  const {
    notificationStore: { hasCareGiverUncheckedNoti },
  } = useStores()
  return (
    <>
      <StatusBar backgroundColor={GIVER_CASUAL_NAVY} barStyle="light-content" animated />
      <View {...props} style={[_styles.root, SHADOW_1]}>
        {/* //? 케어기버 로고 */}
        <Image style={_styles.careGiverLogo} source={images.care_giver_logo_light_162x20} />

        {/* //? 알람 버튼 */}
        <Pressable
          onPress={() => {
            navigate("cg-notification-screen")
          }}
          style={{
            marginLeft: "auto",
            marginRight: 16,
          }}
        >
          {hasCareGiverUncheckedNoti && <View style={$dot} />}
          <Image style={_styles.bell} source={images.bell_light} />
        </Pressable>
      </View>
    </>
  )
})

const _styles = StyleSheet.create({
  root: {
    ...HEADER_ROOT,
    backgroundColor: GIVER_CASUAL_NAVY,
  },

  careGiverLogo: {
    width: 162,
    height: 20,
    marginLeft: 16,
  },

  bell: {
    width: 28,
    height: 28,
  },
})
