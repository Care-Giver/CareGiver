import React from "react"
import { StyleProp, View, ViewStyle, Image, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { PreMed18 } from "#components"
import { styles } from "./styles"
import { images } from "#images"
import { HEADER_ROOT } from "../common-styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { goBack } from "#navigators"

export interface EditPetInfoScreenHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  //? props 정리 어떻게 ? 특히 밑의 ableEdit 함수와 editable의 빨간줄 등.
  style?: StyleProp<ViewStyle>
}

export const EditPetInfoScreenHeader = observer(function EditPetInfoScreenHeader(
  props: EditPetInfoScreenHeaderProps,
) {
  const { style } = props
  const _styles = Object.assign({}, styles, style)
  const navigation = useNavigation()
  const route = useRoute()
  const params = route.params
  console.log("route", route)
  console.log("params!!", params)
  const editable = params?.editable
  const isEditable = !editable //? needed?
  console.log("editable", editable)

  const ableEdit = () => {
    navigation.setParams({
      editable: true,
    })
  }

  return (
    <View style={[HEADER_ROOT, { flexDirection: "row" }]}>
      {/* //* 뒤로가기 (headerLeft 위치) */}
      <Pressable onPress={goBack} style={{ marginLeft: 16 }}>
        {/* //? 다른 코드에서 마진 16 안쓰셨던데 이에 대한 질문 (all-comments-screen-header) -> xd 에서 기준점이 어딘지. 그리고 기준선이 파란 선이라면 오른쪽 버튼에도 같은 규정 적용? (여기선 연필버튼) 
        -> 수정 : 쓰심. 컴포넌트 수정 필요 
      -> user-or-pet component 공통 마진 왼쪽 : 16 줘야 할수도?  */}
        <Image style={{ width: 28, height: 28 }} source={images.go_back} />
      </Pressable>

      {/* //* 타이틀 */}
      <PreMed18 style={{ marginLeft: 8, alignSelf: "center" }}>반려동물 정보 수정</PreMed18>

      {/* //* 편집버튼 (headerRight 위치) */}
      <Pressable
        onPress={() => {
          alert("remove?")
        }}
        style={{
          marginLeft: "auto",
          marginRight: 12,
        }}
      >
        <Image
          style={{ width: 28, height: 28 }}
          source={editable ? images.empty_12 : images.trashcan}
        />
      </Pressable>
      <Pressable
        onPress={ableEdit}
        style={{
          marginRight: 16,
        }}
      >
        <Image
          style={{ width: 28, height: 28 }}
          source={editable ? images.empty_12 : images.pencil}
        />
      </Pressable>
    </View>
  )
})

//TODO : 한번에 나타나고 사라지기 코드로 구현? view editable && 이용?
//TODO : image 스타일 통일 (pressable에 전체 스타일 줬을때 차이. -> All comment screen styles 참고 )
