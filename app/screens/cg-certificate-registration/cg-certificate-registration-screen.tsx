import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  Screen,
  GoBackSaveNext,
  CgRegisterStep,
  PreBol20,
  UnderlineText,
  CertificateRegistrationNote,
  BASIC_BACKGROUND_PADDING_WIDTH,
  CustomImagePicker,
  PickerImage,
} from "#components"
import { View, StyleSheet } from "react-native"
import { HEAD_LINE } from "#theme"

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
  const [selectedImages, setSelectedImages] = useState<PickerImage[]>([])

  return (
    <Screen testID="CgCertificateRegistration">
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

      {/* 컴포넌트: 이미지 추가 */}
      <CustomImagePicker
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        submitButtonText="자격증 추가하기"
        style={{ marginTop: 28 }}
      />

      {/* 하단 버튼 GoBackSaveNext 컴포넌트 */}
      <View style={styles.bottomButton}>
        <GoBackSaveNext />
      </View>
    </Screen>
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
  bottomButton: {
    position: "absolute",
    left: BASIC_BACKGROUND_PADDING_WIDTH,
    right: BASIC_BACKGROUND_PADDING_WIDTH,
    bottom: 7,
  },
})
