import React, { useEffect } from "react"
import { StyleProp, ViewStyle, StyleSheet, Image, TouchableOpacity, View } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol16, PreMed16 } from "../../_BASIC/custom-texts/custom-texts"
import { CARE_NATURAL_BLUE, GIVER_CASUAL_NAVY, palette } from "#theme"
import { images } from "#images"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

export interface BookingCheckButtonProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 새로 들어온 예약의 개수입니다.
   */
  bookingCount?: number

  onPress: () => void
}

export const BookingCheckButton = observer(function BookingCheckButton(
  props: BookingCheckButtonProps,
) {
  const { style, bookingCount, onPress } = props

  const height = useSharedValue(0)
  const heightAnimation = useAnimatedStyle(() => {
    return { height: height.value }
  }, [])

  useEffect(() => {
    height.value = withSpring(48)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.View style={[styles.root, style, heightAnimation]}>
      <TouchableOpacity style={styles.inner} onPress={onPress}>
        <PreMed16
          style={{ letterSpacing: -0.5 }}
          text={`${bookingCount}개의 새로 들어온 신청이 있어요!`}
        />
        <View style={{ flexDirection: "row" }}>
          <PreBol16 color={GIVER_CASUAL_NAVY} text="확인하기" />
          <Image
            source={images.arrow_right_navy}
            style={{ width: 16, height: 16, alignSelf: "center", marginLeft: 4 }}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 0, // to be 48
    backgroundColor: palette.white,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: CARE_NATURAL_BLUE,
  },
  inner: {
    borderRadius: 8,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
})
