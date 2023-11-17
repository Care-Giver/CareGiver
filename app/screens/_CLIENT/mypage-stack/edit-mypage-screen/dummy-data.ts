import { ImageSourcePropType } from "react-native"

interface User {
  id: number //? 필수?
  profileImage: ImageSourcePropType
  nickname: string
  sex: string
  birthday: string //? number ?
  email: string
  phoneNumber: string
  nicknameChangeCount: number //*한달에 바꾼 닉네임 횟수
}

export const Users: User[] = [
  {
    id: 1,
    profileImage: null,
    nickname: "방울이엄마",
    sex: "여",
    birthday: "99.12.28",
    email: "hhh@gmail.com",
    phoneNumber: "010-0000-0000",
    nicknameChangeCount: 0,
  },
  {
    id: 2,
    profileImage: null,
    nickname: "발이_엄마",
    sex: "여",
    birthday: "99.08.31",
    email: "hhh312@gmail.com",
    phoneNumber: "010-0120-0000",
    nicknameChangeCount: 2,
  },

  {
    id: 3,
    profileImage: null,
    nickname: "나비언니",
    sex: "여",
    birthday: "01.01.28",
    email: "butterfly23@gmail.com",
    phoneNumber: "010-0340-0000",
    nicknameChangeCount: 3,
  },
]
