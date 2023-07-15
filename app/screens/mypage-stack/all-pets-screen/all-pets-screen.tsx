import { View, Text, FlatList } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  PopSem16,
  PreBol16,
  Row,
  Screen,
  PetProfileCard,
  BASIC_BACKGROUND_PADDING_WIDTH,
} from "#components"
// import { SUB_HEAD_LINE, HEAD_LINE, WIDTH } from "#theme"
import { styles } from "./styles"
import { HEAD_LINE, SUB_HEAD_LINE } from "#theme"
import { useStores } from "#models"

export const AllPetsScreen: FC<StackScreenProps<NavigatorParamList, "all-pets-screen">> = observer(
  ({ navigation, route }) => {
    // MST store 를 가져옵니다.
    const { petStore } = useStores()

    // const [pets, setPets] = useState<Pet[]>([])
    const { pets } = route.params

    // useLayoutEffect(() => {
    //   async function fetchData() {
    //     petStore.setMyPets()
    //   }
    //   fetchData()
    //   setPets(petStore.pets)
    // }, [])

    return (
      <Screen>
        {/* //* 제목 - 전체 n 마리 */}
        <Row style={styles.title}>
          <PreBol16 text="전체" color={SUB_HEAD_LINE} />
          <PopSem16 text={"" + pets.length} color={HEAD_LINE} style={{ marginLeft: 4 }} />
          <PreBol16 text="마리" color={SUB_HEAD_LINE} style={{ marginLeft: 2 }} />
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
              <PetProfileCard
                key={data.item.id}
                petData={{
                  ...data.item,
                }}
                onPress={() => {
                  navigate("edit-pet-info-screen")
                }}
              />
              <View style={styles.divisionLine} />
            </>
          )}
        />
      </Screen>
    )
  },
)
