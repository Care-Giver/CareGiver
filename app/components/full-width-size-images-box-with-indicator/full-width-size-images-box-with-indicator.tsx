import { View, ImageBackground, FlatList, StyleProp, ViewStyle } from "react-native"
import React, { useCallback, useState } from "react"
import { styles } from "./styles"
import { DEVICE_SCREEN_WIDTH } from "#theme"
import { DotsIndicator } from "./dots-indicator/dots-indicator"
import { profileImageUriHandler } from "../../utils/image-format-validate"
import { images } from "../../../assets/images"

interface FullWidthSizeImagesBoxWithIndicatorProps {
  style?: StyleProp<ViewStyle>
  images: string[]
}

export const FullWidthSizeImagesBoxWithIndicator = (
  props: FullWidthSizeImagesBoxWithIndicatorProps,
) => {
  const { style: viewStyle, images: imagesProp = [] } = props

  const [currentImage, setCurrentImage] = useState(0)

  const onFlatlistUpdate = useCallback(({ viewableItems }) => {
    // ? 선택된 이미지, 즉 viewableItems 의 index 값을 activeIndex 로 설정.
    // ? 왜 viewableItems[0] 인지는 console.log(viewableItems); 로 보면 이해 갈꺼임
    if (viewableItems.length > 0) {
      setCurrentImage(viewableItems[0].index || 0)
    }
  }, [])

  return (
    <View style={[styles.root, viewStyle]}>
      <FlatList
        data={imagesProp}
        renderItem={(
          { item, index }, //! renderItem 에다가 사용하는 params 는 item 이다. 딴걸로 바꿔 쓰지 말 것!!!
        ) => (
          <ImageBackground
            // TODO: dummydata에 있는 uri에서는 제대로 동작하지 않음. (uri 끝부분이 .jpg와 같이 끝나지 않음)
            source={profileImageUriHandler(images.default_pet_image_60, "large", item)}
            resizeMode="contain"
            style={{
              // width: "100%",
              width: DEVICE_SCREEN_WIDTH,
              height: 444,
              backgroundColor: "black",
              // margin: 2,
            }}
            key={index} //? Key Warning 에러 해결.
          >
            {/* <Text> 인덱스 {index}</Text> */}
          </ImageBackground>
        )}
        //! data.length === 0 일때 렌더링됨
        ListEmptyComponent={() => (
          <ImageBackground
            source={images.default_pet_image_60}
            resizeMode="contain"
            style={{ width: DEVICE_SCREEN_WIDTH, height: 444, backgroundColor: "white" }}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={DEVICE_SCREEN_WIDTH}
        snapToAlignment={"end"}
        decelerationRate={"fast"}
        //? 표출되는 이미지 요소가 바뀌는 기준을 설정.
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 51, //? 이미지의 51 퍼센트가 표출되면 대상 이미지 변경으로 인식
        }}
        //? 이미지가 바뀌었을때 실행 할 행동 설정.
        onViewableItemsChanged={onFlatlistUpdate}
      />

      <DotsIndicator items={imagesProp} activeIndex={currentImage} style={{ marginTop: -28 }} />
    </View>
  )
}
