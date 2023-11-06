import React, { Dispatch, SetStateAction, useCallback, useRef } from "react"
import {
  StyleProp,
  ViewStyle,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { commonStyles } from "./commonStyles"
import {
  PreBol16,
  PreBol18,
  PreMed16,
  PreReg16,
} from "../../components/basics/custom-texts/custom-texts"
import {
  BOTTOM_HEIGHT,
  DISABLED,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  LIGHT_LINE,
  MIDDLE_LINE,
  color,
} from "#theme"
import { UnderlineText } from "../../components/underline-text/underline-text"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
  CustomImagePicker,
  PickerImage,
  RegistrationNoticeNote,
} from "#components"
import _ from "lodash"

export interface CgSetCertificateProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  selectedImages: PickerImage[]
  setSelectedImages: Dispatch<SetStateAction<PickerImage[]>>
}

export const CgSetCertificate = observer(function CgSetCertificate(props: CgSetCertificateProps) {
  const { style, selectedImages, setSelectedImages } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <ScrollView
      style={allStyles}
      contentContainerStyle={{ paddingBottom: BOTTOM_HEIGHT }}
      showsVerticalScrollIndicator={false}
    >
      {/* // * title container */}
      <View style={commonStyles.titleContainer}>
        {/* // ? first line */}
        <PreBol18 color={HEAD_LINE} text={"반려동물 관련"} />
        {/* // ? second line */}
        <View style={commonStyles.secondTitleContainer}>
          <UnderlineText>
            <PreBol18 text={"자격증"} />
          </UnderlineText>
          <PreBol18 color={HEAD_LINE} text="을 등록해주세요. (선택사항)" />
        </View>
      </View>

      <RegistrationNoticeNote
        title="자격증 등록 전, 잠깐!"
        desc={
          "개인/민감 정보는 직접 삭제 후 등록해야 하며, 등록된 정보가 허위 사실일 경우 발생하는 모든 책임은 본인에게 있습니다.\n자격증 확인에는 평균 1~2일 정도 걸리며, 자체적인 심사 후 등록이 완료됩니다."
        }
        boldTexts={["직접 삭제 후 등록", "모든 책임은 본인", "평균 1~2일"]}
        style={{ marginTop: 16 }}
      />

      <CustomImagePicker
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        submitButtonText="사진 추가하기"
        selectionLimit={10}
        style={{ marginTop: 28 }}
      />
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  root: {},

  image: { width: 16, height: 16 },

  familyTypeTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    // backgroundColor: "red",
  },

  numberInput: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    borderWidth: 2,
    borderColor: LIGHT_LINE,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },

  handleType: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "31%",
    height: 44,
    borderWidth: 2,
    borderRadius: 10,
  },

  question: {
    width: 28,
    height: 28,
  },
})
