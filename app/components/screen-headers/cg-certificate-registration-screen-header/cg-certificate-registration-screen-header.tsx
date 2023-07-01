import { View, Image, Pressable, StyleSheet } from "react-native"
import React from "react"
import { PreMed16 } from "../../basics/custom-texts/custom-texts"
import { images } from "#images"
import { DISABLED } from "#theme"
import { HEADER_ROOT } from "../common-styles"
import { goBack } from "#navigators"

// XD보았을 때, 다른 부분까지 커버가되는 헤더를 만들고 싶었는데 1-3-1 위탁장소 선택... 이부분은 뭔가 이미지도 들어가는 것 같아서 제한이 될 것 같다고 판단
export const CgCertificateRegistrationScreenHeader = (props) => {
  const title = props.options.title ? props.options.title : props.route.name

  return (
    <View {...props} style={[HEADER_ROOT, styles.root]}>
      {/* 뒤로가기 버튼 */}
      <Pressable onPress={goBack}>
        <Image style={styles.goBackButton} source={images.go_back} />
      </Pressable>
      {/* 저장 후 나가기 버튼 */}
      <Pressable
        onPress={() => {
          alert("저장 후 나가기 버튼이 눌렸습니다.")
        }}
      >
        <PreMed16 text={"저장 후 나가기"} color={DISABLED} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    // flexDirection: "row", -> ?
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  goBackButton: {
    width: 28,
    height: 28,
  },
})
