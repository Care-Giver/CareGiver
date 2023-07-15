import React, { FC, useState } from "react"
import { ScrollView, StyleSheet, View, Text, Switch, TextInput } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import { Button, Loading, PreReg18, Screen } from "#components"
import { Picker } from "@react-native-picker/picker"
import IMP, { IMPData, IMPConst } from "iamport-react-native"
import { getMethods, getQuotas } from "./utils"
import { PGS, TIER_CODES } from "./constants"

export interface PaymentParams {
  params: IMPData.PaymentData
  tierCode?: string
}

export const TestIamportScreen: FC<
  StackScreenProps<NavigatorParamList, "test-iamport-screen">
> = observer(function TestIamportScreen() {
  const [pg, setPg] = useState("html5_inicis")
  const [tierCode, setTierCode] = useState(undefined)
  const [method, setMethod] = useState("card")
  const [cardQuota, setCardQuota] = useState(0)
  const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`)
  const [name, setName] = useState("아임포트 결제데이터분석")
  const [amount, setAmount] = useState("39000")
  const [buyerName, setBuyerName] = useState("홍길동")
  const [buyerTel, setBuyerTel] = useState("01012341234")
  const [buyerEmail, setBuyerEmail] = useState("example@example.com")
  const [vbankDue, setVbankDue] = useState("")
  const [bizNum, setBizNum] = useState("")
  const [escrow, setEscrow] = useState(false)
  const [digital, setDigital] = useState(false)

  return (
    <Screen testID="TestIamport">
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formControl}>
            <Text style={styles.label}>PG사</Text>
            <Picker
              selectedValue={pg}
              onValueChange={(value) => {
                setPg(value)
                const methods = getMethods(value)
                setMethod(methods[0].value)
              }}
            >
              {PGS.map((item, index) => (
                <Picker.Item label={item.label} value={item.value} key={index} />
              ))}
            </Picker>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>티어 코드</Text>
            <Picker selectedValue={tierCode} onValueChange={(value) => setTierCode(value)}>
              {TIER_CODES.map((item, index) => (
                <Picker.Item label={item.label} value={item.value} key={index} />
              ))}
            </Picker>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>결제수단</Text>
            <Picker selectedValue={method} onValueChange={(value) => setMethod(value)}>
              {getMethods(pg).map((item, index) => (
                <Picker.Item label={item.label} value={item.value} key={index} />
              ))}
            </Picker>
          </View>
          {method === "card" && (
            <View style={styles.formControl}>
              <Text style={styles.label}>할부개월수</Text>
              <Picker
                selectedValue={cardQuota}
                onValueChange={(value) => setCardQuota(parseInt(value, 10))}
              >
                {getQuotas(pg).map((item, index) => (
                  <Picker.Item label={item.label} value={item.value} key={index} />
                ))}
              </Picker>
            </View>
          )}
          {method === "vbank" && (
            <View style={styles.formControl}>
              <Text style={styles.label}>입금기한</Text>
              <TextInput
                style={styles.input}
                value={vbankDue}
                onChangeText={(value) => setVbankDue(value)}
              />
            </View>
          )}
          <View style={styles.formControl}>
            <Text style={styles.label}>상품명</Text>
            <TextInput style={styles.input} value={name} onChangeText={(value) => setName(value)} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>결제금액</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={(value) => setAmount(value)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>구매자 이름</Text>
            <TextInput
              style={styles.input}
              value={buyerName}
              onChangeText={(value) => setBuyerName(value)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>구매자 전화번호</Text>
            <TextInput
              style={styles.input}
              value={buyerTel}
              onChangeText={(value) => setBuyerTel(value)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>구매자 이메일</Text>
            <TextInput
              style={styles.input}
              value={buyerEmail}
              onChangeText={(value) => setBuyerEmail(value)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>사업자 등록번호</Text>
            <TextInput
              style={styles.input}
              value={bizNum}
              onChangeText={(value) => setBizNum(value)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>에스크로 결제</Text>
            <Switch value={escrow} onValueChange={(value) => setEscrow(value)} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>디지털 상품</Text>
            <Switch value={digital} onValueChange={(value) => setDigital(value)} />
          </View>
        </View>
      </ScrollView>

      <Button
        style={{
          // back
          marginTop: "auto",
          marginBottom: 40,
        }}
        /* @ts-ignore */
        onPress={() => {
          const data: PaymentParams = {
            params: {
              pg,
              pay_method: method,
              currency: undefined,
              notice_url: undefined,
              display: undefined,
              merchant_uid: merchantUid,
              name,
              amount,
              app_scheme: "exampleforrn",
              tax_free: undefined,
              buyer_name: buyerName,
              buyer_tel: buyerTel,
              buyer_email: buyerEmail,
              buyer_addr: undefined,
              buyer_postcode: undefined,
              custom_data: undefined,
              vbank_due: undefined,
              digital: undefined,
              language: undefined,
              biz_num: undefined,
              customer_uid: undefined,
              naverPopupMode: undefined,
              naverUseCfm: undefined,
              naverProducts: undefined,
              m_redirect_url: IMPConst.M_REDIRECT_URL,
              niceMobileV2: true,
              escrow,
            },
            tierCode,
          }

          // 신용카드의 경우, 할부기한 추가
          if (method === "card" && cardQuota !== 0) {
            data.params.display = {
              card_quota: cardQuota === 1 ? [] : [cardQuota],
            }
          }

          /*     // 가상계좌의 경우, 입금기한 추가
          if (method === "vbank" && vbankDue) {
            data.params.vbank_due = vbankDue
          }

          // 다날 && 가상계좌의 경우, 사업자 등록번호 10자리 추가
          if (method === "vbank" && pg === "danal_tpay") {
            data.params.biz_num = bizNum
          }

          // 휴대폰 소액결제의 경우, 실물 컨텐츠 여부 추가
          if (method === "phone") {
            data.params.digital = digital
          }

          // 정기결제의 경우, customer_uid 추가
          if (pg === "kcp_billing") {
            data.params.customer_uid = `cuid_${new Date().getTime()}`
          } */

          if (pg === "naverpay") {
            const today = new Date()
            const oneMonthLater = new Date(today.setMonth(today.getMonth() + 1))
            const dd = String(oneMonthLater.getDate()).padStart(2, "0")
            const mm = String(oneMonthLater.getMonth() + 1).padStart(2, "0") // January is 0!
            const yyyy = oneMonthLater.getFullYear()

            data.params.naverPopupMode = false
            data.params.naverUseCfm = `${yyyy}${mm}${dd}`
            data.params.naverProducts = [
              {
                categoryType: "BOOK",
                categoryId: "GENERAL",
                uid: "107922211",
                name: "한국사",
                payReferrer: "NAVER_BOOK",
                count: 10,
              },
            ]
          }

          console.log("Payment data >>>", data)
          navigate("test-iamport-payment-screen", data)
        }}
      >
        <PreReg18 text="결제하기" />
      </Button>
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formControl: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
})
