import React, { FC, useState } from "react"
import { ScrollView, StyleSheet, View, Switch } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { DivisionLine, PreBol20, PreMed18, ScreenRootView } from "#components"
import { GIVER_CASUAL_NAVY, LIGHT_LINE } from "#theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const SetCrecheServiceDayScreen: FC<
  StackScreenProps<NavigatorParamList, "set-creche-service-day-screen">
> = observer(function SetCrecheServiceDayScreen() {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev)
  }
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()
  return (
    <ScreenRootView testID="SetCrecheServiceDay" style={styles.root}>
      <ScrollView>
        <PreBol20 text="9월 15일" mb={10} ml={16} />
        <DivisionLine height={8} />
        <View style={styles.servicePossible}>
          <PreMed18 text="서비스 가능" />
          <Switch
            trackColor={{ false: LIGHT_LINE, true: GIVER_CASUAL_NAVY }}
            thumbColor={isEnabled ? "white" : "white"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </View>
      </ScrollView>
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  servicePossible: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 21,
    marginBottom: 17,
  },
  switch: {
    width: 51,
    height: 31,
  },
})
