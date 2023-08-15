import React, { FC, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import { observer } from "mobx-react-lite"
import {
  CaregiverService,
  CaregiverSetPrice,
  GoBackSaveNext,
  PreReg12,
  Screen,
  CaregiverSetAdditionalPrice,
} from "#components"
import { Dimensions, FlatList, Pressable } from "react-native"

export const CaregiverSetPriceScreen: FC<
  StackScreenProps<NavigatorParamList, "caregiver-set-price-screen">
> = observer(({ route, navigation }) => {
  const { width } = Dimensions.get("window")
  const [itemWidth, setItemWidth] = useState(0)

  const DATA = [
    {
      id: "bd7acbea",
      title: "page1",
    },
    {
      id: "bd7awwdd",
      title: "page2",
    },
  ]
  const onPressGoback = () => {
    alert("이전 버튼 클릭")
    // 이전버튼 클릭시, 이전 컴포넌트로 스크롤 이동
  }
  const onPressSaveNext = () => {
    alert("저장 후 다음 버튼 클릭")
    // 저장후 다음버튼 클릭시, 다음 컴포넌트로 스크롤 이동
  }

  return (
    <Screen style={{ flex: 1 }}>
      {/* <CaregiverSetPrice /> */}
      <FlatList
        horizontal
        // snapToInterval={width}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: "200%" }}
        data={DATA}
        onContentSizeChange={(w) => setItemWidth(w / 2)}
        renderItem={(item) => (
          <>
            {item.item.title === "page1" && <CaregiverSetPrice style={{ width: itemWidth }} />}
            {item.item.title === "page2" && (
              <CaregiverSetAdditionalPrice style={{ width: itemWidth }} />
            )}
          </>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* // * 다음 button */}
      {/* // TODO: onPress */}
      {/* <RegisterSubmitButton
        text="다음"
        isActive={isSubmitActive}
      /> */}

      {/* 임시버튼 */}

      <GoBackSaveNext onPressGoback={onPressGoback} onPressSaveNext={onPressSaveNext} />

      <Pressable
        style={{ width: "100%", height: 50, backgroundColor: "red", alignSelf: "center" }}
        onPress={() => {
          navigate("caregiver-set-additional-price-screen")
        }}
      >
        <PreReg12 text="caregiver-set-additional-price-screen 으로 이동" />
      </Pressable>
    </Screen>
  )
})
