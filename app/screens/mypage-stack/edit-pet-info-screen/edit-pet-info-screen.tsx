import React, { FC, useCallback, useEffect, useState } from "react"
import {
  View,
  ImageBackground,
  FlatList,
  Image,
  Pressable,
  BackHandler,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, goBack } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
  DotsIndicator,
  PreMed14,
  Screen,
  UserOrPetProfileInfo,
  CustomInputModal,
  WeightModal,
  BirthdayModal,
  CustomModal,
  PreMed12,
} from "#components"
import { Pets } from "./dummy-data"
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import { BODY, DEVICE_SCREEN_WIDTH, LBG } from "#theme"
import { images } from "#images"
import { PRETENDARD_MEDIUM } from "#fonts"
import { styles } from "./styles"
import { ScrollView } from "react-native-gesture-handler"

//*images 임시 데이터베이스
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

  //*뒤에 버튼 눌림 감지
  const isBackPressed = route.params?.isBackPressed

  //* 변화 감지 변수
  const [anyChangeMade, setAnyChangeMade] = useState(false)

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

  //*수정 불가 상태 (수정(연필) 버튼 보이는 상태)로 만들기
  const notEditable = () => {
    navigation.setParams({ editable: false }) //? 왜 object 없다고 하는지?
  }

  //*anyChangeMade 를 true 로 바꾸기
  const isChangeMade = () => {
    if (anyChangeMade === false) {
      setAnyChangeMade(true)
    }
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
    isChangeMade()
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
    isChangeMade()
  }

  //*생년월일 누르면 모달 창 뜨게 관리
  const [birthdayTouched, setBirthdayTouched] = useState(false)

  //*생년월일 모달창에서 모달 창 닫을때 넣어주는 함수
  const handleBirthdayModalHide = () => {
    setBirthdayTouched(false)
  }

  //*생년월일 input 받으넋 형식에 맞게 슬라이싱 함수
  const formatBirthdayInput = (birthdayDigits) => {
    const year = birthdayDigits.slice(0, 4)
    const month = birthdayDigits.slice(4, 6)
    const day = birthdayDigits.slice(6, 8)
    const formattedBirthday = `${year}-${month}-${day}`
    setBirthday(formattedBirthday)
  }

  //*모달창에서 생년월일 변경시 사용 함수
  const handleBirthdayInput = (newBirthday) => {
    //TODO 벌스데이 숫자 나눠서 형식 맞춰서 넣어주기 함수
    formatBirthdayInput(newBirthday)
    isChangeMade()
  }

  //*반려동물 소개 관련 변수
  const [text, setText] = useState(currentPet.desc)

  //*반려동물 소개 text 변화 함수
  const handleTextChange = (newText) => {
    setText(newText)
    isChangeMade()
  }

  //*image 관련 변수,함수들
  //* image
  const [currentImage, setCurrentImage] = useState(0)

  const onFlatlistUpdate = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentImage(viewableItems[0].index || 0)
    }
  }, [])

  //* Prevent to leave screen - Back button handler
  //* ref: https://reactnative.dev/docs/backhandler
  //* ref: https://reactnavigation.org/docs/custom-android-back-button-handling/

  //*수정한 후 저장 안하고 goback 시 뜰 모달 visible 조절 변수
  const [handleGoBack, setHandleGoBack] = useState(false)

  //* back handler 모달의 버튼 (both for ios and android)
  //* 계속 수정하기를 눌렀을 때
  const handleKeepEditPress = () => {
    navigation.setParams({ isBackPressed: false })
    setHandleGoBack(false)
    navigation.setParams({ editable: true })
  }
  //*수정 취소를 눌렀을 때
  const handleQuitEditPress = () => {
    navigation.setParams({ isBackPressed: false })
    setHandleGoBack(false)
    goBack()
    navigation.setParams({ editable: false })
    setAnyChangeMade(false)
    //*화면속 바뀐 정보 초기화
    setName(currentPet.name)
    setBirthday(currentPet.birthday)
    setWeight(currentPet.weight)
    setText(currentPet.desc)
  }

  //*andorid 용 하드웨어 goback 핸들링
  useFocusEffect(
    useCallback(() => {
      const androidGoBack = () => {
        if (anyChangeMade) {
          setHandleGoBack(true)
          return true
        } else {
          notEditable()
          return false
        }
      }
      const subscription = BackHandler.addEventListener("hardwareBackPress", androidGoBack)
      return () => {
        subscription.remove()
      }
    }, [anyChangeMade]),
  )

  //*ios + android 에서 둘 다 해당되는 back handle : 수정 상태에서 헤더의 go back 을 눌렀을 때
  useEffect(() => {
    //*수정한게 있다면 모달 창 띄우기
    if (isBackPressed && anyChangeMade) {
      setHandleGoBack(true)
    } else if (isBackPressed) {
      //*수정한게 없다면 그냥 뒤로 나가지기
      goBack()
      notEditable()
      navigation.setParams({ isBackPressed: false })
    }
  }, [isBackPressed])

  /**
   * [저장하기 버튼]
   * - editable 일때 표츌
   * - 단, Modal 창이 켜져있다면 표출하지 않음
   *  */
  const showSaveButton =
    editable && !(nameTouched || weightTouched || birthdayTouched || handleGoBack)

  //* 본문 코드 :
  return (
    <Screen testID="EditPetInfo" style={{ paddingHorizontal: 0 }}>
      <ScrollView>
        <View>
          {/* //*이미지  */}
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
                }}
                key={index}
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
          {/* //*이름 */}
          {editable ? (
            <Pressable
              style={{ paddingTop: 7 }}
              onPress={() => {
                setNameTouched(true)
              }}
            >
              <UserOrPetProfileInfo
                title="이름"
                profileInfo={name}
                showOption={false}
                additionalPadding={35}
              />
            </Pressable>
          ) : (
            <UserOrPetProfileInfo
              title="이름"
              profileInfo={name}
              showOption={false}
              additionalPadding={35}
            />
          )}

          {/* //*생년월일 */}
          {editable ? (
            <View>
              <Pressable
                onPress={() => {
                  setBirthdayTouched(true)
                }}
              >
                <UserOrPetProfileInfo
                  title="생년월일"
                  profileInfo={birthday}
                  showOption={false}
                  additionalPadding={35}
                />
              </Pressable>
              <PreMed12
                color={BODY}
                text="* 반려동물의 생년월일을 모를 경우, 추청 생년월일을 입력해주세요."
                style={{ marginTop: 3 }}
              />
            </View>
          ) : (
            <UserOrPetProfileInfo
              title="생년월일"
              profileInfo={birthday}
              showOption={false}
              additionalPadding={35}
            />
          )}

          <UserOrPetProfileInfo
            title="품종"
            profileInfo={currentPet.species}
            showOption={editable}
            additionalPadding={35}
          />

          <UserOrPetProfileInfo
            title="성별"
            profileInfo={sex}
            showOption={editable}
            additionalPadding={35}
          />

          <UserOrPetProfileInfo
            title="크기"
            profileInfo={currentPet.petType}
            showOption={editable}
            additionalPadding={35}
          />

          {/* //*몸무게 */}
          {editable ? (
            <Pressable
              onPress={() => {
                setWeightTouched(true)
              }}
            >
              <UserOrPetProfileInfo
                title="몸무게"
                profileInfo={weight + "kg"}
                showOption={false}
                additionalPadding={35}
              />
            </Pressable>
          ) : (
            <UserOrPetProfileInfo
              title="몸무게"
              profileInfo={weight + "kg"}
              showOption={false}
              additionalPadding={35}
            />
          )}

          <UserOrPetProfileInfo
            title="중성화여부"
            profileInfo={Neutralizated}
            showOption={editable}
            additionalPadding={35}
          />
          {/* //? ios 에서 키보드 올라올 때 창이 자동으로 안맞춰짐. 유저가 직접 스크롤을 내려야함  */}
          {/* //*반려동물 소개 */}
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{ paddingTop: 35 }}>
              <PreMed14 color={BODY} text="반려동물 소개" style={{ marginBottom: 10 }} />

              <View style={styles.petDescTextBox}>
                <TextInput
                  style={{ fontFamily: PRETENDARD_MEDIUM, fontSize: 14, color: BODY }}
                  multiline={true}
                  editable={editable !== undefined ? editable : false}
                  value={text}
                  onChangeText={handleTextChange}
                />
                {/* <PreMed14 color={BODY} text={text} style={{ marginBottom: 10 }} />
                </TextInput> */}
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>

        {/* //*저장하기 버튼이 화면 최하단의 내용을 가리지 않게 하기 위한 여유공간 */}
        {showSaveButton && <View style={{ height: 60 }} />}
      </ScrollView>

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
          //TODO : 중복 검출 코드  만들기
        }}
      />
      {/* //*몸무게 관리 모달 창 */}
      <WeightModal
        visibleState={weightTouched}
        handleModalHide={handleweightModalHide}
        title="몸무게(kg)"
        handleInput={handleWeightInput}
      />
      {/* //*생일 관리 모달 창  */}
      <BirthdayModal
        visibleState={birthdayTouched}
        handleModalHide={handleBirthdayModalHide}
        title="생년월일"
        handleInput={handleBirthdayInput}
      />
      {/* //*수정 후 back 시 나타나는 경고 모달창  */}
      <CustomModal
        image={images.dog_illustration}
        imageWidth={151}
        imageHeight={156}
        visibleState={handleGoBack}
        title="반려동물 정보 수정을 취소하시겠어요?"
        subtitle="취소하면 지금까지 수정한 정보는 저장되지 않습니다."
        yesBtnText="정보 수정 취소"
        noBtnText="계속 수정하기"
        handleYesPress={handleQuitEditPress}
        handleNoPress={handleKeepEditPress}
      />
      {/* //*저장하기 버튼 */}
      {showSaveButton && (
        <View style={styles.saveBox}>
          <ConditionalButton
            label="저장하기"
            isActivated={true}
            style={{
              marginTop: "auto",
              marginBottom: 0,
            }}
            onPress={() => {
              if (anyChangeMade === true) {
                setAnyChangeMade(false)
              }
              notEditable() //* 저장하기를 누르면, 수정 불가 화면 + 편집버튼 (연필) 보이기
              //TODO pet data 실제로 변경하는 코드 필요 (변경된 정보들로 저장 (process -> 실제로 한 정보가 변경 되었다면 저장 보내서 backend 데이터 건들기 ))
            }}
          />
        </View>
      )}
    </Screen>
  )
})
