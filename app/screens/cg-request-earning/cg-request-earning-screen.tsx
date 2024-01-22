import React, { FC, useState } from "react"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { PreBol14, PreBol20, PreMed12, PreReg16, RowRoundedBox, Screen } from "#components"
import { CARE_NATURAL_BLUE, GIVER_CASUAL_NAVY, HEAD_LINE, LBG } from "#theme"
import { images } from "#images"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const CgRequestEarningScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-request-earning-screen">
> = observer(function CgRequestEarningScreen() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const placeholderBoxStyle = isOpen ? styles.placeholderBoxOpen : styles.placeholderBoxClosed

  return (
    <Screen testID="CgRequestEarning">
      <ScrollView scrollEnabled={!!isOpen}>
        <PreBol20 mt={15} text="정산 받을" />
        <PreBol20 mt={6} text="계좌를 알려주세요" />
        <View style={styles.underBar} />

        <View style={styles.notificationBox}>
          <PreBol14 text="정산 요청 전, 잠깐!" color={GIVER_CASUAL_NAVY} mb={8} />
          <PreMed12 text="펫시팅 요금의 경우 매달 1일에 정산하여 등록해주신 계좌로 입금해드립니다. 연휴나 공휴일에는 지급이 지연될 수 있는 점 양해 부탁드립니다." />
        </View>

        <RowRoundedBox style={placeholderBoxStyle} onPress={() => setIsOpen(!isOpen)}>
          <PreReg16 text={"은행 선택"} color={HEAD_LINE} />
          <Image source={!isOpen ? images.arrow_down : images.arrow_up} style={styles.image} />
        </RowRoundedBox>
        {isOpen && <View></View>}
      </ScrollView>
    </Screen>
  )
})

const styles = StyleSheet.create({
  underBar: {
    width: 34,
    height: 6,
    backgroundColor: CARE_NATURAL_BLUE,
  },
  notificationBox: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 35,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: LBG,
  },
  image: {
    width: 16,
    height: 16,
    marginLeft: "auto",
  },
  placeholderBoxClosed: {
    paddingHorizontal: 16,
  },
  placeholderBoxOpen: {
    paddingHorizontal: 16,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 46, //? borderBottomWidth = 0 이 되므로 이것을 고려하여 높이도 조정
    borderColor: GIVER_CASUAL_NAVY,
  },
})
