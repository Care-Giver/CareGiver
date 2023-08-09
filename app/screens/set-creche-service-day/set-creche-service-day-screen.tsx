import React, { FC, useRef, useState } from "react"
import {
  ScrollView,
  StyleSheet,
  View,
  Switch,
  Text,
  Modal,
  Pressable,
  Image,
  FlatList,
} from "react-native"
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
  Screen,
  WeightModal,
} from "#components"
import {
  BODY,
  DEVICE_SCREEN_WIDTH,
  GIVER_CASUAL_NAVY,
  LBG,
  LIGHT_LINE,
  SUB_HEAD_LINE,
} from "#theme"
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
  const { date, crecheId } = route.params
  console.log(date, crecheId)

  // isEnabled가 true인 경우 서비스 가능 toggle on
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev)
  }

  // 시간당 가격 설정하는 modal 관련 state
  // 1박당 가격 설정하기 누르면 모달창 뜨게 관리
  const [priceModalOpen, setPricemodalOpen] = useState(false)
  // 모달창에서 price 입력 후 저장하기 버튼 클릭하면 price에 값 저장.
  const [price, setPrice] = useState(null)

  //*가격 모달창에서 모달 창 닫을때 넣어주는 함수
  const handlepriceModalHide = () => {
    setPricemodalOpen(false)
  }

  //*모달창에서 가격 변경시 사용 함수
  const handlePriceInput = (newPrice) => {
    setPrice(newPrice)
    // isChangeMade()
  }
  console.log(price)

  const onPress = () => {
    console.log(
      "저장하기 버튼이 눌리면, 서비스 수정에 관한 정보들이 POST 되어야 합니다",
      date,
      price,
      crecheId,
    )
    // fee는 WeightModal창에서 입력 받은 값이나 현재 4자리까지밖에 입력이 안됨...
    postCrecheDay({
      startDates: [date],
      endDates: [date],
      crecheId: crecheId,
      fee: price,
    })
  }

  return (
    <Screen testID="SetCrecheServiceDay" style={styles.root}>
      <ScrollView ref={scrollViewRef}>
        <PreBol20 text="9월 15일" mb={10} ml={16} />
        <DivisionLine height={8} />
        {/* 서비스 가능 여부 토글 버튼 */}
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

        {/* 서비스 요금 설정 , 평균 요금 알아보기 클릭시 bottom sheet 오픈*/}
        <View style={[styles.rowText, { marginTop: 20 }]}>
          <PreMed18 text="서비스 요금 설정" />
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              setPricemodalOpen(true)
            }}
          >
            <PreMed14 text="평균 요금 알아보기" />
            <Image style={styles.image} source={images.question_mark} />
          </Pressable>
        </View>

        {/* 1박당 가격 설정 */}
        <View style={[styles.rowText, { marginTop: 25 }]}>
          <PreReg16 text="1박 당" color={SUB_HEAD_LINE} />
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setPricemodalOpen(true)}
          >
            <PreBol16 text="90,000 원" mr={4} />
            <Image style={styles.image} source={images.arrow_right} />
          </Pressable>
        </View>

        {/* 강아지 크기별 추가요금 설정 */}
        <View style={[styles.rowText, { marginTop: 18, marginBottom: 10 }]}>
          <PreReg16 text="강아지 크기 별 추가 요금" color={SUB_HEAD_LINE} />
          <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
            <PreMed16 text="설정하기" mr={4} />
            <Image style={styles.image} source={images.arrow_right} />
          </Pressable>
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

        {/* 1박당 받는 총 금액 */}
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

      {/* 저장하기 버튼 클릭시 데이터 POST */}
      <View
        style={{
          paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
        }}
      >
        <ConditionalButton label="저장하기" isActivated onPress={onPress} />
      </View>

      {/* Modal */}
      {/* //*1박당 가격 설정  모달 창 */}
      <WeightModal
        visibleState={priceModalOpen}
        handleModalHide={handlepriceModalHide}
        title="1박당 받을 요금을 입력해주세요(원)"
        handleInput={handlePriceInput}
      />
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
  rowText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: 28,
    height: 28,
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
