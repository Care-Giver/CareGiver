import { View, Image, Pressable } from "react-native"
import React from "react"
import { WIDTH } from "#theme"
import { PreMed18 } from "../../basics/custom-texts/custom-texts"
import { images } from "#images"
import { styles } from "./styles"
import { HEADER_ROOT } from "../common-styles"
import { NavigationContainer } from "@react-navigation/native"
import { goBack } from "#navigators"
//import { allowStateReadsStart } from "mobx/dist/internal"

export const MyProfileManangementScreenHeader = (props) => {
  // console.log("props", props) //! FEEDBACK: spread operator (...) 를 사용해서 {...props} 를 잘 넘겨받은 것을 확인 할 수 있습니다!

  return (
    <View style={[HEADER_ROOT, { flexDirection: "row", backgroundColor: "pink" }]}>
      {/* //* 뒤로가기 (headerLeft 위치) */}
      <Pressable onPress={goBack}>
        <Image style={{ width: 28, height: 28 }} source={images.go_back} />
      </Pressable>

      {/* //* 타이틀 */}
      <PreMed18 style={{ marginLeft: 16, alignSelf: "center" }}>내 프로필 관리</PreMed18>

      {/* //* 편집버튼 (headerRight 위치) */}
      <Pressable
        // onPress={() => setVisable((prev) => !prev)}
        style={{
          marginLeft: "auto",
          marginRight: 8, //!
        }}
      >
        <Image style={{ width: 28, height: 28 }} source={images.pencil} />
      </Pressable>
    </View>
  )
}
