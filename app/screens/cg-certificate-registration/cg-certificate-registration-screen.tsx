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
      <View style={styles.cgregistration}>
        <CgRegisterStep style={styles.step} step="todo" number={1} title=" " />
        <CgRegisterStep style={styles.step} step="progress" number={2} title="펫시터 서비스 설정" />
        <CgRegisterStep style={styles.step} step="done" number={3} title=" " />
      </View>
      {/* 텍스트 : 반려동물 관련 자격증을 등록해주세요 */}
      <View style={styles.text1}>
        <PreBol20 text={"반려동물"} color={HEAD_LINE} />
      </View>
      <View style={styles.text2}>
        <UnderlineText>
          <PreBol20 text={"자격증"} />
        </UnderlineText>
        <PreBol20 color={HEAD_LINE} text="을 설정해주세요!" />
      </View>
      {/* 컴포넌트 : 자격 증 등록 전, 잠깐! */}
      <View style={styles.cgregistrationnote}>
        <CertificateRegistrationNote />
      </View>
      {/* 이미지 추가 View */}
      <View style={styles.imageview}>
        <ScrollView
          contentContainerStyle={{ flexDirection: "row" }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {selectedImages.map((imageUri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={{ width: 128, height: 128 }} />
              <TouchableOpacity style={styles.deleteButton} onPress={() => removeImage(index)}>
                <View style={styles.deleteButton}>
                  <Image source={images.x_in_circle} style={styles.deleteButton} />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <Pressable style={styles.button} onPress={openGallery}>
          <Image source={images.x_in_circle} style={styles.crossButton} />
          <PreReg16 text={"자격증 추가하기"} color={BODY}></PreReg16>
        </Pressable>
      </View>
      {/* 하단 버튼 GoBackSaveNext 컴포넌트 */}
      <View style={styles.bottombutton}>
        <GoBackSaveNext />
      </View>
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  cgregistration: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  step: {
    marginVertical: 10,
    marginRight: 10,
  },
  text1: {
    marginTop: 24,
    height: 24,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text2: {
    height: 24,
    marginTop: 6,
    flexDirection: "row",
  },
  cgregistrationnote: {
    marginTop: 4,
    height: 142,
    alignItems: "center",
    justifyContent: "center",
  },
  imageview: {
    height: 204,
    width: "100%",
  },
  button: {
    flexDirection: "row",
    width: 358,
    height: 48,
    borderRadius: 8,
    borderColor: LIGHT_LINE,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  crossButton: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  bottombutton: {
    height: 72,
    marginTop: 173,
    alignItems: "center",
    justifyContent: "center",
  },
})
