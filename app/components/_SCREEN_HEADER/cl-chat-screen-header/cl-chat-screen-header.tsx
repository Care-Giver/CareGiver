import React from "react"
import { observer } from "mobx-react-lite"
import { View, Image, Pressable } from "react-native"
import { PreMed18, PreReg10, PreReg14, PreReg16 } from "../../_BASIC/custom-texts/custom-texts"
import { images } from "#images"
import { HEADER_ROOT } from "../common-styles"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { styles } from "./styles"
import { useShowBottomTab } from "app/utils/hooks"
import { CaregiverTypeButton } from "../../../components/_BUTTON/caregiver-type-button/caregiver-type-button"
import { CARE_SOFT_YELLOW, GIVER_CASUAL_NAVY } from "#theme"
import { Type, useStores } from "#models"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "../../../components/_BASIC/screen/screen"

export interface ClChatScreenHeaderProps extends NativeStackHeaderProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  onPress?: () => void
}

export const ClChatScreenHeader = observer(function ClChatScreenHeader(
  props: ClChatScreenHeaderProps,
) {
  const {
    userStore: { type },
  } = useStores()

  const title = props.options.title || props.route.name
  return (
    <View
      {...props}
      style={[
        HEADER_ROOT,
        { justifyContent: "space-between", paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* //? 뒤로가기 버튼 */}
        <Pressable onPress={props.onPress || props.navigation.goBack}>
          <Image style={styles.goBackButton} source={images.go_back} />
        </Pressable>
        {/* //? 타이틀 */}
        <PreMed18 mh={8} color={"black"} text={title} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <PreReg14 mr={8} color={"black"} text={"❗️ 현재"} />
        {/* //? 타입 박스 */}
        <CaregiverTypeButton
          //@ts-ignore
          text={type === Type.CARE_GIVER ? "펫시터" : "보호자"}
          textColor={type === Type.CARE_GIVER ? GIVER_CASUAL_NAVY : "black"}
          style={type === Type.CARE_GIVER ? styles.petsitterBadge : styles.clientBadge}
        />
        <PreReg14 ml={8} color={"black"} text={"모드 입니다."} />
      </View>
    </View>
  )
})
