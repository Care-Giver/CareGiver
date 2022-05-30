import { View, SafeAreaView } from "react-native"
import React from "react"
import { SitterProfileCard } from "../../../../custom-components/sitter-profile-card/sitter-profile-card"
import { FlatList } from "react-native-gesture-handler"
import { petsitters } from "./dummy-data"
import { HEIGHT, WIDTH } from "../../../../theme"
import { PreBol18, ScreenRootView } from "../../../../custom-components"
import { HEAD_LINE, LBG } from "../../../../theme/palette"
import { RowRoundedButton } from "../../../../custom-components/buttons/row-rounded-button/row-rounded-button"
import IMAGES from "../../../../../assets/common-images"

export const SearchResultScreen = () => {
  return (
    <ScreenRootView>
      {/*//? 날짜 선택 */}
      <RowRoundedButton
        onPress={() => {
          alert("dd")
        }}
        image={IMAGES.calendar}
        text={"날짜를 선택해보세요."}
        textColor={HEAD_LINE}
        style={{ marginTop: HEIGHT * 36 }}
      />

      {/*//? 위치 선택 */}
      <RowRoundedButton
        onPress={() => {
          alert("dd")
        }}
        image={IMAGES.location}
        text={"경기도 안산시 상록구 한양대학로 55"}
        textColor={HEAD_LINE}
        style={{ marginTop: HEIGHT * 12 }}
      />

      {/* title */}
      <PreBol18 text="검색결과" style={{ marginTop: HEIGHT * 36 }} />

      <View
        style={{
          width: "100%",
          height: HEIGHT * 2,
          backgroundColor: LBG,
          marginTop: HEIGHT * 12,
        }}
      />

      {/* list container */}
      <View>
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
        />
      </View>
    </ScreenRootView>
  )
}
