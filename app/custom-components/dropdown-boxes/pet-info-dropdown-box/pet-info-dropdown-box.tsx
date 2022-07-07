import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { FlatList } from "react-native-gesture-handler"
import { PetProfileCard } from "../../pet-profile-card/pet-profile-card"
import { styles } from "./styles"
import { Row } from "../../boxes/basics/row"
import { PopSem14 } from "../../custom-texts/custom-texts"
import IMAGES from "../../../../assets/common-images"
import { PetInfoDropdownBoxProps } from "./pet-info-dropdown-box.props"

export const PetInfoDropdownBox = (props: PetInfoDropdownBoxProps) => {
  const { isOpen, handlePress, pets, style } = props

  return (
    <View style={style}>
      {/* //? 드롭다운 제목 + 버튼 */}
      <Pressable style={styles.dropdownTitle} onPress={handlePress}>
        <PopSem14 text="펫 정보" />
        <Image style={styles.dropdownLogo} source={isOpen ? IMAGES.arrow_up : IMAGES.arrow_down} />
      </Pressable>
      {isOpen && (
        <FlatList
          data={pets}
          renderItem={({ item, index }) => <PetProfileCard petData={item} />}
          style={styles.cardContainer}
        />
      )}
    </View>
  )
}
