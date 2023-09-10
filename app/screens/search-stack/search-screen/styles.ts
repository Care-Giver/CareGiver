import { StyleSheet } from "react-native"
import { HEIGHT, LBG, LIGHT_LINE } from "#theme"
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"

export const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: 109,
    resizeMode: "contain",
  },
  image: { width: 16, height: 16, alignSelf: "flex-start" },
  text: { marginLeft: 8, lineHeight: 20 },
  addNewPetBox: {
    height: 52,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: LBG,
    justifyContent: "center",
    alignItems: "center",
  },
  shown: {
    width: "auto",
    minHeight: 10,
    marginTop: 8,
    borderRadius: 8,
    borderColor: LIGHT_LINE,
    borderWidth: 2,
    // backgroundColor: "red",
  },
  hidden: {
    width: 0,
    height: 0,
  },
})
