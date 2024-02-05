import React, { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState } from "react"
import {
  StyleProp,
  ViewStyle,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { BOTTOM_HEIGHT, HEAD_LINE } from "#theme"
import {
  BOTTOM_TAB_BAR_HEIGHT,
  PreBol16,
  PreBol18,
  Row,
  UnderlineText,
  RegisterButtonsContainer,
  ConditionalButton,
  BASIC_BACKGROUND_PADDING_WIDTH,
  PreReg16,
  PreMed16,
} from "#components"
import { CrecheService, VisitingService } from "#api"
import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet"
import { useReducedMotion } from "react-native-reanimated"
import { images } from "#images"

export interface CgSetServiceProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  defaultServices: Array<VisitingService | CrecheService>
  additionalServices: Array<VisitingService | CrecheService>
  selectedOptions: Array<VisitingService | CrecheService>
  handleOptionPress: Dispatch<SetStateAction<Array<VisitingService | CrecheService>>>
  handleXPress: (option) => void
}

export const CgSetService = observer(function CgSetService(props: CgSetServiceProps) {
  const {
    style,
    defaultServices,
    additionalServices,

    selectedOptions,
    handleOptionPress,
    handleXPress,
  } = props
  const allStyles = Object.assign({}, styles.root, style)

  const [bottomSheetContent, setBottomSheetContent] = useState<{
    services: typeof defaultServices | typeof additionalServices
    type: "default" | "additional"
  }>({ services: defaultServices, type: "default" })

  const reducedMotion = useReducedMotion()

  // 기본 | 추가 서비스 설명 바텀시트모달 - ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // 펫시터 등록하기 바텀시트모달 - snapPoints
  const snapPoints = useMemo(() => ["60%", "90%"], [])

  /** 기본 | 추가 서비스 설명 바텀시트모달 backdrop */
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

  /** 기본 | 추가 서비스 설명 바텀시트모달 Footer - 확인 버튼 렌더링 */
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={BOTTOM_HEIGHT}>
        <ConditionalButton
          label={"확인"}
          isActivated
          onPress={() => {
            bottomSheetModalRef.current?.close()
          }}
        />
      </BottomSheetFooter>
    ),
    [bottomSheetModalRef],
  )

  return (
    <ScrollView
      style={allStyles}
      contentContainerStyle={{
        paddingBottom: BOTTOM_TAB_BAR_HEIGHT,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* // * 타이틀 */}
      <View style={styles.titleContainer}>
        <PreBol18 color={HEAD_LINE} text={`제공 가능한`} />
        <Row mt={6}>
          <UnderlineText>
            <PreBol18 text={"서비스 정보"} />
          </UnderlineText>
          <PreBol18 color={HEAD_LINE} text="를 추가해주세요." />
        </Row>
      </View>

      {/* 기본 서비스 */}
      <Row mt={28}>
        <PreBol16 text="기본 서비스" color={HEAD_LINE} />
        <TouchableOpacity
          onPress={() => {
            setBottomSheetContent({ services: defaultServices, type: "default" })
            bottomSheetModalRef.current?.present()
          }}
        >
          <Image source={images.question_mark} style={styles.question} />
        </TouchableOpacity>
      </Row>
      {/* 기본 서비스 목록 */}
      <RegisterButtonsContainer key={0} services={defaultServices} alwaysActive={true} />

      {/* 추가 서비스 */}
      <Row mt={48}>
        <PreBol16 text="추가 서비스" color={HEAD_LINE} />
        <TouchableOpacity
          onPress={() => {
            setBottomSheetContent({ services: additionalServices, type: "additional" })
            bottomSheetModalRef.current?.present()
          }}
        >
          <Image source={images.question_mark} style={styles.question} />
        </TouchableOpacity>
      </Row>
      {/* 추가 서비스 목록 */}
      <RegisterButtonsContainer
        key={1}
        services={additionalServices}
        selectedOptions={selectedOptions}
        handleOptionPress={handleOptionPress}
        handleXPress={handleXPress}
      />

      {/* 기본 | 추가 서비스 설명 바텀시트모달 */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        footerComponent={renderFooter}
        style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
        animateOnMount={!reducedMotion}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.bottomSheetContainer}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              marginTop: 28,
              marginBottom: 16,
            }}
          >
            <PreBol18
              text={bottomSheetContent.type === "default" ? "기본 서비스" : "추가 서비스"}
              color={HEAD_LINE}
            />
            <PreMed16
              text={
                bottomSheetContent.type === "default"
                  ? "기본 서비스는 케어기버가 돌봄을 진행할 때 기본적으로 제공하는 서비스입니다."
                  : "추가 서비스는 기본 서비스에 추가적으로 케어기버가 진행할 수 있는 서비스입니다. 경쟁력을 높이기 위해 다양한 서비스를 추가해보세요!"
              }
              color={HEAD_LINE}
              mt={12}
              style={{ lineHeight: 24 }}
            />
          </View>

          {bottomSheetContent.services.map((item, index) => (
            <View key={index} style={{ marginTop: 16 }}>
              <PreBol16 text={item.name} color={HEAD_LINE} />
              <PreReg16 text={item?.desc || ""} color={HEAD_LINE} />
            </View>
          ))}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  root: {},
  titleContainer: {
    marginTop: 24,
  },
  question: {
    width: 28,
    height: 28,
  },
  bottomSheetContainer: {
    // paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    paddingBottom: BOTTOM_HEIGHT + 80,
  },
})
