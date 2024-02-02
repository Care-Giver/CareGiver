import React, { FC, useCallback, useState } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  PopSem16,
  PreBol16,
  Row,
  Screen,
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
  CustomModal,
  SelectedPetCard,
} from "#components"
import { HEAD_LINE, SUB_HEAD_LINE, LBG, GIVER_CASUAL_NAVY, BOTTOM_HEIGHT } from "#theme"
import { useFocusEffect } from "@react-navigation/native"
import { useStores } from "#models"
import { Pet, deletePet } from "#api"
import { images } from "#images"
import { appendEulReul } from "../../../../utils/format"

export const AllPetsScreen: FC<StackScreenProps<NavigatorParamList, "all-pets-screen">> = observer(
  ({ navigation, route }) => {
    const {
      petStore: { petsHandler },
    } = useStores()

    //! 이 스크린에서는 반드시 이렇게 사용할 것. const { ... } = route.params 절대 ㄴㄴ.
    const petsFromMypageScreen = route.params?.pets
    const isSaved = route.params?.isSaved

    const [pets, setPets] = useState<Pet[]>(petsFromMypageScreen || [])
    // 만약, edit-pet-info-screen 에서 "저장하기" 버튼을 클릭하거나,
    // add-pet-screen 에서 "등록하기" 버튼을 클릭해서 이 스크린으로 돌아왔다면,
    // 새 펫 정보를 요청한다.
    useFocusEffect(
      useCallback(() => {
        if (isSaved) {
          console.log("isSaved >>>", isSaved)
          const updatePetState = async () => {
            // @ts-ignore
            petsHandler().then(setPets)
          }
          updatePetState()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isSaved]),
    )

    const isActivated = pets.length < 5

    const [deletePetModal, setDeletePetModal] = useState<{
      visibleState: boolean
      petId: number
      petName: string
    }>({
      visibleState: false,
      petId: null,
      petName: null,
    })

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
          renderItem={({ item }) => (
            <>
              <SelectedPetCard
                key={item.id}
                petData={item}
                onPress={() => {
                  navigate("edit-pet-info-screen", { pet: item })
                }}
                deletable={true}
                onDeletePress={() => {
                  setDeletePetModal({
                    visibleState: true,
                    petId: item.id,
                    petName: item.name,
                  })
                }}
                hasDivision={false}
              />
              <View style={styles.divisionLine} />
            </>
          )}
        />

        <ConditionalButton
          style={styles.addPet}
          label={isActivated ? "+ 반려동물 추가하기" : "반려동물은 최대 5마리 등록 가능합니다."}
          labelTextColor={GIVER_CASUAL_NAVY}
          isActivated={isActivated}
          onPress={() => {
            navigation.replace("add-pet-screen")
          }}
        />

        {/* //* 반려동물 삭제 모달 창 */}
        <CustomModal
          visibleState={deletePetModal.visibleState}
          title={`반려동물 ${appendEulReul(deletePetModal.petName || "")} 삭제하시겠어요?`}
          subtitle="삭제하면 등록된 모든 정보가 사라집니다."
          yesBtnText="삭제할래요"
          noBtnText="다시 생각해볼게요"
          handleYesPress={() => {
            deletePet(deletePetModal.petId).then(() => {
              // 선택한 반려동물을 삭제후, 새 반려동물 리스트를 호출한다.
              petsHandler().then((pets: Pet[]) => setPets(pets || []))
            })
            setDeletePetModal({ visibleState: false, petId: null, petName: null })
          }}
          handleNoPress={() =>
            setDeletePetModal({ visibleState: false, petId: null, petName: null })
          }
          image={images.dog_illustration}
          imageWidth={151}
          imageHeight={156}
        />
      </Screen>
    )
  },
)

const styles = StyleSheet.create({
  title: {
    height: 47,
  },

  divisionLine: {
    height: 2,
    backgroundColor: LBG,
  },

  addPet: {
    bottom: BOTTOM_HEIGHT,
    backgroundColor: "white",
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
  },
})
