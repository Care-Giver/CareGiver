import { View, Image, Pressable } from "react-native"
import React, { useCallback, useState } from "react"
import { styles } from "./styles"

import { PreReg12, PreReg14 } from "../basics/custom-texts/custom-texts"
import { BODY, HEAD_LINE, LIGHT_LINE, SUB_HEAD_LINE } from "#theme"
import { Row } from "../basics/row/row"
import { images } from "#images"
import { DivisionLine } from "../division-line/division-line"

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

export const Comment = ({ style: viewStyle, numberOfLines, commentData }) => {
  const { userId, desc, createdAt, updatedAt, reply, profileImg } = commentData
  const _numberOfLines = numberOfLines || undefined

  // ? 날짜 표기를 YY.MM.DD 형태로 변환
  const formatDate = (date: Date) => {
    let formatted =
      date.getFullYear().toString().slice(2) +
      "." +
      (date.getMonth() + 1 < 10 ? "0" : "") +
      (date.getMonth() + 1).toString() +
      "." +
      (date.getDate() < 10 ? "0" : "") +
      date.getDate().toString()
    return formatted
  }

  const _createdAt = new Date(createdAt)
  const date = formatDate(_createdAt)

  return (
    <View style={[styles.root, viewStyle]}>
      <DivisionLine height={1} color={LIGHT_LINE} />

      {/* //* 프로필이미지, 닉네임, 날짜, 점3개 */}
      <Row style={{ marginTop: 12 }}>
        <Image source={{ uri: profileImg }} style={styles.profileImage} />
        <PreReg14 text={userId} color={SUB_HEAD_LINE} style={{ marginLeft: 8 }} />
        <PreReg12 text={date} color={BODY} style={{ marginLeft: "auto", marginRight: 13 }} />
        <Pressable
          onPress={() => {
            alert("하위")
          }}
        >
          <Image source={images.vertical_3_dots} style={styles.threeDots} />
        </Pressable>
      </Row>

      {/* //* 댓글 본문 */}
      <PreReg14 text={desc} color={HEAD_LINE} numberOfLines={_numberOfLines} style={styles.desc} />
      <DivisionLine height={1} color={LIGHT_LINE} style={{ marginTop: 32 }} />
    </View>
  )
}
