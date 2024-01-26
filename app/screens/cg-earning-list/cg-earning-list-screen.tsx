import React, { FC } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  PaymentList,
  PopSem24,
  PreBol16,
  PreMed12,
  PreMed14,
  PreMed16,
  PreReg14,
  Row,
  RowRoundedBox,
  Screen,
} from "#components"
import { bookings } from "../cg-request-earning/dummy"
import { BODY, DBG, GIVER_CASUAL_NAVY, LBG } from "#theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const CgEarningListScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-earning-list-screen">
> = observer(function CgEarningListScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()
  const date = "9"

  //* 각 월마다 정산 여부 판단하는 변수 필요
  const isCompleted = true

  const requestTime = " 23.09.29(금)10시 24분 02초"
  const accoutInfo = "국민은행 53710204111019 유혜린"
  return (
    <Screen testID="CgEarningList">
      <ScrollView>
        <PreMed16 text={date + "월 요청 내역"} mb={22} />
        <Row>
          <PopSem24 text="25000" color={GIVER_CASUAL_NAVY} />
          <PreBol16 text="원" />
          <View
            style={[styles.statusBox, { backgroundColor: isCompleted ? GIVER_CASUAL_NAVY : LBG }]}
          >
            <PreMed12
              color={isCompleted ? "white" : "black"}
              text={isCompleted ? "정산 완료" : "정산 예정"}
            />
          </View>
        </Row>

        <RowRoundedBox preset="View" style={styles.rowRoundedBox}>
          <View>
            <Row mb={16}>
              <PreReg14 text="요청일시" />
              <View style={styles.divider} />
              <PreReg14 text={requestTime} />
            </Row>
            <Row>
              <PreReg14 text="요청일시" />
              <View style={styles.divider} />

              <PreReg14 text={accoutInfo} />
            </Row>
          </View>
        </RowRoundedBox>
        {bookings.map((item, idx) => (
          <PaymentList key={idx} date={item.date} payments={item.bookings} />
        ))}
      </ScrollView>
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
  rowRoundedBox: {
    height: "auto",
    padding: 16,
    marginTop: 12,
    marginBottom: 36,
  },
  statusBox: {
    marginLeft: "auto",
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 3,
  },
  divider: {
    height: 17,
    width: 1,
    backgroundColor: DBG,
    marginLeft: 3,
    marginRight: 7,
  },
})
