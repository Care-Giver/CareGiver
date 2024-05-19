import React, { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { Image, Platform, Pressable, StatusBar, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { BASIC_BACKGROUND_PADDING_WIDTH, Screen } from "#components"
import { useShowBottomTab } from "../../utils/hooks"
import { ChannelList } from "stream-chat-react-native" // Or stream-chat-expo
import { streamChatClient } from "../../services/api/stream"
import { useStores } from "#models"
import { images } from "#images"
import { HEADER_ROOT } from "../../components/_SCREEN_HEADER/common-styles"
import { CARE_NATURAL_BLUE, SHADOW_1, palette } from "#theme"
import { platformApiLevel } from "expo-device"
import bottomSheetModal from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal"
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"

export const ChannelListScreen: FC<
  StackScreenProps<NavigatorParamList, "channel-list-screen">
> = observer(function ChannelListScreen({ navigation }) {
  useShowBottomTab(navigation)
  const {
    userStore: { type, userAuth, userDetail, myStreamUserId, connectToStream },
  } = useStores()

  useEffect(() => {
    // client.connectUser 는 한 번만 실행되도록 한다.
    if (!streamChatClient?.user) {
      connectToStream()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamChatClient?.user])

  const filters = {
    type: "messaging",
    members: { $in: [myStreamUserId] },
  }

  const sort = {
    last_message_at: -1,
  }

  // 기본 | 추가 서비스 설명 바텀시트모달 - ref
  const bottomSheetModalRef = useRef<bottomSheetModal>(null)

  // 펫시터 등록하기 바텀시트모달 - snapPoints
  const snapPoints = useMemo(() => ["20%", "20%"], [])

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

  return (
    <Screen testID="ChannelList" style={{ paddingHorizontal: 0 }}>
      <ChatListScreenHeader onPress={() => bottomSheetModalRef.current.present()} />
      <ChannelList
        onSelect={(channel) => {
          navigation.navigate("channel-screen", {
            channel: channel,
          })
        }}
        filters={filters}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
      >
        <Pressable
          style={{
            marginTop: 28,
            marginBottom: 16,
            alignItems: "center",
          }}
        ></Pressable>
      </BottomSheetModal>
    </Screen>
  )
})

interface ChatListScreenHeaderProps {
  onPress: () => void
}

export const ChatListScreenHeader = observer(function ChatListScreenHeader(
  props: ChatListScreenHeaderProps,
) {
  const { onPress } = props
  return (
    <>
      <StatusBar
        backgroundColor={palette.black}
        barStyle={Platform.select({
          ios: "dark-content",
          android: "light-content",
        })}
        animated
      />
      <View {...props} style={[HEADER_ROOT, SHADOW_1]}>
        {/* //? 케어기버 로고 */}
        <Image style={styles.careGiverLogo} source={images.care_giver_logo_162x20} />

        {/* //? 알람 버튼 */}
        <Pressable
          onPress={onPress}
          style={{
            marginLeft: "auto",
            marginRight: 16,
          }}
        >
          <Image style={styles.bell} source={images.report} />
        </Pressable>
      </View>
    </>
  )
})

export const styles = StyleSheet.create({
  careGiverLogo: {
    width: 162,
    height: 20,
    marginLeft: 16,
    // backgroundColor: "red",
  },
  bell: {
    width: 28,
    height: 28,
  },
})
