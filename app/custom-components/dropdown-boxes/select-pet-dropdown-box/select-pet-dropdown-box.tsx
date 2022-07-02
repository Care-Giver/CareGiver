import { View, Image, FlatList } from "react-native"
import React, { useState } from "react"
import { RowRoundedBox } from "../../boxes/basics/row-rounded-box"
import { PreMed14, PreReg16 } from "../../custom-texts/custom-texts"
import { styles } from "./styles"
import IMAGES from "../../../../assets/common-images"
import { BODY, HEAD_LINE, LBG } from "../../../theme/palette"
import { SelectPetItem } from "../../select-pet-item/select-pet-item"
import { petsDummy } from "../../../screens/home-stack/search/search-screen/dummy-data"
import { HEIGHT } from "../../../theme"
import { PET_ITEM_HEIGHT } from "../../select-pet-item/styles"

const INITIAL_NUMBER_OF_PET_ITEMS = 3

export const SelectPetDropdownBox = (props) => {
  const style = props.style
  const isOpen = props.isOpen
  const onPress = props.onPress
  const placeholderBoxStyle = isOpen ? styles.placeholderBoxOpen : styles.placeholderBoxClosed
  const selectedPets = props.selectedPets
  const setSelectedPets = props.setSelectedPets

  return (
    <View style={style}>
      <RowRoundedBox preset={"Pressable"} onPress={onPress} style={placeholderBoxStyle}>
        <PreReg16 text={"반려동물 선택"} color={HEAD_LINE} />
        <Image source={!isOpen ? IMAGES.arrow_down : IMAGES.arrow_up} style={styles.image} />
      </RowRoundedBox>

      {isOpen && (
        <View>
          {/* //? 반려동물 리스트 */}
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
            style={{
              borderColor: LBG,
              borderWidth: 2,
              borderBottomWidth: 0,
              //! Scroll 영역 자체의 height 를 제한할때는 style prop 에 다가 height 를 줘야 한다.
              height: PET_ITEM_HEIGHT * INITIAL_NUMBER_OF_PET_ITEMS,
            }}
            contentContainerStyle={
              {
                //! 이처럼, contentContainerStyle 에다가 height 를 주면 안 된다! (그럼 끝까지 스크롤이 안 된다)
                // height: PET_ITEM_HEIGHT * INITIAL_NUMBER_OF_PET_ITEMS,
              }
            }
            scrollsToTop={false}
          />

          {/* //? 추가 등록하기 버튼 */}
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
