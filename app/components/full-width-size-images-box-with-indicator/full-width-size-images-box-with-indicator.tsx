import { View, ImageBackground, Text, FlatList } from "react-native"
import React, { useCallback, useState } from "react"
import { styles } from "./styles"
import { CARE_NATURAL_BLUE, DEVICE_SCREEN_WIDTH, STANDARD_WIDTH } from "#theme"
import { DotsIndicator } from "../dots-indicator/dots-indicator"

export const FullWidthSizeImagesBoxWithIndicator = (props) => {
  const { items, activeIndex, style: viewStyle, firstImage } = props

  const [currentImage, setCurrentImage] = useState(0)

  const onFlatlistUpdate = useCallback(({ viewableItems }) => {
    // ? 선택된 이미지, 즉 viewableItems 의 index 값을 activeIndex 로 설정.
    // ? 왜 viewableItems[0] 인지는 console.log(viewableItems); 로 보면 이해 갈꺼임
    if (viewableItems.length > 0) {
      setCurrentImage(viewableItems[0].index || 0)
    }
  }, [])

  const images = [
    {
      id: "1",
      profileImg: firstImage,
    },
    {
      id: "2",
      profileImg:
        "https://media.istockphoto.com/id/1126947324/photo/dog-walker.jpg?s=612x612&w=0&k=20&c=bS2IWiDdRi-4SrJ87oz_nx6y3jtoZtfRkRKHqwn7UmU=",
    },
    {
      id: "3",
      profileImg:
        "https://media.istockphoto.com/id/1149531679/photo/dog-walker-strides-with-his-pet-on-leash-while-walking-at-street-pavement.jpg?s=612x612&w=0&k=20&c=vdJf9GV2Z_S6medzK5tJbL6oLsM4cZ0pzW3mSCBjC4k=",
    },
    {
      id: "4",
      profileImg:
        "https://media.istockphoto.com/id/1211831502/photo/arent-they-so-cute.jpg?s=612x612&w=0&k=20&c=kv44VfEenjvGLZai6tbqjiRyeVhB6egAU51I0XeDkTE=",
    },
    {
      id: "5",
      profileImg:
        "https://media.istockphoto.com/id/1204601350/photo/professional-dog-walker-and-a-group-of-dogs-at-a-public-park.jpg?s=612x612&w=0&k=20&c=Ils2XaWA6DYv5jfUrMqr5YQdtnXx6_7K2w2qMk9aiwg=",
    },
  ]

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
              height: 444,
              backgroundColor: "black",
              // margin: 2,
            }}
            key={index} //? Key Warning 에러 해결.
          >
            {/* <Text> 인덱스 {index}</Text> */}
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

      <DotsIndicator items={images} activeIndex={currentImage} style={{ marginTop: -28 }} />
    </View>
  )
}
