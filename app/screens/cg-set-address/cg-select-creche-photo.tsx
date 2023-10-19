import React, { Dispatch, SetStateAction } from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import {
  CustomImagePicker,
  PhotoRegistrationNote,
  PickerImage,
  PreBol18,
  Row,
  UnderlineText,
} from "#components"
import { HEAD_LINE, MIDDLE_LINE } from "#theme"

export interface CgSelectCrechePhotoProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
  selectedImages: PickerImage[]
  setSelectedImages: Dispatch<SetStateAction<PickerImage[]>>
}

export const CgSelectCrechePhoto = observer(function CgSelectCrechePhoto(
  props: CgSelectCrechePhotoProps,
) {
  const { style, selectedImages, setSelectedImages } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      {/* // * 타이틀 */}
      <View style={styles.titleContainer}>
        <PreBol18 color={HEAD_LINE} text={`위탁 장소의`} />
        <Row mt={6}>
          <UnderlineText>
            <PreBol18 text={"사진"} />
          </UnderlineText>
          <PreBol18 color={HEAD_LINE} text="을 선택해주세요." />
        </Row>
      </View>

      <PhotoRegistrationNote />

      <CustomImagePicker
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        submitButtonText="사진 추가하기"
        selectionLimit={10}
        style={{ marginTop: 28 }}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {},
  titleContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  image: { width: 16, height: 16, alignSelf: "flex-start" },
  radioContainer: {
    width: 172,
    padding: 14.5,

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
})
