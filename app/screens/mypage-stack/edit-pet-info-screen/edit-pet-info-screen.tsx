import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { ScreenRootView, UserOrPetProfileInfo } from "#components"
import { Pets } from "./dummy-data"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

export const EditPetInfoScreen: FC<
  StackScreenProps<NavigatorParamList, "edit-pet-info-screen">
> = observer(function EditPetInfoScreen() {
  //*현재 펫 데이터 가져오기 (일단은 더미데이터)
  const currentPet = Pets.find((Pet) => Pet.id === 1)

  //*몸무게 + kg 넣고 저장
  const weight = currentPet.weight + "kg"

  //*성별 한국어로 변환
  const sex = currentPet.sex === "female" ? "여" : "남"

  //*중성화 여부 한국어로 변환
  const Neutralizated = currentPet.isNeutralizated === true ? "함" : "안 함"

  return (
    <ScreenRootView testID="EditPetInfo" preset="fixed">
      <UserOrPetProfileInfo title="이름" profileInfo={currentPet.name} showOption={true} />
      <UserOrPetProfileInfo title="생년월일" profileInfo={currentPet.birthday} showOption={true} />
      <UserOrPetProfileInfo title="품종" profileInfo={currentPet.species} showOption={true} />
      <UserOrPetProfileInfo title="성별" profileInfo={sex} showOption={true} />
      <UserOrPetProfileInfo title="크기" profileInfo={currentPet.petType} showOption={true} />
      <UserOrPetProfileInfo title="몸무게" profileInfo={weight} showOption={true} />
      <UserOrPetProfileInfo title="중성화여부" profileInfo={Neutralizated} showOption={true} />
    </ScreenRootView>
  )
})
