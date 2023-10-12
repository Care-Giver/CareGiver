import React from "react"
import { View, Image } from "react-native"
import { PreMed14, PreReg16 } from "../../basics/custom-texts/custom-texts"
import { styles } from "./styles"
import { images } from "#images"
import { BODY, GIVER_CASUAL_NAVY, HEAD_LINE } from "#theme"
import { SelectPetItem } from "../../select-pet-item/select-pet-item"
import { RowRoundedBox } from "../../basics/row-rounded-box/row-rounded-box"
import { SelectPetDropdownBoxProps } from "./select-pet-dropdown-box.props"
import { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import { useStores } from "#models"
import { navigate } from "#navigators"
import { ConditionalButton } from "#components"

export const SelectPetDropdownBox = (props: SelectPetDropdownBoxProps) => {
  const style = props.style
  const isOpen = props.isOpen
  const onPress = props.onPress
  const placeholderBoxStyle = isOpen ? styles.placeholderBoxOpen : styles.placeholderBoxClosed
  const selectedPets = props.selectedPets
  const setSelectedPets = props.setSelectedPets
  const inBottomSheet = props.inBottomSheet ? props.inBottomSheet : false
  const placeholder = props.placeholder || "맡기실 반려동물을 선택해주세요"

  const {
    petStore: { pets, hasPets },
  } = useStores()

  return (
    <View style={style}>
      <RowRoundedBox preset="Pressable" onPress={onPress} style={placeholderBoxStyle}>
        <PreReg16 text={placeholder} color={HEAD_LINE} />
        <Image source={!isOpen ? images.arrow_down : images.arrow_up} style={styles.image} />
      </RowRoundedBox>

      {isOpen && (
        <View
          style={{
            height: "auto",
            borderColor: GIVER_CASUAL_NAVY,
            borderWidth: 2,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          {/* //? 반려동물 리스트 */}
          {inBottomSheet ? (
            <BottomSheetFlatList
              data={pets}
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
            pets.map((item, index) => (
              <SelectPetItem
                petData={item}
                selectedPets={selectedPets}
                setSelectedPets={setSelectedPets}
                key={index}
              />
            ))
          )}

          {/* 반려동물 추가 등록하기 버튼 - 등록한 반려동물이 존재하고, 5마리 이하일때만 표출 */}
          {hasPets && pets.length <= 5 && (
            <RowRoundedBox
              style={styles.addNewPetBox}
              preset="Pressable"
              onPress={() => {
                navigate("add-pet-screen")
              }}
            >
              <PreMed14 text={"+ 추가 등록하기"} color={BODY} />
            </RowRoundedBox>
          )}

          {/* 등록한 반려동물이 없다면, 등록하러 가기 버튼 표출 */}
          {!hasPets && (
            <ConditionalButton
              style={styles.addPet}
              label={"+ 반려동물 등록하기"}
              labelTextColor={GIVER_CASUAL_NAVY}
              isActivated={!hasPets}
              onPress={() => {
                navigate("Mypage", { screen: "add-pet-screen" })
              }}
            />
          )}
        </View>
      )}
    </View>
  )
}
