import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { PreBol18, PreMed14, ScreenRootView } from "#components"
import { BODY, HEAD_LINE } from "#theme"
import { View } from "react-native"
import { styles } from "./styles"

export const CaregiverSetPriceScreen: FC<
  StackScreenProps<NavigatorParamList, "caregiver-set-price-screen">
> = observer(() => {
  return (
    <ScreenRootView>
      {/* // ? title container */}
      <View style={styles.titleContainer}>
        {/* // ? first line */}
        <PreBol18 color={HEAD_LINE} text="위탁의 경우 기본 예약 요금을" />
        {/* // ? second line */}
        <View style={styles.secondTitleContainer}>
          <View style={styles.underline}>
            <PreBol18 color={HEAD_LINE} text="1박 기준" />
          </View>
          <PreBol18 color={HEAD_LINE} text="으로 설정해주세요!" />
        </View>
      </View>

      {/* // ? price input container */}
      <View style={styles.priceContainer}>
        <PreMed14 color={BODY} text="요금(원)" />
      </View>

      {/* //! underline test code */}
      <View style={styles.secondTitleContainer}>
        <View style={{ position: "relative" }}>
          <View style={styles.testUnderline}>
            <PreBol18 color="transparent" text="1박 기준" />
          </View>
          <PreBol18 style={{ position: "absolute" }} color={HEAD_LINE} text="1박 기준" />
        </View>
        <PreBol18 color={HEAD_LINE} text="으로 설정해주세요!" />
      </View>
      {/* //! ------------------ */}
    </ScreenRootView>
  )
})
