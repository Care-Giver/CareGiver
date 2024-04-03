import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
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
  CustomModal,
  PreMed16,
  FOOTER_CONTENT_GAP,
  Footer,
} from "../../../../components"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "../../../../navigators"
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
  BOTTOM_HEIGHT,
} from "../../../../theme"
import { delay } from "../../../../utils/delay"
import {
  CommentColumns,
  CrecheAmenity,
  CrecheService,
  VisitingAmenity,
  VisitingService,
  getVisitingComments,
  getVisitingReviews,
} from "#api"
import { ServiceType, useStores } from "#models"
import { alertModal } from "../../../../utils/alert-modal"
import { PRETENDARD_MEDIUM } from "#fonts"
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import { VisitingReview } from "../../../../services/api"
import _ from "lodash"
import { useFocusEffect } from "@react-navigation/native"
import { SelectedComment } from "../all-comments-screen/all-comments-screen"

type ServiceAmenity = {
  services: CrecheService[] | VisitingService[]
  amenities: CrecheAmenity[] | VisitingAmenity[]
}

export const CaregiverDetailInformationScreen: FC<
  StackScreenProps<NavigatorParamList, "caregiver-detail-information-screen">
> = observer(({ navigation, route }) => {
  const {
    userStore: { userDetail },
  } = useStores()
  const { serviceTypeKorean, service, selectedPetIds, selectedTime, address } = route.params
  const { userProfile: profileImage, userNickname, reviewCount } = service
  const key: ServiceType = serviceTypeKorean === "방문" ? "visiting" : "creche"
  const { star, desc, defaultFee, images } = service[key]
  const serviceAmenity: ServiceAmenity = {
    services:
      serviceTypeKorean === "방문"
        ? service.visiting.serviceVisiting
        : service.creche.serviceCreche,
    amenities:
      serviceTypeKorean === "방문"
        ? service.visiting.visitingAmenities
        : service.creche.crecheAmenities,
  }

  console.log("selectedTime 1", selectedTime)
  console.log("userId >>>", userDetail.id)
  console.log("visitingId >>>", service.visiting.id)
  const [isMounted, setIsMounted] = useState(false)
  const [reviews, setReviews] = useState<VisitingReview[]>([])
  const [comments, setComments] = useState<CommentColumns[]>([])
  const [selectedComment, setSelectedComment] = useState<SelectedComment>({
    commentId: null,
    desc: "",
    commentatorId: null,
  })
  const isUserComment = userDetail.id === selectedComment.commentatorId

  // 기본 | 추가 서비스 설명 바텀시트모달 - ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // 펫시터 등록하기 바텀시트모달 - snapPoints
  const snapPoints = useMemo(() => ["20%", "20%"], [])

  /** 기본 | 추가 서비스 설명 바텀시트모달 backdrop */
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0} // backdrop이 등장할 때의 snap point -> snap point가 0이면 backdrop 나타남
        disappearsOnIndex={-1} // backdrop이 사라질 때의 snap point -> snap point가 -1이면 backdrop 사라짐
        pressBehavior={"close"}
      />
    ),
    [],
  )
  const onPressCommentOption = () => {
    if (!isUserComment) {
      alertModal("개발중 🏗️", "답글 기능은 개발 중 입니다.")
    }
    bottomSheetModalRef.current.close()
    navigate("writing-comment-screen", {
      updateOrCreate: "update",
      commentId: selectedComment.commentId,
      defaultComment: selectedComment.desc,
    })
  }

  const animationValue = useRef(new Animated.Value(0)).current

  useLayoutEffect(() => {
    const serviceType = key === "visiting" ? "방문" : "위탁"
    navigation.setOptions({
      // @ts-ignore
      headerTitle: `(${serviceType}) ${service[key]?.__careGiver__?.__user__?.nickname}`,
    })
    delayedIsMount()
  }, [key, navigation, service])

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

  // 댓글 FETCH
  useFocusEffect(
    useCallback(() => {
      getVisitingComments(service.visiting.id).then((res) => {
        setComments(res.visitingComments)
      })
    }, [service.visiting.id]),
  )

  // 후기 FETCH
  useEffect(() => {
    getVisitingReviews(service.visiting.id).then((res) => {
      if (res.isSuccess) setReviews(res.visitingReviews)
    })
  }, [service.visiting.id])

  const buttonOpacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  const buttonScale = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  })

  const onPressMakeBookingButton = () => {
    if (userDetail.id === service[key].__careGiver__.__user__.id) {
      alertModal("예약 신청 불가", "나 자신에게는 예약을 신청할 수 없어요.")
      return
    }

    navigate("make-booking-screen", {
      key,
      service,
      selectedPetIds,
      selectedTime,
      address,
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
            // @ts-ignore
            headerStyle: {
              elevation: headerOpacity,
              backgroundColor: `rgba(255,255,255,${headerOpacity})`,
            },
            headerTitleStyle: {
              color: headerOpacity < 0.3 ? "white" : "black",
              fontFamily: PRETENDARD_MEDIUM,
              fontSize: 18,
            },
          })
        }}
        scrollEventThrottle={16}
        contentInsetAdjustmentBehavior="never"
      >
        {/* //* 위탁 장소 사진들 */}
        <FullWidthSizeImagesBoxWithIndicator
          style={{
            marginTop: 0,
          }}
          // 위탁의 경우, "위탁 사진" 을,
          // 방문의 경우, "방문 펫시터 프로필 사진" 을 렌더링 하다.
          images={key === "creche" ? images : [service.userProfile]}
        />

        <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH, alignSelf: "center" }}>
          {/* //* 케어기버 이름/ 별점/ 리뷰  */}
          <CaregiverNameStarReview
            style={{ marginTop: 36 }}
            profileImage={profileImage}
            caregiverData={{
              name: userNickname,
              ratings: star,
            }}
            onPress={() => {
              //? 후기 전체보기 화면으로 이동
              navigate("all-reviews-screen", { reviews })
            }}
            text={`후기 ${reviews?.length}개`}
          />

          {/* TODO: 어떻게 가져올 것인가? API 없는 것으로 보임 */}
          {/* //* 고용된 횟수와 반려동물과 함께한 시간 */}
          {/* <HiredTimesAndPetYears
            style={{ marginTop: 20 }}
            hiredTimes={hiredTimes}
            petYearsYears={petYearsYears}
            petYearsMonths={petYearsMonths}
          /> */}

          {/* TODO: 어떤 API? */}
          {/* //* 자격증 */}
          {/* <Row style={{ marginTop: 60 }}>
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
          /> */}

          {/* //* 서비스 */}
          <Row style={{ marginTop: 60 }}>
            <PreBol16 text={"서비스"} color={SUB_HEAD_LINE} />
          </Row>
          <DivisionLine color={LBG} style={{ marginTop: 8 }} />
          <View style={{ marginTop: 12 }}>
            {serviceAmenity.services.map((item, index) => (
              <CaregiverService emoji={"•"} label={item.name} key={`service-${item.id}`} />
            ))}
          </View>

          {/* //* 편의시설 */}
          <Row style={{ marginTop: 60 }}>
            <PreBol16 text={"편의시설"} color={SUB_HEAD_LINE} />
          </Row>
          <DivisionLine color={LBG} style={{ marginTop: 8 }} />
          <View style={{ marginTop: 12 }}>
            {serviceAmenity.amenities.map((item, index) => (
              <CaregiverService emoji={"•"} label={item.name} key={`service-${item.id}`} />
            ))}
          </View>

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
          <Row
            style={{
              marginTop: 60,
            }}
          >
            <PreBol16 text={"댓글"} color={SUB_HEAD_LINE} />
            {comments?.length > 0 ? (
              <PreBol14
                text={"전체보기 >"}
                color={BODY}
                style={{ marginLeft: "auto" }}
                onPress={() => {
                  //? 댓글 전체보기 화면으로 이동
                  navigate("all-comments-screen", {
                    comments: comments,
                    visitingId: service.visiting.id,
                    userId: userDetail.id,
                  })
                }}
              />
            ) : null}
          </Row>
          <DivisionLine color={LBG} style={{ marginTop: 8 }} />

          {comments?.length > 0 ? (
            <View
              style={{
                paddingVertical: -1,
                marginBottom: BOTTOM_HEIGHT,
                alignItems: "center",
              }}
            >
              {_.sortBy(comments, "createAt")
                .reverse()
                .slice(0, 3)
                .map((item, index) => (
                  <Comment
                    commentData={item}
                    numberOfLines={2}
                    style={{ marginTop: -1 }}
                    key={index}
                    onPress={() => {
                      setSelectedComment({
                        commentId: item.id,
                        desc: item?.__commentator__?.desc,
                        commentatorId: item?.__commentator__?.id,
                      })
                      bottomSheetModalRef.current.present()
                    }}
                  />
                ))}
            </View>
          ) : (
            <View>{/*  */}</View>
          )}
        </View>
        <Footer mt={FOOTER_CONTENT_GAP} />
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
      >
        <Pressable
          style={{
            marginTop: 28,
            marginBottom: 16,
            alignItems: "center",
          }}
          onPress={onPressCommentOption}
        >
          <PreMed16 text={isUserComment ? "수정하기" : "답글달기"} />
        </Pressable>
      </BottomSheetModal>

      {/* //? 예약 신청하기 버튼 */}
      {isMounted && (
        <Animated.View
          style={{
            // paddingVertical: 100,
            opacity: buttonOpacity,
            transform: [{ scale: buttonScale }],
            paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
            bottom: BOTTOM_HEIGHT,
          }}
        >
          {/* //* 예약 신청하기 버튼*/}
          <MakeBookingButton
            price={defaultFee}
            serviceTypeKorean={serviceTypeKorean}
            isActivated={true}
            onPress={onPressMakeBookingButton}
          />
        </Animated.View>
      )}
    </Screen>
  )
})
