import React, { Dispatch, SetStateAction } from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { commonStyles } from "./commonStyles"
import {
  PreBol12,
  PreBol14,
  PreBol18,
  PreMed14,
  PreReg12,
} from "../../../components/_BASIC/custom-texts/custom-texts"
import { BODY, HEAD_LINE, LBG, MIDDLE_LINE, SUB_HEAD_LINE } from "#theme"
import { UnderlineText } from "../../../components/underline-text/underline-text"
import { TextInput } from "react-native-gesture-handler"
import { DivisionLine } from "../../../components/_BASIC/division-line/division-line"
import { POPPINS_REGULAR, PRETENDARD_REGULAR } from "#fonts"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useStores } from "#models"

export interface CgSetSelfIntroProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  title: string
  setTitle: Dispatch<SetStateAction<string>>

  desc: string
  setDesc: Dispatch<SetStateAction<string>>
}

export const CgSetSelfIntro = observer(function CgSetSelfIntro(props: CgSetSelfIntroProps) {
  const { style, title, setTitle, desc, setDesc } = props
  const allStyles = Object.assign({}, styles.root, style)
  const {
    petsitterStore: {
      hasDraftPetsitterProfile,
      draftPetsitter,
      draftServiceType,
      setDraftPetsitter,
    },
  } = useStores()

  return (
    <KeyboardAwareScrollView
      style={allStyles}
      showsVerticalScrollIndicator={false}
      // onKeyboardWillShow={(e) => { // ios 만 지원되는 prop 임
      //   console.log("onKeyboardWillShow", e)
      // }}
      // onKeyboardDidShow={() => {
      //   setIsKeyboardShown(true)
      // }}
      // onKeyboardWillHide={(e) => { // ios 만 지원되는 prop 임
      //   console.log("onKeyboardWillHide", e)
      // }}
      // onKeyboardDidHide={() => {
      //   // 시간지연 없이 바로 실행하면, 안드로이드에서 버튼 렌더링이 어색함
      //   setTimeout(() => {
      //     setIsKeyboardShown(false)
      //   }, 100)
      // }}
    >
      {/* // * title container */}
      <View style={commonStyles.titleContainer}>
        {/* // ? first line */}
        <PreBol18 color={HEAD_LINE} text={"펫시터님에 대한"} />
        {/* // ? second line */}
        <View style={commonStyles.secondTitleContainer}>
          <UnderlineText>
            <PreBol18 text={"설명"} />
          </UnderlineText>
          <PreBol18 color={HEAD_LINE} text="을 작성해주세요." />
        </View>
      </View>

      <View style={styles.titleBox}>
        <PreMed14 color={SUB_HEAD_LINE} text="제목" />
        <View style={commonStyles.textInput}>
          {/* // TODO: placeholder에 들어갈 가격을 백엔드 서버에 저장해둘 것인지, 하한가 + 상한가 기준으로 프론트에서 직접 계산할 것인지? */}
          <TextInput
            style={{ fontFamily: PRETENDARD_REGULAR }}
            maxLength={30}
            keyboardType="default"
            returnKeyType="done"
            placeholder={"제목을 입력해주세요."}
            // value={desc === 0 ? null : descFormatter(desc.toString())} //! toLocaleString 사용하지 말 것 - android 이슈 존재
            // onChangeText={(text) => {
            //   setDesc(Number(text.replace(/,/g, "")))
            // }}
            placeholderTextColor={BODY}
            onChangeText={(text) => {
              // setComment(texts)
              // setWordLength(texts.length)
              setTitle(text)
            }}
            value={title}
            onBlur={(e) => {
              console.log("e.nativeEvent.text", e.nativeEvent.text)
              if (hasDraftPetsitterProfile) {
                setDraftPetsitter(
                  { ...draftPetsitter, title: e.nativeEvent.text },
                  draftServiceType,
                )
              }
            }}
          />
        </View>
        <DivisionLine color={MIDDLE_LINE} />
      </View>

      <View style={styles.descBox}>
        <PreMed14 color={SUB_HEAD_LINE} text="자기소개" />
        <TextInput
          style={{
            marginTop: 10,
            width: "100%",
            backgroundColor: LBG,
            borderRadius: 8,
            textAlignVertical: "top",
            fontFamily: PRETENDARD_REGULAR,
            fontSize: 14,
            lineHeight: 20,
            paddingTop: 20,
            paddingHorizontal: 20,
            minHeight: 278,
          }}
          multiline
          maxLength={3000}
          keyboardType="default"
          returnKeyType="done"
          // autoFocus={true}
          placeholder={"본인을 가장 잘 소개할 수 있는 글을 써보세요."}
          // onSubmitEditing={Keyboard.dismiss}
          //*사용자가 댓글 입력시 입력 내용 저장, 입력 길이 계산
          onChangeText={(text) => {
            // setComment(texts)
            // setWordLength(texts.length)
            setDesc(text)
          }}
          value={desc}
          onBlur={(e) => {
            console.log("e.nativeEvent.text", e.nativeEvent.text)
            if (hasDraftPetsitterProfile) {
              setDraftPetsitter({ ...draftPetsitter, desc: e.nativeEvent.text }, draftServiceType)
            }
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  )
})

const styles = StyleSheet.create({
  root: {},
  titleBox: {
    marginTop: 24,
  },
  descBox: {
    marginTop: 28,
  },
})
