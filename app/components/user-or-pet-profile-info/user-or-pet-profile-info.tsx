import React from "react"
import { Pressable, View } from "react-native"
import { BODY, HEAD_LINE, MIDDLE_LINE, DISABLED } from "#theme"
import { PreMed16, PreMed14, DivisionLine } from "#components"

interface UserOrPetProfileInfoProps {
  title: string
  profileInfo: string
  showOption?: boolean
  additionalPadding?: number
  onPress?: () => void
  titleColor?: string
}

export const UserOrPetProfileInfo = (props: UserOrPetProfileInfoProps) => {
  const { title, profileInfo, showOption, additionalPadding = 20, onPress, titleColor } = props
  const Wrapper = onPress ? Pressable : View

  return (
    <View style={{ paddingTop: additionalPadding }}>
      <PreMed14 color={titleColor || BODY} text={title} style={{ marginBottom: 10 }} />
      {/*<PreMed16 color={color} text={profileInfo} />*/}
      <Wrapper onPress={onPress}>
        <PreMed16 color={showOption === true ? DISABLED : HEAD_LINE} text={profileInfo} />
        <DivisionLine color={MIDDLE_LINE} style={{ marginTop: 4 }} />
      </Wrapper>
    </View>
  )
}
