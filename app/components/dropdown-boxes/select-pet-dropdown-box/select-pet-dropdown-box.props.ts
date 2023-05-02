import { Pet } from "app/models"
import { Dispatch, SetStateAction } from "react"
import { StyleProp, ViewStyle } from "react-native"

export interface SelectPetDropdownBoxProps {
  style?: StyleProp<ViewStyle>
  isOpen?: boolean
  onPress: () => any
  selectedPets: Array<Pet>
  setSelectedPets: Dispatch<SetStateAction<any[]>>
  placeholder?: string
}
