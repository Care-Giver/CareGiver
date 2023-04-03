import React, { FC, useState } from "react"
import { View, Image, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  DivisionLine,
  PreBol18,
  PreMed16,
  PreReg12,
  Row,
  ScreenRootView,
  ServiceTypeIndicatorHeader,
} from "#components"
import { styles } from "./styles"
import { images } from "#images"
import BottomSheet from "@gorhom/bottom-sheet"
import { DISABLED } from "#theme"
import { GestureHandlerRootView } from "react-native-gesture-handler"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

export const FavoritesScreen: FC<
  StackScreenProps<NavigatorParamList, "favorites-screen">
> = observer(function FavoritesScreen() {
  const [serviceType, setServiceType] = useState<string>("펫시터")
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1)

  console.log("bottomSheetIndex: ", bottomSheetIndex)

  return (
    <GestureHandlerRootView style={{ height: "100%" }}>
      <ScreenRootView testID="Favorites" preset="scroll">
        {/* //* 펫시터 | 훈련사 토글 */}
        <Row style={{ marginTop: 24 }}>
          <ServiceTypeIndicatorHeader
            label={"펫시터"}
            onPress={() => setServiceType("펫시터")}
            state={serviceType}
          />
          <ServiceTypeIndicatorHeader
            label={"훈련사"}
            onPress={() => setServiceType("훈련사")}
            state={serviceType}
          />
        </Row>

        {/* //* filter box */}
        <Row style={styles.filterBox}>
          <PreReg12 text="전체" />
          <Pressable
            onPress={() => setBottomSheetIndex(0)}
            style={{
              flexDirection: "row",
            }}
          >
            <PreReg12 text="원하는 조건으로 보기" />
            <Image source={images.list_bars} style={styles.filterImg} />
          </Pressable>
        </Row>

        {/* //* division line */}
        <View
          style={[styles.divisionLine, { marginHorizontal: -1 * BASIC_BACKGROUND_PADDING_WIDTH }]}
        />
      </ScreenRootView>

      {/* //* 바텀시트 bottomSheet */}
      <BottomSheet
        index={bottomSheetIndex}
        snapPoints={["72.9%"]}
        enablePanDownToClose
        style={{ backgroundColor: "red" }}
      >
        <View style={styles.bottomSheetContainer}>
          <Row style={styles.bottomSheetTitleBox}>
            <Pressable
              onPress={() => {
                console.log("clicked")
                setBottomSheetIndex(-1)
              }}
            >
              <Image source={images.x_grey} style={{ width: 16, height: 16 }} />
            </Pressable>
            <PreBol18 text="필터" />
            <Pressable>
              <PreMed16 text="초기화" color={DISABLED} />
            </Pressable>
          </Row>

          {/* //* division line */}
          <View style={styles.divisionLine} />
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  )
})
