import React, { FC, useCallback, useMemo, useRef, useState } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Screen, TimePicker } from "#components"
import BottomSheet from "@gorhom/bottom-sheet"

export const TestBottomSheetScreen: FC<
  StackScreenProps<NavigatorParamList, "test-bottom-sheet">
> = observer(function TestBottomSheetScreen() {
  const [beginDate, setBeginDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  return (
    <Screen testID="TestBottomSheet" preset="fixed" style={{ backgroundColor: "lightgrey" }}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        // snapPoints={snapPoints}
        snapPoints={["60%"]}
        // onChange={handleSheetChanges}
      >
        <TimePicker
          beginDate={beginDate}
          setBeginDate={setBeginDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </BottomSheet>
    </Screen>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "tomato",
  },
})
