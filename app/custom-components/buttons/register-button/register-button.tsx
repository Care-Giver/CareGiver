import { View, Image, Platform, Pressable } from "react-native"
import React from "react"
import { WIDTH, HEIGHT, HEADER_HEIGHT } from "../../../theme"
import { PreMed20, PreBol32, PreBol16 } from "../../custom-texts/custom-texts"
import IMAGES from "../../../../assets/common-images"
import { styles } from "./styles"
import { DISABLED, GIVER_CASUAL_NAVY } from "../../../theme/palette"

export const RegisterButton = (props) => {
  const ableToRegister = props

  return (
    <Pressable
      onPress={() => {
        alert("등록 기능 미구현")
      }}
      style={{
        marginLeft: "auto",
        marginRight: WIDTH * 16,
      }}
    >
      <PreBol16 color={ableToRegister > 0 ? GIVER_CASUAL_NAVY : DISABLED} text={"등록"} />
    </Pressable>
  )
}
