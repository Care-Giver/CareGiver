// params 와 props 에 대한 type 이 지정되지 않았으므로,
// 임시로 typescript 를 무시합니다.
// @ts-nocheck
import React from "react"
import { StyleProp, View, ViewStyle, Image, Pressable, Alert } from "react-native"
import { observer } from "mobx-react-lite"
import { CustomModal, PreMed18 } from "#components"
import { images } from "#images"
import { HEADER_ROOT } from "../common-styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { goBack } from "#navigators"

export const EditPetInfoScreenHeader = observer(function EditPetInfoScreenHeader(props) {
  const allStyles = Object.assign({}, HEADER_ROOT, { flexDirection: "row" }, props?.style)
  const navigation = useNavigation()
  const route = useRoute()
  const params = route.params
  //console.log("route", route)
  //console.log("params!!", params)
  //*수정 상태 관리 변수
  const editable = params?.editable
  const isEditable = !editable //? needed?
  //console.log("editable", editable)
  //*뒤로가기 관리 변수 (수정중 일때 뒤로가기 할 시 저장 관련 경고창 뜰 때 사용 )
  const isBackPressed = params?.isBackPressed
  const ableEdit = () => {
    navigation.setParams({
      editable: true,
    })
  }

  return (
    <View style={allStyles}>
      {/* //* 뒤로가기 (headerLeft 위치) */}
      <Pressable
        onPress={() => {
          if (editable) {
            //*수정중 상태에서는 뒤로가기 눌렀을 때 경고가 떠야 하므로 true -> true 일때 screen 에서 goback
            navigation.setParams({ isBackPressed: true })
          } else {
            //*수정중이 아니라면 fale, 바로 뒤로 가기
            navigation.setParams({ isBackPressed: false })
            goBack()
          }
        }}
        style={{ marginLeft: 16 }}
      >
        <Image style={{ width: 28, height: 28 }} source={images.go_back} />
      </Pressable>

      {/* //* 타이틀 */}
      <PreMed18 style={{ marginLeft: 8, alignSelf: "center" }}>반려동물 정보 수정</PreMed18>

      {/* //* 편집버튼 (headerRight 위치) */}

      <Pressable
        onPress={ableEdit}
        style={{
          marginRight: 16,
          marginLeft: "auto",
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
