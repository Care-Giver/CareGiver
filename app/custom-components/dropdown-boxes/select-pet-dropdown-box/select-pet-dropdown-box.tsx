import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { RowRoundedBox } from "../../boxes/basics/row-rounded-box"
import { PreMed14, PreReg16 } from "../../custom-texts/custom-texts"
import { styles } from "./styles"
import IMAGES from "../../../../assets/common-images"
import { BODY, HEAD_LINE } from "../../../theme/palette"
import { SelectPetItem } from "../../select-pet-item/select-pet-item"
import { petsDummy } from "../../../screens/home-stack/search/search-screen/dummy-data"

export const SelectPetDropdownBox = (props) => {
  const style = props.style ? [styles.test, props.style] : [styles.root]

  const state = props.state
  const setState = props.setState

  const isOpen = props.isOpen
  const onPress = props.onPress
  const placeholderBoxStyle = isOpen ? styles.placeholderBoxOpen : styles.placeholderBoxClosed

  return (
    <View style={style}>
      <RowRoundedBox preset={"Pressable"} onPress={onPress} style={placeholderBoxStyle}>
        <PreReg16 text={"반려동물 선택"} color={HEAD_LINE} />
        <Image source={!isOpen ? IMAGES.arrow_down : IMAGES.arrow_up} style={styles.image} />
      </RowRoundedBox>

      {isOpen && (
        <View>
          <SelectPetItem petData={petsDummy[0]} />
          <SelectPetItem petData={petsDummy[1]} />
          <SelectPetItem petData={petsDummy[4]} />
          <RowRoundedBox
            style={styles.addNewPetBox}
            preset="pressable"
            onPress={() => {
              alert("gg")
            }}
          >
            <PreMed14 text="+ 추가 등록하기" color={BODY} />
          </RowRoundedBox>
        </View>
      )}
    </View>
  )
}
