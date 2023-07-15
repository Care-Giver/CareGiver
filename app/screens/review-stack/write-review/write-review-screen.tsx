import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import {
  BODY,
  DISABLED,
  HEAD_LINE,
  LBG,
  GIVER_CASUAL_NAVY,
  LIGHT_LINE,
  palette,
} from "../../../theme"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native"
import { observer } from "mobx-react-lite"
import {
  CustomImagePicker,
  PreBol20,
  CaregiverTypeButton,
  PreMed18,
  PreReg14,
  Screen,
  Row,
  UnderlineText,
  RegisterSubmitButton,
  PreBol14,
  PickerImage,
} from "../../../components"
import { images } from "../../../../assets/images"
import { Rating, ReviewContent, useStores } from "../../../models"
import { postCrecheReview, postVisitingReview } from "../../../services/axios/review"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
const maxRating: Rating[] = [1, 2, 3, 4, 5]

export const WriteReviewScreen: FC<
  StackScreenProps<NavigatorParamList, "write-review-screen">
> = observer(function WriteReviewScreen({ route, navigation }) {
  // * all bookings screen에서 전달받은 params(후기 작성 스크린에 필요한 값들)을 불러온다.
  const {
    profileImage,
    petsitterName,
    petsitterType,
    petsitterId,
    bookingId,
    serviceType,
    desc,
  } = route.params

  // * review store model
  const {
    reviewStoreModel: { reviews, getReviewId, removeReview, setReview },
  } = useStores()

  // * 현재의 review model 객체의 id값
  const [reviewId, setReviewId] = useState<number>(0)

  // ? 첫 렌더링시 - 현재 작성중인 리뷰 객체의 id를 가져오고, 만약 유저가 해당 펫시터 리뷰를 작성한 내역이 있으면 가져온다.
  useLayoutEffect(() => {
    // console.info("[write review screen] petsitterId >>>", petsitterId)
    // ? 현재 리뷰 객체의 모델 id값 설정
    const currentReviewId = getReviewId(petsitterType, serviceType, petsitterId)
    setReviewId(currentReviewId)

    // ? 이전에 작성된 기록을 가져온다.
    const currentReview = reviews.find((review) => review.id === currentReviewId)
    // console.info("[write review screen] current review >>>", currentReview)
    if (currentReview) {
      setSelectedImages(currentReview.images)
      setReviewText(currentReview.description)
      setRating(currentReview.rating)
    }
  }, [])

  // * 업로드 이미지 리스트
  const [selectedImages, setSelectedImages] = useState<PickerImage[]>([])
  // * 리뷰 텍스트
  const [reviewText, setReviewText] = useState<string>("")
  // * 별점
  const [rating, setRating] = useState<Rating>(0)

  // ? 유저가 리뷰 내용을 수정할 때마다, 리뷰 model 객체 내용도 수정한다.
  useEffect(() => {
    // ? 첫 렌더링 무시 조건
    if (reviewId !== 0) {
      const reviewContent: ReviewContent = {
        rating,
        description: reviewText,
        images: selectedImages,
      }
      setReview(reviewId, reviewContent)
    }
  }, [selectedImages, reviewText, rating])

  // * 키보드 open 여부
  const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false)

  // * 별점 선택 컴포넌트
  // TODO: 리렌더링으로 인한 깜빡임 문제 해결
  const CustomRaitingBar = useCallback(() => {
    return (
      <View style={styles.customRaitingBar}>
        {maxRating.map((item, index) => {
          return (
            <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => setRating(item)}>
              <Image
                style={styles.starImg}
                source={item <= rating ? images.star_filled : images.star_empty}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }, [rating])

  // * keyboard 노출시 프로필, 별점, 사진 입력 숨기기
  useEffect(() => {
    const showInputs = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow", // android는 keyboardWillShow를 지원하지 않는다.
      () => {
        setIsKeyboardOpen(true)
      },
    )

    const hideInputs = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide", // android는 keyboardWillHide를 지원하지 않는다.
      () => {
        setIsKeyboardOpen(false)
      },
    )

    return () => {
      showInputs.remove()
      hideInputs.remove()
    }
  }, [])

  const handleSubmit = useCallback(() => {
    if (rating === 0) {
      // ! 문구 임시로 지정
      alert("별점은 필수 입력 항목입니다.")
      return
    }

    switch (serviceType) {
      case "creche":
        postCrecheReview({
          crecheId: petsitterId,
          bookingId,
          desc: reviewText,
          star: rating,
          images: selectedImages,
        })
          .then((success) => {
            console.log("success >>>", success)
            if (success) {
              // TODO 리렌더링 (리뷰 작성 가능 상태 변경)
              removeReview(reviewId)
              navigation.goBack()
            } else throw new Error("")
          })
          .catch((err) => {
            alert("처리 중에 문제가 발생했습니다.\n다시 시도해주세요.")
            console.error("[write-review-screen] 리뷰 post 에러 >>>", err)
          })
        break

      // ? 방문 서비스의 경우, visiting-review api에 POST 요청을 보낸다.
      case "visiting":
        postVisitingReview({
          visitingId: petsitterId,
          bookingId,
          desc: reviewText,
          star: rating,
          images: selectedImages,
        })
          .then((success) => {
            console.log("success >>>", success)
            // ? 리뷰 post를 성공한 경우
            if (success) {
              // ? 해당 리뷰 모델을 삭제한 후, 예약 내역 페이지로 돌아감
              // TODO 리렌더링 (리뷰 작성 가능 상태 변경)
              removeReview(reviewId)
              navigation.goBack()
            }
            // ? 실패한 경우 catch에서 처리
            else throw new Error("review post 과정에서 에러")
          })
          .catch((err) => {
            // ! 임시 문구로 넣음
            alert("처리 중에 문제가 발생했습니다.\n다시 시도해주세요.")
            console.error("[write-review-screen] 리뷰 post 에러 >>>", err)
          })
        break
      default:
        break
    }
  }, [selectedImages, reviewText, rating])

  return (
    <Screen testID="WriteReview">
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isKeyboardOpen && (
          <View>
            {/* // * profile card */}
            {/* ...혜리님 작업... */}
            <View style={styles.profileCard}>
              <Image
                source={profileImage ? profileImage : images.profile_default}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <View style={styles.name}>
                  <PreMed18 text={petsitterName} mr={8} />
                  <CaregiverTypeButton
                    text={serviceType === "creche" ? "위탁" : "방문"}
                    style={{ marginRight: 4 }}
                  />
                  <CaregiverTypeButton
                    text="펫시터"
                    textColor={GIVER_CASUAL_NAVY}
                    style={styles.petsitterTypeBtn}
                  />
                </View>

                <PreReg14 text={desc} />
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
              selectionLimit={5}
              style={{ marginTop: 20 }}
            />
          </View>
        )}

        {/* // TODO: keyboard avoiding view - 줄넘김 많을 때 텍스트 가리는 문제 생길 수 있음 */}
        {/* //* 리뷰 텍스트 input */}
        <TextInput
          maxLength={300}
          placeholder={`후기 작성 시 주의사항\n1. 욕설, 비방, 음란성 등 다른 사용자들에게 불쾌감을 주는 글은 사전고지 없이 삭제될 수 있습니다. \n2. 게시된 글의 저작권은 글을 작성한 사용자에게 있으며, 이로 인해 발생하는 문제는 본인에게 책임이 있습니다. \n3. 후기에 본인의 개인정보가 포함되지 않도록 주의해 주시기 바랍니다.`}
          placeholderTextColor={DISABLED}
          multiline
          onChangeText={setReviewText}
          value={reviewText}
          // onSubmitEditing={Keyboard.dismiss} // 엔터 클릭시 키보드 종료
          style={[
            {
              marginTop: 20,
            },
            styles.textInput,
          ]}
        />

        {/* //* 입력 글자 수 */}
        <View style={[{ marginTop: 10 }, styles.textCountContainer]}>
          <PreBol14 text={`${reviewText.length} `} color={BODY} />
          <PreReg14 text="/ 300" color={BODY} />
        </View>
      </ScrollView>
      {/* //* 확인 버튼 */}
      <RegisterSubmitButton
        text="확인"
        style={{ position: "absolute", bottom: 0 }}
        onPress={handleSubmit}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  profileCard: {
    width: 358,
    borderRadius: 8,
    borderColor: LIGHT_LINE,
    borderStyle: "solid",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 16,
  },

  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  profileInfo: {
    flexDirection: "column",
  },

  name: {
    flexDirection: "row",
    marginBottom: 8,
  },

  petsitterTypeBtn: {
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
    backgroundColor: palette.white,
  },

  customRaitingBar: {
    flexDirection: "row",
    marginTop: 36,
    // paddingHorizontal: 16,
  },

  starImg: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 10,
  },

  textInput: {
    padding: 20,
    paddingTop: 20,

    minHeight: 277,

    borderRadius: 8,
    backgroundColor: LBG,
    lineHeight: 20,
  },

  textCountContainer: {
    marginBottom: 38,
    marginLeft: "auto",

    flexDirection: "row",
    alignItems: "center",
  },
})
