import { ImageSourcePropType } from "react-native"

interface PetProps {
  id: number
  name: string
  profileImg: ImageSourcePropType
}

export interface UserProps {
  id: number
  name: string
  profileImg: ImageSourcePropType
  role: string
  pets: [] | PetProps[]
}
