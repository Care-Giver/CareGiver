import React from "react"
import { View, Image, Pressable } from "react-native"
import { styles } from "./styles"
import { PreReg12, PreReg14 } from "../_BASIC/custom-texts/custom-texts"
import { BODY, HEAD_LINE, LIGHT_LINE, SUB_HEAD_LINE } from "#theme"
import { Row } from "../_BASIC/row/row"
import { images } from "#images"
import { DivisionLine } from "../_BASIC/division-line/division-line"
import { alertModal } from "../../utils/alert-modal"
import { formatDate } from "../../utils/format"
import { CommentColmns } from "#api"

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
  @JoinColumn({ name: 'id' })
  user: User; // 작성자가 삭제되었을때 펫시터 화면에서 리뷰 정보에 누굴 띄워야할까?
} */

interface CommentProps {
  style?: any
  numberOfLines?: number
  commentData: CommentColmns
}

export const Comment = (props: CommentProps) => {
  const { style: viewStyle, numberOfLines, commentData } = props
  const { id, desc, createAt, updatedAt, hasReply, visitingCommentReply } = commentData
  const _numberOfLines = numberOfLines || undefined

  const _createAt = new Date(createAt)
  const date = formatDate(_createAt)

  return (
    <View style={[styles.root, viewStyle]}>
      <DivisionLine height={1} color={LIGHT_LINE} />

      {/* //* 프로필이미지, 닉네임, 날짜, 점3개 */}
      <Row style={{ marginTop: 12 }}>
        {/* //TODO 백엔드측 대응 후 이미지, 닉네임 교체 필요 */}
        <Image source={{ uri: images.profile_default }} style={styles.profileImage} />
        <PreReg14 text={"이용자 닉네임"} color={SUB_HEAD_LINE} style={{ marginLeft: 8 }} />
        <PreReg12 text={date} color={BODY} style={{ marginLeft: "auto", marginRight: 13 }} />
        <Pressable
          style={{ width: 10, alignItems: "center" }}
          onPress={() => {
            //TODO 유저 id에 따라 수정 및 답글 기능 추가
            alertModal("개발중 🏗️", "댓글 편집 기능은 개발 중 입니다.")
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
