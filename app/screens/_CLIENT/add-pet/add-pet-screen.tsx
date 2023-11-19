import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  BackHandler,
  TextInput,
  ScrollView,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { useFocusEffect } from "@react-navigation/native"
import { NavigatorParamList, goBack } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
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
  PreReg10,
} from "#components"
import {
  BODY,
  BOTTOM_HEIGHT,
  DISABLED,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  LBG,
  MIDDLE_LINE,
} from "#theme"
import { images } from "#images"
import { PRETENDARD_MEDIUM } from "#fonts"
import { uploadURIS, PetSex, FamilyType, createPet } from "#axios"
import { useStores } from "#models"
import { alertModal } from "../../../utils/alert-modal"
import { useKeyboardShown } from "../../../utils/hooks"

const DESC_VIEW_MIN_HEIGHT = 100 // 반려동물 소개 입력창의 최소 높이

const 성별 = ["남자", "여자"] as const
// const 크기 = ["소형", "중형", "대형"] as const
const 중성화_여부 = ["예", "아니오"] as const

export const AddPetScreen: FC<StackScreenProps<NavigatorParamList, "add-pet-screen">> = observer(
  function AddPetScreen({ route, navigation }) {
    const {
      userStore: { userDetail },
    } = useStores()

    const keyboardShown = useKeyboardShown()

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

    // 기본 정보 BEGIN ==============================================================
    const [familyType, setFamilyType] = useState<FamilyType>(null) // 종 (고양이 OR 강아지)
    const [name, setName] = useState("") // 이름
    const [birthday, setBirthday] = useState("") // 1998-02-16
    const [speciesName, setSpeciesName] = useState("") // 품종
    const [sex, setSex] = useState<PetSex>(null) // 성별
    const [weight, setWeight] = useState(0) // 무게
    const [isNeutralizated, setIsNeutralizated] = useState<boolean>(null) // 중성화여부
    // 기본 정보 ENDED ==============================================================

    //*anyChangeMade 를 true 로 바꾸기
    const isChangeMade = () => {
      if (anyChangeMade === false) {
        setAnyChangeMade(true)
      }
    }

    //*닉네임 누르면 모달 창 뜨게 관리
    const [nameTouched, setNameTouched] = useState(false)

    // 품종 모달
    const [speciesNameTouched, setSpeciesNameTouched] = useState(false)

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
    const [desc, setDesc] = useState("")

    //*반려동물 소개 text 변화 함수
    const handleTextChange = (newText) => {
      setDesc(newText)
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
      setAnyChangeMade(false)
      //*화면속 바뀐 정보 초기화
      setName("")
      setBirthday("")
      setWeight(0)
      setDesc("")
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

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBackPressed])

    /**
     * [저장하기 버튼]
     * - editable 일때 표츌
     * - Modal 창이 켜져있다면 표출하지 않음
     * - 소프트웨어 키보드가 올라와있다면 표출하지 않음
     *  */
    const showSaveButton =
      editable &&
      !(nameTouched || speciesNameTouched || weightTouched || birthdayTouched || handleGoBack) &&
      !keyboardShown

    const scrollViewRef = useRef<ScrollView>(null)

    const isActivated =
      name && familyType && speciesName && !!weight && birthday && sex && isNeutralizated !== null

    const [draftImageUriList, setDraftImageUriList] = useState<string[]>([])

    const missedField = useMemo(() => {
      if (!familyType) {
        return "강아지와 고양이 중에서 선택해주세요."
      }
      if (!name) {
        return "이름을 입력해주세요."
      }
      if (!birthday) {
        return "생년월일을 입력해주세요."
      }
      if (!speciesName) {
        return "품종을 입력해주세요."
      }
      if (!sex) {
        return "성별을 선택해주세요."
      }
      if (!weight) {
        return "몸무게를 입력해주세요."
      }
      if (isNeutralizated === null) {
        return "중성화 여부를 선택해주세요."
      }

      return false
    }, [familyType, name, birthday, speciesName, sex, weight, isNeutralizated])

    // 등록하기 버튼 클릭시 실행되는 함수 - 입력한 정보로 펫 추가
    const onPress = async () => {
      if (!isActivated) {
        return
      }

      if (anyChangeMade === true) {
        setAnyChangeMade(false)
      }

      // createPet() parameter 로 사용되는 이미지 "URI" 값
      let imageUriList = []

      // 임시저장와 선택된 이미지와 같은 수 일 경우,
      // 임시저장된 이미지를 할당한다.
      //! 이미지가 선택되지 않은 경우에도, 이 블럭이 실행된다. 이경우에는, 빈 배열 (draftImageUriList 기본값)이 할당된다.
      if (draftImageUriList.length === selectedImages.length) {
        imageUriList = draftImageUriList
      }
      // 선택된 이미지가 1개이상 있을경우 uploadURIS() 를 호출하여 URI 값을 얻어낸다.
      // 만약 이미 임시 저장된 이미지가 있다면, 위에 if 블럭을 먼저 통과할 것 이기 때문에, 이 else if 블럭은 실행되지 않는다.
      else if (selectedImages.length > 0) {
        imageUriList = await uploadURIS(selectedImages)
      }

      createPet({
        userId: userDetail.id,
        name,
        age: new Date().getFullYear() - parseInt(birthday.slice(0, 4)) + 1, // 나이 계산 //TODO: age 는 서버에서 birthday 값을 토대로 계산된다. 추후 age: null 로 수정할 것
        sex,
        images: imageUriList || [],
        weight: weight,
        isNeutralizated,
        desc,
        speciesName,
        familyType,
        birthday: birthday,
      }).then((res) => {
        if (res.isSuccess) {
          navigation.replace("all-pets-screen", { isSaved: true })
          !imageUriList &&
            alertModal(
              "이미지 업로드 실패",
              "반려동물을 등록했으나, 이미지 업로드에는 실패했습니다. 반려동물 수정화면에서 다시 업로드해주세요.",
            )
        } else {
          alertModal(
            "반려동물 등록 실패",
            `${res?.reason || "알 수 없는 이유로 등록에 실패했습니다. 잠시후 다시 시도해주세요."}`,
          )
          // 반려동물 등록에 실패하더라도, uploadURIS() 얻은 이미지 URI "imageUriList" 를 임시저장한다.
          // 유저가 다시 이 버튼을 클릭했을때 사용하기 위함이다. - 불필요한 uploadURIS() 호출을 막을 수 있다.
          setDraftImageUriList(imageUriList)
        }
      })
    }

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
          <PreBol16 text="반려동물 기본 정보 (필수사항)" color={HEAD_LINE} mt={12} />
          {/* 강아지 OR 고양이 */}
          <PreMed14 color={HEAD_LINE} text={"🦮🐈"} mt={20} mb={10} />
          <Row style={{ justifyContent: "space-between" }}>
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
          <UserOrPetProfileInfo
            title="이름"
            titleColor={HEAD_LINE}
            profileInfo={name || "예) 구름이"}
            showOption={!name}
            additionalPadding={35 + 7}
            onPress={() => {
              setNameTouched(true)
            }}
          />

          {/* //*생년월일 */}
          <UserOrPetProfileInfo
            title="생년월일"
            titleColor={HEAD_LINE}
            profileInfo={birthday || "예) 2005-01-01"}
            showOption={!birthday}
            additionalPadding={35}
            onPress={() => {
              setBirthdayTouched(true)
            }}
          />
          <PreMed12
            color={BODY}
            text="* 반려동물의 생년월일을 모를 경우, 추청 생년월일을 입력해주세요."
            style={{ marginTop: 3 }}
          />

          {/* 품종 */}
          <UserOrPetProfileInfo
            onPress={() => {
              setSpeciesNameTouched(true)
              console.log("HO")
            }}
            title="품종"
            titleColor={HEAD_LINE}
            profileInfo={speciesName || "예) 터키시앙고라"}
            showOption={!speciesName}
            additionalPadding={35}
          />

          {/* 성별 */}
          <PreMed14 color={HEAD_LINE} text={"성별"} mt={35} mb={10} />
          <Row>
            {성별.map((item, index) => {
              let isSelected = false
              let selectedSex = null
              switch (item) {
                case "남자":
                  isSelected = sex === PetSex.MALE
                  selectedSex = PetSex.MALE
                  break
                case "여자":
                  isSelected = sex === PetSex.FEMALE
                  selectedSex = PetSex.FEMALE
                  break
              }

              if (sex === null) {
                isSelected = false
              }

              return (
                <Pressable
                  key={index}
                  style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                  onPress={() => {
                    setSex(selectedSex)
                  }}
                >
                  <Image
                    source={isSelected ? images.radio_active : images.radio_inactive}
                    style={styles.radioImg}
                  />
                  <PreMed16
                    style={{ marginLeft: 6 }}
                    text={item}
                    color={isSelected ? GIVER_CASUAL_NAVY : DISABLED}
                  />
                </Pressable>
              )
            })}
          </Row>

          {/* //*몸무게 */}
          <UserOrPetProfileInfo
            title="몸무게"
            titleColor={HEAD_LINE}
            profileInfo={(!!weight && weight?.toString()) || "예) 7kg"}
            showOption={!weight}
            additionalPadding={35}
            onPress={() => {
              setWeightTouched(true)
            }}
          />

          {/* 중성화 */}
          <PreMed14 color={HEAD_LINE} text={"중성화 여부"} mt={35} mb={10} />
          <Row>
            {중성화_여부.map((item, index) => {
              let isSelected = false
              let selectedValue = null
              switch (item) {
                case "예":
                  isSelected = isNeutralizated
                  selectedValue = true
                  break
                case "아니오":
                  isSelected = !isNeutralizated
                  selectedValue = false
                  break
              }

              if (isNeutralizated === null) {
                isSelected = false
              }

              return (
                <Pressable
                  key={index}
                  style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                  onPress={() => {
                    setIsNeutralizated(selectedValue)
                  }}
                >
                  <Image
                    source={isSelected ? images.radio_active : images.radio_inactive}
                    style={styles.radioImg}
                  />
                  <PreMed16
                    style={{ marginLeft: 6 }}
                    text={item}
                    color={isSelected ? GIVER_CASUAL_NAVY : DISABLED}
                  />
                </Pressable>
              )
            })}
          </Row>
          {/* 기본 정보 ENDED ============================================================== */}

          {/* 세부 정보 BEGIN ============================================================== */}
          <PreBol16 text="반려동물 세부 정보 (선택사항)" color={HEAD_LINE} mt={64} />

          {/* //*이미지 */}
          <PreMed14
            color={HEAD_LINE}
            text={`반려동물 사진 ${selectedImages.length}/5 (최대 5장)`}
            mt={20}
            mb={10}
          />
          <CustomImagePicker
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            submitButtonText="사진 추가하기"
            selectionLimit={5}
          />

          {/* //? ios 에서 키보드 올라올 때 창이 자동으로 안맞춰짐. 유저가 직접 스크롤을 내려야함  */}
          {/* //*반려동물 소개 */}
          <View style={{ paddingTop: 35, height: "auto", minHeight: DESC_VIEW_MIN_HEIGHT }}>
            <PreMed14 color={HEAD_LINE} text="반려동물 소개" style={{ marginBottom: 10 }} />

            <View style={styles.petDescTextBox}>
              <TextInput
                style={{
                  fontFamily: PRETENDARD_MEDIUM,
                  fontSize: 14,
                  lineHeight: 22,
                  color: HEAD_LINE,
                }}
                multiline={true}
                editable={editable !== undefined ? editable : false}
                value={desc}
                onChangeText={handleTextChange}
                onKeyPress={() => {
                  // 반려동물 소개 텍스트 인풋창 클릭시, 스크롤 최하단으로 이동
                  scrollViewRef.current.scrollToEnd({ animated: true })
                }}
                placeholder="예) 우리 구름이는 누구에게나 배를 보여주는 착한 고양이에요 :)"
              />
            </View>
          </View>
          {/* 세부 정보 ENDED ============================================================== */}

          {/* //*저장하기 버튼이 화면 최하단의 내용을 가리지 않게 하기 위한 여유공간 */}
          {/* //! 🔻이 코드때문에 ScrollView container 사이즈가 비정상적으로 바뀐다! */}
          {/* {showSaveButton && <View style={{ height: 60 }} />} */}
          {/* //! 🔺이 코드때문에 ScrollView container 사이즈가 비정상적으로 바뀐다! */}
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

        {/* //* 품종 모달*/}
        <CustomInputModal
          visibleState={speciesNameTouched}
          handleModalHide={() => {
            setSpeciesNameTouched(false)
          }}
          title="품종"
          controlMode="userNickname"
          handleInput={(value) => {
            setSpeciesName(value)
            isChangeMade()
          }}
          defaultValue={name}
          placeholderInput="반려동물의 품종을  입력해주세요."
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
            {missedField && (
              <PreReg10
                text={missedField}
                color={GIVER_CASUAL_NAVY}
                style={{ position: "absolute", bottom: 4, zIndex: 1 }}
              />
            )}
            <ConditionalButton
              label="등록하기"
              // isActivated={anyChangeMade}
              isActivated={isActivated}
              onPress={onPress}
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
    width: "48%",
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
    paddingVertical: 10,
  },
  saveBox: {
    position: "absolute",
    bottom: BOTTOM_HEIGHT,
    width: "100%",
    zIndex: 0,
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    alignItems: "center",
  },
})
