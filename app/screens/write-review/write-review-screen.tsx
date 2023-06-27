import React, { FC, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { HEAD_LINE } from "#theme"
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native"
import { observer } from "mobx-react-lite"
import {
  CustomImagePicker,
  PreBol20,
  CaregiverTypeButton,
  PreBol12,
  PreMed14,
  PreMed18,
  PreReg14,
  ScreenRootView,
  Row,
  UnderlineText,
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
  const [selectedImages, setSelectedImages] = useState<string[]>([])

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
      {/* // * profile card */}
      {/* ...혜리님 작업... */}
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

      {/* // * title text */}
      <PreBol20 text="이용은 어떠셨나요?" color={HEAD_LINE} style={{ marginTop: 16 }} />
      <Row style={{ marginTop: 6 }}>
        <PreBol20 text="해당 케어기버에 대한 " color={HEAD_LINE} />
        <UnderlineText>
          <PreBol20 text="후기를 남겨주세요!" color={HEAD_LINE} />
        </UnderlineText>
      </Row>

      {/* //* 별점 선택 */}
      {/* ...혜리님 작업... */}
      <CustomRaitingBar />

      {/* //* 사진 선택 */}
      <CustomImagePicker
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        submitButtonText="사진 추가하기"
        style={{ marginTop: 20 }}
      />

      {/* //* 리뷰 텍스트 input */}

      {/* //* 확인 버튼 */}
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
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 16,
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
    marginTop: 36,
    // paddingHorizontal: 16,
  },

  starImg: {
    width: 28,
    height: 28,
    resizeMode: "cover",
    marginRight: 10,
  },
})
