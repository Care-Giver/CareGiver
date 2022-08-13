import { View, ImageBackground, Text, FlatList } from "react-native"
import React, { useCallback, useState } from "react"
import { styles } from "./styles"
import { DEVICE_SCREEN_WIDTH, HEIGHT } from "#theme/index"
import { DotsIndicator } from "../dots-indicator/dots-indicator"

const images = [
  {
    id: "1",
    profileImg:
      "https://st4.depositphotos.com/4678277/25199/i/600/depositphotos_251996030-stock-photo-close-up-portrait-of-her.jpg",
  },
  {
    id: "2",
    profileImg:
      "https://thumbs.dreamstime.com/b/omg-portrait-success-enthusiasm-confused-man-hand-cheek-smiling-isolated-yellow-background-188057404.jpg",
  },
  {
    id: "3",
    profileImg:
      "https://thumbs.dreamstime.com/b/bearded-confident-man-expresses-amazement-bearded-confident-man-expresses-amazement-isolated-yellow-background-studio-portrait-138706562.jpg",
  },
  {
    id: "4",
    profileImg: "https://i0.wp.com/ciklopea.com/wp-content/uploads/2018/05/graphic-designer.jpg",
  },
  {
    id: "5",
    profileImg: "https://www.stockvault.net/data/2008/04/07/104880/preview16.jpg",
  },
]

export const FullWidthSizeImagesBoxWithIndicator = (props) => {
  const { items, activeIndex, style: viewStyle } = props

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
        data={images}
        renderItem={(
          { item, index }, //! renderItem 에다가 사용하는 params 는 item 이다. 딴걸로 바꿔 쓰지 말 것!!!
        ) => (
          <ImageBackground
            source={{ uri: item.profileImg }}
            style={{
              // width: "100%",
              width: DEVICE_SCREEN_WIDTH,
              height: HEIGHT * 444,
              backgroundColor: "lightgreen",
              // margin: 2,
            }}
            key={index} //? Key Warning 에러 해결.
          >
            <Text> 인덱스 {index}</Text>
          </ImageBackground>
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

      <DotsIndicator
        items={images}
        activeIndex={currentImage}
        style={{ marginTop: HEIGHT * -28 }}
      />
    </View>
  )
}
