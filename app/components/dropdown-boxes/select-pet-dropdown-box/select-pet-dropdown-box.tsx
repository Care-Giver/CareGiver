import { View, Image, FlatList } from "react-native"
import React from "react"
import { PreMed14, PreReg16 } from "../../basics/custom-texts/custom-texts"
import { styles } from "./styles"
import { images } from "#images"
import { BODY, HEAD_LINE, LBG } from "#theme"
import { SelectPetItem } from "../../select-pet-item/select-pet-item"
import { PET_ITEM_HEIGHT } from "../../select-pet-item/styles"
import { RowRoundedBox } from "../../basics/row-rounded-box/row-rounded-box"
import { petsDummy } from "../../../../assets/dummyData/pets-dummy"
import { SelectPetDropdownBoxProps } from "./select-pet-dropdown-box.props"
import { BottomSheetFlatList } from "@gorhom/bottom-sheet"

const INITIAL_NUMBER_OF_PET_ITEMS = 3

export const SelectPetDropdownBox = (props: SelectPetDropdownBoxProps) => {
  const style = props.style
  const isOpen = props.isOpen
  const onPress = props.onPress
  const placeholderBoxStyle = isOpen ? styles.placeholderBoxOpen : styles.placeholderBoxClosed
  const selectedPets = props.selectedPets
  const setSelectedPets = props.setSelectedPets
  const inBottomSheet = props.inBottomSheet ? props.inBottomSheet : false
  const placeholder = props.placeholder || "맡기실 반려동물을 선택해주세요"

  return (
    <View style={style}>
      <RowRoundedBox preset="Pressable" onPress={onPress} style={placeholderBoxStyle}>
        <PreReg16 text={placeholder} color={HEAD_LINE} />
        <Image source={!isOpen ? images.arrow_down : images.arrow_up} style={styles.image} />
      </RowRoundedBox>

      {isOpen && (
        <View
          style={{
            borderColor: LBG,
            borderWidth: 2,
            borderBottomWidth: 0,
            height: "auto",
          }}
        >
          {/* //? 반려동물 리스트 */}
          {inBottomSheet ? (
            <BottomSheetFlatList
              data={petsDummy}
              renderItem={({ item, index }) => (
                <SelectPetItem
                  petData={item}
                  selectedPets={selectedPets}
                  setSelectedPets={setSelectedPets}
                  key={index}
                />
              )}
              style={{ height: 156 }}
            />
          ) : (
            petsDummy.map((item, index) => (
              <SelectPetItem
                petData={item}
                selectedPets={selectedPets}
                setSelectedPets={setSelectedPets}
                key={index}
              />
            ))
          )}

          {/* //? 추가 등록하기 버튼 */}
          <RowRoundedBox
            style={styles.addNewPetBox}
            preset="Pressable"
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
