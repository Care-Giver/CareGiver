import { View, Pressable, Image } from "react-native"
import React from "react"
import { Row } from "../boxes/basics/row"
import { PopSem16, PreBol16, PreReg12 } from "../custom-texts/custom-texts"
import { HEIGHT, WIDTH } from "~/app/theme"
import IMAGES from "~/assets/images"
import { FilterHeaderProps } from "./filter-header.props"

// ? 필터 헤더 부분에 오는 숫자는 Poppins 폰트를 사용하기 때문에, 따로 전달 받음

export const FilterHeader = ({ title, number, seletedOption }: FilterHeaderProps) => {
  return (
    <Row
      style={{
        justifyContent: "space-between",
        height: HEIGHT * 47,
      }}
    >
      {/* //* 제목 */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <PreBol16 text={title} />
        <PopSem16
          text={number}
          style={{
            marginLeft: WIDTH * 4,
          }}
        />
      </View>

      {/* //* 필터 버튼 */}
      {seletedOption && (
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <PreReg12 text={seletedOption} />
          <Image
            source={IMAGES.list_bars}
            style={{
              width: WIDTH * 16,
              height: HEIGHT * 16,
              marginLeft: WIDTH * 5,
            }}
          />
        </Pressable>
      )}
    </Row>
  )
}
