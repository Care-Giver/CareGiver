import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { images } from "#images"
import { PopSem16, PreReg16 } from "../basics/custom-texts/custom-texts"
import { LIGHT_LINE } from "#theme"

export interface ServiceTimeProps {
  style?: StyleProp<ViewStyle>

  startTime: string
  endTime: string
}

export const ServiceTime = observer(function ServiceTime(props: ServiceTimeProps) {
  const { style, startTime, endTime } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      <View style={[styles.box, { marginBottom: 12 }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <PreReg16 text="오전" mr={4} />
          <PopSem16 text={props.startTime} />
          <PreReg16 text="~" ml={10} mr={10} />
          <PreReg16 text="오후" mr={4} />
          <PopSem16 text={props.endTime} />
        </View>
        <Image style={styles.image} source={images.x_grey} />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {},
  box: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: LIGHT_LINE,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "white",
    //안드로이드 경우 box-shadow
    elevation: 2,
    alignItems: "center",
  },
  image: {
    width: 16,
    height: 16,
  },
})
