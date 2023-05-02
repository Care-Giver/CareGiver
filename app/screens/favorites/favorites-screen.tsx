import React, { FC, useState, useRef, useEffect, useMemo, useCallback } from "react"
import { View, Image, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  PreBol18,
  PreMed16,
  PreReg12,
  Row,
  ScreenRootView,
  ServiceTypeIndicatorHeader,
} from "#components"
import { styles } from "./styles"
import { images } from "#images"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet"
import { DISABLED } from "#theme"

export const FavoritesScreen: FC<
  StackScreenProps<NavigatorParamList, "favorites-screen">
> = observer(function FavoritesScreen() {
  const [serviceType, setServiceType] = useState<string>("펫시터")

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["72.9%"], [])

  // * bottomSheet backdrop
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0} // backdrop이 등장할 때의 snap point -> snap point가 0이면 backdrop 나타남
        disappearsOnIndex={-1} // backdrop이 사라질 때의 snap point -> snap point가 -1이면 backdrop 사라짐
        pressBehavior={"close"}
      />
    ),
    [],
  )

  return (
    <BottomSheetModalProvider>
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
            onPress={() => bottomSheetModalRef.current?.present()}
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

        {/* //* 바텀시트 bottomSheet */}
        <BottomSheetModal
          // ref={bottomSheetRef}
          ref={bottomSheetModalRef}
          backdropComponent={renderBackdrop}
          index={0}
          snapPoints={snapPoints}
        >
          <View style={styles.bottomSheetContainer}>
            <Row style={styles.bottomSheetTitleBox}>
              {/* // ? "X" close button */}
              <Pressable onPress={() => bottomSheetModalRef.current?.close()} style={{ flex: 1 }}>
                <Image source={images.x_grey} style={{ width: 16, height: 16 }} />
              </Pressable>

              {/* //? "필터" title text */}
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PreBol18 text="필터" />
              </View>

              {/* //? "초기화" reset button */}
              <Pressable style={{ flex: 1 }}>
                <PreMed16 text="초기화" color={DISABLED} style={{ marginLeft: "auto" }} />
              </Pressable>
            </Row>

            {/* //* division line */}
            <View style={styles.divisionLine} />

            {/* //* 위탁 | 방문 버튼 */}
            <Row style={{ justifyContent: "space-between" }}>
              <Pressable style={styles.radioContainer}>
                <PreMed16 text="방문" color={DISABLED} />
              </Pressable>

              <Pressable style={styles.radioContainer}>
                <PreMed16 text="위탁" color={DISABLED} />
              </Pressable>
            </Row>
          </View>
        </BottomSheetModal>
      </ScreenRootView>
    </BottomSheetModalProvider>
  )
})
