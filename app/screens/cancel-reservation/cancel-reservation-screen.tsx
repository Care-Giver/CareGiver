import React, { FC, useRef, useState, useMemo, useCallback } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { PreBol16, PreBol18, PreMed16, Screen } from "#components"
import { useShowBottomTab } from "app/utils/hooks"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { images } from "#images"
import { GIVER_CASUAL_NAVY, LIGHT_LINE } from "#theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const CancelReservationScreen: FC<
  StackScreenProps<NavigatorParamList, "cancel-reservation-screen">
> = observer(function CancelReservationScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()

  // reason 선택시 selected에 저장.
  const [selected, setSelected] = useState("")
  // reason에서 기타 선택시, inputText 입력값 저장
  const [input, setInput] = useState("")
  // 최종적으로 선택한 reason finalReason에 저장.
  const [finalReason, setFinalReason] = useState("")

  const onSubmit = () => {
    if (input === "") {
      setFinalReason(selected)
    } else {
      setFinalReason(input)
    }
  }
  console.log("selected", selected)
  console.log(input)
  console.log("finalReason", finalReason)

  // reason list
  const reason = [
    "예약이 필요없어졌어요.",
    "실수로 예약했어요.",
    "펫시터가 마음에 들지 않아요.",
    "기타(직접 입력 / 최대 30자)",
  ]
  // 이유 선택 시, 버튼의 색깔이 바뀜. 라디오버튼으로 구현.
  const SelectReason = () => {
    return (
      <View style={styles.selectReasonContainer}>
        {reason.map((item, index) => {
          return (
            <TouchableOpacity style={styles.reason} key={index} onPress={() => setSelected(item)}>
              <Image
                key={item}
                style={styles.radio}
                source={selected === item ? images.radio_active : images.radio_inactive}
              />
              <PreMed16 text={item} />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  // * BottomSheet Modal
  // ref
  const bottomSheetModalRef = useRef(null)
  // vaiables
  const snapPoints = useMemo(() => ["60%"], [])
  // callbacks
  const handleBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  return (
    <Screen testID="CancelReservation" style={styles.root}>
      <TouchableOpacity onPress={handleBottomSheet} style={styles.container}>
        <Text>Click</Text>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 20 }}
        style={{ flex: 1 }}
      >
        <View style={styles.bottomSheetContainer}>
          <PreBol18
            text="케어기버에게 전달할 거절 메시지를 선택해주세요."
            mt={20}
            ml={16}
            mb={32}
          />
          <SelectReason />

          {/* 기타 입력시 TextInput 표시 */}
          {selected === "기타(직접 입력 / 최대 30자)" ? (
            <TextInput
              style={styles.textInput}
              placeholder="예약 취소 사유를 직접 입력해주세요."
              value={input}
              onChangeText={(text) => setInput(text)}
              multiline
              maxLength={30}
            />
          ) : null}

          <TouchableOpacity style={styles.submit} onPress={onSubmit}>
            <PreBol16 text="확인" color="white" />
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
  container: {
    padding: 20,
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  selectReasonContainer: {
    paddingLeft: 16,
  },
  reason: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  radio: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  textInput: {
    marginLeft: 40,
    borderBottomColor: LIGHT_LINE,
    borderBottomWidth: 1,
    borderStyle: "solid",
    width: 310,
  },
  submit: {
    paddingHorizontal: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    backgroundColor: GIVER_CASUAL_NAVY,
    marginTop: 54,
    borderRadius: 10,
  },
})
