import React, { FC, useState, useCallback, useEffect } from "react"
import { FlatList, ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  ScreenRootView,
  Row,
  ServiceChoiceButton,
  SitterProfileButton,
  DotsIndicator,
  RowRoundedButton,
  VisitingDropOffSwitchButton,
  PreBol20,
  PreBol18,
} from "#components"
import { navigate, NavigatorParamList } from "#navigators"
import { HEIGHT, WIDTH, BODY, SUB_HEAD_LINE } from "#theme"
import { petsittersDummy, trainersDummy } from "./dummy-data"
import { images } from "#images"

const FLATLIST_PADDING_VERTICAL = HEIGHT * 6 //? FlatList 내부의 있는 요소에 그림자가 있을 경우, FlatList 의 contentContainerStyle 에 padding 이 없을 경우, 그림자가 짤린다
const FLATLIST_PADDING_HORIZONTAL = WIDTH * 10 //? ""

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home-screen">> = observer(
  ({ navigation, route }) => {
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

    return (
      <ScreenRootView testID="HomeScreen" preset="fixed">
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "white" }}>
          <RowRoundedButton
            onPress={() => {
              //TODO: params 값 추가해줘야 함
              // navigate("test-map-screen")
              alert("추후, 위치를 선택할 수 있는 화면이 추가될 예정입니다 😉")
            }}
            image={images.gps}
            text={"경기 안산시 상록구 한양대학로 55"}
            textColor={BODY}
            style={{ marginTop: HEIGHT * 18 }}
          />

          {/*//? Title */}
          <PreBol20 text="케어기버에게 요청할 서비스를" style={{ marginTop: HEIGHT * 50 }} />
          <PreBol20 text="선택해주세요!" style={{ marginTop: HEIGHT * 8 }} />

          {/*//? 펫시팅 | 훈련 선택 박스 */}
          <Row style={{ marginTop: HEIGHT * 20 }}>
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
          <PreBol20 text="내 주변 케어기버 둘러보기" style={{ marginTop: HEIGHT * 60 }} />
          {/*//? 펫시터 */}
          <Row style={{ marginTop: HEIGHT * 20 }}>
            <PreBol18 text="펫시터" color={SUB_HEAD_LINE} />
            {/*//? 방문/위탁 토글 버튼 */}
            <VisitingDropOffSwitchButton
              state={isVisitingPetSitter}
              setState={setIsVisitingPetSitter}
              style={{ marginLeft: "auto" }}
            />
          </Row>

          {/*//? 펫시터 선택 박스 리스트 Horzontal FaltList*/}
          <Row
            style={{
              marginTop: HEIGHT * (12 - FLATLIST_PADDING_VERTICAL / 2),
              marginLeft: WIDTH * -FLATLIST_PADDING_HORIZONTAL, //? ScreenRootView paddingHorizontal 값 보정
            }}
          >
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
                  style={{ marginLeft: index === 0 ? 0 : WIDTH * 10, zIndex: 10 }}
                />
              )}
              contentContainerStyle={{
                paddingVertical: FLATLIST_PADDING_VERTICAL,
                paddingHorizontal: FLATLIST_PADDING_HORIZONTAL,
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
          </Row>
          <DotsIndicator
            items={petsitters}
            activeIndex={selectedPetsitter}
            style={{ marginTop: HEIGHT * (16 - FLATLIST_PADDING_VERTICAL / 2) }}
          />

          {/*//? 훈련사 */}
          <Row
            style={{
              marginTop: HEIGHT * 60,
              backgroundColor: "white",
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

          {/*//? 훈련사 선택 박스 리스트 Horzontal FaltList*/}
          <Row
            style={{
              marginTop: HEIGHT * (12 - FLATLIST_PADDING_VERTICAL / 2),
              marginLeft: WIDTH * -FLATLIST_PADDING_HORIZONTAL, //? ScreenRootView paddingHorizontal 값 보정
            }}
          >
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
                  style={{ marginLeft: index === 0 ? 0 : WIDTH * 10, zIndex: 1 }}
                />
              )}
              contentContainerStyle={{
                paddingVertical: FLATLIST_PADDING_VERTICAL,
                paddingHorizontal: FLATLIST_PADDING_HORIZONTAL,
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
          </Row>
          <DotsIndicator
            items={trainers}
            activeIndex={selectedTrainer}
            style={{
              marginTop: HEIGHT * (16 - FLATLIST_PADDING_VERTICAL / 2),
              marginBottom: HEIGHT * 60, //! 예외적으로 marginBottom 허용
            }}
          />
        </ScrollView>
      </ScreenRootView>
    )
  },
)
