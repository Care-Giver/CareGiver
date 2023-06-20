import React from "react"
import { View, StyleSheet, Image, Pressable, StatusBar } from "react-native"
import { observer } from "mobx-react-lite"
import { GIVER_CASUAL_NAVY, SHADOW_1 } from "#theme"
import { images } from "#images"
import { HEADER_ROOT } from "../common-styles"
import { PopReg12 } from "#components"

export const CgScreenHeader = observer(function CgScreenHeader(props) {
  return (
    <>
      <StatusBar backgroundColor={GIVER_CASUAL_NAVY} barStyle="light-content" animated />
      <View {...props} style={[_styles.root, SHADOW_1]}>
        {/* //? 케어기버 로고 */}
        <Image style={_styles.careGiverLogo} source={images.care_giver_logo_light_162x20} />

        {/* //? 알람 버튼 */}
        <Pressable
          onPress={() => {
            alert("알림 기능은 준비중입니다.")
          }}
          style={{
            marginLeft: "auto",
            marginRight: 16,
          }}
        >
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
