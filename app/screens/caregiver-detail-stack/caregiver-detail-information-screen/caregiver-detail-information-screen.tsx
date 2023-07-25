import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Platform, Pressable, ScrollView, View, Modal, Text, Animated } from "react-native"
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
  Screen,
  DivisionLine,
  PreReg14,
  CaregiverNameStarReview,
  ConditionalButton,
  BASIC_BACKGROUND_PADDING_WIDTH,
  MakeBookingButton,
  DivisionLineVertical,
  BASIC_BACKGROUND_PADDING,
  CustomModal, // modal test
} from "../../../components"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "../../../navigators"
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
} from "../../../theme"
import { commentsDummy } from "../all-comments-screen/dummy-data"
import { delay } from "../../../utils/delay"

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
      <DivisionLineVertical color={DBG} height={16} style={{ marginHorizontal: 10 }} key={index} />
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
  "안녕하세요. 강아지들의 단짝 펫시터 강단입니다! 강아지들은 저의 소중한 단짝이자 저 또한 강아지들의 소중한 단짝 이라고 생각합니다. 여러분들도 아시겠지만, 반려견은 말을 할 수 없기 때문에 행동으로 자신의 의사를 표현합니다. 그렇기 때문에 저는 언제나 강아지들의 눈높이에서 강이지들과 친구가 되어 함께 논다는 마음으로 강아지들과 함께 해오고 있습니다. 어느덧 강아지들과 함께 해 온 시간이 10년을 훌쩍 넘었네요. 저의 강아지 뿐 아니라 여러분의 강아지들과도 단짝이 되어 보호자님들이 없는 시간에도 우리 아이들이 불안해하지 않을 수 있도록 있도록있도록 있도록 있도록"

export const CaregiverDetailInformationScreen: FC<
  StackScreenProps<NavigatorParamList, "caregiver-detail-information-screen">
> = observer(({ navigation, route }) => {
  const { sitterData, serviceType, selectedDate, selectedPets, beginDate, endDate } = route.params

  const [post, setPost] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  const animationValue = useRef(new Animated.Value(0)).current

  useLayoutEffect(() => {
    delayedIsMount()
  }, [])

  const delayedIsMount = async () => {
    await delay(600)
    setIsMounted(true)
  }

  useEffect(() => {
    if (isMounted) {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [animationValue, isMounted])

  const buttonOpacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  const buttonScale = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  })

  // useEffect(() => {
  //   const api = new Api()
  //   api.setup()

  //   api.getCreche("1").then((response) => {
  //     setPost(response.data)
  //   })
  // }, [])

  // console.log("post", post)

  const { profileImg, name, rating } = sitterData

  const onPressMakeBookingButton = () => {
    navigate("make-booking-screen", {
      sitterData: sitterData,
      //TODO sitterData에 있어야 할 것 같다. 왜 여기 Dummydata로 빠져있는지??
      services: ["사료 및 물 급여", "실내 놀이", "배변처리 및 환경정리"],
      serviceType: serviceType,
      selectedDate: selectedDate,
      selectedPets: selectedPets,
      beginDate: serviceType == "방문" ? beginDate : null,
      endDate: serviceType == "방문" ? endDate : null,
    })
  }

  return (
    //! FullWidthSizeImagesBoxWithIndicator 컴포넌트와 MakeBookingButton 컴포넌트 때문에, ScrollView 를 내부에 사용한다
    //! 따라서, Screen 는 fixed 로 한다
    //! 이에따라, 스크린 엣지 기본 padding 도 컴포넌트마다 각각 적용해야 한다
    <Screen
      style={{
        ...BASIC_BACKGROUND_PADDING,
        paddingHorizontal: 0,
      }}
    >
      {/* //? 예약 신청하기 버튼을 "제외한" 전부 */}
      <ScrollView
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
            style={{ marginTop: 36 }}
            caregiverData={{
              name: name,
              ratings: rating,
              numberOfReviews: 12,
            }}
          />

          {/* //* 고용된 횟수와 반려동물과 함께한 시간 */}
          <HiredTimesAndPetYears
            style={{ marginTop: 20 }}
            hiredTimes={hiredTimes}
            petYearsYears={petYearsYears}
            petYearsMonths={petYearsMonths}
          />

          {/* //* 자격증 */}
          <Row style={{ marginTop: 60 }}>
            <PreBol16 text={"자격증"} color={SUB_HEAD_LINE} />
          </Row>
          <DivisionLine color={LBG} style={{ marginTop: 8 }} />
          <CaregiverCertificate
            style={{ marginTop: 8 }}
            label={"반려동물관리사"}
            detail={"반려동물을 종합적으로 관리할 수 있는 사람에게 수여되는 자격증"}
          />
          <CaregiverCertificate
            label={"반려동물행동교정사"}
            detail={"반려동물을 행동교정 행동교정 행동교정 행동교정 행동교정 행동교정"}
          />

          {/* //* 서비스 */}
          <Row style={{ marginTop: 60 }}>
            <PreBol16 text={"서비스"} color={SUB_HEAD_LINE} />
          </Row>
          <DivisionLine color={LBG} style={{ marginTop: 8 }} />
          <Row style={{ marginTop: 12 }} children={services(servicesDummy)} />

          {/* //* 자기소개 */}
          <Row style={{ marginTop: 28 }}>
            <PreBol16 text={"자기소개"} color={SUB_HEAD_LINE} />
            <PreBol14
              text={"전체보기 >"}
              color={BODY}
              style={{ marginLeft: "auto" }}
              onPress={() => {
                //? 자기소개 전체보기 화면으로 이동
                navigate("caregiver-self-introduction-screen", desc)
              }}
            />
          </Row>
          <DivisionLine color={LBG} style={{ marginTop: 8 }} />
          <PreReg14
            text={desc}
            color={SUB_HEAD_LINE}
            numberOfLines={8}
            style={{ marginTop: 10, lineHeight: 20 }}
          />

          {/* //* 댓글 */}
          <Row style={{ marginTop: 60 }}>
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
          <DivisionLine color={LBG} style={{ marginTop: 8 }} />

          <View style={{ paddingVertical: -1, marginBottom: 120 }}>
            {commentsDummy.slice(0, 3).map((item, index) => (
              <Comment commentData={item} numberOfLines={2} style={{ marginTop: -1 }} key={index} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* //? 예약 신청하기 버튼 */}
      {isMounted && (
        <Animated.View
          style={{
            // paddingVertical: 100,
            opacity: buttonOpacity,
            transform: [{ scale: buttonScale }],
            paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
            bottom: Platform.select({
              ios: IOS_BOTTOM_HOME_BAR_HEIGHT,
              android: 8,
            }),
          }}
        >
          {/* //* 예약 신청하기 버튼*/}
          <MakeBookingButton
            pricePerHour={50000}
            isActivated={true}
            /*onPress={() => {
            // 원본
            alert("결제하기 화면으로 이동")
          }}*/
            onPress={onPressMakeBookingButton}
          />
        </Animated.View>
      )}
    </Screen>
  )
})
