import React, { FC, useEffect, useState } from "react"
import { Platform, Pressable, ScrollView, View } from "react-native"
import { observer } from "mobx-react-lite"
import {
  CaregiverCertificate,
  CaregiverService,
  HiredTimesAndPetYears,
  Comment,
  FullWidthSizeImagesBoxWithIndicator,
  PreBol14,
  PreBol16,
  Row,
  ScreenRootView,
  DivisionLine,
  PreReg14,
  CaregiverNameStarReview,
  ConditionalButton,
  BASIC_BACKGROUND_PADDING_WIDTH,
  MakeBookingButton,
  DivisionLineVertical,
  FULL_WITH_SCROLLING,
  BASIC_BACKGROUND_PADDING,
} from "#components"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "#navigators"
import {
  HEADER_HEIGHT,
  HEIGHT,
  IOS_BOTTOM_HOME_BAR_HEIGHT,
  WIDTH,
  BODY,
  DBG,
  LBG,
  LIGHT_LINE,
  SUB_HEAD_LINE,
  STANDARD_WIDTH,
  NAV_BUTTON_BOTTOM_PADDING,
} from "#theme"
import { commentsDummy } from "../all-comments-screen/dummy-data"

const servicesDummy = [
  {
    emoji: "🦮",
    label: "산책",
  },
  {
    emoji: "🦴",
    label: "간식주기",
  },
  {
    emoji: "🛁",
    label: "목욕시키기",
  },
]

const services = (services) => {
  let arr = []

  for (let index = 0; index < services.length; index++) {
    arr.push(services[index])
    index === services.length - 1 ? null : arr.push("division-line-vertical")
  }

  return arr.map((item, index) =>
    item === "division-line-vertical" ? (
      <DivisionLineVertical
        color={DBG}
        height={HEIGHT * 16}
        style={{ marginHorizontal: WIDTH * 10 }}
        key={index}
      />
    ) : (
      <CaregiverService emoji={item.emoji} label={item.label} key={index} />
    ),
  )
  // console.log(arr)
}

const hiredTimes = 99
const petYearsYears = 12
const petYearsMonths = 4

const desc =
  "안녕하세요. 저희는 스타트업, 케어기버 입니다! 아직 우리나라는 펫시팅 문화가 낯섭니다. 반려동물과 함께하는 1인 가구는 점차 늘고 있지만, 바쁜 일상속에서 정작 집에서 혼자 시간을 보내는 강아지들이 늘고 있습니다. 이러한 현실속에서, 정작 내 주변에 펫시터가 있는지도 알 수 없습니다. 이와 관련된 정보도 부족하고, 무엇보다 펫시터라는 직업과 그 수가 매우 적습니다. 펫시팅의 대중화가 이루어지지 못 한 것입니다. 저희는 이러한 문제점을 해결하고자 스타트업을 시작했습니다. 에어비엔비가 그래왔듯, 저희들도 이전에는 없던 분야를 새로 만드려합니다. 지역사회 기반 커뮤니티와 리뷰-레이팅 시스템을 기반으로 한, 이전에는 없던 서비스. 누구나 쉽게 펫시터가 되고, 내 아이를 손쉽게 믿고 맡길 수 있는 환경을 만들고자 합니다! \n\n이번 테스트에 참여해주셔서 정말 감사드립니다 🙂 \n- 2022년 11월 케어기버 일동."

export const CaregiverDetailInformationScreen: FC<
  StackScreenProps<NavigatorParamList, "caregiver-detail-information-screen">
> = observer(({ navigation, route }) => {
  const [post, setPost] = useState(null)

  // useEffect(() => {
  //   const api = new Api()
  //   api.setup()

  //   api.getCreche("1").then((response) => {
  //     setPost(response.data)
  //   })
  // }, [])

  // console.log("post", post)

  const { sitterData } = route.params
  const { profileImg, name, rating } = sitterData
  // console.log(sitterData)

  return (
    //! FullWidthSizeImagesBoxWithIndicator 컴포넌트와 MakeBookingButton 컴포넌트 때문에, ScrollView 를 내부에 사용한다
    //! 따라서, ScreenRootView 는 fixed 로 한다
    //! 이에따라, 스크린 엣지 기본 padding 도 컴포넌트마다 각각 적용해야 한다
    <ScreenRootView
      preset="fixed"
      testID="testetst"
      style={{
        ...FULL_WITH_SCROLLING,
        ...BASIC_BACKGROUND_PADDING,
        paddingHorizontal: 0,
      }}
    >
      {/* //? 예약 신청하기 버튼을 "제외한" 전부 */}
      <ScrollView
        // preset="scroll"
        showsVerticalScrollIndicator={false}
        //? 스크롤할 때 헤더 투명도 바꾸기. 출처: https://stackoverflow.com/questions/52469579/transparent-background-for-header-using-createstacknavigator-react-native
        onScroll={(event) => {
          const headerOpacity =
            Math.min(Math.max(event.nativeEvent.contentOffset.y / 2, 0) / HEADER_HEIGHT, 1.0) ?? 0.0
          navigation.setOptions({
            headerStyle: {
              elevation: headerOpacity,
              backgroundColor: `rgba(255,255,255,${headerOpacity})`,
            },
          })
        }}
        scrollEventThrottle={16}
        contentInsetAdjustmentBehavior="never"
      >
        {/* //* 케어기버 사진들 */}
        <FullWidthSizeImagesBoxWithIndicator
          style={{
            marginTop: 0,
          }}
          firstImage={profileImg}
        />

        <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH, alignSelf: "center" }}>
          {/* //* 케어기버 이름/ 별점/ 리뷰  */}
          <CaregiverNameStarReview
            style={{ marginTop: HEIGHT * 36 }}
            caregiverData={{
              name: name,
              ratings: rating,
              numberOfReviews: 12,
            }}
          />

          {/* //* 고용된 횟수와 반려동물과 함께한 시간 */}
          <HiredTimesAndPetYears
            style={{ marginTop: HEIGHT * 20 }}
            hiredTimes={hiredTimes}
            petYearsYears={petYearsYears}
            petYearsMonths={petYearsMonths}
          />

          {/* //* 자격증 */}
          <Row style={{ marginTop: HEIGHT * 60 }}>
            <PreBol16 text={"자격증"} color={SUB_HEAD_LINE} />
          </Row>
          <DivisionLine color={LBG} style={{ marginTop: HEIGHT * 8 }} />
          <CaregiverCertificate
            style={{ marginTop: HEIGHT * 8 }}
            label={"반려동물관리사"}
            detail={"반려동물을 종합적으로 관리할 수 있는 사람에게 수여되는 자격증"}
          />
          <CaregiverCertificate
            label={"반려동물행동교정사"}
            detail={"반려동물을 행동교정 행동교정 행동교정 행동교정 행동교정 행동교정"}
          />

          {/* //* 서비스 */}
          <Row style={{ marginTop: HEIGHT * 60 }}>
            <PreBol16 text={"서비스"} color={SUB_HEAD_LINE} />
          </Row>
          <DivisionLine color={LBG} style={{ marginTop: HEIGHT * 8 }} />
          <Row style={{ marginTop: HEIGHT * 12 }} children={services(servicesDummy)} />

          {/* //* 자기소개 */}
          <Row style={{ marginTop: HEIGHT * 28 }}>
            <PreBol16 text={"자기소개"} color={SUB_HEAD_LINE} />
            <PreBol14
              text={"전체보기 >"}
              color={BODY}
              style={{ marginLeft: "auto" }}
              onPress={() => {
                //? 자기소개 전체보기 화면으로 이동
                navigate("caregiver-self-introduction-screen", { desc })
              }}
            />
          </Row>
          <DivisionLine color={LBG} style={{ marginTop: HEIGHT * 8 }} />
          <PreReg14
            text={desc}
            color={SUB_HEAD_LINE}
            numberOfLines={8}
            style={{ marginTop: HEIGHT * 10, lineHeight: HEIGHT * 20 }}
          />

          {/* //* 댓글 */}
          <Row style={{ marginTop: HEIGHT * 60 }}>
            <PreBol16 text={"댓글"} color={SUB_HEAD_LINE} />
            <PreBol14
              text={"전체보기 >"}
              color={BODY}
              style={{ marginLeft: "auto" }}
              onPress={() => {
                //? 댓글 전체보기 화면으로 이동
                navigate("all-comments-screen", commentsDummy)
              }}
            />
          </Row>
          <DivisionLine color={LBG} style={{ marginTop: HEIGHT * 8 }} />

          <View style={{ paddingVertical: HEIGHT * -1, marginBottom: HEIGHT * 120 }}>
            {commentsDummy.slice(0, 3).map((item, index) => (
              <Comment
                commentData={item}
                numberOfLines={2}
                style={{ marginTop: HEIGHT * -1 }}
                key={index}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* //? 예약 신청하기 버튼 */}
      <View
        style={{
          // paddingVertical: 100,
          paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          marginBottom: Platform.select({
            ios: IOS_BOTTOM_HOME_BAR_HEIGHT,
            android: 0,
          }),
        }}
      >
        {/* //* 예약 신청하기 버튼*/}
        <MakeBookingButton
          style={{ marginBottom: NAV_BUTTON_BOTTOM_PADDING }}
          pricePerHour={50000}
          isActivated={true}
          onPress={() => {
            alert("결제하기 화면으로 이동")
          }}
        />
      </View>
    </ScreenRootView>
  )
})
