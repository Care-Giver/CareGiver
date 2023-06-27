import React, { FC, useState } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { CustomImagePicker, PreBol20, Row, ScreenRootView, UnderlineText } from "#components"
import { HEAD_LINE } from "#theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const WriteReviewScreen: FC<
  StackScreenProps<NavigatorParamList, "write-review-screen">
> = observer(function WriteReviewScreen() {
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  return (
    <ScreenRootView testID="WriteReview">
      {/* // * profile card */}
      {/* ...혜리님 작업... */}

      {/* // * title text */}
      <PreBol20 text="이용은 어떠셨나요?" color={HEAD_LINE} />
      <Row style={{ marginTop: 6 }}>
        <PreBol20 text="해당 케어기버에 대한 " color={HEAD_LINE} />
        <UnderlineText>
          <PreBol20 text="후기를 남겨주세요!" color={HEAD_LINE} />
        </UnderlineText>
      </Row>

      {/* //* 별점 선택 */}
      {/* ...혜리님 작업... */}

      {/* //* 사진 선택 */}
      <CustomImagePicker
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        submitButtonText="사진 추가하기"
        style={{ marginTop: 20 }}
      />

      {/* //* 리뷰 텍스트 input */}

      {/* //* 확인 버튼 */}
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  root: {},
})
