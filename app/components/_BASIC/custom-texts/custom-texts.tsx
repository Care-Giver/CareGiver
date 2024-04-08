/* eslint-disable spaced-comment */
import * as React from "react"
import { Text as ReactNativeText } from "react-native"
import { CustomTextProps, TextProps } from "../ignite-basics/text/text.props"
import { translate } from "../../../i18n"
import {
  PRETENDARD_REGULAR,
  PRETENDARD_BOLD,
  PRETENDARD_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
} from "#fonts"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
//  function Text(props: TextProps) {Z

//* Pretendard ========================================================================================================
const PretendardBold = (props: TextProps) => {
  const { tx, txOptions, text, children, style, color, size } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <ReactNativeText
      style={[
        style,
        {
          fontFamily: PRETENDARD_BOLD,
          includeFontPadding: false,
          fontSize: size,
          color: color,
        },
      ]}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}
    >
      {content}
    </ReactNativeText>
  )
}

const PretendardMedium = (props: TextProps) => {
  const { tx, txOptions, text, children, style, color, size } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <ReactNativeText
      style={[
        style,
        {
          fontFamily: PRETENDARD_MEDIUM,
          fontWeight: "normal",
          includeFontPadding: false,
          fontSize: size,
          color: color,
        },
      ]}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}
    >
      {content}
    </ReactNativeText>
  )
}

const PretendardRegular = (props: TextProps) => {
  const { tx, txOptions, text, children, style, color, size } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <ReactNativeText
      style={[
        style,
        {
          fontFamily: PRETENDARD_REGULAR,
          //! PretendardRegular 에는 fontWeight 설정하지 말 것 - iOS 에서는 fontWeight 이 우선되어 적용되므로, Wrapper 방식으로 다른 폰트 스타일과 사용시, 제대로 적용되지 않음
          includeFontPadding: false,
          fontSize: size,
          color: color,
        },
      ]}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}
    >
      {content}
    </ReactNativeText>
  )
}

//- Bold
export const PreBol12 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={[$textStyle, style]} size={12}>
      {content}
    </PretendardBold>
  )
}

export const PreBol14 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={[$textStyle, style]} size={14}>
      {content}
    </PretendardBold>
  )
}

export const PreBol16 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={[$textStyle, style]} size={16}>
      {content}
    </PretendardBold>
  )
}
export const PreBol18 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={[$textStyle, style]} size={18}>
      {content}
    </PretendardBold>
  )
}

export const PreBol20 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={[$textStyle, style]} size={20}>
      {content}
    </PretendardBold>
  )
}

export const PreBol24 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={[$textStyle, style]} size={24}>
      {content}
    </PretendardBold>
  )
}

export const PreBol28 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={[$textStyle, style]} size={28}>
      {content}
    </PretendardBold>
  )
}

export const PreBol32 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={[$textStyle, style]} size={32}>
      {content}
    </PretendardBold>
  )
}

//- Medium
export const PreMed12 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={[$textStyle, style]} size={12}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed14 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={[$textStyle, style]} size={14}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed16 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={[$textStyle, style]} size={16}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed18 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={[$textStyle, style]} size={18}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed20 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={[$textStyle, style]} size={20}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed24 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={[$textStyle, style]} size={24}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed28 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={[$textStyle, style]} size={28}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed32 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={[$textStyle, style]} size={32}>
      {content}
    </PretendardMedium>
  )
}

//- Regular
export const PreReg10 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={[$textStyle, style]} size={10}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg12 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={[$textStyle, style]} size={12}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg14 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={[$textStyle, style]} size={14}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg16 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={[$textStyle, style]} size={16}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg18 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={[$textStyle, style]} size={18}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg20 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={[$textStyle, style]} size={20}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg24 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={[$textStyle, style]} size={24}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg28 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={[$textStyle, style]} size={28}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg32 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={[$textStyle, style]} size={32}>
      {content}
    </PretendardRegular>
  )
}

//* Poppins ========================================================================================================
const PoppinsSemiBold = (props: TextProps) => {
  const { tx, txOptions, text, children, style, color, size } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <ReactNativeText
      style={[
        style,
        {
          fontFamily: POPPINS_SEMIBOLD,
          includeFontPadding: false,
          fontSize: size,
          color: color,
        },
      ]}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}
    >
      {content}
    </ReactNativeText>
  )
}

const PoppinsRegular = (props: TextProps) => {
  const { tx, txOptions, text, children, style, color, size } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <ReactNativeText
      style={[
        style,
        {
          fontFamily: POPPINS_REGULAR,
          fontWeight: "normal",
          includeFontPadding: false,
          fontSize: size,
          color: color,
        },
      ]}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}
    >
      {content}
    </ReactNativeText>
  )
}

//- SemiBold
export const PopSem12 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={[$textStyle, style]} size={12}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem14 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={[$textStyle, style]} size={14}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem16 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={[$textStyle, style]} size={16}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem18 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={[$textStyle, style]} size={18}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem20 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={[$textStyle, style]} size={20}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem24 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={[$textStyle, style]} size={24}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem28 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={[$textStyle, style]} size={28}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem32 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={[$textStyle, style]} size={32}>
      {content}
    </PoppinsSemiBold>
  )
}

//- Regular
export const PopReg12 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={[$textStyle, style]} size={12}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg14 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={[$textStyle, style]} size={14}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg16 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={[$textStyle, style]} size={16}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg18 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={[$textStyle, style]} size={18}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg20 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={[$textStyle, style]} size={20}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg24 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={[$textStyle, style]} size={24}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg28 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={[$textStyle, style]} size={28}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg32 = (props: CustomTextProps) => {
  const { tx, txOptions, text, children, style, color, mt, mb, mv, ml, mr, mh, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const $textStyle = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={[$textStyle, style]} size={32}>
      {content}
    </PoppinsRegular>
  )
}
