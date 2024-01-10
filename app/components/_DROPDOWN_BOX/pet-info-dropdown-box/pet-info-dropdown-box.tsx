import React from "react"
import { View, Pressable, Image, StyleProp, ViewStyle } from "react-native"
import { styles } from "./styles"
import { PopSem14 } from "../../_BASIC/custom-texts/custom-texts"
import { images } from "#images"
import { DivisionLine } from "../../_BASIC/division-line/division-line"
import { LBG } from "#theme"
import { SelectedPetCard } from "#components"
import { Pet } from "#axios"

interface PetInfoDropdownBoxProps {
  isOpen: boolean
  onPress: () => void
  pets: Array<Pet>
  style?: StyleProp<ViewStyle>
}

export const PetInfoDropdownBox = (props: PetInfoDropdownBoxProps) => {
  const { isOpen, onPress, pets, style } = props

  return (
    <View style={style}>
      {/* //* 드롭다운 제목 + 버튼 */}
      <Pressable style={styles.dropdownTitle} onPress={onPress}>
        <PopSem14 text="펫 정보" />
        <Image style={styles.dropdownLogo} source={isOpen ? images.arrow_up : images.arrow_down} />
      </Pressable>
      {/* //* 펫 프로필 카드 리스트 */}
      {isOpen && (
        <View style={styles.cardContainer}>
          {pets.map((item, index) => (
            //! RN에서도 Fragment 를 써도 된다. https://blog.naver.com/mym0404/221806696015
            <View key={Math.random()}>
              <SelectedPetCard petData={item} deletable={false} hasDivision={false} />
              {/* //? 마지막 요소 아닐 때, 뒤에 구분선 배치 */}
              {index < pets.length - 1 && <DivisionLine color={LBG} />}
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
