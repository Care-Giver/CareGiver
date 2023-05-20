import { View, Image, Pressable } from "react-native"
import React from "react"
import { PreMed18 } from "../../basics/custom-texts/custom-texts"
import { images } from "#images"
import { HEADER_ROOT } from "../common-styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { goBack } from "#navigators"
//import { allowStateReadsStart } from "mobx/dist/internal"

export const EditMypageScreenHeader = (props) => {
  //.log("props", props) //! FEEDBACK: spread operator (...) 를 사용해서 {...props} 를 잘 넘겨받은 것을 확인 할 수 있습니다!
  const navigation = useNavigation()
  const route = useRoute()

  const params = route.params //* route.params 를 통해, screen 의 params 를 가져올 수 있습니다.

  //console.log("route", route)
  //console.log("params!!", params)

  // @ts-ignore

  //console.log("editable", params?.editable)
  const editable = params?.editable //?여기서도 mainscreen과 같은 질문
  const isEditButtonShown = !editable //*  (modal) editable 이 아닌 경우 -> 편집버튼 보이기 |  (modal) editable 인 경우 -> 편집버튼 숨기기
  //console.log("isEditButtonShown", isEditButtonShown)

  //* 편집버튼 숨기기
  const hideEditButton = () => {
    //* setParams 를 통해, screen 의 params 를 수정할 수 있습니다. (update screen params)
    // @ts-ignore
    navigation.setParams({
      editable: true,
    })
  }

  return (
    <View style={[HEADER_ROOT, { flexDirection: "row" }]}>
      {/* //* 뒤로가기 (headerLeft 위치) */}
      <Pressable onPress={goBack} style={{ marginLeft: 16 }}>
        <Image style={{ width: 28, height: 28 }} source={images.go_back} />
      </Pressable>

      {/* //* 타이틀 */}
      <PreMed18 style={{ marginLeft: 16, alignSelf: "center" }}>내 프로필 관리</PreMed18>

      {/* //* 편집버튼 (headerRight 위치) */}
      <Pressable
        onPress={hideEditButton}
        style={{
          marginLeft: "auto",
          marginRight: 8, //!
        }}
      >
        <Image
          style={{ width: 28, height: 28 }}
          source={isEditButtonShown ? images.pencil : images.empty_12}
        />
      </Pressable>
    </View>
  )
}
