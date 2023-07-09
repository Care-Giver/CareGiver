import React, { FC, useRef, useState, useMemo, useCallback, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  bookingCancelReasons,
  PreBol16,
  PreBol18,
  ReasonType,
  ScreenRootView,
  SelectReason,
} from "#components"
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet"
import { GIVER_CASUAL_NAVY, LIGHT_LINE } from "#theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

export const CancelReservationScreen: FC<
  StackScreenProps<NavigatorParamList, "cancel-reservation-screen">
> = observer(function CancelReservationScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()

  // "기타" 사유를 제외한 객관식 사유 - reason 선택시 selected 에 저장.
  const [selected, setSelected] = useState<ReasonType>(null)
  // reason 에서 "기타" 선택시, inputText 입력값 저장
  const [input, setInput] = useState("")
  // 최종적으로 선택한 reason finalReason에 저장.
  const [finalReason, setFinalReason] = useState("")

  const [keyboardDidHide, setkeyboardDidHide] = useState(false)

  const onSubmit = () => {
    setFinalReason(input === "" ? selected : input)
  }

  console.log("selected", selected)
  console.log(input)
  console.log("finalReason", finalReason)

  // * BottomSheet Modal
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  // vaiables
  const snapPoints = useMemo(() => ["60%"], [])
  // callbacks
  const handleBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setkeyboardDidHide(false)
    })
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setkeyboardDidHide(true)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  useEffect(() => {
    if (keyboardDidHide) {
      bottomSheetModalRef.current?.collapse()
    }
  }, [keyboardDidHide])

  return (
    <ScreenRootView testID="CancelReservation" style={styles.root}>
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

          {/* 취소 사유들 표시 */}
          {bookingCancelReasons.map((item, index) => (
            <SelectReason key={index} reason={item} selected={selected} setSelected={setSelected} />
          ))}

          {/* "기타" 사유 선택시 TextInput 표시 */}
          {selected === "기타(직접 입력 / 최대 30자)" && (
            <BottomSheetTextInput
              style={styles.textInput}
              placeholder="예약 취소 사유를 직접 입력해주세요."
              value={input}
              onChangeText={(text) => setInput(text)}
              maxLength={30}
            />
          )}

          <TouchableOpacity style={styles.submit} onPress={onSubmit}>
            <PreBol16 text="확인" color="white" />
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </ScreenRootView>
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
  textInput: {
    alignSelf: "center",
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
