import React, { useState } from "react"
import {
  StyleProp,
  ViewStyle,
  View,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol14 } from "../basics/custom-texts/custom-texts"

export interface PaymentToolProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
  tool: string
}

export const PaymentTool = observer(function PaymentTool(props: PaymentToolProps) {
  const { style, tool } = props
  const allStyles = Object.assign({}, styles.root, style)

  const [selectedTool, setSelectedTool] = useState(null)
  const onPaymentToolPress = (tool) => {
    // 5~6번까지는 콘솔창에서 클릭된 tool이 잘 반영되는데 그 이후로는 클릭해도 반영이 안돼요(콘솔창에 뜨지 않음)....ㅠㅠ 왜이러는걸까요??
    // 클릭시, 버튼 안에 작은 원을 만들고 싶은데 이것도 안되네요 ㅠㅠ!!
    setSelectedTool(tool)
    if (tool === "카카오페이") {
      return (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: "orange",
          }}
        />
      )
    }
  }
  console.log(selectedTool)

  return (
    <View style={allStyles}>
      <Pressable style={styles.content}>
        <Image style={styles.paymentImage} />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity style={styles.paymentButton} onPress={() => onPaymentToolPress(tool)} />
          <PreBol14 text={tool} color="#797979" />
        </View>
      </Pressable>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    marginRight: 11,
  },
  paymentImage: {
    flex: 1,
    height: 59,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "blue",
  },
  paymentButton: {
    borderStyle: "solid",
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: "#797979",
    borderWidth: 1,
    marginRight: 7,
  },
})
