import React, { useCallback } from "react"
import { StyleProp, ViewStyle, View, StyleSheet, Pressable, Image, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { ScrollView } from "react-native-gesture-handler"
import { PreReg16 } from "../basics/custom-texts/custom-texts"
import { images } from "#images"
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker"
import { BODY, LIGHT_LINE } from "#theme"

export interface CustomImagePickerProps {
  selectedImages: PickerImage[]
  setSelectedImages: React.Dispatch<React.SetStateAction<PickerImage[]>>
  submitButtonText: string
  selectionLimit: number
  style?: StyleProp<ViewStyle>
}

// ? 백엔드에 이미지를 Upload하기 위해서는 아래와 같은 형식을 갖춰야 함
export interface PickerImage {
  uri: string
  type: string
  name: string
}

export const CustomImagePicker = observer(function CustomImagePicker(
  props: CustomImagePickerProps,
) {
  const { selectedImages, setSelectedImages, submitButtonText, selectionLimit, style } = props
  const allStyles = Object.assign({}, styles.root, style)

  const removeImage = useCallback(
    (index: number) => {
      const updatedImages = [...selectedImages]
      updatedImages.splice(index, 1)
      setSelectedImages(updatedImages)
    },
    [selectedImages],
  )

  const options: ImageLibraryOptions = {
    mediaType: "photo",
    maxHeight: 128,
    maxWidth: 128,
    // includeBase64: true, // ? -> 큰 이미지 피함
    selectionLimit: selectionLimit - selectedImages.length, // 최대 등록할 수 있는 이미지 개수 / 10 정도면 괜찮을까요 ?
  }

  const openGallery = useCallback(() => {
    launchImageLibrary(options, (response) => {
      if (!response.didCancel) {
        const newImages: PickerImage[] = response.assets.map((current) => {
          return {
            name: current.fileName,
            type: current.type,
            // ? iOS의 경우 uri 맨 앞에 'file://' 붙음 -> 제거
            uri: Platform.OS === "android" ? current.uri : current.uri.replace("file://", ""),
          }
        })
        setSelectedImages((Images) => [...Images, ...newImages]) //새로운 이미지를 앞으로 할 것인가? 뒤로할 것인가.
      } else if (response.errorCode) {
        console.error(
          "[custom-image-picker.ts] Image Picker Error",
          response.errorCode,
          response.errorMessage,
        )
      } else if (response.assets) {
        // ? 선택된 사진을 정상적으로 전달 받음
      }
    })
  }, [selectedImages])

  const disableAlert = useCallback(() => {
    alert(`사진은 최대 ${selectionLimit}장까지 선택 가능합니다.`)
  }, [])

  const isEmpty = selectedImages.length === 0
  const isSelectable = selectedImages.length < selectionLimit

  return (
    <View style={allStyles}>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row" }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {isEmpty ? (
          <Image
            source={images.placeholder_image}
            style={{ width: 128, height: 128, borderRadius: 8 }}
          />
        ) : (
          selectedImages.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={{ uri: image.uri }}
                style={{ width: 128, height: 128, borderRadius: 8 }}
              />
              <Pressable style={styles.deleteButtonWrapper} onPress={() => removeImage(index)}>
                <Image source={images.x_in_circle} style={styles.deleteButton} />
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>

      <Pressable style={styles.button} onPress={isSelectable ? openGallery : disableAlert}>
        <Image source={images.plus_grey} style={styles.plusButton} />
        <PreReg16 text={submitButtonText} color={BODY}></PreReg16>
      </Pressable>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    height: "auto",
    width: "100%",
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

  plusButton: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
})
