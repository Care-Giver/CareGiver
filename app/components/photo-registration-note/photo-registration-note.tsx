import * as React from "react"
import { StyleProp, View, ViewStyle, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { StyleSheet } from "react-native"

const ROOT: ViewStyle = {
  justifyContent: "center",
}

export interface PhotoRegistrationNoteProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
}

export const PhotoRegistrationNote = observer(function PhotoRegistrationNote(
  props: PhotoRegistrationNoteProps,
) {
  const { style } = props
  const styles = Object.assign({}, ROOT, style)

  return (
    <View style={styles}>
      <View style={styless.visual}>
        <Text style={styless.maintext}>사진 등록 전, 잠깐!</Text>
        <Text style={styless.subtext}>
          사진은 최대 <Text style={styless.highlight}>10장</Text>까지 등록 가능합니다.
        </Text>
        <Text style={styless.subtext}>
          위탁 장소의 여러 공간을 보여줄수록, 사진의 화질이 좋을 수록 매칭확률이 올라갑니다!
        </Text>
      </View>
    </View>
  )
})

const styless = StyleSheet.create({
  visual: {
    margin: 10,
    padding: 20,
    marginTop: 50,
    backgroundColor: "#f5f5f5",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 10,
  },
  maintext: {
    color: "#0c2461",
    fontWeight: "900",
    marginBottom: 10,
    fontSize: 15,
  },
  subtext: {
    marginBottom: 5,
    color: "#4b4b4b",
  },
  highlight: {
    fontWeight: "800",
    color: "black",
  },
})
