import { POPPINS_REGULAR } from "#fonts"
import { DISABLED, GIVER_CASUAL_NAVY, GIVER_CASUAL_NAVY_40, LIGHT_LINE } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  arrow: {
    width: 18,
    height: 18,
  },
  dayContainer: {
    color: DISABLED,
    marginVertical: -8,
    borderColor: LIGHT_LINE,
    borderWidth: 1,
    width: 51.14,
    height: 72,
    zIndex: -1,
  },
  dayTextContainer: {
    borderColor: GIVER_CASUAL_NAVY,
    borderRadius: 4,
    marginTop: 8,
  },
  dayText: {
    fontFamily: POPPINS_REGULAR,
    width: 24,
    height: 24,
    textAlign: "center",
    paddingTop: 2,
  },
  calendar: {
    borderColor: GIVER_CASUAL_NAVY_40,
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    height: "auto",
    paddingBottom: 6,
    zIndex: 1,
  },
})
