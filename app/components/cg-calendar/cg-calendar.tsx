import * as React from "react"
import { StyleProp, View, Image, Text, ViewStyle, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { Calendar, DateData, LocaleConfig } from "react-native-calendars"
import { images } from "#images"
import { styles } from "./styles"
import { CgCalendarProps } from "./cg-calendar.props"
import "./localeConfig"
import { CgCalendarDay } from "./cg-calendar-day/cg-calendar-day"

export const CgCalendar = observer(function CgCalendar(props: CgCalendarProps) {
  const {} = props
  const [selected, setSelected] = React.useState("")
  const onDayPress = ({ date }) => {
    console.log(date.dateString) //test
    setSelected(date.dateString)
    console.log(selected)
  }
  /*const marked = React.useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: "#222222",
        selectedTextColor: "yellow",
      },
    }),
    [selected],
  )*/
  return (
    <View>
      <Calendar
        headerStyle={{ height: 94, marginBottom: 0, marginTop: -5 }}
        renderArrow={(direction) =>
          direction === "left" ? (
            <Image source={images.right_arrow_navy} style={[styles.arrow, { marginLeft: 40 }]} />
          ) : (
            <Image source={images.right_arrow_navy} style={[styles.arrow, { marginRight: 40 }]} />
          )
        }
        monthFormat={"MMMM"}
        theme={{
          textMonthFontWeight: "bold",
          monthTextColor: "#00206C",
          textMonthFontSize: 20,
        }}
        dayComponent={({ date, state }) => (
          <Pressable onPress={(e) => onDayPress({ date })}>
            <CgCalendarDay date={date} state={state} selected={selected} />
          </Pressable>
        )}
        style={styles.calendar}
      ></Calendar>
    </View>
  )
})
