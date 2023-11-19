import { DISABLED, GIVER_CASUAL_NAVY, GIVER_CASUAL_NAVY_40 } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  arrow: {
    width: 18,
    height: 18,
  },
  dayContainer: {
    color: DISABLED,
    marginVertical: -8,
    borderColor: "#F0F0F6",
    borderWidth: 1,
    width: 51.14,
    height: 72,
    zIndex: -1,
    boxShadow: "0px 0px 100px rgba(10, 100, 79, 0.5)",
  },
  dayView: {
    borderColor: GIVER_CASUAL_NAVY,
    borderRadius: 4,
    marginTop: 8,
  },
  dayText: {
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
    paddingRight: 0,
    paddingLeft: 0,
    zIndex: 1,
  },
  feeText: {
    fontSize: 11,
  },
})
