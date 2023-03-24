import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { ConditionalButton, ScreenRootView, UserOrPetProfileInfo } from "#components"
import { Pets } from "./dummy-data"
import { useNavigation, useRoute } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

export const EditPetInfoScreen: FC<
  StackScreenProps<NavigatorParamList, "edit-pet-info-screen">
> = observer(function EditPetInfoScreen() {
  const route = useRoute()
  const navigation = useNavigation()

  //* 수정(연필) 버튼 눌렀는지 안눌렀는지 판별하는 변수. 즉, 수정 가능 상태인지 아닌지
  const editable = route.params?.editable

  //*현재 펫 데이터 가져오기 (일단은 더미데이터)
  const currentPet = Pets.find((Pet) => Pet.id === 1)

  //*몸무게 + kg 넣고 저장
  const weight = currentPet.weight + "kg"

  //*성별 한국어로 변환
  const sex = currentPet.sex === "female" ? "여" : "남"

  //*중성화 여부 한국어로 변환
  const Neutralizated = currentPet.isNeutralizated === true ? "함" : "안 함"

  //* birthday 자르는 함수? 장치? 필요

  //*수정 불가 상태 (수정(연필) 버튼 보이는 상태)로 만들기

  const notEditable = () => {
    navigation.setParams({ editable: false })
  }
  return (
    <ScreenRootView testID="EditPetInfo" preset="scroll">
      <UserOrPetProfileInfo title="이름" profileInfo={currentPet.name} showOption={false} />
      <UserOrPetProfileInfo title="생년월일" profileInfo={currentPet.birthday} showOption={false} />
      <UserOrPetProfileInfo title="품종" profileInfo={currentPet.species} showOption={false} />
      <UserOrPetProfileInfo title="성별" profileInfo={sex} showOption={false} />
      <UserOrPetProfileInfo title="크기" profileInfo={currentPet.petType} showOption={false} />
      <UserOrPetProfileInfo title="몸무게" profileInfo={weight} showOption={false} />
      <UserOrPetProfileInfo title="중성화여부" profileInfo={Neutralizated} showOption={false} />
      {/* //*저장하기 버튼 */}
      {editable && (
        <ConditionalButton
          label="저장하기"
          isActivated={true}
          style={{
            marginTop: "auto",
            marginBottom: 0,
          }}
          onPress={() => {
            notEditable() //* 저장하기를 누르면, 수정 불가 화면 + 편집버튼 (연필) 보이기
            //TODO pet data 실제로 변경하는 코드 필요 (변경된 정보들로 저장 (process -> 실제로 한 정보가 변경 되었다면 저장 보내서 backend 데이터 건들기 ))
          }}
        />
      )}
    </ScreenRootView>
  )
})
