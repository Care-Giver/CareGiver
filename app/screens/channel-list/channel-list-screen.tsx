import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Image,
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  StatusBarStyle,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
  DivisionLine,
  PopSem12,
  PreBol14,
  PreBol18,
  PreMed14,
  PreReg14,
  Row,
  Screen,
} from "#components"
import { useShowBottomTab } from "../../utils/hooks"
import { ChannelList } from "stream-chat-react-native" // Or stream-chat-expo
import { ChannelMemberResponse, DefaultGenerics } from "stream-chat"
import { streamChatClient } from "../../services/api/stream"
import { useStores } from "#models"
import { images } from "#images"
import { HEADER_ROOT } from "../../components/_SCREEN_HEADER/common-styles"
import {
  BODY,
  BOTTOM_HEIGHT,
  DISABLED,
  GIVER_CASUAL_NAVY,
  LBG,
  LIGHT_LINE,
  SHADOW_1,
  palette,
} from "#theme"
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet"
import _ from "lodash"
import { postNotionReport } from "../../services/api/chats"

type ChatMember = ChannelMemberResponse<DefaultGenerics>
export const ChannelListScreen: FC<
  StackScreenProps<NavigatorParamList, "channel-list-screen">
> = observer(function ChannelListScreen({ navigation }) {
  useShowBottomTab(navigation)
  const {
    userStore: {
      userAuth,
      userDetail,
      myStreamUserId,
      connectToStream,
      blockedUserIds,
      setBlockedUserIds,
    },
  } = useStores()
  const [allUsers, setAllUsers] = useState<ChatMember[]>([])
  const [blockedUsers, setBlockedUsers] = useState<ChatMember[]>([])
  const [blockedUsersBuffer, setBlockedUsersBuffer] = useState<ChatMember[]>(blockedUsers)
  const isBufferDifferent = !_.isEqual(
    blockedUsersBuffer.map((u) => u.user_id),
    blockedUsers.map((u) => u.user_id),
  )
  const [nickname, setNickname] = useState<string>("")
  const [text, setText] = useState<string>("")

  const filters = {
    type: "messaging",
    members: { $in: [myStreamUserId] },
  }

  const sort = {
    last_message_at: -1,
  }

  const fetchOtherUsers = async () => {
    const channels = await streamChatClient.queryChannels(filters, [{ last_message_at: -1 }], {
      watch: true, // this is the default
      state: true,
    })
    if (!channels || channels.length === 0) {
      console.warn("🐞 channels", channels)
      return
    }

    const _others = await Promise.all(
      channels.map((channel) =>
        channel.queryMembers({}, {}, {}).then(({ members }) => {
          const notMe = members.filter((m) => m.user_id !== myStreamUserId)[0]
          return notMe
        }),
      ),
    )

    setAllUsers(_.orderBy(_others, "created_at", "desc"))
    const blocked = _others.filter((u) => blockedUserIds.includes(u.user_id))
    setBlockedUsers(blocked)
    setBlockedUsersBuffer(blocked)
  }

  const onPressBlock = (u: ChatMember) => {
    setBlockedUsersBuffer((prev) => _.orderBy([...prev, u], "created_at", "desc"))
  }

  const onPressUnblock = (u: ChatMember) => {
    setBlockedUsersBuffer((prev) =>
      _.orderBy(
        prev.filter((b) => b.user_id !== u.user_id),
        "created_at",
        "desc",
      ),
    )
  }

  const onPressSubmitBlockConfig = () => {
    setBlockedUsers(blockedUsersBuffer)
    setBlockedUserIds(blockedUsersBuffer.map((u) => u.user_id))
    bottomSheetModalRef.current.close()
  }

  useEffect(() => {
    // client.connectUser 는 한 번만 실행되도록 한다.
    if (!streamChatClient?.user) {
      connectToStream()
      return
    }

    // 나와 채팅방이 만들어진 유저들 조회
    if (allUsers.length === 0) {
      fetchOtherUsers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamChatClient?.user, filters])

  // 차단 바텀시트모달 - ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  // 신고 바텀시트 - ref
  const bottomSheetRef = useRef<BottomSheet>(null)
  // 바텀시트/바텀시트모달 - snapPoints
  const snapPoints = useMemo(() => ["87%", "87%"], [])

  /** 바텀시트/바텀시트모달 backdrop */
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
      <ChatListScreenHeader
        onPressBlock={() => {
          bottomSheetModalRef.current.present()
        }}
        onPress={() => bottomSheetRef.current.expand()}
      />
      <ChannelList
        onSelect={(channel) => {
          navigation.navigate("channel-screen", {
            channel: channel,
          })
        }}
        filters={filters}
        channelRenderFilterFn={(channels) => {
          if (allUsers.length === 0 && blockedUserIds.length !== 0) {
            // fetchOtherUsers 가 완료되기 전에 ReactDOM 최초로 렌더링된다. 이 시나리오에서 channelRenderFilterFn 을 의도대로 사용하기 위해, 모든 채팅방을 가린다.
            return []
          } else if (blockedUsers.length === 0) {
            // 차단 유저 목록이 존재하지 않으면, 모든 채팅방을 렌더링한다.
            return channels
          } else {
            // 차단 유저가 존재하는 채팅방들은 모두 렌더링에서 제외시킨다.
            const _blockedUserIds = blockedUsers.map((u) => u.user_id)
            return channels.filter((channel) => {
              const channelMemberUserIds = Object.keys(channel.state.members)
              const checker = channelMemberUserIds.map((cMUId) => _blockedUserIds.includes(cMUId))
              const hasBlockedUser = checker.includes(true)
              return !hasBlockedUser
            })
          }
        }}
      />

      {/* 차단 목록 바텀시트모달 */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        footerComponent={() => {
          return (
            <ConditionalButton
              label="저장하기"
              isActivated={isBufferDifferent}
              style={{ position: "absolute", bottom: BOTTOM_HEIGHT }}
              onPress={onPressSubmitBlockConfig}
            />
          )
        }}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
      >
        <BottomSheetScrollView contentContainerStyle={{ paddingBottom: BOTTOM_HEIGHT + 100 }}>
          {/* 차단 되지 않은 유저들 */}
          {_.differenceBy(allUsers, blockedUsersBuffer, "user_id").map((u, _, self) => {
            return (
              <BlockUserCard
                key={u.user_id}
                mode="차단하기"
                onPress={() => onPressBlock(u)}
                u={u}
              />
            )
          })}

          {/* 차단 된 유저들 */}
          <PreBol18 text="차단 유저 목록" mt={20} />
          {blockedUsersBuffer.length !== 0 ? (
            blockedUsersBuffer.map((u) => {
              return (
                <BlockUserCard
                  key={u.user_id}
                  mode="해제하기"
                  onPress={() => onPressUnblock(u)}
                  u={u}
                />
              )
            })
          ) : (
            <PopSem12 color={DISABLED} text="차단된 유저가 없습니다." mv={10} />
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>

      {/* 신고 바텀시트 */}
      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        index={-1}
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
          textAlignVertical="top"
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
                nickname: userDetail.nickname,
                phoneNumber: userDetail.phoneNumber,
                id: userDetail.id,
              },
              reportee: nickname,
              desc: text,
              reportedAt: new Date().toISOString(),
            })
            bottomSheetRef.current.close()
          }}
        />
      </BottomSheet>
    </Screen>
  )
})

interface ChatListScreenHeaderProps {
  onPressBlock: () => void
  onPress: () => void
}

export const ChatListScreenHeader = observer(function ChatListScreenHeader(
  props: ChatListScreenHeaderProps,
) {
  const {
    userStore: { type },
  } = useStores()
  const { onPressBlock, onPress } = props

  const statusBarBg = type === "CARE_GIVER" ? GIVER_CASUAL_NAVY : palette.black

  const statusBarStyle: StatusBarStyle =
    type === "CARE_GIVER"
      ? "light-content"
      : Platform.select({
          ios: "dark-content",
          android: "light-content",
        })

  const logo =
    type === "CARE_GIVER" ? images.care_giver_logo_light_162x20 : images.care_giver_logo_162x20

  return (
    <>
      <StatusBar backgroundColor={statusBarBg} barStyle={statusBarStyle} animated />
      <View
        {...props}
        style={[
          HEADER_ROOT,
          SHADOW_1,
          { backgroundColor: type === "CARE_GIVER" ? GIVER_CASUAL_NAVY : "white" },
        ]}
      >
        {/* //? 케어기버 로고 */}
        <Image style={styles.careGiverLogo} source={logo} />

        {/* //? 차단 버튼 */}
        <TouchableOpacity
          onPress={onPressBlock}
          style={{
            marginLeft: "auto",
            marginRight: 16,
          }}
        >
          <Image style={styles.headerIcon} source={images.block_user} />
        </TouchableOpacity>
        {/* //? 신고 버튼 */}
        <TouchableOpacity
          onPress={onPress}
          style={{
            marginRight: 16,
          }}
        >
          <Image style={styles.headerIcon} source={images.report} />
        </TouchableOpacity>
      </View>
    </>
  )
})
interface BlockUserCardProps {
  style?: StyleProp<ViewStyle>
  mode: "차단하기" | "해제하기"
  onPress: () => void
  u: ChatMember
}
const BlockUserCard = observer(function BlockUserCard(props: BlockUserCardProps) {
  const { style, mode, onPress, u } = props
  const $color = mode === "차단하기" ? GIVER_CASUAL_NAVY : "black"
  const $button: ViewStyle = {
    width: 60,
    height: 24,
    borderColor: $color,
    borderWidth: 2,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start", // == 'display: inline-block'  (ref: https://stackoverflow.com/a/45335695/16673541)
  }
  return (
    <View style={style}>
      <View
        style={{
          width: "100%",
          height: 52,
          justifyContent: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <PreReg14
            text={`${u.user.name}`}
            color={mode === "차단하기" ? "black" : DISABLED}
            style={{ textDecorationLine: mode === "차단하기" ? "none" : "line-through" }}
          />
          <TouchableOpacity style={$button} onPress={onPress} hitSlop={8}>
            <PopSem12 text={mode} color={$color} />
          </TouchableOpacity>
        </View>
      </View>
      <DivisionLine mb={10} />
    </View>
  )
})

const styles = StyleSheet.create({
  careGiverLogo: {
    width: 162,
    height: 20,
    marginLeft: 16,
    // backgroundColor: "red",
  },
  headerIcon: {
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
