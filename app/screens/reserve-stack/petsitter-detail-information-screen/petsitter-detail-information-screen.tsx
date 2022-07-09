import React, { FC } from "react"
import {
  CaregiverCertificate,
  CaregiverService,
  Comment,
  FullWidthSizeImagesBoxWithIndicator,
  PreBol14,
  PreBol16,
  Row,
  ScreenRootView,
} from "../../../custom-components"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { HEADER_HEIGHT, HEIGHT, WIDTH } from "../../../theme"
import { BODY, SUB_HEAD_LINE } from "../../../theme/palette"

const commentsDummy = [
  {
    userId: "유저닉네임1",
    desc:
      "안녕하세요, 펫시터님! 몇가지 궁금한 점이 있어서 여쭤보려고 하는데 어디로 연락을 드려야 편하실까요~?? 편하신 연락처 알려알려알려알려",
    createAt: "2022-03-22T11:30",
    updatedAt: "2022-04-01T13:50",
    reply: false,
  },
  {
    userId: "유저닉네임2",
    desc: "이 펫시터님 성격도 정말 좋으시구 저희 강아지도 펫시터님 만나면 너무 좋아해요~!!ㅎㅎ",
    createAt: "2022-03-22T11:30",
    updatedAt: "2022-04-01T13:50",
    reply: false,
  },
  {
    userId: "유저닉네임3",
    desc: "혹시 사용하시는 강아지 샴푸 어떤 제품인지 알 수 있을까요?",
    createAt: "2022-03-22T11:30",
    updatedAt: "2022-04-01T13:50",
    reply: false,
  },
  {
    userId: "유저닉네임4",
    desc:
      "안녕하세요. 강아지들의 단짝 펫시터 강단입니다! 강아지들은 저의 소중한 단짝이자 저 또한 강아지들의 소중한 단짝 이라고 생각합니다. 여러분들도 아시겠지만, 반려견은 말을 할 수 없기 때문에 행동으로 자신의 의사를 표현합니다. 그렇기 때문에 저는 언제나 강아지들의 눈높이에서 강이지들과 친구가 되어 함께 논다는 마음으로 강아지들과 함께 해오고 있습니다. 어느덧 강아지들과 함께 해 온 시간이 10년을 훌쩍 넘었네요. 저의 강아지 뿐 아니라 여러분의 강아지들과도 단짝이 되어 보호자님들이 없는 시간에도 우리 아이들이 불안해하지 않을 수 있",
    createAt: "2022-03-22T11:30",
    updatedAt: "2022-04-01T13:50",
    reply: false,
  },
]

export const PetsitterDetailInformationScreen: FC<
  StackScreenProps<NavigatorParamList, "petsitter-detail-information-screen">
> = observer(({ navigation, route }) => {
  return (
    <ScreenRootView
      testID="testetst"
      preset="scroll"
      //? 스크롤할 때 헤더 투명도 바꾸기. 출처: https://stackoverflow.com/questions/52469579/transparent-background-for-header-using-createstacknavigator-react-native
      onScroll={(event) => {
        const headerOpacity =
          Math.min(Math.max(event.nativeEvent.contentOffset.y, 0) / HEADER_HEIGHT, 1.0) ?? 0.0
        navigation.setOptions({
          headerStyle: {
            elevation: headerOpacity,
            backgroundColor: `rgba(255,255,255,${headerOpacity})`,
          },
          headerTintColor: `rgba(0,255,0,${headerOpacity})`,
        })
      }}
      scrollEventThrottle={16}
      contentInsetAdjustmentBehavior="never"
    >
      <FullWidthSizeImagesBoxWithIndicator
        style={{
          // marginTop: -HEADER_HEIGHT,
          marginTop: 0,
        }}
      />

      {/* //* 자격증 */}
      <CaregiverCertificate
        label={"반려동물관리사"}
        detail={"반려동물을 종합적으로 관리할 수 있는 사람에게 수여되는 자격증"}
      />
      <CaregiverCertificate
        label={"반려동물행동교정사"}
        detail={"반려동물을 행동교정 행동교정 행동교정 행동교정 행동교정 행동교정"}
      />

      {/* //* 서비스 */}
      <Row>
        <CaregiverService emoji={"🦮"} label={"산책"} />
        <CaregiverService emoji={"🦴"} label={"간식주기"} />
        <CaregiverService emoji={"🛁"} label={"목욕시키기"} />
      </Row>

      {/* //* 댓글 */}
      <Row>
        <PreBol16 text={"댓글"} color={SUB_HEAD_LINE} />
        <PreBol14 text={"전체보기 >"} color={BODY} style={{ marginLeft: "auto" }} />
      </Row>

      {commentsDummy.slice(0, 3).map((item, index) => (
        <Comment
          key={index}
          style={{ marginTop: HEIGHT * -1 }}
          userId={item.userId}
          desc={item.desc}
          createAt={item.createAt}
          updatedAt={item.updatedAt}
          reply={item.reply}
        />
      ))}
    </ScreenRootView>
  )
})
