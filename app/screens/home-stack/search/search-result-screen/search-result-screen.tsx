import { View, Pressable, Image, Animated } from "react-native"
import React, { FC, useRef } from "react"
import { observer } from "mobx-react-lite"
import { SitterProfileCard } from "caregiver/app/custom-components/sitter-profile-card/sitter-profile-card"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { petsitters } from "caregiver/app/screens/home-stack/search/search-result-screen/dummy-data"
import { HEIGHT, WIDTH } from "caregiver/app/theme"
import { PreBol18, PreReg12, Row, ScreenRootView } from "caregiver/app/custom-components"
import { HEAD_LINE, LBG } from "caregiver/app/theme/palette"
import { palette } from "caregiver/app/theme"
import { RowRoundedButton } from "caregiver/app/custom-components/buttons/row-rounded-button/row-rounded-button"
import IMAGES from "caregiver/assets/common-images"
import { AnimatedHeader } from "./animated-header"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../../navigators"

export const SearchResultScreen: FC<
  StackScreenProps<NavigatorParamList, "search-result">
> = observer((props) => {
  //? FlatList에서 스크롤 이벤트가 발생할 때마다

  const offset = useRef(new Animated.Value(0)).current

  return (
    <ScreenRootView>
      {/* //? 검색 필터 박스를 AnimatedHeader로 설정 -> 스크롤시 위로 올라가면서 사라지는 애니매이션 */}
      <AnimatedHeader animatedValue={offset} />
      {/* //? title container */}
      <Row
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: palette.white,
          marginTop: HEIGHT * 14,
        }}
      >
        {/* //? title */}
        <PreBol18 text="검색결과" />
        {/* //? sort button */}
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => console.warn("clicked sort btn")}
        >
          <PreReg12 text="가까운 거리 순" />
          <Image
            source={IMAGES.list_bars}
            style={{
              width: WIDTH * 16,
              height: HEIGHT * 16,
              marginLeft: WIDTH * 5,
            }}
          />
        </Pressable>
      </Row>
      {/* //? divider */}
      <View
        style={{
          width: "100%",
          height: HEIGHT * 2,
          backgroundColor: LBG,
          marginTop: HEIGHT * 12,
        }}
      />
      {/* //? sitter profile card list */}
      <FlatList
        data={petsitters}
        renderItem={({ item, index }) => (
          <SitterProfileCard
            key={item.id}
            name={item.name}
            image={item.image}
            rating={item.rating}
            review={item.review}
            title={item.title}
            desc={item.desc}
            onPress={() => console.warn("Hello")}
            style={
              index < petsitters.length - 1
                ? { marginTop: HEIGHT * 20 }
                : { marginVertical: HEIGHT * 20 }
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: palette.white,
        }}
        //? 스크롤 이벤트가 발생할 때마다 현재 스크롤 위치(=contentOffset)의 y값을 offset으로 설정(?)
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
          useNativeDriver: false,
        })}
      />
    </ScreenRootView>
  )
})
