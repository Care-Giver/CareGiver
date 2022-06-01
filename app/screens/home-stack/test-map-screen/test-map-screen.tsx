import React, { useState, useEffect } from "react"
import { Platform, Text, View, StyleSheet, ActivityIndicator } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { SitterProfileCard } from "caregiver/app/custom-components/sitter-profile-card/sitter-profile-card"
import { petsitters } from "./dummy-data"
import { HEIGHT, WIDTH } from "caregiver/app/theme"
import { PreBol18, ScreenRootView } from "caregiver/app/custom-components"
import { HEAD_LINE, LBG } from "caregiver/app/theme/palette"
import { RowRoundedButton } from "caregiver/app/custom-components/buttons/row-rounded-button/row-rounded-button"
import IMAGES from "caregiver/assets/common-images"
import { NavigatorParamList } from "caregiver/app/navigators"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { styles } from "./styles"
import CustomMarkers from "./CustomMarkers"
import MyLocationMapMarker from "./MyLocationMapMarker"
import * as Location from "expo-location"

export const TestMapScreen: FC<StackScreenProps<NavigatorParamList, "search">> = observer(
  ({ navigation }) => {
    const [location, setLocation] = useState(null)
    // location = {"coords":{"altitude":0,"altitudeAccuracy":-1,"latitude":37.785834,"accuracy":5,"longitude":-122.406417,"heading":-1,"speed":-1},"timestamp":1654099889917.002}
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
      ;(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied")
          return
        }

        let location = await Location.getCurrentPositionAsync({})
        setLocation(location)
      })()
    }, [])

    let text = "Waiting.."
    if (errorMsg) {
      text = errorMsg
    } else if (location) {
      text = JSON.stringify(location)
    }

    //! location null 처리
    if (!location) {
      return <ActivityIndicator />
    }

    return (
      <ScreenRootView>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE} //! iOS 도 구글지도 사용
          showsUserLocation={true} //! Android 는 이것만 해도 showsMyLocationButton true 처리 됨
          showsMyLocationButton={true} //! iOS 는 이거 없으면 MyLocationButton 안 보임
          followsUserLocation={true}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        ></MapView>
      </ScreenRootView>
    )
  },
)
