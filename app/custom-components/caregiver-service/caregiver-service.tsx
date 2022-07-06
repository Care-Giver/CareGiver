import { View, Image, Pressable } from "react-native"
import React, { useCallback, useState } from "react"
import { styles } from "./styles"
import { HEIGHT, WIDTH } from "../../theme"
import { PreReg12, PreReg14 } from "../custom-texts/custom-texts"
import { BODY, HEAD_LINE, LIGHT_LINE, SUB_HEAD_LINE } from "../../theme/palette"
import { Row } from "../boxes/basics/row"
import IMAGES from "../../../assets/common-images"
import { DivisionLine } from "../division-line"

/* @Entity()
export class PetSitterReview extends CoreEntity {
  @Column({ nullable: true })
  @IsString()
  desc: string;

  @Column('float')
  @IsNumber()
  star: number;

  @Column('simple-array', { nullable: true })
  @IsString()
  images: string[];

  @Column({ default: false })
  @IsBoolean()
  reply: boolean;

  @ManyToOne(() => PetSitter, (petSitter) => petSitter.petSitterReviews, {
    onDelete: 'SET NULL',
    lazy: true,
  })
  @JoinColumn({ name: 'petSitterId' })
  petSitter: Promise<PetSitter>;

  @OneToOne(() => PetSitterReserve)
  @JoinColumn()
  reserve: PetSitterReserve;

  @ManyToOne(() => User, (user) => user.petSitterReviews, {
    onDelete: 'SET NULL',
    lazy: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User; // 작성자가 삭제되었을때 펫시터 화면에서 리뷰 정보에 누굴 띄워야할까?
} */

export const CaregiverService = (props) => {
  const { style: viewStyle } = props
  const { userId, desc, createAt, updatedAt, reply } = props

  const date = Date

  return (
    <View style={[styles.root, viewStyle]}>
      <DivisionLine height={HEIGHT * 1} color={LIGHT_LINE} />

      {/* //* 프로필이미지, 닉네임, 날짜, 점3개 */}
      <Row style={{ marginTop: HEIGHT * 13 }}>
        <Image source={IMAGES.default_profile_image_comment} style={styles.profileImage} />
        <PreReg14 text={userId} color={SUB_HEAD_LINE} style={{ marginLeft: WIDTH * 8 }} />
        <PreReg12
          text={createAt}
          color={BODY}
          style={{ marginLeft: "auto", marginRight: WIDTH * 13 }}
        />
        <Pressable
          onPress={() => {
            alert("하위")
          }}
        >
          <Image source={IMAGES.vertical_3_dots} style={styles.threeDots} />
        </Pressable>
      </Row>

      {/* //* 댓글 본문 */}
      <PreReg14 text={desc} color={HEAD_LINE} numberOfLines={2} style={styles.desc} />
      <DivisionLine height={HEIGHT * 1} color={LIGHT_LINE} style={{ marginTop: "auto" }} />
    </View>
  )
}
