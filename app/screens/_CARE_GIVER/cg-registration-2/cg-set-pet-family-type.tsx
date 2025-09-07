import React, { Dispatch, SetStateAction, useCallback, useRef } from "react"
import {
  StyleProp,
  ViewStyle,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { commonStyles } from "./commonStyles"
import {
  PreBol16,
  PreBol18,
  PreMed16,
  PreReg16,
} from "../../../components/_BASIC/custom-texts/custom-texts"
import {
  BOTTOM_HEIGHT,
  DISABLED,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  LIGHT_LINE,
  MIDDLE_LINE,
  color,
} from "#theme"
import { UnderlineText } from "../../../components/underline-text/underline-text"
import { TextInput } from "react-native-gesture-handler"
import { ServiceType } from "#models"
import { images } from "#images"
import { BASIC_BACKGROUND_PADDING_WIDTH, ConditionalButton, Row } from "#components"
import { FamilyTypeNumber } from "./cg-registration-2-screen"
import { HandleType } from "../../../services/api"
import _ from "lodash"
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetModal } from "@gorhom/bottom-sheet"

const numberOnly = /[0-9]/g

// const familyTypeArray = Object.keys(FamilyType) // ["DOG", "CAT"] 하지만, type 지정이 안되고 string[] 임... 따라서 아래와 같이 선언
const familyTypeArray = ["DOG", "CAT"] as const

const 크기_한글 = ["소형", "중형", "대형"] as const

export interface CgSetFamilyTypeProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  serviceType: ServiceType

  familyTypeNumber: FamilyTypeNumber
  setFamilyTypeNumber: Dispatch<SetStateAction<FamilyTypeNumber>>

  handleType: HandleType[]
  setHandleType: Dispatch<SetStateAction<HandleType[]>>
}

export const CgSetFamilyType = observer(function CgSetFamilyType(props: CgSetFamilyTypeProps) {
  const { style, familyTypeNumber, setFamilyTypeNumber, handleType, setHandleType } = props
  const allStyles = Object.assign({}, styles.root, style)

  // 강아지 크기 구분 설명 바텀시트모달 - ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  /** 강아지 크기 구분 설명 바텀시트모달 backdrop */
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0} // backdrop이 등장할 때의 snap point -> snap point가 0이면 backdrop 나타남
        disappearsOnIndex={-1} // backdrop이 사라질 때의 snap point -> snap point가 -1이면 backdrop 사라짐
        pressBehavior={"close"}
      />
    ),
    [],
  )

  /** 강아지 크기 구분 설명 바텀시트모달 Footer - 확인 버튼 렌더링 */
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={BOTTOM_HEIGHT}>
        <ConditionalButton
          label={"확인"}
          isActivated
          onPress={() => {
            bottomSheetModalRef.current?.close()
          }}
        />
      </BottomSheetFooter>
    ),
    [bottomSheetModalRef],
  )

  const hasDogs = familyTypeNumber.DOG > 0

  console.log("familyTypeNumber", familyTypeNumber)
  return (
    <ScrollView
      style={allStyles}
      contentContainerStyle={{ paddingBottom: BOTTOM_HEIGHT }}
      showsVerticalScrollIndicator={false}
    >
      {/* // * title container */}
      <View style={commonStyles.titleContainer}>
        <Row>
          <UnderlineText>
            <PreBol18 text={"어떤 반려동물"} />
          </UnderlineText>
          <PreBol18 text="을" color={HEAD_LINE} />
        </Row>
        <View style={commonStyles.secondTitleContainer}></View>
        <PreBol18 text={"돌보실 수 있는지 알려주세요!"} color={HEAD_LINE} />

        <PreBol16 text="케어할 품종 선택" color={HEAD_LINE} mt={28} />
        {familyTypeArray.map((item, index) => (
          <View key={index}>
            {/* // 강아지 | 고양이 제목 */}
            <View
              style={[
                styles.familyTypeTitle,
                {
                  borderColor: familyTypeNumber[item] > 0 ? GIVER_CASUAL_NAVY : MIDDLE_LINE,
                },
              ]}
            >
              <Image
                source={familyTypeNumber[item] > 0 ? images.check_navy : images.check_grey}
                style={styles.image}
              />
              <PreMed16
                ml={4}
                text={item === "DOG" ? "강아지" : "고양이"}
                color={familyTypeNumber[item] > 0 ? GIVER_CASUAL_NAVY : DISABLED}
              />
            </View>
            {/* 마리 수 입력 창 */}
            <View
              style={[
                styles.numberInput,
                {
                  borderColor: familyTypeNumber[item] > 0 ? GIVER_CASUAL_NAVY : LIGHT_LINE,
                },
              ]}
            >
              <TextInput
                onChangeText={(text) => {
                  setFamilyTypeNumber((prev) => ({
                    ...prev,
                    [item]: Number(text?.replace(/[^0-9]/g, "")),
                  }))
                }}
                value={familyTypeNumber[item] === 0 ? null : familyTypeNumber[item]?.toString()}
                placeholder={"최대 케어가능한 마리 수 선택"}
                placeholderTextColor={DISABLED}
                underlineColorAndroid={color.transparent}
                keyboardType="number-pad"
                maxLength={1}
                returnKeyType="done"
                style={{ flex: 1 }}
              />
              <PreBol16
                text="마리"
                color={familyTypeNumber[item] > 0 ? GIVER_CASUAL_NAVY : DISABLED}
                style={{ position: "absolute", right: 16 }}
              />
            </View>
          </View>
        ))}

        {hasDogs && (
          <>
            <Row mt={60} mb={10}>
              <PreBol16 text="케어 가능한 강아지 크기" color={HEAD_LINE} />
              {/* <PreMed14 text="중복 선택 가능" color={DISABLED} ml={4} /> */}
              <TouchableOpacity
                onPress={() => {
                  bottomSheetModalRef.current?.present()
                }}
              >
                <Image source={images.question_mark} style={styles.question} />
              </TouchableOpacity>
            </Row>

            <Row style={{ justifyContent: "space-between" }}>
              {크기_한글.map((item, index) => {
                let selectedPetType = null as HandleType
                switch (item) {
                  case "소형":
                    selectedPetType = HandleType.SMALL
                    break
                  case "중형":
                    selectedPetType = HandleType.MEDIUM
                    break
                  case "대형":
                    selectedPetType = HandleType.LARGE
                    break
                }

                const isSelected = _.includes(handleType, selectedPetType)
                return (
                  <Pressable
                    key={index}
                    style={[
                      styles.handleType,
                      {
                        borderColor: isSelected ? GIVER_CASUAL_NAVY : LIGHT_LINE,
                      },
                    ]}
                    onPress={() => {
                      // 포함되어 있으면 제거,
                      if (_.includes(handleType, selectedPetType)) {
                        setHandleType((prev) => _.without(prev, selectedPetType))
                      }
                      // 포함되어 있지 않다면 추가.
                      else {
                        setHandleType((prev) => [...prev, selectedPetType])
                      }
                    }}
                  >
                    <Image
                      source={isSelected ? images.check_navy : images.check_grey}
                      style={styles.image}
                    />
                    <PreMed16
                      style={{ marginLeft: 6 }}
                      text={item}
                      color={isSelected ? GIVER_CASUAL_NAVY : DISABLED}
                    />
                  </Pressable>
                )
              })}
            </Row>
          </>
        )}
      </View>

      {/* 강아지 크기 구분 설명 바텀시트모달 */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={["40%"]}
        enablePanDownToClose
        footerComponent={renderFooter}
        style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
      >
        <PreBol18 text="반려동물 몸무게에 따라 크기가 결정됩니다." color={HEAD_LINE} mt={28} />
        <Row mt={32}>
          <PreReg16 text="- 소형견: " color={HEAD_LINE} />
          <PreBol16 text="10kg 이하" color={HEAD_LINE} />
        </Row>
        <Row mt={12}>
          <PreReg16 text="- 중형견: " color={HEAD_LINE} />
          <PreBol16 text="10kg 초과 ~ 25kg 이하" color={HEAD_LINE} />
        </Row>
        <Row mt={12}>
          <PreReg16 text="- 대형견: " color={HEAD_LINE} />
          <PreBol16 text="25kg 초과" color={HEAD_LINE} />
        </Row>
      </BottomSheetModal>
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  root: {},

  image: { width: 16, height: 16 },

  familyTypeTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    // backgroundColor: "red",
  },

  numberInput: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    borderWidth: 2,
    borderColor: LIGHT_LINE,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },

  handleType: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "31%",
    height: 44,
    borderWidth: 2,
    borderRadius: 10,
  },

  question: {
    width: 28,
    height: 28,
  },
})
