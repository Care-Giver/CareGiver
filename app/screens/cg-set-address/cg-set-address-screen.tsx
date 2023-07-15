import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Screen, PreBol16, PreReg12, PreReg14, PreMed14, Row } from "#components"
import { Platform, View, ScrollView, StyleSheet, TextInput, Pressable } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import Geolocation from "react-native-geolocation-service"
import { IOS_BOTTOM_HOME_BAR_HEIGHT, MIDDLE_LINE, GIVER_CASUAL_NAVY, palette } from "#theme"
import { images } from "#images"

export const CgSetAddressScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-set-address-screen">
> = observer(function CgSetAddressScreen() {
  const [initialRegion, setInitialRegion] = useState(null)
  const [markers, setMarker] = useState([])
  const [createdMarker, setCreatedMarker] = useState(null)
  const [address, setAddress] = useState(null)
  const [inputAddress, setInputAddress] = useState(null)

  //인풋 주소 처리
  const handleInputAddress = (text) => {
    setInputAddress(text)
  }

  //스타일 check
  const BeforeConButton = [styles.ConditionButton, styles.BeforeBackground]
  const NextConButtion = [styles.ConditionButton, styles.NextBackground]

  //현재 위치를 반환해주는 함수
  const getAddress = async (lat, long) => {
    // Initialize Geocoder library with your API key
    let mApiKey = "" //API 키 이슈가 있음, 유료로 결제해야함 추후(90일 체험판임)
    // Request GPS permission
    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization("whenInUse")
      //mApiKey = "AIzaSyDGzlmhKrUA0vLqQs6jrXg1Il77Xmt8lD8"
      mApiKey = "AIzaSyDEmkVMqKbStRBK-w65rnfQQ9fhrzFigkc"
    } else {
      //mApiKey = "AIzaSyAPziDHnPS4EEAHq1EjWe1KpQ9hUWE0x6M"
      mApiKey = "AIzaSyDEmkVMqKbStRBK-w65rnfQQ9fhrzFigkc"
    }
    await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat +
        "," +
        long +
        "&key=" +
        mApiKey +
        "&language=ko",
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log("doro extraction " + responseJson.results[0].address_components[3].long_name)
        //console.log("address extraction " + responseJson.results[0].formatted_address)
        const addressArray = parseStringByWhitespace(responseJson.results[0].formatted_address)
        setAddress(addressArray)
        //console.log("addressArray:", addressArray)
        //return address
      })
      .catch((err) => console.log("udonPeople error : " + err))
  }

  //띄어쓰기를 기준으로 문자열 파싱해주는 함수
  const parseStringByWhitespace = (str) => {
    const parsedArray = str.split(" ")
    return parsedArray
  }

  const printArrayFromIndex = (arr, startIndex) => {
    let tempValue = arr[startIndex] + " "
    for (let i = startIndex + 1; i < arr.length; i++) {
      tempValue += arr[i] + " "
      //console.log(tempValue)
    }
    return tempValue
  }

  useEffect(() => {
    // 현재 장치의 위치를 반환받음
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const pangyoLatitude = "37.387583174794"
        const pangyoLongitude = "127.0896771665"
        console.log("Current Location:", latitude, longitude)
        getAddress(pangyoLatitude, pangyoLongitude)
        setInitialRegion({
          latitude: 37.387583174794, //테스트용 판교
          longitude: 127.0896771665, //테스트용 판교
          //latitude,
          //longitude,
          latitudeDelta: 0.03, //작아질수록 확대가 많이됨
          longitudeDelta: 0.03,
        })
        //createMarker({ latitude, longitude })
        createMarker({ latitude: 37.387583174794, longitude: 127.0896771665 }) //판교 테스트
      },
      (error) => {
        console.log("Error getting location:", error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )
  }, [])

  const createMarker = (coordinate) => {
    // 이전 마커 제거
    //console.log("coordinate:", coordinate)
    setMarker((prevMarkers) => prevMarkers.filter((marker) => marker !== createdMarker))

    const newMarker = {
      id: markers.length + 1,
      title: `Marker ${markers.length + 1}`,
      description: "New marker clicked",
      coordinate,
      image: images.map_marker,
    }

    //setMarker([...markers, newMarker])
    setMarker((prevMarkers) => [...prevMarkers, newMarker])
    setCreatedMarker(newMarker)

    // 마커가 변경되면 맵의 중심으로 변경하는 코드
    setInitialRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    })
    getAddress(coordinate.latitude, coordinate.longitude)
    //console.log("Current address:", address)
    return newMarker
  }

  return (
    <Screen testID="" preset="fixed">
      <View style={{ flex: 1 }}>
        {/*To resolve the issue of address[0] being null when the app is initially executed, you can add a conditional rendering in your component to check if the address state is null or not before accessing its elements
        필요한 값이 안들어왔을 때 다시 랜더링 시 활용*/}
        {address && (
          <>
            <PreBol16
              text={address[0] + " " + address[1] + " " + address[3]}
              style={styles.Address1}
            />
            <Row>
              <PreReg12 text={"지번"} color={"#767676"} style={styles.Address2} />
              <PreReg14
                text={printArrayFromIndex(address, 4)}
                color={"#454545"}
                style={styles.Address3}
              />
            </Row>
            <PreMed14 text={"상세 주소"} color={"#767676"} style={styles.AddressDetail1} />

            <TextInput
              style={styles.AddressDetail2}
              onChangeText={handleInputAddress}
              value={inputAddress}
              placeholder="ex) 판교원마을 6단지 601동 101호"
              color={"#171717"}
            />

            <View style={styles.HorizonLine} />
          </>
        )}

        <MapView
          style={styles.MapviewStyle}
          region={initialRegion}
          provider={PROVIDER_GOOGLE}
          onPress={(event) => {
            const { latitude, longitude } = event.nativeEvent.coordinate
            createMarker({ latitude, longitude })
            //console.log("Created Marker:", newMarker)
            //getAddress(latitude, longitude)
            //console.log("Current Position:", latitude, longitude)
          }}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              image={marker.image}
            />
          ))}

          {createdMarker && (
            <Marker
              key={createdMarker.id}
              coordinate={createdMarker.coordinate}
              title={createdMarker.title}
              description={createdMarker.description}
              image={createdMarker.image}
            />
          )}
        </MapView>

        <Row>
          <Pressable
            style={BeforeConButton}
            onPress={() => {
              alert("이전으로 돌아가기")
            }}
          >
            <PreBol16 text={"이전"} color={palette.white} />
          </Pressable>

          <Pressable
            style={NextConButtion}
            onPress={() => {
              alert("이전으로 돌아가기")
            }}
          >
            <PreBol16 text={"저장 후 다음단계"} color={palette.white} />
          </Pressable>
        </Row>
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  Address1: {
    marginTop: 20,
    marginLeft: 16,
    color: "#111111",
  },

  Address2: {
    marginTop: 12,
    marginLeft: 16,
    color: "#767676",
    borderColor: "#F0F0F6",
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    paddingBottom: 4,
    borderWidth: 2,
    width: 46,
    Height: 21,
    textAlign: "center",
  },

  Address3: {
    marginTop: 12,
    marginLeft: 12,
    color: "#454545",
  },

  AddressDetail1: {
    marginTop: 20,
    marginLeft: 12,
    color: "#767676",
  },

  AddressDetail2: {
    marginTop: 10,
    marginLeft: 12,
    color: "#767676",
  },

  HorizonLine: {
    marginTop: 4,
    marginLeft: 12,
    width: 334,
    borderBottomWidth: 1,
    borderBottomColor: MIDDLE_LINE,
  },

  ConditionButton: {
    marginLeft: 12,
    marginTop: 120,
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Platform.select({
      ios: IOS_BOTTOM_HOME_BAR_HEIGHT,
      android: 0,
    }),
  },

  BeforeBackground: { width: 101, backgroundColor: "#F1F1F4" },

  NextBackground: { width: 225, backgroundColor: GIVER_CASUAL_NAVY },

  MapviewStyle: {
    width: 334,
    height: 249,
    marginTop: 48,
    marginRight: 14,
    marginLeft: 14,
    borderColor: "#767676",
    borderWidth: 1,
  },
})
