import React, { FC, useCallback, useMemo, useRef } from "react"
import { View, Text, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { ScreenRootView } from "#components"
import BottomSheet from "@gorhom/bottom-sheet"

export const TestBottomSheetScreen: FC<
  StackScreenProps<NavigatorParamList, "test-bottom-sheet">
> = observer(function TestBottomSheetScreen() {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  return (
    <ScreenRootView testID="TestBottomSheet" preset="fixed">
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "tomato",
  },
})
