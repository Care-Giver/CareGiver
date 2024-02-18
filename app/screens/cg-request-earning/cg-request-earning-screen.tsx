import React, { FC, useEffect, useState } from "react"
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  BlueCheckbox,
  ConditionalButton,
  CustomModal,
  DivisionLine,
  PaymentList,
  PlaceHolderInputBox,
  PopSem24,
  PreBol14,
  PreBol16,
  PreBol20,
  PreMed12,
  PreMed14,
  PreMed16,
  PreReg14,
  PreReg16,
  RegistrationNoticeNote,
  Row,
  RowRoundedBox,
  Screen,
  UnderlineText,
} from "#components"
import {
  BODY,
  BOTTOM_HEIGHT,
  CARE_NATURAL_BLUE,
  DISABLED,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  LBG,
  LIGHT_LINE,
} from "#theme"
import { images } from "#images"
import { l } from "i18n-js"
import { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import { 외부링크 } from "../../services/external-web-link"
import { ScrollToBottomButton } from "stream-chat-react-native"
import { bookings } from "./dummy"
import { GetSettlementResponse, getSettlement, settlementDetail } from "../../services/api/payment"
import axios from "axios"
import { useStores } from "#models"
import { postNotionSettlement, getNotionSettlement } from "../../services/api/notion"
import { alertModal } from "../../utils/alert-modal"
import { getBanksHolder } from "../../services/api/port-one"
import { bankCodeList } from "./constant"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

export type SettlementType = {
  date: string
  settlementDetails: settlementDetail[]
}
// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const CgRequestEarningScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-request-earning-screen">
> = observer(function CgRequestEarningScreen({ navigation }) {
  // //* 금융 결제원 api TEST
  // useEffect(() => {
  //   axios
  //     .post("https://testapi.openbanking.or.kr/oauth/2.0/token", {
  //       client_id: "54b3f6c3-a25f-4fcd-aba6-8c0eb931f6fa",
  //       client_secret: "b4c379b8-eb28-4083-b0e4-a59961752480",
  //       scope: "oob",
  //       grant_type: "client_credentials",
  //     })
  //     .then((res) => console.log(res.data))
  // }, [])

  //* 정산 관련 정보
  const [bank, setBank] = useState<string>("")
  const [accountNum, setAccountNum] = useState<string>("")
  const [name, setName] = useState<string>("")

  //* 은행 선택 버튼
  const [isOpen, setIsOpen] = useState<boolean>(false)

  //* 약관 동의 버튼
  const [isCheck, setIsCheck] = useState<boolean>(false)
  const onCheckPress = () => setIsCheck(!isCheck)

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const [settlementInfo, setSettlementInfo] = useState<SettlementType[]>()
  const [totalFee, setTotalFee] = useState<number>(0)
  /**
   * 표출할 스크린 상태
   * false  = 정산정보 입력 스크린
   * true = 정산 요청  스크린
   */
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

  //* 노션 api: userInfoContent, settlementInfoContent
  const {
    userStore: { userDetail, userAuth },
  } = useStores()
  const userId = userDetail.id.toString()
  const userInfoContent = {
    userId: userId,
    bank,
    accountNum,
    name,
  }
  const settlementInfoContent = { ...settlementInfo }

  //* 노션 db를 조회하여 몇월까지 정산을 신청했는지 조사 후 그에 따른 정산 달 리턴
  const checkSettlementMonth = async () => {
    const response = await getNotionSettlement(userId)

    if (response.isSuccess) {
      const { maxMonth, currentMonth } = response
      return { maxMonth, currentMonth }
    } else {
      alertModal(
        "정산 완료 내역 조회 실패",
        "알 수 없는 이유로, 정산 완료 내역 조회에 실패하였습니다. 잠시 후, 다시 시도해주세요.",
      )
    }
  }

  const onPressBottomButton = async () => {
    const { maxMonth, currentMonth } = await checkSettlementMonth()
    console.log("result >>>", maxMonth, currentMonth)
    //* 정산 정보 입력 스크린
    if (isConfirmed === false) {
      const bankCode = Object.keys(bankCodeList).find((key) => bankCodeList[key] === bank)
      const verifyAccountResponse = await getBanksHolder({
        bank_code: bankCode,
        bank_num: accountNum,
      })

      // 계좌 정보 인증 절차
      if (!verifyAccountResponse.isSuccess) {
        return alertModal(
          "계좌 조회 실패",
          "알 수 없는 이유로, 계좌 조회에 실패하였습니다. 입력한 정보를 다시 확인해주세요.",
        )
      } else {
        if (name !== verifyAccountResponse.response.bank_holder)
          return alertModal(
            "계좌 조회 실패",
            "알 수 없는 이유로, 계좌 조회에 실패하였습니다. 입력한 정보를 다시 확인해주세요.",
          )
      }
      // 정산했던 최대 날짜와 현재 날짜 사이의 정산내역 조회
      const settlementResponse = await getSettlement({
        startDate: `2024-${maxMonth}-01`,
        endDate: `2024-${currentMonth}-01`,
      })

      //? 정산 내역 api 불러와 저장
      if (settlementResponse.isSuccess) {
        setTotalFee(settlementResponse.totalSettlementFee)
        setSettlementInfo(settlementResponse.settlementDetails)
        setIsConfirmed(true)
      } else {
        alertModal(
          "정산 내역 조회 실패",
          "알 수 없는 이유로, 정산 내역 조회에 실패하였습니다. 잠시 후, 다시 시도해주세요.",
        )
      }
    }

    //* 정산 내역 확인 및 요청 스크린
    if (isConfirmed === true) {
      // 정산 요청할 달의 범위
      const monthRange = []
      for (let i = Number(maxMonth); i < Number(currentMonth); i++) {
        monthRange.push(i.toString())
      }

      if (totalFee === 0) {
        alertModal("정산 요청 실패", "정산을 요청할 내역이 없습니다.")
        return
      }

      const response = await postNotionSettlement({
        userId,
        months: monthRange,
        userInfoContent,
        settlementInfoContent,
      })
      if (response.isSuccess) {
        setModalOpen(true)
      } else {
        alertModal(
          "정산 요청 실패",
          "알 수 없는 이유로, 정산 요청에 실패하였습니다. 잠시 후, 다시 시도해주세요.",
        )
      }
    }
  }
  const placeholderBoxStyle = isOpen ? styles.placeholderBoxOpen : styles.placeholderBoxClosed
  const openLink = (link: string) => {
    Linking.openURL(link)
  }
  const onSelect = (selected: string) => {
    setIsOpen(false)
    setBank(selected)
  }
  const banks = Object.keys(bankCodeList).map((key) => {
    return { id: key, name: bankCodeList[key] }
  })
  return (
    <Screen testID="CgRequestEarning">
      <ScrollView scrollEnabled={isConfirmed}>
        <PreBol20 mt={15} text={isConfirmed ? "다음 달 1일에" : "정산 받을"} />
        <Row mb={37}>
          <UnderlineText>
            <PreBol20 text="받을" />
          </UnderlineText>
          <PreBol20 text={isConfirmed ? " 금액을 확인해주세요." : "계좌를 알려주세요"} />
        </Row>

        {!isConfirmed ? (
          <View>
            <RegistrationNoticeNote
              title="정산 요청 전, 잠깐!"
              desc="펫시팅 요금의 경우 매달 1일에 정산하여 등록해주신 계좌로 입금해드립니다. 연휴나 공휴일에는 지급이 지연될 수 있는 점 양해 부탁드립니다."
              boldTexts={["매달", "1일", "연휴나", "공휴일에는", "지급이", "지연"]}
            />

            <View style={{ marginTop: 28 }}>
              <RowRoundedBox
                style={placeholderBoxStyle}
                preset="Pressable"
                onPress={() => setIsOpen(!isOpen)}
              >
                <PreReg16 text={bank || "은행 선택"} color={HEAD_LINE} />
                <Image
                  source={!isOpen ? images.arrow_down : images.arrow_up}
                  style={styles.image}
                />
              </RowRoundedBox>

              <PlaceHolderInputBox
                backgroundColor="white"
                borderColor={LIGHT_LINE}
                style={{ marginTop: 12 }}
                boxHeight={48}
                placeholderText="계좌번호를 입력해주세요."
                text={accountNum}
                setText={setAccountNum}
              />
              <PlaceHolderInputBox
                backgroundColor="white"
                borderColor={LIGHT_LINE}
                style={{ marginTop: 12 }}
                boxHeight={48}
                placeholderText="예금주명을 입력해주세요."
                text={name}
                setText={setName}
              />
              <DivisionLine mt={20} mb={20} />
              <Row mb={12}>
                <BlueCheckbox value={isCheck} onPress={onCheckPress}></BlueCheckbox>
                <PreMed16 text="개인정보 수집 이용 동의(필수)" ml={8} />
                <Pressable
                  style={{ marginLeft: "auto" }}
                  onPress={() => openLink(외부링크.개인정보_수집_이용_동의)}
                >
                  <Image source={images.arrow_right} style={{ width: 16, height: 16 }} />
                </Pressable>
              </Row>

              {isOpen && (
                <ScrollView style={styles.bankList}>
                  {banks.map(({ name, id }) => {
                    return (
                      <Pressable
                        style={[styles.bankItem, { borderBottomWidth: 2 }]}
                        onPress={() => onSelect(name)}
                        key={id}
                      >
                        <PreMed16>{name}</PreMed16>
                      </Pressable>
                    )
                  })}
                </ScrollView>
              )}
            </View>
          </View>
        ) : (
          <View
            style={{
              //* 바텀버튼으로 스크롤 뷰 가려지는 영역
              paddingBottom: 50,
            }}
          >
            <PreMed14 text={`계좌: ${bank} ${accountNum} ${name}`} color={BODY} mb={12} />
            <RowRoundedBox
              style={(styles.placeholderBoxClosed, { marginBottom: 28, paddingHorizontal: 15 })}
              preset="Pressable"
              onPress={() => setIsOpen(!isOpen)}
            >
              <PopSem24 text={totalFee.toString()} color={GIVER_CASUAL_NAVY} />
              <PreBol16 text="원" />
              <PreMed16 style={{ marginLeft: "auto" }} text="자세히" color={BODY} />
              <Image
                source={!isOpen ? images.arrow_down : images.arrow_up}
                style={[styles.image, { marginLeft: 3 }]}
              />
            </RowRoundedBox>
            {isOpen &&
              settlementInfo?.map(({ date, settlementDetails }) => {
                return <PaymentList key={date} date={date} settlementDetails={settlementDetails} />
              })}
          </View>
        )}
      </ScrollView>
      <ConditionalButton
        label={isConfirmed ? "정산 요청하기" : "다음"}
        isActivated={isConfirmed ? true : isCheck && !!bank && !!name && !!accountNum}
        style={{ position: "absolute", bottom: BOTTOM_HEIGHT, alignSelf: "center" }}
        onPress={onPressBottomButton}
      />
      <CustomModal
        visibleState={modalOpen}
        noBtnText="요청 목록 확인"
        yesBtnText="홈으로 가기"
        image={images.cat_with_heart}
        imageWidth={154}
        imageHeight={120}
        title={totalFee ? "입금은 다음 달 1일에 돼요!" : "정산 내역이 없어요!"}
        subtitle={totalFee ? "정산 요청이 정상적으로 완료되었어요." : "정산 요청에 실패했어요."}
        handleYesPress={() => {
          setModalOpen(false)
          navigation.goBack()
        }}
        handleNoPress={() => {
          setModalOpen(false)
          navigation.navigate("cg-earning-list-screen")
        }}
      />
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
  },
  bankItem: {
    padding: 15,
    borderBottomColor: LIGHT_LINE,
  },
  bankList: {
    height: "auto",
    borderColor: LIGHT_LINE,
    borderWidth: 2,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 212,
    position: "absolute",
    zIndex: 100,
    top: 48,
    width: "100%",
    backgroundColor: "white",
  },
})
