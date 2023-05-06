import React, { FC, useCallback, useEffect, useState } from "react"
import {
  ViewStyle,
  View,
  ImageBackground,
  FlatList,
  Image,
  Pressable,
  BackHandler,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate, goBack, navigationRef } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
  DotsIndicator,
  PreMed14,
  ScreenRootView,
  UserOrPetProfileInfo,
  CustomInputModal,
  WeightModal,
  BirthdayModal,
} from "#components"
import { Pets } from "./dummy-data"
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import { BODY, DEVICE_SCREEN_WIDTH, LBG, STANDARD_WIDTH } from "#theme"
import { images } from "#images"
//?!import {ImagePicker}
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const imagess = [
  {
    id: "1",
    profileImg: "https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_1280.jpg",
  },
  {
    id: "2",
    profileImg: "https://cdn.pixabay.com/photo/2016/01/05/17/51/maltese-1123016_1280.jpg",
  },
  {
    id: "3",
    profileImg: "https://cdn.pixabay.com/photo/2018/04/23/14/38/dog-3344414_1280.jpg",
  },
  {
    id: "4",
    profileImg: "https://cdn.pixabay.com/photo/2019/11/08/11/56/kitten-4611189_1280.jpg",
  },
  {
    id: "5",
    profileImg: "https://cdn.pixabay.com/photo/2016/03/28/10/05/kitten-1285341_1280.jpg",
  },
]

export const EditPetInfoScreen: FC<
  StackScreenProps<NavigatorParamList, "edit-pet-info-screen">
> = observer(function EditPetInfoScreen() {
  const route = useRoute()
  const navigation = useNavigation()

  //* 수정(연필) 버튼 눌렀는지 안눌렀는지 판별하는 변수. 즉, 수정 가능 상태인지 아닌지
  const editable = route.params?.editable

  //*현재 펫 데이터 가져오기 (일단은 더미데이터)
  const currentPet = Pets.find((Pet) => Pet.id === 1)

  //*화면에서 이름 부분에 들어갈 데이터
  const [name, setName] = useState(currentPet.name)

  //*몸무게 + kg 넣고 저장
  const [weight, setWeight] = useState(currentPet.weight)

  //*생년월일 저장
  const [birthday, setBirthday] = useState(currentPet.birthday)

  //*성별 한국어로 변환
  const sex = currentPet.sex === "female" ? "여" : "남"

  //*중성화 여부 한국어로 변환
  const Neutralizated = currentPet.isNeutralizated === true ? "함" : "안 함"

  //* birthday 자르는 함수? 장치? 필요

  //*수정 불가 상태 (수정(연필) 버튼 보이는 상태)로 만들기
  const notEditable = () => {
    navigation.setParams({ editable: false }) //? 왜 object 없다고 하는지?
  }

  //*닉네임 누르면 모달 창 뜨게 관리
  const [nameTouched, setNameTouched] = useState(false)

  //*이름 모달창에서 모달 창 닫을때 넣어주는 함수
  const handleNameModalHide = () => {
    setNameTouched(false)
  }

  //*모달창에서 이름 변경시 사용 함수
  const handleNameInput = (newName) => {
    setName(newName)
  }

  //*몸무게 누르면 모달 창 뜨게 관리
  const [weightTouched, setWeightTouched] = useState(false)

  //*몸무게 모달창에서 모달 창 닫을때 넣어주는 함수
  const handleweightModalHide = () => {
    setWeightTouched(false)
  }

  //*모달창에서 몸무게 변경시 사용 함수
  const handleWeightInput = (newWeight) => {
    setWeight(newWeight)
  }

  //*생년월일 누르면 모달 창 뜨게 관리
  const [birthdayTouched, setBirthdayTouched] = useState(false)

  //*생년월일 모달창에서 모달 창 닫을때 넣어주는 함수
  const handleBirthdayModalHide = () => {
    setBirthdayTouched(false)
  }

  //*모달창에서 생년월일 변경시 사용 함수
  const handleBirthdayInput = (newBirthday) => {
    //TODO 벌스데이 숫자 나눠서 형식 맞춰서 넣어주기 함수
    setBirthday(newBirthday)
  }

  const [currentImage, setCurrentImage] = useState(0)

  const onFlatlistUpdate = useCallback(({ viewableItems }) => {
    // ? 선택된 이미지, 즉 viewableItems 의 index 값을 activeIndex 로 설정.
    // ? 왜 viewableItems[0] 인지는 console.log(viewableItems); 로 보면 이해 갈꺼임
    if (viewableItems.length > 0) {
      setCurrentImage(viewableItems[0].index || 0)
    }
  }, [])

  //* Prevent to leave screen - Back button handler
  //* ref: https://reactnative.dev/docs/backhandler
  //* ref: https://reactnavigation.org/docs/custom-android-back-button-handling/

  const onBackPress = () => {
    Alert.alert("편집을 취소하시겠어요?", "저장하지 않으면 내용이 유실돼요!", [
      {
        text: "남아있을래요",
        style: "cancel",
        onPress: () => null,
      },
      {
        text: "떠날래요",
        style: "destructive",
        onPress: () => {
          goBack()
        },
      },
    ])
    return true
  }
  useFocusEffect(
    useCallback(() => {
      if (editable) {
        const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress)

        return () => subscription.remove()
      } else return undefined
    }, [editable]),
  )

  useEffect(() => {
    const backOut = navigation.addListener("beforeRemove", (i) => {
      console.log("backpressed!!")
      if (editable) {
        i.preventDefault()
        onBackPress()
      }
    })
    return backOut
  }, [editable, navigation])

  return (
    //*저장하기 버튼이 항상 화면 하단에 있게 하기 위해 scroolview 바깥쪽 view 하나 더 필요.
    <View style={{ flex: 1 }}>
      <ScreenRootView testID="EditPetInfo" preset="scroll" style={{ paddingHorizontal: 0 }}>
        <View>
          <FlatList
            data={imagess}
            renderItem={(
              { item, index }, //! renderItem 에다가 사용하는 params 는 item 이다. 딴걸로 바꿔 쓰지 말 것!!!
            ) => (
              <ImageBackground
                source={{ uri: item.profileImg }}
                style={{
                  width: 390,

                  height: 240,

                  // margin: 2,
                }}
                key={index} //? Key Warning 에러 해결.
              >
                <Pressable
                  onPress={() => {
                    alert("이미지 등록 준비중입니다.")
                  }}
                  style={{ position: "absolute", right: 16, bottom: 8 }}
                >
                  <Image source={images.camera_white} style={{ width: 42, height: 42 }} />
                </Pressable>
              </ImageBackground>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={DEVICE_SCREEN_WIDTH}
            snapToAlignment={"end"}
            decelerationRate={"fast"}
            //? 표출되는 이미지 요소가 바뀌는 기준을 설정.
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 51,
            }}
            //? 이미지가 바뀌었을때 실행 할 행동 설정.
            onViewableItemsChanged={onFlatlistUpdate}
          />
          <DotsIndicator items={imagess} activeIndex={currentImage} style={{ marginTop: -28 }} />
        </View>

        <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
          {editable ? (
            <Pressable
              onPress={() => {
                setNameTouched(true)
              }}
            >
              <UserOrPetProfileInfo title="이름" profileInfo={name} showOption={false} />
            </Pressable>
          ) : (
            <UserOrPetProfileInfo title="이름" profileInfo={name} showOption={false} />
          )}
          {editable ? (
            <Pressable
              onPress={() => {
                setBirthdayTouched(true)
              }}
            >
              <UserOrPetProfileInfo title="생년월일" profileInfo={birthday} showOption={false} />
            </Pressable>
          ) : (
            <UserOrPetProfileInfo title="생년월일" profileInfo={birthday} showOption={false} />
          )}

          <UserOrPetProfileInfo title="품종" profileInfo={currentPet.species} showOption={false} />

          <UserOrPetProfileInfo title="크기" profileInfo={currentPet.petType} showOption={false} />
          {editable ? (
            <Pressable
              onPress={() => {
                setWeightTouched(true)
              }}
            >
              <UserOrPetProfileInfo title="몸무게" profileInfo={weight + "kg"} showOption={false} />
            </Pressable>
          ) : (
            <UserOrPetProfileInfo title="몸무게" profileInfo={weight + "kg"} showOption={false} />
          )}

          <UserOrPetProfileInfo title="성별" profileInfo={sex} showOption={false} />
          <UserOrPetProfileInfo title="중성화여부" profileInfo={Neutralizated} showOption={false} />
          {/* //? ios 에서 키보드 올라올 때 창이 자동으로 안맞춰짐. 유저가 직접 스크롤을 내려야함  */}
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{ paddingTop: 20 }}>
              <PreMed14 color={BODY} text="반려동물 소개" style={{ marginBottom: 10 }} />

              <View
                style={{
                  width: "auto",
                  height: "auto",
                  borderRadius: 8,
                  backgroundColor: LBG,
                  marginHorizontal: 0,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                }}
              >
                <TextInput multiline={true} editable={editable}>
                  <PreMed14 color={BODY} text={currentPet.desc} />
                </TextInput>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>

        {/* //*닉네임 관리 모달 창  */}
        <CustomInputModal
          visibleState={nameTouched}
          handleModalHide={handleNameModalHide}
          title="이름"
          controlMode="userNickname"
          handleInput={handleNameInput}
          placeholderInput="pet"
          validateFunction={() => {
            return false
          }}
        />
        {/* //*몸무게 관리 모달 창 */}
        <WeightModal
          visibleState={weightTouched}
          handleModalHide={handleweightModalHide}
          title="몸무게"
          handleInput={handleWeightInput}
        />
        {/* //*생일 관리 모달 창  */}
        <BirthdayModal
          visibleState={birthdayTouched}
          handleModalHide={handleBirthdayModalHide}
          title="생년월일"
          handleInput={handleBirthdayInput}
        />
        {/* //*저장하기 버튼이 화면 최하단의 내용을 가리지 않게 하기 위한 여유공간 */}
        {editable && <View style={{ height: 60 }} />}
      </ScreenRootView>
      {/* //*저장하기 버튼 */}
      {editable && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            zIndex: 0,
            paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          }}
        >
          <ConditionalButton
            label="저장하기"
            isActivated={true}
            style={{
              marginTop: "auto",
              marginBottom: 0,
            }}
            onPress={() => {
              notEditable() //* 저장하기를 누르면, 수정 불가 화면 + 편집버튼 (연필) 보이기
              //TODO pet data 실제로 변경하는 코드 필요 (변경된 정보들로 저장 (process -> 실제로 한 정보가 변경 되었다면 저장 보내서 backend 데이터 건들기 ))
            }}
          />
        </View>
      )}
    </View>
  )
})
