import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  ScreenRootView,
  GoBackSaveNext,
  CgRegisterStep,
  PreBol20,
  UnderlineText,
  CertificateRegistrationNote,
  CgCertificateRegistrationScreenHeader,
  PreReg16,
  Icon,
} from "#components"
import { Pressable, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { launchImageLibrary } from "react-native-image-picker"
import { LIGHT_LINE, HEAD_LINE, BODY, GIVER_CASUAL_NAVY } from "#theme"
import { images } from "#images"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const CgCertificateRegistrationScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-certificate-registration-screen">
> = observer(function CgCertificateRegistrationScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()
  const [selectedImages, setSelectedImages] = useState([])
  const removeImage = (index) => {
    const updatedImages = [...selectedImages]
    updatedImages.splice(index, 1)
    setSelectedImages(updatedImages)
  }
  let options = {
    MediaType: "photo",
    maxHeight: 128,
    maxWidth: 128,
    //includeBase64: true -> 큰 이미지 피함
    selectionLimit: 10, // 최대 등록할 수 있는 이미지 개수 / 10 정도면 괜찮을까요 ?
  }
  const openGallery = () => {
    launchImageLibrary(options, (response) => {
      if (!response.didCancel) {
        const newImages = response.assets.map((current) => current.uri)
        setSelectedImages((Images) => [...Images, ...newImages]) //새로운 이미지를 앞으로 할 것인가? 뒤로할 것인가.
      }
    })
  }

  return (
    <ScreenRootView testID="CgCertificateRegistration">
      {/* Screen header 컴포넌트 -> app.navigator로 이동 */}
      {/*<CgCertificateRegistrationScreenHeader options={{ title: "저장 후 나가기" }} />*/}
      {/* 단계별 컴포넌트 */}
      <View style={styles.cgRegistration}>
        <CgRegisterStep style={styles.step} step="todo" number={1} title=" " />
        <CgRegisterStep style={styles.step} step="progress" number={2} title="펫시터 서비스 설정" />
        <CgRegisterStep style={styles.step} step="done" number={3} title=" " />
      </View>

      {/* 텍스트 : 반려동물 관련 자격증을 등록해주세요 */}
      <PreBol20 text={"반려동물"} color={HEAD_LINE} mt={24} />
      <View style={styles.titleWithUnderlineText}>
        <UnderlineText>
          <PreBol20 text={"자격증"} />
        </UnderlineText>
        <PreBol20 color={HEAD_LINE} text="을 설정해주세요!" />
      </View>

      {/* 컴포넌트 : 자격 증 등록 전, 잠깐! */}
      <CertificateRegistrationNote style={styles.cgRegistrationNote} />

      {/* 이미지 추가 View */}
      <View style={styles.imageView}>
        <ScrollView
          contentContainerStyle={{ flexDirection: "row" }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {selectedImages.map((imageUri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={{ uri: imageUri }}
                style={{ width: 128, height: 128, borderRadius: 8 }}
              />
              <TouchableOpacity
                style={styles.deleteButtonWrapper}
                onPress={() => removeImage(index)}
              >
                <Image source={images.x_in_circle} style={styles.deleteButton} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <Pressable style={styles.button} onPress={openGallery}>
          <Image source={images.plus_grey} style={styles.plusButton} />
          <PreReg16 text={"자격증 추가하기"} color={BODY}></PreReg16>
        </Pressable>
      </View>

      {/* 하단 버튼 GoBackSaveNext 컴포넌트 */}
      <View style={styles.bottomButton}>
        <GoBackSaveNext />
      </View>
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  cgRegistration: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  step: {
    marginVertical: 10,
    marginRight: 10,
  },
  titleWithUnderlineText: {
    marginTop: 6,
    flexDirection: "row",
  },
  cgRegistrationNote: {
    marginTop: 16,
  },
  imageView: {
    height: "auto",
    width: "100%",
    marginTop: 28,
  },
  button: {
    flexDirection: "row",
    width: "100%",
    height: 48,
    borderRadius: 8,
    borderColor: LIGHT_LINE,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  deleteButtonWrapper: {
    position: "absolute",
    top: 3.5,
    right: 3.5,
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    width: 17,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  plusButton: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  bottomButton: {
    height: 72,
    marginTop: 173,
    alignItems: "center",
    justifyContent: "center",
  },
})
