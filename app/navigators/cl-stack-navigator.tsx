/**
 * 클라이언트 모드일때 등장하는 모든 스크린들을 담당하는 네비게이터들 입니다.
 * 전부 StackNavigator로 구현되어 있습니다.
 * @see https://reactnavigation.org/docs/stack-navigator/
 *
 * @param {CLStackNavigatorParamList} CLStackNavigatorParamList - CL 스택 네비게이터의 파라미터 리스트 타입 입니다.
 *
 * @function FavoritesStack - 즐겨찾기 탭에 들어가는 모든 스크린들 입니다.
 * @function BookingsStack - 예약내역 탭에 들어가는 모든 스크린들 입니다.
 * @function SearchingStack - 검색 탭에 들어가는 모든 스크린들 입니다. (테스트 스크린들도 포함되어 있습니다.)
 * @function ChatsStack - 채팅 탭에 들어가는 모든 스크린들 입니다.
 * @function MypageStack - 내정보 탭에 들어가는 모든 스크린들 입니다.
 */
import React from "react"
import { Image, Pressable } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  WritingCommentScreen,
  SearchScreen,
  SearchResultScreen,
  // TestMapScreen,
  CaregiverDetailInformationScreen,
  CaregiverSelfIntroductionScreen,
  AllCommentsScreen,
  AllReviewsScreen,
  AllBookingsScreen,
  MypageScreen,
  AllPetsScreen,
  SettingScreen,
  ServiceCenterScreen,
  EditMypageScreen,
  TestWebViewScreen,
  TestPushNotificationScreen,
  TestBottomSheetScreen,
  FavoritesScreen,
  EditPetInfoScreen,
  BookingDetailScreen,
  PastBookingsScreen,
  MakeBookingScreen,
  PaymentScreen,
  TestIamportScreen,
  TestIamportPaymentScreen,
  TestIamportPaymentResultScreen,
  TestNetworkErrorScreen,
  WriteReviewScreen,
  ViewReviewScreen,
  TempChatScreen,
  ServiceAmenity,
  NotificationScreen,
  AddPetScreen,
} from "#screens"
import { goBack } from "./navigation-utilities"
import {
  GobackAndTitleHeader,
  HomeScreenHeader,
  WritingCommentScreenHeader,
  AllCommentsScreenHeader,
  EditMypageScreenHeader,
  EditPetInfoScreenHeader,
  CgScreenHeader,
  PetsitterProfileCardPetsitterData,
  NotificationScreenHeader,
} from "#components"
import { images } from "../../assets/images"
import { MinseonTest } from "../screens/test/minseon-test"
import { Pet, PetsitterType, ServiceType, ServiceTypeKorean, Type, useStores } from "../models"
import { observer } from "mobx-react-lite"
import { IMPData } from "iamport-react-native"

export type CLStackNavigatorParamList = {
  /**
   * FavoritesStack -즐겨찾기 스택
   */
  "favorites-screen": undefined

  /**
   * BookingsStack - 예약내역 스택
   */
  "all-bookings-screen": undefined
  "booking-detail-screen": undefined
  "past-bookings-screen": undefined
  // * review stack
  "write-review-screen": {
    profileImage: string | null
    petsitterName: string
    petsitterType: PetsitterType
    petsitterId: number
    bookingId: number
    serviceType: ServiceType
    desc: string
  }
  "view-review-screen": {
    serviceType: ServiceType
    bookingId: number
    profileImage?: string
    petsitterName: string
    desc: string
  }

  /**
   * SearchingStack - 검색 스택
   */
  // "home-screen": undefined //! 홈 스크린은 MVP 에서 제외되었습니다. (search-screen 으로 대체됨)
  "search-screen": undefined
  "search-result-screen": {
    // API REQUEST BODY 관련
    lat: number
    lng: number
    petIds: number[]

    // 방문
    startTime?: string // "2023-07-27T10:40:59"
    endTime?: string //"2023-07-27T11:40:59"

    // 위탁
    startDate?: string
    endDate?: string

    // 그외
    serviceType: ServiceTypeKorean
  }
  "caregiver-detail-information-screen": {
    sitterData: PetsitterProfileCardPetsitterData
    serviceType: ServiceTypeKorean
    serviceAmenity: ServiceAmenity
    images: string[]
    //TODO: selectedPets 프로퍼티를 petIds 으로 바꾸고,
    //TODO: petStore 에서, id값으로 pet 객체를 가져오는 메서드를 추가해서 사용해야 함.
    selectedPets: number[]

    // 방문
    startTime?: string
    endTime?: string

    // 위탁
    startDate?: string
    endDate?: string

    // ---- API REQUEST BODY 와는 상관 없는 데이터 ----
    address // 검색결과 헤더에 보여줄 주소
  }
  "payment-screen": undefined
  "all-reviews-screen": undefined
  "caregiver-self-introduction-screen": undefined
  "all-comments-screen": undefined
  "writing-comment-screen": undefined
  "payment-request-screen": undefined
  "make-booking-screen": undefined

  /**
   * ChatsStack - 채팅 스택 || CG - 채팅 스택
   */
  "temp-chat-screen": undefined

  /**
   * MypageStack - 내정보 스택
   */
  "mypage-screen": undefined
  "all-pets-screen": {
    pets: Pet[]
    isSaved?: boolean
  }
  "setting-screen": undefined
  "service-center-screen": undefined
  "edit-mypage-screen": { editable: boolean }
  "add-pet-screen": undefined
  "edit-pet-info-screen": { editable: boolean; isBackPressed: boolean; pet: Pet }
  "notification-screen": { removeAllToggle: boolean }
  // ===========================================================================================================
  // 아래는 테스트 스크린들 입니다.
  // ===========================================================================================================

  "minseon-test": undefined
  "test-map-screen": undefined
  "test-bottom-sheet": undefined
  "test-web-view-screen": undefined
  "kakao-login-test-screen": undefined
  "test-push-notification-screen": undefined
  "test-network-error-screen": undefined
  // iamport 테스트
  "test-iamport-screen": undefined
  "test-iamport-payment-screen": {
    params: IMPData.PaymentData
    tierCode?: string
    serviceType: string
    visitingId: number
    userId: number
    request: string
    services: string[]
    destination: string
    selectedDate: string
    startTime: string[]
    endTime: string[]
    petIds: number[]
    petToolsLocInfo: string
    avoidFoodInfo: string
    bondingTipsInfo: string
  }
  "test-iamport-payment-result-screen": any
}

const Stack = createNativeStackNavigator<CLStackNavigatorParamList>()

/**
 * 즐겨찾기 스택
 */
export const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="favorites-screen"
    >
      {/* //* 즐겨찾기 메인 */}
      <Stack.Screen
        name="favorites-screen"
        component={FavoritesScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

/**
 * 예약내역 스택
 */
export const BookingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="all-bookings-screen"
    >
      {/* //* 예약내역 메인 */}
      <Stack.Screen
        name="all-bookings-screen"
        component={AllBookingsScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />

      {/* //* 예약내역 상세 */}
      <Stack.Screen
        name="booking-detail-screen"
        component={BookingDetailScreen}
        options={{
          title: "예약내역 상세",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 지난 예약 내역 스크린 */}
      <Stack.Screen
        name="past-bookings-screen"
        component={PastBookingsScreen}
        options={{
          title: "지난 예약",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 리뷰 작성 페이지 */}
      <Stack.Screen
        name="write-review-screen"
        component={WriteReviewScreen}
        options={{
          title: "후기 작성",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 작성 리뷰 확인 페이지 */}
      <Stack.Screen
        name="view-review-screen"
        component={ViewReviewScreen}
        options={{
          title: "나의 후기",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

/**
 * 검색 스택
 */
export const SearchingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="search-screen"
    >
      {/* //* 홈 ➡️ 원래 시작 스크린이었으나, search-screen 으로 대체되었습니다 */}
      {/*      <Stack.Screen
          name="home-screen"
          component={HomeScreen}
          options={{
            header: (props) => <HomeScreenHeader {...props} />,
          }}
        /> */}

      {/* //* 검색 ➡️ 시작 스크린입니다 */}
      <Stack.Screen
        name="search-screen"
        component={SearchScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />

      {/* //* 검색결과 */}
      <Stack.Screen
        name="search-result-screen"
        component={SearchResultScreen}
        options={{
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 펫시터 상세정보 */}
      <Stack.Screen
        name="caregiver-detail-information-screen"
        component={CaregiverDetailInformationScreen}
        // TODO: web 에서 스타일링 고장남. 고쳐야 함
        options={{
          headerTransparent: true,
          headerLeft: (props) => (
            <Pressable
              onPress={() => {
                goBack()
              }}
            >
              <Image style={{ width: 28, height: 28 }} source={images.go_back} />
            </Pressable>
          ),
          // title: null,
          headerTitle: "",
        }}
      />

      {/* 결제 정보 */}
      <Stack.Screen
        name="payment-screen"
        component={PaymentScreen}
        options={{
          title: "결제 정보",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 리뷰 전체보기 */}
      <Stack.Screen
        name="all-reviews-screen"
        component={AllReviewsScreen}
        options={{
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 자기소개 전체보기 */}
      <Stack.Screen
        name="caregiver-self-introduction-screen"
        component={CaregiverSelfIntroductionScreen}
        options={{
          title: "자기소개",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 댓글 전체보기 */}
      <Stack.Screen
        name="all-comments-screen"
        component={AllCommentsScreen}
        options={{
          title: "댓글 전체보기",
          header: (props) => <AllCommentsScreenHeader {...props} />,
        }}
      />

      {/* //* 댓글쓰기 */}
      <Stack.Screen
        name="writing-comment-screen"
        component={WritingCommentScreen}
        options={{
          header: (props) => <WritingCommentScreenHeader {...props} />,
        }}
      />

      {/* //* (구)요청사항 */}
      {/* <Stack.Screen
          name="payment-request-screen"
          component={PaymentRequestScreen}
          options={{
            title: "요청사항",
            header: (props) => <GobackAndTitleSpacebetweenHeader {...props} />,
          }}
        /> */}

      {/*// 요청 사항 (결제 직전 스크린 입니다. 이 스크린에서 결제스크린으로 넘어갑니다. )  */}
      <Stack.Screen
        name="make-booking-screen"
        component={MakeBookingScreen}
        options={{
          title: "요청 사항",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* =========================================================================================================== */}
      {/* 테스트 스크린들은 아래에다가 추가해주세요 */}
      {/* =========================================================================================================== */}
      {/* //? 민선 테스트 */}
      <Stack.Screen
        name="minseon-test"
        component={MinseonTest}
        options={{
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //? 위치(지도) 테스트 화면 */}
      {/* <Stack.Screen name="test-map-screen" component={TestMapScreen} /> */}
      <Stack.Screen name="test-web-view-screen" component={TestWebViewScreen} />

      {/* //? 푸시알림 테스트 화면 */}
      <Stack.Screen name="test-push-notification-screen" component={TestPushNotificationScreen} />
      <Stack.Screen
        name="notification-screen"
        component={NotificationScreen}
        options={({ navigation, route }) => ({
          //! FEEDBACK: 컴포넌트로 따로 빼는 방법은 매우 간단합니다. 만드신 컴포넌트를 header prop 에 리턴값이 있는 함수 형태 `() => ()` 로 넣어주면 됩니다. header prop을 그대로 컴포넌트에 넘겨주기위해, spread operator (...) 를 사용해서 {...props} 을 써줘야하는 것을 잊지 마세요!
          header: (props) => <NotificationScreenHeader {...props} />,
        })}
      />

      {/* //? bottom-sheet 테스트 화면 */}
      <Stack.Screen name="test-bottom-sheet" component={TestBottomSheetScreen} />

      {/* //* iamport test */}
      <Stack.Screen
        name="test-iamport-screen"
        component={TestIamportScreen}
        options={{
          title: "결제테스트 세팅",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* iamport test */}
      <Stack.Screen
        name="test-iamport-payment-screen"
        component={TestIamportPaymentScreen}
        options={{
          title: "결제 진행중",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* iamport test */}
      <Stack.Screen
        name="test-iamport-payment-result-screen"
        component={TestIamportPaymentResultScreen}
        options={{
          title: "결제 결과",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* hotfix/network-error */}
      <Stack.Screen
        name="test-network-error-screen"
        component={TestNetworkErrorScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

/**
 * 채팅 스택 || CG - 채팅 스택
 */
export const ChatsStack = observer(function ChatsStack() {
  const {
    userStore: { type },
  } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="temp-chat-screen"
    >
      {/* //* 채팅 메인 */}
      <Stack.Screen
        name="temp-chat-screen"
        component={TempChatScreen}
        options={{
          header: (props) =>
            type === Type.CLIENT ? <HomeScreenHeader {...props} /> : <CgScreenHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
})

/**
 * 내정보 스택
 */
export const MypageStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="mypage-screen"
    >
      {/* //* 마이페이지 메인 */}
      <Stack.Screen
        name="mypage-screen"
        component={MypageScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />

      {/* //* 반려동물 전체보기 */}
      <Stack.Screen
        name="all-pets-screen"
        component={AllPetsScreen}
        options={{
          title: "나의 반려동물",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 환경설정 스크린 */}
      <Stack.Screen
        name="setting-screen"
        component={SettingScreen}
        options={{
          title: "환경설정",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 고객 센터 스크린 */}
      <Stack.Screen
        name="service-center-screen"
        component={ServiceCenterScreen}
        options={{
          title: "고객 센터",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 내 프로필 관리 */}
      <Stack.Screen
        name="edit-mypage-screen"
        component={EditMypageScreen}
        options={({ navigation, route }) => ({
          //! FEEDBACK: 컴포넌트로 따로 빼는 방법은 매우 간단합니다. 만드신 컴포넌트를 header prop 에 리턴값이 있는 함수 형태 `() => ()` 로 넣어주면 됩니다. header prop을 그대로 컴포넌트에 넘겨주기위해, spread operator (...) 를 사용해서 {...props} 을 써줘야하는 것을 잊지 마세요!
          headerShadowVisible: false,
          header: (props) => <EditMypageScreenHeader {...props} />,
          /*//?headerTitle은 ios 에서 가운데 정렬이 기본이라 위의 headerleft 에서 다 해결했는데 괜찮은걸까.... 
             * headerTitleAlign: "left",
            headerTitle: (props) => (
              <PreMed18 style={{ marginLeft: 0 }}> {"내 프로필 관리"}</PreMed18>
            ),*/
          headerTitle: "",
        })}
      />

      {/* //* 반려동물 등록 */}
      <Stack.Screen
        name="add-pet-screen"
        component={AddPetScreen}
        options={{
          title: "반려동물 등록",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 반려동물 정보 수정 */}
      <Stack.Screen
        name="edit-pet-info-screen"
        component={EditPetInfoScreen}
        options={({ navigation, route }) => ({
          //?need? headerShadowVisible: false,
          title: "반려동물 정보 수정",
          header: (props) => <EditPetInfoScreenHeader {...props} />,

          //?headerTitle: "",
        })}
      />
    </Stack.Navigator>
  )
}
