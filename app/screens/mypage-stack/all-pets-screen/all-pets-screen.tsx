import { View, FlatList } from "react-native"
import React, { FC } from "react"
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
import { styles } from "./styles"
import { HEAD_LINE, SUB_HEAD_LINE } from "#theme"

export const AllPetsScreen: FC<StackScreenProps<NavigatorParamList, "all-pets-screen">> = observer(
  ({ navigation, route }) => {
    //TODO 수정이 바로 적용되지 않는 문제. 여기서 getPets를 불러와야할지? 혹은 수정스크린에서 params로?
    const { pets } = route.params

    return (
      <Screen>
        {/* //* 제목 - 전체 n 마리 */}
        <Row style={styles.title}>
          <PreBol16 text="전체" color={SUB_HEAD_LINE} />
          <PopSem16 text={"" + pets?.length} color={HEAD_LINE} style={{ marginLeft: 4 }} />
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
                  navigate("edit-pet-info-screen", {
                    pet: {
                      id: data.item.id,
                      profileImage: data.item.images,
                      name: data.item.name,
                      birthday: data.item.birthday,
                      species: data.item.species.name,
                      sex: data.item.sex,
                      petType: data.item.petType,
                      weight: data.item.weight,
                      isNeutralizated: data.item.isNeutralizated,
                      desc: data.item.desc,
                    },
                  })
                }}
                isDeletable={false}
              />
              <View style={styles.divisionLine} />
            </>
          )}
        />
      </Screen>
    )
  },
)
