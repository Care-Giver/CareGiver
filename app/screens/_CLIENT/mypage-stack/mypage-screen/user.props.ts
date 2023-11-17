import { ImageSourcePropType } from "react-native"

export interface UserProps {
  id: number
  name: string
  profileImg: ImageSourcePropType
  role: string
}
