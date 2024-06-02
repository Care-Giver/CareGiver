import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
  PreBol14,
  PreBol18,
  PreMed14,
  PreReg14,
  Row,
  Screen,
} from "#components"
import { useShowBottomTab } from "../../utils/hooks"
import { ChannelList } from "stream-chat-react-native" // Or stream-chat-expo
import { streamChatClient } from "../../services/api/stream"
import { useStores } from "#models"
import { images } from "#images"
import { HEADER_ROOT } from "../../components/_SCREEN_HEADER/common-styles"
import { BODY, DISABLED, GIVER_CASUAL_NAVY, LBG, LIGHT_LINE, SHADOW_1, palette } from "#theme"
import bottomSheetModal from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet"
import { postNotionReport } from "../../services/api/chats"

export const ChannelListScreen: FC<
  StackScreenProps<NavigatorParamList, "channel-list-screen">
> = observer(function ChannelListScreen({ navigation }) {
  useShowBottomTab(navigation)
  const {
    userStore: { type, userAuth, userDetail, myStreamUserId, connectToStream },
  } = useStores()
  const [nickname, setNickname] = useState<string>("")
  const [text, setText] = useState<string>("")
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
  const snapPoints = useMemo(() => ["87%", "87%"], [])

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
        keyboardBehavior="extend"
        enablePanDownToClose
        style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
      >
        <PreBol18 text="케어를 진행하면서 문제가 있으셨나요?" mb={12} />
        <PreMed14 text="- 신고된 사용자에게는 따로 알림이 가지 않습니다." color={BODY} />
        <PreMed14 text="- 신고 접수 후 24시간 내 이메일로 답변드리겠습니다." color={BODY} />
        <PreMed14 text="- 사유는 최대한 상세하게 적어주세요." color={BODY} />
        <PreReg14 text="신고할 닉네임" color={BODY} mt={28} mb={9} />
        <BottomSheetTextInput
          style={styles.nicknameInput}
          placeholder="신고할 유저 닉네임을 적어주세요."
          value={nickname}
          onChangeText={setNickname}
          blurOnSubmit
          maxLength={30}
        />
        <Row>
          <PreReg14 text="신고사유" color={BODY} />
          <PreMed14 text="(최대 300자)" color={DISABLED} />
        </Row>
        {/* // TODO: keyboard avoiding view - 줄넘김 많을 때 텍스트 가리는 문제 생길 수 있음 */}
        {/* //* 리뷰 텍스트 input */}
        <BottomSheetTextInput
          maxLength={300}
          placeholder="신고하는 사유를 최대한 상세히 적어주세요."
          placeholderTextColor={DISABLED}
          blurOnSubmit
          onChangeText={setText}
          value={text}
          multiline
          // onSubmitEditing={Keyboard.dismiss} // 엔터 클릭시 키보드 종료
          style={styles.textInput}
        />

        {/* //* 입력 글자 수 */}
        <View style={[{ marginTop: 10 }, styles.textCountContainer]}>
          <PreBol14 text={`${text.length} `} color={BODY} />
          <PreReg14 text="/ 300" color={BODY} />
        </View>
        {/* //TODO 확인버튼 => 신고 api 호출 */}
        <ConditionalButton
          label="확인"
          isActivated={!!(nickname.length && text.length)}
          onPress={() => {
            postNotionReport({
              reporter: {
                email: userAuth.email,
                nickname: userDetail.email,
                phoneNumber: userDetail.phoneNumber,
                id: userDetail.id,
              },
              reportee: nickname,
              desc: text,
              reportedAt: new Date().toISOString(),
            })
            bottomSheetModalRef.current.close()
          }}
        />
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
  const {
    userStore: { type },
  } = useStores()
  const { onPress } = props

  const statusBarBgSelector = () => {
    if (type === "CARE_GIVER") return GIVER_CASUAL_NAVY
    return palette.black
  }

  const statusBarStyleSelector = (): StatusBarStyle => {
    if (type === "CARE_GIVER")
      return Platform.select({
        ios: "dark-content",
        android: "light-content",
      })
    return "light-content"
  }

  const logoSelector = () => {
    if (type === "CARE_GIVER") return images.care_giver_logo_light_162x20
    return images.care_giver_logo_162x20
  }
  return (
    <>
      <StatusBar
        backgroundColor={statusBarBgSelector()}
        barStyle={statusBarStyleSelector()}
        animated
      />
      <View
        {...props}
        style={[
          HEADER_ROOT,
          SHADOW_1,
          { backgroundColor: type === "CARE_GIVER" ? GIVER_CASUAL_NAVY : "white" },
        ]}
      >
        {/* //? 케어기버 로고 */}
        <Image style={styles.careGiverLogo} source={logoSelector()} />

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
  nicknameInput: {
    fontSize: 16,
    borderBottomColor: LIGHT_LINE,
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: 28,
  },
  textInput: {
    padding: 20,
    paddingTop: 20,

    minHeight: 228,

    borderRadius: 8,
    backgroundColor: LBG,
    lineHeight: 20,
  },

  textCountContainer: {
    marginBottom: 28,
    marginLeft: "auto",

    flexDirection: "row",
    alignItems: "center",
  },
})
