import { StyleSheet } from "react-native"
import { GIVER_CASUAL_NAVY, LBG } from "#theme"

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
  placeholderBoxClosed: {
    paddingHorizontal: 16,
  },
  placeholderBoxOpen: {
    paddingHorizontal: 16,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 46, //? borderBottomWidth = 0 이 되므로 이것을 고려하여 높이도 조정
    borderColor: GIVER_CASUAL_NAVY,
  },
  image: {
    width: 16,
    height: 16,
    marginLeft: "auto",
  },
  text: {
    marginLeft: 8,
  },
  addNewPetBox: {
    height: 52,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    // borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: LBG,
    justifyContent: "center",
    alignItems: "center",
  },
})
