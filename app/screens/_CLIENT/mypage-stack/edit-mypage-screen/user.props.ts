import { ImageSourcePropType } from "react-native"

//? do i need this file?
export interface UserProps {
  id: number //? 필수?
  proileImage: ImageSourcePropType
  nickName: string
  sex: string
  birthday: string //? number ?
  email: string
  phoneNumber: string
  nicknameChangeCount: number //*한달에 바꾼 닉네임 횟수
}
