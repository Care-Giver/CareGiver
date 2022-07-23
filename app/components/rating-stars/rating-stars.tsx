import { View, Text, Image } from "react-native"
import React from "react"
import IMAGES from "~/assets/images"
import { Row } from "../basics/row/row"
import { HEIGHT, WIDTH } from "~/app/theme"
import { PreReg12 } from "../basics/custom-texts/custom-texts"

const styles = {
  star: {
    width: WIDTH * 13.12,
    height: HEIGHT * 12,
    marginLeft: WIDTH * 1.4,
  },
}

const RatingStars = (props: { ratings: number; style?: object }) => {
  const { ratings, style } = props

  //? 채워진 별 개수: 별점 소숫점 버림한 것과 동일
  const fillStars = Math.floor(ratings)
  //? 반쪽 별 개수: 소숫점 아래가 5 이상일 때 존재
  const halfStars = (ratings * 10) % 10 >= 5 ? 1 : 0
  //? 텅 빈 별 개수: 전체 5개에서 "채워진 별 + 반쪽 별" 개수만큼 뺀 만큼 존재
  const emptyStars = 5 - (fillStars + halfStars)

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
    >
      {/* //* 채워진 별 */}
      {new Array(fillStars).fill(0).map((value, index) => (
        <Image
          source={IMAGES.rating_star}
          //! 첫 번째 별에만 marginLeft = 0
          style={[styles.star, index === 0 ? { marginLeft: 0 } : null]}
        />
      ))}
      {/* //* 반쪽 별 */}
      {new Array(halfStars).fill(0).map(() => (
        <Image source={IMAGES.rating_star_half} style={styles.star} />
      ))}
      {/* //* 빈 별 */}
      {new Array(emptyStars).fill(0).map(() => (
        <Image source={IMAGES.rating_star_empty} style={styles.star} />
      ))}

      {/* //* 별점 */}
      <PreReg12 text={`(${ratings})`} style={{ marginLeft: WIDTH * 1.7 }} />
    </View>
  )
}

export default RatingStars
