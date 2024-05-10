import React, { useState, useMemo, useCallback, forwardRef } from "react"
import { StyleSheet, View, TouchableOpacity, Image } from "react-native"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet"
import { BOTTOM_HEIGHT, HEIGHT, LIGHT_LINE } from "#theme"
import { PreBol18, PreMed16 } from "../../_BASIC/custom-texts/custom-texts"
import { images } from "#images"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "../../_BASIC/screen/screen"
import { ConditionalButton } from "../../_BUTTON/conditional-button/conditional-button"

interface CancelBookingBottomSheetModalProps {
  onSubmitted: (cancelReason: string) => void
  mode: "cancel" | "cg-cancel"
}
export const CancelBookingBottomSheetModal = forwardRef<
  BottomSheetModal,
  CancelBookingBottomSheetModalProps
>((props, ref) => {
  const { onSubmitted, mode } = props

  const [selected, setSelected] = useState("")
  const [input, setInput] = useState("")

  const isActivated = useMemo(() => {
    if (selected === "") return false
    if (selected === "기타(직접 입력 / 최대 30자)" && input.length === 0) return false

    return true
  }, [input.length, selected])

  const snapPoints = useMemo(() => ["46%"], [])

  const onSubmit = useCallback(() => {
    // FIXME: 🔻 타입스크립트 에러 어떻게 해결 함?
    ref?.current?.dismiss() // 바텀시트 숨김

    const cancelReason = input === "" ? selected : input
    onSubmitted(cancelReason) // 예약 취소 API 동작
  }, [input, onSubmitted, ref, selected])

  const reasons = useMemo(() => {
    switch (mode) {
      case "cancel":
        return [
          "예약이 필요없어졌어요.",
          "실수로 예약했어요.",
          "펫시터가 마음에 들지 않아요.",
          "기타(직접 입력 / 최대 30자)",
        ]
      case "cg-cancel":
        return [
          "예약을 잘못 수락했어요.",
          "건강에 문제가 생겨 돌봄을 진행할 수 없어요.",
          "기타(직접 입력 / 최대 30자)",
        ]
    }
  }, [mode])

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        bottomInset={BOTTOM_HEIGHT}
        appearsOnIndex={0} // backdrop이 등장할 때의 snap point -> snap point가 0이면 backdrop 나타남
        disappearsOnIndex={-1} // backdrop이 사라질 때의 snap point -> snap point가 -1이면 backdrop 사라짐
        pressBehavior={"close"}
      />
    ),
    [],
  )

  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={renderBackdrop}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 20 }}
      style={styles.bottomSheetContainer}
    >
      <PreBol18
        text={`${
          mode === "cancel" ? "펫시터" : "클라이언트"
        }에게 전달할 취소 메시지를 선택해주세요.`}
        mt={20}
        mb={32}
      />
      <View style={styles.selectReasonContainer}>
        {reasons.map((item, index) => (
          <TouchableOpacity style={styles.reason} key={index} onPress={() => setSelected(item)}>
            <Image
              key={item}
              style={styles.radio}
              source={selected === item ? images.radio_active : images.radio_inactive}
            />
            <PreMed16 text={item} />
          </TouchableOpacity>
        ))}
      </View>

      {selected === "기타(직접 입력 / 최대 30자)" && (
        <BottomSheetTextInput
          style={styles.textInput}
          placeholder="예약 취소 사유를 직접 입력해주세요."
          value={input}
          onChangeText={setInput}
          // multiline
          blurOnSubmit
          maxLength={30}
        />
      )}

      <ConditionalButton
        label={"확인"}
        isActivated={isActivated}
        onPress={onSubmit}
        style={styles.submit}
      />
    </BottomSheetModal>
  )
})

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
  },
  selectReasonContainer: {
    //
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
    marginLeft: 24,
    borderBottomColor: LIGHT_LINE,
    borderBottomWidth: 1,
    width: "80%",
  },
  submit: {
    marginTop: 54 * HEIGHT,
  },
})
