import { StyleSheet } from "react-native"
import { LBG, BODY } from "../../../theme/palette"
import { HEIGHT, WIDTH } from "../../../theme"
import { PRETENDARD_REGULAR } from "../../../../assets/fonts"
import { PopSem14, PopReg14 } from "../../../custom-components"

export const styles = StyleSheet.create({
  //* 댓글 입력 창
  root: {
    marginTop: HEIGHT * 10,
    //marginLeft: WIDTH * 16,
    //marginRight: WIDTH * 12,
    width: WIDTH * 362,
    height: HEIGHT * 646,
    backgroundColor: LBG,
    borderRadius: 8,
    textAlignVertical: "top",
    fontFamily: PRETENDARD_REGULAR,
    fontSize: 14,
    lineHeight: 20,
    paddingTop: HEIGHT * 20,
    paddingHorizontal: WIDTH * 20,
  },
  //*댓글 입력창 작아질 때
  smallTextBox: {
    height: HEIGHT * 377,
  },
})
