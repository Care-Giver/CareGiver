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
  const onPaymentToolPress = (tool) => setSelectedTool(tool)
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
