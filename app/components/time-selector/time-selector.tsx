import React, { FC, Ref, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"
import { StyleProp, View, ViewStyle, Text } from "react-native"
import { observer } from "mobx-react-lite"
// import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
// import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types"

export interface TimeSelectorProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  // bottomSheetRef: Ref<BottomSheetMethods>
}

export const TimeSelector = observer(function TimeSelector(props: TimeSelectorProps) {
  // const { style, bottomSheetRef } = props
  const { style } = props

  //* Codes about BottomSheet BEGIN--------------------------------
  // ref
  // const bottomSheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(() => ["25%", "60%"], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  // const handleClosePress = () => bottomSheetRef.current.close()

  const [backdropPressBehavior, setBackdropPressBehavior] = useState<"none" | "close" | "collapse">(
    "close",
  )

  //* Backdrop render
  // const renderBackdrop = useCallback(
  //   (props: BottomSheetBackdropProps) => (
  //     <BottomSheetBackdrop
  //       {...props}
  //       pressBehavior={backdropPressBehavior}
  //       onPress={() => {
  //         console.log("dd")
  //       }}
  //       opacity={0.7}
  //     />
  //   ),
  //   [backdropPressBehavior],
  // )

  //* Codes about BottomSheet END--------------------------------

  return (
    // <BottomSheet
    //   ref={bottomSheetRef}
    //   index={-1}
    //   snapPoints={snapPoints}
    //   onChange={handleSheetChanges}
    //   backdropComponent={renderBackdrop}
    //   backgroundStyle={$bottomSheetBackgroundStyle}
    // >
    //   <View style={$bottomSheetContentRoot}>
    //     <Text>바텀시트 렌더링 테스트</Text>
    //     <Text>바텀시트 렌더링 테스트</Text>
    //     <Text>바텀시트 렌더링 테스트</Text>
    //     <Text>바텀시트 렌더링 테스트</Text>
    //     <Text>바텀시트 렌더링 테스트</Text>
    //   </View>
    // </BottomSheet>
    <View>
      <Text>바텀시트는 Moti 로 Refactoring 해야 함</Text>
    </View>
  )
})

const $bottomSheetBackgroundStyle: ViewStyle = {
  backgroundColor: "white",
  borderRadius: 32,
  elevation: 8,
  shadowColor: "black",
  shadowOffset: {
    width: 10,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 12,
}

const $bottomSheetContentRoot: ViewStyle = {
  backgroundColor: "white",
  flex: 1,
  paddingHorizontal: 30,
  borderRadius: 32,
}
