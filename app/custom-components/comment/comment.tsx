import { View, Text, FlatList } from "react-native"
import React, { useCallback, useState } from "react"
import { styles } from "./styles"
import { DEVICE_SCREEN_WIDTH, HEIGHT, WIDTH } from "../../theme"
import { PreReg14 } from "../custom-texts/custom-texts"

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

export const Comment = (props) => {
  const { style: viewStyle } = props
  const { userId, desc, createAt, updatedAt, reply } = props

  return (
    <View style={[styles.root, viewStyle]}>
      <PreReg14 text={userId} />
    </View>
  )
}
