import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import {
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Image,
  Pressable,
  BackHandler,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { useNavigation, useRoute, useFocusEffect, RouteProp } from "@react-navigation/native"
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
  PreMed16,
  PreBol16,
  Row,
} from "#components"
import {
  BODY,
  BOTTOM_HEIGHT,
  DEVICE_SCREEN_WIDTH,
  DISABLED,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  LBG,
  MIDDLE_LINE,
} from "#theme"
import { images } from "#images"
import { PRETENDARD_MEDIUM } from "#fonts"
import { useKeyboard } from "@react-native-community/hooks"
import { uploadURIS, HandleType, PetSex, FamilyType } from "#axios"

const DESC_VIEW_MIN_HEIGHT = 100 //

export const AddPetScreen: FC<StackScreenProps<NavigatorParamList, "add-pet-screen">> = observer(
  function AddPetScreen({ route, navigation }) {
    const { keyboardShown } = useKeyboard()

    //* 수정(연필) 버튼 눌렀는지 안눌렀는지 판별하는 변수. 즉, 수정 가능 상태인지 아닌지
    // const editable = route.params?.editable
    const editable = true

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

    const [name, setName] = useState("")
    const [familyType, setFamilyType] = useState<FamilyType>(null)
    const [speciesName, setSpeciesName] = useState("")
    const [weight, setWeight] = useState(0)
    const [birthday, setBirthday] = useState("") //1998-02-16
    const [sex, setSex] = useState<PetSex>(null)
    const [petType, setPetType] = useState<HandleType>(null)
    const [isNeutralizated, setIsNeutralizated] = useState<boolean>(null)

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
    const [text, setText] = useState("")

    //*반려동물 소개 text 변화 함수
    const handleTextChange = (newText) => {
      setText(newText)
      isChangeMade()
    }

    // 펫이미지 편집 코드 BEGIN ======================================================================================================

    //*image 관련 변수,함수들
    //* image
    const petImages: PickerImage[] = [].map((image) => ({
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
      setHandleGoBack(false)
    }
    //*수정 취소를 눌렀을 때
    const handleQuitEditPress = () => {
      setHandleGoBack(false)
      goBack()
      setAnyChangeMade(false)
      //*화면속 바뀐 정보 초기화
      setName("")
      setBirthday("")
      setWeight(0)
      setText("")
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
      }
    }, [isBackPressed])

    /**
     * [저장하기 버튼]
     * - editable 일때 표츌
     * - Modal 창이 켜져있다면 표출하지 않음
     * - 소프트웨어 키보드가 올라와있다면 표출하지 않음
     *  */
    const showSaveButton =
      editable &&
      !(nameTouched || weightTouched || birthdayTouched || handleGoBack) &&
      !keyboardShown

    const scrollViewRef = useRef<ScrollView>(null)

    //* 본문 코드 :
    return (
      <Screen style={{ paddingHorizontal: 0 }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            paddingBottom: BOTTOM_HEIGHT + DESC_VIEW_MIN_HEIGHT,
            paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* 기본 정보 BEGIN ============================================================== */}
          <PreBol16 text="반려동물 기본 정보" color={HEAD_LINE} mt={12} />
          {/* 강아지 OR 고양이 */}
          <Row style={{ marginTop: 20, justifyContent: "space-between" }}>
            {/* // ? 강아지 */}
            <Pressable
              style={[
                styles.radioContainer,
                {
                  borderColor: familyType === FamilyType.DOG ? GIVER_CASUAL_NAVY : MIDDLE_LINE,
                },
              ]}
              onPress={() => setFamilyType(FamilyType.DOG)}
            >
              <Image
                source={familyType === FamilyType.DOG ? images.radio_active : images.radio_inactive}
                style={styles.radioImg}
              />
              <PreMed16
                style={{ marginLeft: 6 }}
                text="강아지"
                color={familyType === FamilyType.DOG ? GIVER_CASUAL_NAVY : DISABLED}
              />
            </Pressable>

            {/* // ? 고양이 */}
            <Pressable
              style={[
                styles.radioContainer,
                {
                  borderColor: familyType === FamilyType.CAT ? GIVER_CASUAL_NAVY : MIDDLE_LINE,
                },
              ]}
              onPress={() => setFamilyType(FamilyType.CAT)}
            >
              <Image
                source={familyType === FamilyType.CAT ? images.radio_active : images.radio_inactive}
                style={styles.radioImg}
              />
              <PreMed16
                style={{ marginLeft: 6 }}
                text="고양이"
                color={familyType === FamilyType.CAT ? GIVER_CASUAL_NAVY : DISABLED}
              />
            </Pressable>
          </Row>

          {/* //*이름 */}
          <Pressable
            style={{ paddingTop: 7 }}
            onPress={() => {
              setNameTouched(true)
            }}
          >
            <UserOrPetProfileInfo
              title="이름"
              profileInfo={name || "예) 구름이"}
              showOption={!name}
              additionalPadding={35}
            />
          </Pressable>

          {/* //*생년월일 */}
          <View>
            <Pressable
              onPress={() => {
                setBirthdayTouched(true)
              }}
            >
              <UserOrPetProfileInfo
                title="생년월일"
                profileInfo={birthday || "예) 2005-01-01"}
                showOption={!birthday}
                additionalPadding={35}
              />
            </Pressable>
            <PreMed12
              color={BODY}
              text="* 반려동물의 생년월일을 모를 경우, 추청 생년월일을 입력해주세요."
              style={{ marginTop: 3 }}
            />
          </View>

          <UserOrPetProfileInfo
            title="품종"
            profileInfo={speciesName || "예) 터키시앙고라"}
            showOption={!speciesName}
            additionalPadding={35}
          />

          <UserOrPetProfileInfo
            title="성별"
            profileInfo={sex || "예) 남자"}
            showOption={!sex}
            additionalPadding={35}
          />

          {familyType === FamilyType.DOG && (
            <UserOrPetProfileInfo
              title="크기"
              profileInfo={petType || "예) 소형"}
              showOption={!petType}
              additionalPadding={35}
            />
          )}

          {/* //*몸무게 */}
          <Pressable
            onPress={() => {
              setWeightTouched(true)
            }}
          >
            <UserOrPetProfileInfo
              title="몸무게"
              profileInfo={(!!weight && weight?.toString()) || "예) 7kg"}
              showOption={!weight}
              additionalPadding={35}
            />
          </Pressable>

          {/* 중성화 */}
          <UserOrPetProfileInfo
            title="중성화여부"
            profileInfo={
              isNeutralizated === null ? "예) 함 OR 안 함" : isNeutralizated ? "함" : "안 함"
            }
            showOption={!isNeutralizated}
            additionalPadding={35}
          />
          {/* 기본 정보 ENDED ============================================================== */}

          {/* 세부 정보 BEGIN ============================================================== */}
          <PreBol16 text="반려동물 세부 정보" color={HEAD_LINE} mt={32} />
          {/* //*이미지 */}
          <CustomImagePicker
            style={{ marginTop: 20 }}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            submitButtonText="사진 추가하기"
            selectionLimit={5}
          />

          {/* //? ios 에서 키보드 올라올 때 창이 자동으로 안맞춰짐. 유저가 직접 스크롤을 내려야함  */}
          {/* //*반려동물 소개 */}
          <View style={{ paddingTop: 35, height: "auto", minHeight: DESC_VIEW_MIN_HEIGHT }}>
            <PreMed14 color={BODY} text="반려동물 소개" style={{ marginBottom: 10 }} />

            <View style={styles.petDescTextBox}>
              <TextInput
                style={{
                  fontFamily: PRETENDARD_MEDIUM,
                  fontSize: 14,
                  color: HEAD_LINE,
                }}
                multiline={true}
                editable={editable !== undefined ? editable : false}
                value={text}
                onChangeText={handleTextChange}
                onKeyPress={() => {
                  scrollViewRef.current.scrollToEnd({ animated: true })
                }}
              />
            </View>
          </View>
          {/* 세부 정보 ENDED ============================================================== */}

          {/* //*저장하기 버튼이 화면 최하단의 내용을 가리지 않게 하기 위한 여유공간 */}
          {/* {showSaveButton && <View style={{ height: 60 }} />} */}
          {/* //! 이코드때문에 ScrollView container 사이즈가 비정상적으로 바뀐다! */}
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
              isActivated={anyChangeMade}
              onPress={async () => {
                if (anyChangeMade === true) {
                  setAnyChangeMade(false)
                }

                const imageUriList = await uploadURIS(selectedImages)
                // updatePet(pet.id, {
                //   name: name,
                //   age: pet.age,
                //   sex: pet.sex,
                //   images: imageUriList,
                //   weight: weight,
                //   isNeutralizated: pet.isNeutralizated,
                //   desc: text,
                //   //userId: 25, //! pet 데이터 수정시에는 userId 필요없음 - 생성시에만 필요함.
                //   speciesName: pet.species.name,
                //   familyType: pet.species.familyType,
                //   birthday: birthday,
                // }).then((res) => {
                //   if (res.isSuccess) {
                //     navigate("all-pets-screen", { isSaved: true })
                //   } else {
                //     alert("수정에 실패했습니다.")
                //   }
                // })
              }}
            />
          </View>
        )}
      </Screen>
    )
  },
)

const styles = StyleSheet.create({
  root: {
    //
  },

  radioContainer: {
    width: 174,
    height: 48,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderColor: MIDDLE_LINE,
    borderWidth: 2,
    borderRadius: 9,
  },

  radioImg: {
    width: 16,
    height: 16,
  },

  petDescTextBox: {
    width: "auto",
    height: "auto",
    borderRadius: 8,
    backgroundColor: LBG,
    marginHorizontal: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  saveBox: {
    position: "absolute",
    bottom: BOTTOM_HEIGHT,
    width: "100%",
    zIndex: 0,
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
  },
})
