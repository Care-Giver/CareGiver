// import React, { useState, useEffect } from "react"
// import { Platform, Text, View, StyleSheet, ActivityIndicator } from "react-native"
// import { FlatList } from "react-native-gesture-handler"
// import { StackScreenProps } from "@react-navigation/stack"
// import { observer } from "mobx-react-lite"
// import {
//   PopReg28,
//   PreBol18,
//   Screen,
//   SitterProfileCard,
//   RowRoundedButton,
// } from "#components"
// import { petsitters } from "./dummy-data"
//
// import { HEAD_LINE, LBG } from "#theme"
// import { images } from "#images"
// import { NavigatorParamList } from "#navigators"
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
// import { styles } from "./styles"
// import CustomMarkers from "./CustomMarkers"
// import MyLocationMapMarker from "./MyLocationMapMarker"
// import * as Location from "expo-location"

// export const TestMapScreen: FC<StackScreenProps<NavigatorParamList, "test-map-screen">> = observer(
//   ({ navigation }) => {
//     const [location, setLocation] = useState(null)
//     const [trigger, setTrigger] = useState(false)
//     const [errorMsg, setErrorMsg] = useState(null)

//     useEffect(() => {
//       ;(async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync()
//         if (status !== "granted") {
//           setErrorMsg("Permission to access location was denied")
//           return
//         }

//         let location = await Location.getCurrentPositionAsync({})
//         //? location = {"coords":{"altitude":0,"altitudeAccuracy":-1,"latitude":37.785834,"accuracy":5,"longitude":-122.406417,"heading":-1,"speed":-1},"timestamp":1654099889917.002}

//         return setLocation(location.coords)
//       })()
//     }, [])

//     let text = "Waiting.."
//     if (errorMsg) {
//       text = errorMsg
//     } else if (location) {
//       text = JSON.stringify(location)
//     }

//     //! location null 처리
//     if (!location) {
//       return <ActivityIndicator />
//     }

//     // useEffect(() => {
//     //   first;

//     //   return () => {
//     //     second;
//     //   };
//     // }, [third]);

//     return (
//       <Screen>
//         <MapView
//           style={styles.map}
//           provider={PROVIDER_GOOGLE} //! iOS 도 구글지도 사용
//           showsUserLocation={true} //! Android 는 이것만 해도 showsMyLocationButton true 처리 됨
//           showsMyLocationButton={true} //! iOS 는 이거 없으면 MyLocationButton 안 보임
//           followsUserLocation={true}
//           region={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           onRegionChangeComplete={(Region) => {
//             console.log(Region)
//             setLocation(Region)
//           }}
//           showsCompass={true} //TODO: 이래도 iOS 에서는 나침반이 안 보이는 이슈 발견...
//         ></MapView>

//         {/*//TODO: useMemo 와 useRef 를 사용하여, 줌인이 끝나기 전에 리렌더링 되어버리는 이슈 해결하기*/}
//         <PopReg28>
//           latitude: {location.latitude} {"\n"}
//           longitude: {location.longitude}
//         </PopReg28>
//       </Screen>
//     )
//   },
// )
