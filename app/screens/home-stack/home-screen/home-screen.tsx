import React, { FC, useState, useCallback, useEffect } from "react"
import { FlatList, ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Screen,
  Row,
  ServiceChoiceButton,
  SitterProfileButton,
  DotsIndicator,
  RowRoundedButton,
  VisitingDropOffSwitchButton,
  PreBol20,
  PreBol18,
  BASIC_BACKGROUND_PADDING_WIDTH,
} from "../../../components"
import { navigate, NavigatorParamList } from "../../../navigators"
import { BODY, SUB_HEAD_LINE } from "../../../theme"
import { petsittersDummy, trainersDummy } from "./dummy-data"
import { images } from "../../../../assets/images"
import { getCreche, getCrechePetsitters, getPosts, createCreche } from "../../../services/axios"
import { useStores } from "../../../models"
import { delay } from "../../../utils/delay"
import { consoleInfoAsync } from "../../../utils/console-async"
import { useFocusEffect } from "@react-navigation/native"
import { useShowBottomTab } from "../../../utils/hooks"

const FLATLIST_PADDING_VERTICAL = 6 //? FlatList 내부의 있는 요소에 그림자가 있을 경우, FlatList 의 contentContainerStyle 에 padding 이 없을 경우, 그림자가 짤린다
const FLATLIST_PADDING_HORIZONTAL = 10 //? ""

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home-screen">> = observer(
  function HomeScreen({ navigation, route }) {
    useShowBottomTab(navigation)

    const {
      userStore: { onSwitchingType, setOnSwitchingTypeFalse },
    } = useStores()

    const [isOn, setIsOn] = useState(false)
    const toggle = () => {
      isOn ? setIsOn(false) : setIsOn(true)
    }

    //? 기본값은 "방문" 으로 한다 (기획) _
    const [petsitters, setPetsitters] = useState(petsittersDummy)
    const [trainers, settrainers] = useState(trainersDummy)

    const [isVisitingPetSitter, setIsVisitingPetSitter] = useState(true)
    const [isVisitingTrainer, setIsVisitingTrainer] = useState(true)
    const [selectedPetsitter, setSelectedPetsitter] = useState(0)
    const [selectedTrainer, setSelectedTrainer] = useState(0)

    useEffect(() => {
      isVisitingPetSitter
        ? setPetsitters(petsittersDummy.filter((item) => item.isVisiting === true))
        : setPetsitters(petsittersDummy.filter((item) => item.isDropOff === true))
    }, [isVisitingPetSitter])

    useEffect(() => {
      isVisitingTrainer
        ? settrainers(trainersDummy.filter((item) => item.isVisiting === true))
        : settrainers(trainersDummy.filter((item) => item.isDropOff === true))
    }, [isVisitingTrainer])

    const onPetsitterFlatlistUpdate = useCallback(({ viewableItems }) => {
      // ? 선택된 이미지, 즉 viewableItems 의 index 값을 activeIndex 로 설정.
      // ? 왜 viewableItems[0] 인지는 console.log(viewableItems); 로 보면 이해 갈꺼임
      if (viewableItems.length > 0) {
        setSelectedPetsitter(viewableItems[0].index || 0)
      }
      // console.log(viewableItems)
    }, [])

    const onTrainerFlatlistUpdate = useCallback(({ viewableItems }) => {
      if (viewableItems.length > 0) {
        setSelectedTrainer(viewableItems[0].index || 0)
      }
    }, [])

    /**
     * 모드 전환 도중 앱 충돌로 인한 비정상적인 종료시, 재실행하면 무한 로딩에 갇힐 수 있음
     * 이를 방지하기 위해, 시간차이를 두고 검증하여, onSwitchingType 을 false 로 만들어줍니다.
     * */
    const forceOnSwtichingTypeFalse = async () => {
      await delay(3000)
      if (onSwitchingType) {
        setOnSwitchingTypeFalse()
        await consoleInfoAsync("비정상적인 onSwitchingType 초기화 됨 - HomeScreen", 100)
      }
    }

    useEffect(() => {
      return () => {
        forceOnSwtichingTypeFalse()
      }
    }, [])

    return (
      <Screen testID="HomeScreen" preset="fixed" style={{ paddingHorizontal: 0 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: "white",
          }}
        >
          <RowRoundedButton
            onPress={() => {
              //TODO: params 값 추가해줘야 함
              // navigate("test-map-screen")
              // alert("추후, 위치를 선택할 수 있는 화면이 추가될 예정입니다 😉")
              // getCrechePetsitters(7)

              // getCreche(17)

              createCreche({
                userId: 2,
                title: "ENFP의 친화력 - 3",
                address: "경기도 안산시 사동 한양대학로 55",
                detailAddress: "제5공학관 지하1층 창업3실",
                desc: "강아지 3년 기른 경력으로 보살핍니다.",
                maxUnit: 100,
                handleType: ["대형", "중형", "소형"],
                roomType: "아파트",
                images: { imageUrl: "이미지 주소", desc: "이미지 설명" },
                services: ["산책, 목욕, 미용"],
                defaultFee: 9999,
                extraSizeFee: {
                  SMALL: 999,
                  MEDIUM: 10,
                  LARGE: 0,
                },
                promoted: false,
                facilities: ["공원, 동물병원"],
              })
            }}
            image={images.gps}
            text={"경기 안산시 상록구 한양대학로 55"}
            textColor={BODY}
            style={{
              marginTop: 18,
              paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
            }}
          />

          {/*//? Title */}
          <PreBol20
            text="케어기버에게 요청할 서비스를"
            style={{ marginTop: 50, paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
          />
          <PreBol20
            text="선택해주세요!"
            style={{ marginTop: 8, paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
          />

          {/*//? 펫시팅 | 훈련 선택 박스 */}
          <Row
            style={{
              marginTop: 20,
              width: "100%",
              paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
              justifyContent: "space-between",
            }}
          >
            <ServiceChoiceButton
              onPress={() => {
                navigate("search-screen", { service: "펫시팅" })
              }}
              title="펫시팅"
              subtitle={"산책, 간식 주기 등 펫을\n돌봐주는 서비스입니다."}
            />
            <ServiceChoiceButton
              onPress={() => {
                navigate("search-screen", { service: "훈련" })
              }}
              title="훈련"
              subtitle={"손 주기, 기다려 등의 훈련\n을 시켜주는 서비스입니다."}
              style={{ marginLeft: "auto" }}
            />
          </Row>

          {/*//? Title */}
          <PreBol20
            text="내 주변 케어기버 둘러보기"
            style={{ marginTop: 60, paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
          />
          {/*//? 펫시터 */}
          <Row style={{ marginTop: 20, paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
            <PreBol18 text="펫시터" color={SUB_HEAD_LINE} />
            {/*//? 방문/위탁 토글 버튼 */}
            <VisitingDropOffSwitchButton
              state={isVisitingPetSitter}
              setState={setIsVisitingPetSitter}
              style={{ marginLeft: "auto" }}
            />
          </Row>

          {/*//* 내 주변 펫시터들 */}
          <FlatList
            data={petsitters}
            renderItem={(
              { item, index }, //! renderItem 에다가 사용하는 params 는 item 이다. 딴걸로 바꿔 쓰지 말 것!!!
            ) => (
              <SitterProfileButton
                onPress={() => {
                  //? 상세정보 스크린으로 이동
                  //TODO: params 값 추가해줘야 함
                  navigate("caregiver-detail-information-screen", { sitterData: item })
                }}
                name={item.name}
                rating={item.rating}
                desc={item.desc}
                image={item.profileImg}
                style={{ marginLeft: index === 0 ? 0 : 10, zIndex: 10 }}
              />
            )}
            contentContainerStyle={{
              paddingVertical: 2 * FLATLIST_PADDING_VERTICAL,
              paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            // snapToInterval={windowWidth - 20}
            snapToAlignment={"end"}
            decelerationRate={"fast"}
            //? 표출되는 이미지 요소가 바뀌는 기준을 설정.
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 120, //? 이미지의 120 퍼센트가 표출되면 대상 이미지 변경으로 인식
            }}
            //? 이미지가 바뀌었을때 실행 할 행동 설정.
            onViewableItemsChanged={onPetsitterFlatlistUpdate}
            // onViewableItemsChanged={(info) => console.log(info)}
          />
          <DotsIndicator
            items={petsitters}
            activeIndex={selectedPetsitter}
            style={{
              marginTop: 16 - FLATLIST_PADDING_VERTICAL,
              paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
            }}
          />

          {/*//? 훈련사 */}
          <Row
            style={{
              marginTop: 60,
              backgroundColor: "white",
              paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
            }}
          >
            {/*//? 훈련사 */}
            <PreBol18 text="훈련사" color={SUB_HEAD_LINE} />
            {/*//? 방문/위탁 토글 버튼 */}
            <VisitingDropOffSwitchButton
              state={isVisitingTrainer}
              setState={setIsVisitingTrainer}
              style={{ marginLeft: "auto" }}
            />
          </Row>

          {/*//* 내 주변 훈련사들 */}
          <FlatList
            data={trainers}
            renderItem={(
              { item, index }, //! renderItem 에다가 사용하는 params 는 item 이다. 딴걸로 바꿔 쓰지 말 것!!!
            ) => (
              <SitterProfileButton
                onPress={() => {
                  //? 상세정보 스크린으로 이동
                  //TODO: params 값 추가해줘야 함
                  navigate("caregiver-detail-information-screen", { sitterData: item })
                }}
                name={item.name}
                rating={item.rating}
                desc={item.desc}
                image={item.profileImg}
                style={{ marginLeft: index === 0 ? 0 : 10, zIndex: 1 }}
              />
            )}
            contentContainerStyle={{
              paddingVertical: 2 * FLATLIST_PADDING_VERTICAL,
              paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            // snapToInterval={windowWidth - 20}
            snapToAlignment={"end"}
            decelerationRate={"fast"}
            //? 표출되는 이미지 요소가 바뀌는 기준을 설정.
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 120, //? 이미지의 120 퍼센트가 표출되면 대상 이미지 변경으로 인식
            }}
            onViewableItemsChanged={onTrainerFlatlistUpdate}
          />
          <DotsIndicator
            items={trainers}
            activeIndex={selectedTrainer}
            style={{
              marginTop: 16 - FLATLIST_PADDING_VERTICAL,
              marginBottom: 60, //! 예외적으로 marginBottom 허용
              paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
            }}
          />
        </ScrollView>
      </Screen>
    )
  },
)
