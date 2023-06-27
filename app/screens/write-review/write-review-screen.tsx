import React, { FC, useState } from "react"
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  CaregiverTypeButton,
  PreBol12,
  PreMed14,
  PreMed18,
  PreReg14,
  ScreenRootView,
} from "#components"
import { GIVER_CASUAL_NAVY, LIGHT_LINE, palette } from "#theme"
import { MapCallout } from "react-native-maps"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const WriteReviewScreen: FC<
  StackScreenProps<NavigatorParamList, "write-review-screen">
> = observer(function WriteReviewScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()
  const [rating, setRating] = useState(0)
  // const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])
  const maxRating = [1, 2, 3, 4, 5]

  const starImgFilled = "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png"
  const starImgCorner = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png"

  const CustomRaitingBar = () => {
    return (
      <View style={styles.customRaitingBar}>
        {maxRating.map((item, index) => {
          return (
            <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => setRating(item)}>
              <Image
                style={styles.starImg}
                source={item <= rating ? { uri: starImgFilled } : { uri: starImgCorner }}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
  return (
    <ScreenRootView testID="WriteReview">
      {/* 프로필카드 */}
      <View style={styles.profileCard}>
        <Image style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <View style={styles.name}>
            <PreMed18 text="유혜린" mr={8} />
            {/* CaregiverTypeButton import시 text가 가운데정렬하지 않음. 따라서 새로 스타일 부여함 */}
            {/* <CaregiverTypeButton text="방문" style={{ marginRight: 4 }} /> */}
            <View style={styles.typeBtnNavy}>
              <PreBol12 text="방문" color={palette.white} />
            </View>
            <View style={styles.typeBtnWhite}>
              <PreBol12 text="펫시터" color={GIVER_CASUAL_NAVY} />
            </View>
          </View>

          <PreReg14 text="어느덧 펫시터 3년차 입니다!" />
        </View>
      </View>
      <CustomRaitingBar />
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  root: {},
  profileCard: {
    width: 358,
    borderRadius: 8,
    borderColor: LIGHT_LINE,
    borderStyle: "solid",
    borderWidth: 2,
    top: 16,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: LIGHT_LINE,
    marginRight: 10,
  },
  profileInfo: {
    flexDirection: "column",
  },
  name: {
    flexDirection: "row",
    marginBottom: 8,
  },
  typeBtnNavy: {
    borderRadius: 4,
    backgroundColor: GIVER_CASUAL_NAVY,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
    marginRight: 4,
  },
  typeBtnWhite: {
    borderRadius: 4,
    backgroundColor: "white",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
  },
  customRaitingBar: {
    flexDirection: "row",
    marginTop: 100,
    // paddingHorizontal: 16,
  },
  starImg: {
    width: 28,
    height: 28,
    resizeMode: "cover",
    marginRight: 10,
  },
})
