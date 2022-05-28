/* eslint-disable spaced-comment */
import * as React from "react"
import { Image, Text as ReactNativeText } from "react-native"
import { presets } from "../../components/text/text.presets"
import { TextProps } from "../../components/text/text.props"
import { translate } from "../../i18n"
import {
  PRETENDARD_REGULAR,
  PRETENDARD_BOLD,
  PRETENDARD_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
} from "../../../assets/fonts"

// import {HEIGTH} from.. //? 주석해제 예정
const HEIGTH = 1 //? 임시값

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
//  function Text(props: TextProps) {Z

//* Pretendard ========================================================================================================
const PretendardBold = (props: TextProps) => {
  const { tx, txOptions, text, children, style: styleMarginOnly, color, size } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <ReactNativeText
      style={[
        styleMarginOnly,
        {
          fontFamily: PRETENDARD_BOLD,
          includeFontPadding: false,
          fontSize: HEIGTH * size,
          color: color,
        },
      ]}
    >
      {content}
    </ReactNativeText>
  )
}

const PretendardMedium = (props: TextProps) => {
  const { tx, txOptions, text, children, style: styleMarginOnly, color, size } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <ReactNativeText
      style={[
        styleMarginOnly,
        {
          fontFamily: PRETENDARD_MEDIUM,
          includeFontPadding: false,
          fontSize: HEIGTH * size,
          color: color,
        },
      ]}
    >
      {content}
    </ReactNativeText>
  )
}

const PretendardRegular = (props: TextProps) => {
  const { tx, txOptions, text, children, style: styleMarginOnly, color, size } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <ReactNativeText
      style={[
        styleMarginOnly,
        {
          fontFamily: PRETENDARD_REGULAR,
          includeFontPadding: false,
          fontSize: HEIGTH * size,
          color: color,
        },
      ]}
      numberOfLines={props.numberOfLines}
    >
      {content}
    </ReactNativeText>
  )
}

//- Bold
export const PreBol12 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={marginOrTextAligns} size={12}>
      {content}
    </PretendardBold>
  )
}

export const PreBol14 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={marginOrTextAligns} size={14}>
      {content}
    </PretendardBold>
  )
}

export const PreBol16 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={marginOrTextAligns} size={16}>
      {content}
    </PretendardBold>
  )
}
export const PreBol18 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={marginOrTextAligns} size={18}>
      {content}
    </PretendardBold>
  )
}

export const PreBol20 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={marginOrTextAligns} size={20}>
      {content}
    </PretendardBold>
  )
}

export const PreBol24 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={marginOrTextAligns} size={24}>
      {content}
    </PretendardBold>
  )
}

export const PreBol28 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={marginOrTextAligns} size={28}>
      {content}
    </PretendardBold>
  )
}

export const PreBol32 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardBold {...rest} color={color} style={marginOrTextAligns} size={32}>
      {content}
    </PretendardBold>
  )
}

//- Medium
export const PreMed12 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={marginOrTextAligns} size={12}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed14 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={marginOrTextAligns} size={14}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed16 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={marginOrTextAligns} size={16}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed18 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={marginOrTextAligns} size={18}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed20 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={marginOrTextAligns} size={20}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed24 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={marginOrTextAligns} size={24}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed28 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={marginOrTextAligns} size={28}>
      {content}
    </PretendardMedium>
  )
}

export const PreMed32 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardMedium {...rest} color={color} style={marginOrTextAligns} size={32}>
      {content}
    </PretendardMedium>
  )
}

//- Regular
export const PreReg12 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={marginOrTextAligns} size={12}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg14 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={marginOrTextAligns} size={14}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg16 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={marginOrTextAligns} size={16}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg18 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={marginOrTextAligns} size={18}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg20 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={marginOrTextAligns} size={20}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg24 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={marginOrTextAligns} size={24}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg28 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={marginOrTextAligns} size={28}>
      {content}
    </PretendardRegular>
  )
}

export const PreReg32 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PretendardRegular {...rest} color={color} style={marginOrTextAligns} size={32}>
      {content}
    </PretendardRegular>
  )
}

//* Poppins ========================================================================================================
const PoppinsSemiBold = (props: TextProps) => {
  const { tx, txOptions, text, children, style: styleMarginOnly, color, size } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <ReactNativeText
      style={[
        styleMarginOnly,
        {
          fontFamily: POPPINS_SEMIBOLD,
          includeFontPadding: false,
          fontSize: HEIGTH * size,
          color: color,
        },
      ]}
    >
      {content}
    </ReactNativeText>
  )
}

const PoppinsRegular = (props: TextProps) => {
  const { tx, txOptions, text, children, style: styleMarginOnly, color, size } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <ReactNativeText
      style={[
        styleMarginOnly,
        {
          fontFamily: POPPINS_REGULAR,
          includeFontPadding: false,
          fontSize: HEIGTH * size,
          color: color,
        },
      ]}
    >
      {content}
    </ReactNativeText>
  )
}

//- SemiBold
export const PopSem12 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={marginOrTextAligns} size={12}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem14 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={marginOrTextAligns} size={14}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem16 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={marginOrTextAligns} size={16}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem18 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={marginOrTextAligns} size={18}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem20 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={marginOrTextAligns} size={20}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem24 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={marginOrTextAligns} size={24}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem28 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={marginOrTextAligns} size={28}>
      {content}
    </PoppinsSemiBold>
  )
}

export const PopSem32 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsSemiBold {...rest} color={color} style={marginOrTextAligns} size={32}>
      {content}
    </PoppinsSemiBold>
  )
}

//- Regular
export const PopReg12 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={marginOrTextAligns} size={12}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg14 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={marginOrTextAligns} size={14}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg16 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={marginOrTextAligns} size={16}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg18 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={marginOrTextAligns} size={18}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg20 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={marginOrTextAligns} size={20}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg24 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={marginOrTextAligns} size={24}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg28 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={marginOrTextAligns} size={28}>
      {content}
    </PoppinsRegular>
  )
}

export const PopReg32 = (props: TextProps) => {
  const { tx, txOptions, text, children, style: marginOrTextAligns, color, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <PoppinsRegular {...rest} color={color} style={marginOrTextAligns} size={32}>
      {content}
    </PoppinsRegular>
  )
}
