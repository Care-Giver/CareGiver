import React, { FC, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import { observer } from "mobx-react-lite"
import {
  CaregiverSetPrice,
  GoBackSaveNext,
  Screen,
  CaregiverSetAdditionalPrice,
  CgRegisterStep,
} from "#components"
import { FlatList, Pressable, View } from "react-native"

export const CaregiverSetPriceScreen: FC<
  StackScreenProps<NavigatorParamList, "caregiver-set-price-screen">
> = observer(({ route, navigation }) => {
  const [itemWidth, setItemWidth] = useState(0)
  const [pageIndex, setPageIndex] = useState(1)

  const DATA = [
    {
      id: "bd7acbea",
      page: pageIndex,
    },
    {
      id: "bd7awwdd",
      page: pageIndex,
    },
  ]
  const onPressGoback = () => {
    {
      pageIndex !== 1 && setPageIndex(pageIndex - 1)
    }
  }
  const onPressSaveNext = () => {
    {
      pageIndex < DATA.length && setPageIndex(pageIndex + 1)
    }
  }

  const Header = () => {
    return (
      <View style={{ flexDirection: "row", height: 30 }}>
        <CgRegisterStep step="done" number={1} title="제목없음" style={{ marginRight: 5 }} />
        <CgRegisterStep step="done" number={2} title="제목없음" style={{ marginRight: 5 }} />
        <CgRegisterStep step="progress" number={3} title="가격 및 특이설정" />
      </View>
    )
  }

  return (
    <Screen style={{ flex: 1 }}>
      {/* <CaregiverSetPrice /> */}
      <Header />
      <FlatList
        snapToInterval={itemWidth}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: "200%" }}
        data={DATA}
        scrollEnabled={false}
        onContentSizeChange={(w) => setItemWidth(w / 2)}
        numColumns={1}
        renderItem={(item) => (
          <>
            {item.item.page === 1 && <CaregiverSetPrice style={{ width: itemWidth }} />}
            {item.item.page === 2 && <CaregiverSetAdditionalPrice style={{ width: itemWidth }} />}
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

      {/* <Pressable
        style={{ width: "100%", height: 50, backgroundColor: "red", alignSelf: "center" }}
        onPress={() => {
          navigate("caregiver-set-additional-price-screen")
        }}
      >
        <PreReg12 text="caregiver-set-additional-price-screen 으로 이동" />
      </Pressable> */}
    </Screen>
  )
})
