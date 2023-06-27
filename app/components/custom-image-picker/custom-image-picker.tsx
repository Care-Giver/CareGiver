import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, Pressable, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { ScrollView } from "react-native-gesture-handler"
import { TouchableOpacity } from "@gorhom/bottom-sheet"
import { PreReg16 } from "../basics/custom-texts/custom-texts"
import { images } from "#images"
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker"
import { BODY, LIGHT_LINE } from "#theme"

export interface CustomImagePickerProps {
  selectedImages: string[]
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>
  submitButtonText: string
  style?: StyleProp<ViewStyle>
}

export const CustomImagePicker = observer(function CustomImagePicker(
  props: CustomImagePickerProps,
) {
  const { selectedImages, setSelectedImages, submitButtonText, style } = props
  const allStyles = Object.assign({}, styles.root, style)

  const removeImage = (index: number) => {
    const updatedImages = [...selectedImages]
    updatedImages.splice(index, 1)
    setSelectedImages(updatedImages)
  }

  const options: ImageLibraryOptions = {
    mediaType: "photo",
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

  const isEmpty = selectedImages.length === 0

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
          selectedImages.map((imageUri, index) => (
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
          ))
        )}
      </ScrollView>

      <Pressable style={styles.button} onPress={openGallery}>
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
