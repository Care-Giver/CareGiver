import React from "react"
import { observer } from "mobx-react-lite"
import { View, Image, Pressable } from "react-native"
import { PreMed18 } from "../../_BASIC/custom-texts/custom-texts"
import { images } from "#images"
import { HEADER_ROOT } from "../common-styles"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { styles } from "./styles"
import { useShowBottomTab } from "app/utils/hooks"
import { CaregiverTypeButton } from "../../../components/_BUTTON/caregiver-type-button/caregiver-type-button"
import { GIVER_CASUAL_NAVY } from "#theme"

export interface ClChatScreenHeaderProps extends NativeStackHeaderProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  onPress?: () => void
}

export const ClChatScreenHeader = observer(function ClChatScreenHeader(
  props: ClChatScreenHeaderProps,
) {
  const title = props.options.title || props.route.name
  return (
    <View {...props} style={HEADER_ROOT}>
      {/* //? 뒤로가기 버튼 */}
      <Pressable onPress={props.onPress || props.navigation.goBack}>
        <Image style={styles.goBackButton} source={images.go_back} />
      </Pressable>
      {/* //? 타이틀 */}
      <PreMed18 style={{ marginLeft: 8 }}> {title}</PreMed18>
      {/* //? 타입 박스 */}
      <CaregiverTypeButton
        text={"펫시터"}
        textColor={GIVER_CASUAL_NAVY}
        style={styles.petsitterBadge}
      />
    </View>
  )
})
