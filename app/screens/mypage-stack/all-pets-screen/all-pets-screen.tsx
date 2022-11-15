import { View, Text, FlatList } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  PopSem16,
  PreBol16,
  Row,
  ScreenRootView,
  PetProfileCard,
  BASIC_BACKGROUND_PADDING_WIDTH,
} from "#components"
import { SUB_HEAD_LINE, HEAD_LINE } from "#theme/palette"
import { WIDTH } from "#theme/device-size-constant"
import { styles } from "./styles"
import { petsDummy } from "./dummy-data"

export const AllPetsScreen: FC<StackScreenProps<NavigatorParamList, "all-pets-screen">> = observer(
  ({ navigation, route }) => {
    const [pets, setPets] = useState([])

    useLayoutEffect(() => {
      setPets(petsDummy)
    }, [])

    return (
      <ScreenRootView>
        {/* //* 제목 - 전체 n 마리 */}
        <Row style={styles.title}>
          <PreBol16 text="전체" color={SUB_HEAD_LINE} />
          <PopSem16 text="3" color={HEAD_LINE} style={{ marginLeft: WIDTH * 4 }} />
          <PreBol16 text="마리" color={SUB_HEAD_LINE} style={{ marginLeft: WIDTH * 2 }} />
        </Row>

        {/* //? division line */}
        <View
          style={[styles.divisionLine, { marginHorizontal: -2 * BASIC_BACKGROUND_PADDING_WIDTH }]}
        />

        {/* //* 반려동물 목록 */}
        <FlatList
          data={pets}
          renderItem={(data) => (
            <>
              <PetProfileCard key={data.item.id} petData={data.item} />
              <View style={styles.divisionLine} />
            </>
          )}
        />
      </ScreenRootView>
    )
  },
)
