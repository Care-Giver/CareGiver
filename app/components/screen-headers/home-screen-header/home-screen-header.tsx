import React from "react"
import { View, Image, Pressable, StatusBar } from "react-native"
import { images } from "#images"
import { styles } from "./styles"
import { HEADER_ROOT } from "../common-styles"
import { SHADOW_1 } from "#theme"
import { observer } from "mobx-react-lite"
import { PopReg12 } from "#components"

export const HomeScreenHeader = observer(function HomeScreenHeader(props) {
  // console.log("HomeScreenHeader props:", props)

  return (
    <>
      <StatusBar backgroundColor={"white"} barStyle="dark-content" animated />
      <View {...props} style={[HEADER_ROOT, SHADOW_1]}>
        {/* //? 케어기버 로고 */}
        <Image style={styles.careGiverLogo} source={images.care_giver_logo_162x20} />

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
          <Image style={styles.bell} source={images.bell} />
        </Pressable>
      </View>
    </>
  )
})
