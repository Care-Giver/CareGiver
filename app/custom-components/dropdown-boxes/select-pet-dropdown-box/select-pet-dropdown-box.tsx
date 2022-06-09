import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native"
import React, { useState } from "react"
import { RowRoundedBox } from "../../boxes/basics/row-rounded-box"
import { PreMed14, PreReg16 } from "../../custom-texts/custom-texts"
import { styles } from "./styles"
import IMAGES from "../../../../assets/common-images"
import { BODY, HEAD_LINE } from "../../../theme/palette"
import { SelectPetItem } from "../../select-pet-item/select-pet-item"
import { petsDummy } from "../../../screens/home-stack/search/search-screen/dummy-data"

export const SelectPetDropdownBox = (props) => {
  const style = props.style

  const isOpen = props.isOpen
  const onPress = props.onPress
  const placeholderBoxStyle = isOpen ? styles.placeholderBoxOpen : styles.placeholderBoxClosed
  const selectedPets = props.selectedPets
  const setSelectedPets = props.setSelectedPets

  //TODO: 드롭박스 열고 닫을 때 애니메이션 효과 넣기: https://reactnative.dev/docs/layoutanimation  https://qcoding.tistory.com/17
  // if (Platform.OS === "android") {
  //   if (UIManager.setLayoutAnimationEnabledExperimental) {
  //     UIManager.setLayoutAnimationEnabledExperimental(true)
  //   }
  // }

  // const [firstBoxPosition, setFirstBoxPosition] = useState("left")

  // const toggleFirstBox = () => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  //   setFirstBoxPosition(firstBoxPosition === "left" ? "right" : "left")
  // }

  return (
    <View style={style}>
      <RowRoundedBox preset={"Pressable"} onPress={onPress} style={placeholderBoxStyle}>
        <PreReg16 text={"반려동물 선택"} color={HEAD_LINE} />
        <Image source={!isOpen ? IMAGES.arrow_down : IMAGES.arrow_up} style={styles.image} />
      </RowRoundedBox>

      {isOpen && (
        <View>
          {/* <SelectPetItem petData={petsDummy[0]} />
          <SelectPetItem petData={petsDummy[1]} />
          <SelectPetItem petData={petsDummy[4]} /> */}
          <FlatList
            data={petsDummy}
            renderItem={(
              { item, index }, //! renderItem 에다가 사용하는 params 는 item 이다. 딴걸로 바꿔 쓰지 말 것!!!
            ) => (
              <SelectPetItem
                petData={item}
                selectedPets={selectedPets}
                setSelectedPets={setSelectedPets}
              />
            )}
            ListFooterComponent={() => (
              <RowRoundedBox
                style={styles.addNewPetBox}
                preset="pressable"
                onPress={() => {
                  alert("gg")
                }}
              >
                <PreMed14 text="+ 추가 등록하기" color={BODY} />
              </RowRoundedBox>
            )}
          />
        </View>
      )}
    </View>
  )
}
