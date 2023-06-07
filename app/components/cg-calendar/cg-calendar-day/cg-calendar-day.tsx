import React from "react"
import { View, Pressable, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { styles } from "./styles"
import { CgCalendarDayProps } from "./cg-calendar-day.props"
import { DISABLED, GIVER_CASUAL_NAVY, LBG, MIDDLE_LINE } from "#theme"

export const CgCalendarDay = observer(function CgCalendarDay(props: CgCalendarDayProps) {
  const { date, state, selected } = props

  //const [selected, setSelected] = React.useState("") // 얘만 수정하면 될듯
  const textBgSelectior = ({ date, state }) => {
    if (date.dateString == selected) {
      return GIVER_CASUAL_NAVY
    }
    if (state == "today") {
      return LBG
    }
    return null
  }
  const textColorSelector = ({ date, state }) => {
    if (date.dateString == selected) {
      return "white"
    }
    if (state == "today") {
      return GIVER_CASUAL_NAVY
    }
    if (state == "disabled") {
      return MIDDLE_LINE
    }
    return DISABLED
  }

  return (
    <View
      style={[
        styles.dayContainer,
        {
          backgroundColor: state === "today" ? LBG : null,
          alignItems: "center",
        },
      ]}
    >
      <View //text를 view로 감싸고 backgroundcolor와 borderradius를 줘야한다.
        style={[
          styles.dayTextContainer,
          {
            borderWidth: selected === date.dateString ? 1 : 0,
          },
        ]}
      >
        <Text
          style={[
            styles.dayText,
            {
              backgroundColor: textBgSelectior({ date, state }),
              color: textColorSelector({ date, state }),
            },
          ]}
        >
          {date.day}
        </Text>
      </View>
    </View>
  )
})
