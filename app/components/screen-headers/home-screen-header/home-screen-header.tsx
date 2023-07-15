import React from "react"
import { View, Image, Pressable, StatusBar, Platform } from "react-native"
import { images } from "#images"
import { styles } from "./styles"
import { HEADER_ROOT } from "../common-styles"
import { CARE_SOFT_YELLOW, GIVER_CASUAL_NAVY, SHADOW_1, palette } from "#theme"
import { observer } from "mobx-react-lite"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { navigate } from "#navigators"

export const HomeScreenHeader = observer(function HomeScreenHeader(props) {
  // console.log("HomeScreenHeader props:", props)

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
            navigate("test-push-notification-screen")
          }}
          style={{
            marginLeft: "auto",
            marginRight: 16,
          }}
        >
          <Image style={styles.bell} source={images.bell} />
        </Pressable>

        {/* // iamport 테스트 바로가기 */}
        <MaterialCommunityIcons
          name="credit-card-settings-outline"
          size={24}
          style={{ marginRight: 16 }}
          color={GIVER_CASUAL_NAVY}
          onPress={() => {
            navigate("test-iamport-screen")
          }}
        />
      </View>
    </>
  )
})
