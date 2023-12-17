import React, { FC, useCallback, useEffect, useState } from "react"
import {
  View,
  ImageBackground,
  FlatList,
  Image,
  BackHandler,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, goBack, navigate } from "#navigators"
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
  CustomImagePicker,
  PickerImage,
} from "#components"
import { useFocusEffect, RouteProp } from "@react-navigation/native"
import { BODY, BOTTOM_HEIGHT, DEVICE_SCREEN_WIDTH, HEAD_LINE } from "#theme"
import { images } from "#images"
import { PRETENDARD_MEDIUM } from "#fonts"
import { styles } from "./styles"
import { ScrollView } from "react-native-gesture-handler"
import { updatePet } from "../../../../services/axios/pets"
import { uploadURIS } from "#axios"
import { useKeyboardShown } from "../../../../utils/hooks"
import { HandleType } from "../../../../services/axios/types/creches.visitings.common.types"

export type 훅전용NavigatiorParamList<스크린이름들 extends keyof NavigatorParamList> = RouteProp<
  NavigatorParamList,
  스크린이름들
>

export const EditPetInfoScreen: FC<
  StackScreenProps<NavigatorParamList, "edit-pet-info-screen">
> = observer(function EditPetInfoScreen({ route, navigation }) {
  const keyboardShown = useKeyboardShown()

  //*현재 펫 데이터 가져오기 (일단은 더미데이터)
  const pet = route.params.pet

  //* 수정(연필) 버튼 눌렀는지 안눌렀는지 판별하는 변수. 즉, 수정 가능 상태인지 아닌지
  const editable = route.params?.editable

  //*뒤에 버튼 눌림 감지
  const isBackPressed = route.params?.isBackPressed

  /**
   * 변화 감지 변수
   * 변경내역이 있을 경우 true 를 반환한다.
   *
   * NOTE: 이 경우처럼, 유도되는 state 를 useState 를 사용해서 관리하는 것은 적절하지 않다. - TO: @hycv
   * 하지만, 리팩토링 하는 것이 더 많은 시간이 소요될 것으로 판단되어, 수정하지 않았다. - FROM: @smnchoi
   * */
  const [anyChangeMade, setAnyChangeMade] = useState(false)

  //*화면에서 이름 부분에 들어갈 데이터
  const [name, setName] = useState(pet.name)

  //*몸무게 + kg 넣고 저장
  const [weight, setWeight] = useState(pet.weight)

  //*생년월일 저장
  const [birthday, setBirthday] = useState(pet.birthday.slice(0, 10))

  //*성별 한국어로 변환
  const sex = pet.sex === "FEMALE" ? "여" : "남"

  let _petType = ""
  switch (pet.petType) {
    case HandleType.SMALL:
      _petType = "소형"
      break
    case HandleType.MEDIUM:
      _petType = "중형"
      break
    case HandleType.LARGE:
      _petType = "대형"
      break
  }

  //*중성화 여부 한국어로 변환
  const neutralizated = pet.isNeutralizated === true ? "함" : "안 함"

  //*수정 불가 상태 (수정(연필) 버튼 보이는 상태)로 만들기
  const notEditable = useCallback(() => {
    navigation.setParams({ editable: false })
  }, [navigation])

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
    formatBirthdayInput(newBirthday)
    isChangeMade()
  }

  //*반려동물 소개 관련 변수
  const [text, setText] = useState(pet.desc)

  //*반려동물 소개 text 변화 함수
  const handleTextChange = (newText) => {
    setText(newText)
    isChangeMade()
  }

  // 펫이미지 편집 코드 BEGIN ======================================================================================================

  //*image 관련 변수,함수들
  //* image
  const petImages: PickerImage[] = pet.images.map((image) => ({
    uri: image,
    type: "image", // 임시값. 수정필요
    name: "image", // 임시값. 수정필요
  }))
  const [selectedImages, setSelectedImages] = useState<PickerImage[]>(petImages || [])
  const [currentImage, setCurrentImage] = useState<number>(0)
  const [isSelectingImages, setIsSelectingImages] = useState<boolean>(false)

  const onFlatlistUpdate = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentImage(viewableItems[0].index || 0)
    }
  }, [])

  // 펫이미지 편집 코드 ENDED ======================================================================================================

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
    notEditable()
    navigation.setParams({ editable: false })
    setAnyChangeMade(false)
    //*화면속 바뀐 정보 초기화
    setName(pet.name)
    setBirthday(pet.birthday)
    setWeight(pet.weight)
    setText(pet.desc)
    // 뒤로가기
    goBack()
  }

  //*andorid 용 하드웨어 goback 핸들링
  //* Prevent to leave screen - Back button handler
  //* ref: https://reactnative.dev/docs/backhandler
  //* ref: https://reactnavigation.org/docs/custom-android-back-button-handling/
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
    }, [anyChangeMade, notEditable]),
  )

  //*ios + android 에서 둘 다 해당되는 back handle : 수정 상태에서 헤더의 go back 을 눌렀을 때
  useEffect(() => {
    //*수정한게 있다면 모달 창 띄우기
    if (isBackPressed && anyChangeMade) {
      setHandleGoBack(true)
    } else if (isBackPressed) {
      //*수정한게 없다면 그냥 뒤로 나가지기
      notEditable()
      // 뒤로가기
      goBack()
    }
  }, [isBackPressed, notEditable, navigation, anyChangeMade])

  /**
   * [저장하기 버튼]
   * - editable 일때 표츌
   * - Modal 창이 켜져있다면 표출하지 않음
   * - 소프트웨어 키보드가 올라와있다면 표출하지 않음
   *  */
  const showSaveButton =
    editable && !(nameTouched || weightTouched || birthdayTouched || handleGoBack) && !keyboardShown

  //* 본문 코드 :
  return (
    <Screen testID="EditPetInfo" style={{ paddingHorizontal: 0 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: BOTTOM_HEIGHT }}>
        <View>
          {/* //*이미지 */}
          {!isSelectingImages ? (
            selectedImages.length !== 0 ? (
              <FlatList
                data={selectedImages.map((image) => image.uri)}
                renderItem={(
                  { item, index }, //! renderItem 에다가 사용하는 params 는 item 이다. 딴걸로 바꿔 쓰지 말 것!!!
                ) => (
                  <ImageBackground
                    source={{ uri: item }}
                    style={{
                      width: DEVICE_SCREEN_WIDTH,
                      height: 240,
                    }}
                    key={index}
                  >
                    {editable && (
                      <TouchableOpacity
                        onPress={() => {
                          setIsSelectingImages(true)
                          isChangeMade()
                        }}
                        style={{
                          position: "absolute",
                          right: 0,
                          bottom: 0,
                          padding: 20,
                        }}
                      >
                        <Image source={images.camera_white} style={{ width: 42, height: 42 }} />
                      </TouchableOpacity>
                    )}
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
            ) : (
              <ImageBackground
                source={images.default_pet_image_60}
                style={{
                  width: DEVICE_SCREEN_WIDTH,
                  height: 240,
                }}
              >
                {editable && (
                  <TouchableOpacity
                    onPress={() => {
                      setIsSelectingImages(true)
                      isChangeMade()
                    }}
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      padding: 20,
                    }}
                  >
                    <Image source={images.camera_white} style={{ width: 42, height: 42 }} />
                  </TouchableOpacity>
                )}
              </ImageBackground>
            )
          ) : (
            <CustomImagePicker
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              submitButtonText="사진 추가하기"
              selectionLimit={5}
              style={{ marginTop: 20, paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
            />
          )}

          {!isSelectingImages && (
            <DotsIndicator
              items={selectedImages.map((image) => image.uri)}
              activeIndex={currentImage}
              style={{ marginTop: -28 }}
            />
          )}
        </View>

        <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
          {/* //*이름 */}
          <UserOrPetProfileInfo
            title="이름"
            profileInfo={name}
            showOption={false}
            additionalPadding={35 + 7}
            onPress={
              editable
                ? () => {
                    setNameTouched(true)
                  }
                : null
            }
          />

          {/* //*생년월일 */}
          <UserOrPetProfileInfo
            title="생년월일"
            profileInfo={birthday}
            showOption={false}
            additionalPadding={35}
            onPress={
              editable
                ? () => {
                    setBirthdayTouched(true)
                  }
                : null
            }
          />
          {editable && (
            <PreMed12
              color={BODY}
              text="* 반려동물의 생년월일을 모를 경우, 추청 생년월일을 입력해주세요."
              style={{ marginTop: 3 }}
            />
          )}

          <UserOrPetProfileInfo
            title="품종"
            profileInfo={pet.species.name}
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
            profileInfo={_petType}
            showOption={editable}
            additionalPadding={35}
          />

          {/* //*몸무게 */}
          <UserOrPetProfileInfo
            title="몸무게"
            profileInfo={weight + "kg"}
            showOption={false}
            additionalPadding={35}
            onPress={
              editable
                ? () => {
                    setWeightTouched(true)
                  }
                : null
            }
          />

          <UserOrPetProfileInfo
            title="중성화여부"
            profileInfo={neutralizated}
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
                  style={{
                    fontFamily: PRETENDARD_MEDIUM,
                    fontSize: 14,
                    color: HEAD_LINE,
                  }}
                  multiline={true}
                  blurOnSubmit
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
        defaultValue={name}
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
        defaultValue={weight}
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
            isActivated={anyChangeMade}
            onPress={async () => {
              if (anyChangeMade === true) {
                setAnyChangeMade(false)
              }
              notEditable() //* 저장하기를 누르면, 수정 불가 화면 + 편집버튼 (연필) 보이기

              let imageUriList = []
              if (selectedImages.length === 0) {
                imageUriList = []
              } else if (selectedImages === petImages) {
                imageUriList = []
              } else {
                const addedImages = selectedImages.filter((image) => !petImages.includes(image))
                imageUriList = await uploadURIS(addedImages)
              }

              updatePet(pet.id, {
                name: name,
                age: pet.age,
                sex: pet.sex,
                images: imageUriList,
                weight: weight,
                isNeutralizated: pet.isNeutralizated,
                desc: text,
                //userId: 25, //! pet 데이터 수정시에는 userId 필요없음 - 생성시에만 필요함.
                speciesName: pet.species.name,
                familyType: pet.species.familyType,
                birthday: birthday,
              }).then((res) => {
                if (res.isSuccess) {
                  navigate("all-pets-screen", { isSaved: true })
                } else {
                  alert("수정에 실패했습니다.")
                }
              })
            }}
          />
        </View>
      )}
    </Screen>
  )
})
