import React, { FC, useState } from "react"
import {
  StyleSheet,
  View,
  Switch,
  Text,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  DivisionLine,
  PopSem24,
  PreBol14,
  PreBol16,
  PreBol18,
  PreBol20,
  PreMed14,
  PreMed16,
  PreMed18,
  PreReg14,
  PreReg16,
  Screen,
} from "#components"
import { BODY, GIVER_CASUAL_NAVY, LBG, LIGHT_LINE } from "#theme"
import { POPPINS_SEMIBOLD } from "#fonts"
import { images } from "#images"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const SetVisitingServiceDayScreen: FC<
  StackScreenProps<NavigatorParamList, "set-visiting-service-day-screen">
> = observer(function SetVisitingServiceDayScreen() {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev)
  }
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()
  return (
    <Screen testID="SetVisitingServiceDay" style={styles.root}>
      <ScrollView>
        <PreBol20 text="날짜 5개" mb={10} ml={16} />
        <DivisionLine height={8} />
        <View style={styles.servicePossible}>
          <PreMed18 text="서비스 가능" />
          <Switch
            trackColor={{ false: LIGHT_LINE, true: GIVER_CASUAL_NAVY }}
            thumbColor={isEnabled ? "white" : "white"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </View>
        <View style={styles.line} />
        <PreMed18 text="서비스 시간대" mt={16} ml={16} mb={12} />
        <View style={[styles.box, { marginBottom: 12 }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PreReg16 text="오전" mr={4} />
            <Text style={styles.text}>08:00</Text>
            <PreReg16 text="~" mr={10} />
            <PreReg16 text="오후" mr={4} />
            <Text style={styles.text}>03:00</Text>
          </View>
          <Image style={styles.image} source={images.x_grey} />
        </View>
        <View style={styles.box}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PreReg16 text="오후" mr={4} />
            <Text style={styles.text}>03:30</Text>
            <PreReg16 text="~" mr={10} />
            <PreReg16 text="오후" mr={4} />
            <Text style={styles.text}>05:00</Text>
          </View>
          <Image style={styles.image} source={images.x_grey} />
        </View>
        <Pressable style={styles.boxTwo}>
          <Image style={styles.image} source={images.plus_grey} />
          <PreReg16 text="가능한 시간 추가하기" ml={12} />
        </Pressable>
        <View style={styles.line} />
        <View style={[styles.rowText, { marginTop: 20 }]}>
          <PreMed18 text="서비스 요금 설정" />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PreMed14 text="평균 요금 알아보기" mr={4} />
            <Image style={styles.image} source={images.more_info_bigger} />
          </View>
        </View>
        <View style={[styles.rowText, { marginTop: 25 }]}>
          <PreReg16 text="시간 당" />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PreBol16 text="10,000 원" mr={4} />
            <Image style={styles.image} source={images.arrow_right} />
          </View>
        </View>
        <View style={[styles.rowText, { marginTop: 18, marginBottom: 10 }]}>
          <PreReg16 text="강아지 크기 별 추가 요금" />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PreMed16 text="설정하기" mr={4} />
            <Image style={styles.image} source={images.arrow_right} />
          </View>
        </View>
        <View style={styles.dogSizeBox}>
          <View>
            <PreReg14 text="소형견" mb={8} />
            <PreMed14 text="+0원" />
          </View>
          <View style={styles.verticalLine} />
          <View>
            <PreReg14 text="중형견" mb={8} />
            <PreMed14 text="+0원" />
          </View>
          <View style={styles.verticalLine} />
          <View>
            <PreReg14 text="대형견" mb={8} />
            <PreMed14 text="+0원" />
          </View>
        </View>
        <View style={styles.totalPriceBox}>
          <View>
            <PreBol16 text="내가 시간당 받는 총 금액" mb={4} />
            <PreReg16 text="(수수료 포함)" color={BODY} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Text style={styles.totalPrice}>9,400</Text> */}
            <PopSem24>9,400</PopSem24>
            <PreBol16 text="원" ml={2} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  servicePossible: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 21,
    marginBottom: 17,
  },
  switch: {
    width: 51,
    height: 31,
  },
  line: {
    height: 2,
    backgroundColor: LBG,
    marginHorizontal: 16,
  },
  box: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: LIGHT_LINE,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "white",
    //안드로이드 경우 box-shadow
    elevation: 2,
    alignItems: "center",
  },
  text: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: 16,
    textAlign: "center",
    marginRight: 10,
  },
  boxTwo: {
    paddingVertical: 14,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: LIGHT_LINE,
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 28,
    flexDirection: "row",
  },
  rowText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  dogSizeBox: {
    flexDirection: "row",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: LIGHT_LINE,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingVertical: 18,
    marginHorizontal: 16,
    paddingHorizontal: 42,
  },
  verticalLine: {
    width: 2,
    backgroundColor: LIGHT_LINE,
    height: "100%",
  },
  totalPriceBox: {
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: LBG,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalPrice: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: 24,
    color: GIVER_CASUAL_NAVY,
  },
  image: {
    width: 16,
    height: 16,
  },
})
