import React, { FC, useState } from "react"
import { ScrollView, StyleSheet, View, Switch, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
  DivisionLine,
  PreBol16,
  PreBol20,
  PreMed14,
  PreMed16,
  PreMed18,
  PreReg14,
  PreReg16,
  ScreenRootView,
} from "#components"
import { BODY, GIVER_CASUAL_NAVY, LBG, LIGHT_LINE, SUB_HEAD_LINE } from "#theme"
import { Image } from "react-native"
import { images } from "#images"
import { POPPINS_SEMIBOLD } from "#fonts"
import { postCrecheDay } from "#axios"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const SetCrecheServiceDayScreen: FC<
  StackScreenProps<NavigatorParamList, "set-creche-service-day-screen">
> = observer(function SetCrecheServiceDayScreen({ route, navigation }) {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev)
  }
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()

  const onPress = () => {
    console.log("저장하기 버튼이 눌리면, 서비스 수정에 관한 정보들이 POST 되어야 합니다")

    // TOOD: crechId 를 가져와서 ()
    // 그 crechId 를 data 에 넣고
    // postCrecheDay 에 담을 것

    // TODO: 제대로된 데이터 넣을 것
    // postCrecheDay({})
  }

  return (
    <ScreenRootView testID="SetCrecheServiceDay" style={styles.root}>
      <ScrollView>
        <PreBol20 text="9월 15일" mb={10} ml={16} />
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
        <View style={[styles.rowText, { marginTop: 20 }]}>
          <PreMed18 text="서비스 요금 설정" />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PreMed14 text="평균 요금 알아보기" mr={5} />
            <Image style={styles.image} source={images.more_info_bigger} />
          </View>
        </View>
        <View style={[styles.rowText, { marginTop: 25 }]}>
          <PreReg16 text="1박 당" color={SUB_HEAD_LINE} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PreBol16 text="90,000 원" mr={4} />
            <Image style={styles.image} source={images.arrow_right} />
          </View>
        </View>
        <View style={[styles.rowText, { marginTop: 18, marginBottom: 10 }]}>
          <PreReg16 text="강아지 크기 별 추가 요금" color={SUB_HEAD_LINE} />
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
            <PreBol16 text="내가 1박 당 받는 총 금액" mb={4} />
            <PreReg16 text="(수수료 포함)" color={BODY} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.totalPrice}>84,600</Text>
            <PreBol16 text="원" ml={2} />
          </View>
        </View>
      </ScrollView>

      {/* <TouchableOpacity style={styles.submit} onPress={onSubmit}>
            <PreBol16 text="저장하기" color="white" />
          </TouchableOpacity> */}

      <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
        <ConditionalButton label="저장하기" isActivated onPress={onPress} />
      </View>
    </ScreenRootView>
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
  rowText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: 16,
    height: 16,
  },
  line: {
    height: 2,
    backgroundColor: LBG,
    marginHorizontal: 16,
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
})
