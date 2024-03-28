import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Screen, PreBol16, PreReg12, PreReg14, PreMed14, Row } from "#components"
import { Platform, View, ScrollView, StyleSheet, TextInput, Pressable } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import Geolocation from "react-native-geolocation-service"
import { IOS_BOTTOM_HOME_BAR_HEIGHT, MIDDLE_LINE, GIVER_CASUAL_NAVY, palette } from "#theme"
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions"
import { images } from "#images"

//! 이 스크린은 아직 불안정함
//! 지도 요소들이 오작동함

export const CgRegistration1Screen: FC<
  StackScreenProps<NavigatorParamList, "legacy_cg-set-address-screen">
> = observer(function CgRegistration1Screen({ navigation, route }) {
  //cg-search-address에서 넘어온 값 처리
  const setAddressParam = JSON.stringify(route.params)
  const setAddressParamData = JSON.parse(setAddressParam)
  const addressEnglish = setAddressParamData.data.addressEnglish //영문 주소
  const roadAddress = setAddressParamData.data.roadAddress //도로명 주소
  //const [zonecode, jibunAddress] = setAddressParamData.data
  console.log("Address:" + addressEnglish)

  const [initialRegion, setInitialRegion] = useState(null)
  const [markers, setMarker] = useState([])
  const [createdMarker, setCreatedMarker] = useState(null)
  const [address, setAddress] = useState(null)
  const [inputAddress, setInputAddress] = useState(null)
  //권한 획득 여부 체크
  const [locationPermissionStatus, setLocationPermissionStatus] = useState(null)
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  //인풋 주소 처리
  const handleInputAddress = (text) => {
    setInputAddress(text)
  }

  const mApiKey = ""

  //스타일 check
  const beforeConButton = [styles.conditionButton, styles.beforeBackground]
  const nextConButtion = [styles.conditionButton, styles.nextBackground]

  //"https://maps.googleapis.com/maps/api/geocode/json?address=$" + encodedURI + "&key=",

  //주소 정보로 위도와 경도 불러오는 함수
  const getLatLng = (address) => {
    return new Promise((resolve, reject) => {
      const encodedURI = encodeURIComponent(address)
      const url =
        "https://maps.googleapis.com/maps/api/geocode/json?address=$" +
        encodedURI +
        "&key=" +
        mApiKey
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          const lat = responseJson.results[0].geometry.location.lat
          const lng = responseJson.results[0].geometry.location.lng
          console.log("GetLat: " + lat)
          console.log("GetLng: " + lng)
          resolve({ lat, lng }) // Resolve the Promise with latitude and longitude values
        })
        .catch((error) => {
          console.log("Error:", error)
          reject(error) // Reject the Promise with the error
        })
    })
  }

  //현재 위치를 반환해주는 함수
  const getAddress = async (lat, long) => {
    // Initialize Geocoder library with your API key
    let mApiKey = ""
    // Request GPS permission

    //TODO:  안드로이드와 아이폰도 API 키를 분기해야함
    if (Platform.OS === "ios") {
      mApiKey = "AIzaSyDhFKJYgH5Dizee2-Pj-8h5IBQNjcCSrSU"
    } else {
      mApiKey = "AIzaSyDhFKJYgH5Dizee2-Pj-8h5IBQNjcCSrSU"
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
        const addressArray = parseStringByWhitespace(responseJson.results[0].formatted_address)
        setAddress(addressArray)
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
    }
    return tempValue
  }

  useEffect(() => {
    //주소로 위도와 경도를 가져옴
    getLatLng(addressEnglish).then(({ lat, lng }) => {
      const checkLocationPermission = async () => {
        try {
          let permissionStatus
          if (Platform.OS === "ios") {
            //ios의 권한 확인
            await Geolocation.requestAuthorization("whenInUse")
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            //permissionStatus = await Geolocation.requestAuthorization("whenInUse")
            console.log("ios:" + permissionStatus)
          } else {
            //android 권한 확인
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            console.log("android:" + permissionStatus)
          }

          setLocationPermissionStatus(permissionStatus) // 현재 권한 저장

          if (permissionStatus === RESULTS.DENIED) {
            // 현재 권한이 deny 일 경우 권한 요청
            const requestResult = await requestLocationPermission()
            if (requestResult === RESULTS.GRANTED) {
              //권한이 허용으로 변경되면 퍼미션 셋팅 및 주소정보 가져옴
              setLocationPermissionStatus(requestResult)
              getCurrentLocation()
            } else {
              // 권한이 거부되었을 때의 처리
              // 예외 상황에 대한 처리나 오류 메시지 표시 등을 할 수 있습니다.
              getCurrentLocation()
            }
          } else if (permissionStatus === RESULTS.GRANTED) {
            // 권한이 이미 허용된 상태일 때의 처리
            getCurrentLocation()
          } else if (permissionStatus === RESULTS.UNAVAILABLE) {
            //ios 경우 UNAVAILABLE 상태가 초기 상태를 처리
            const requestResult = await requestLocationPermission() //권한 요청
            if (requestResult === "ios.permission.LOCATION_WHEN_IN_USE")
              //권한 허락이 되면
              permissionStatus = RESULTS.GRANTED //권한을 GRANTED로 변경
            setLocationPermissionStatus(permissionStatus) // GRANTED 셋팅
            //alert("requestResult: " + requestResult)
            getCurrentLocation()
          } else {
            //const requestResult = await requestLocationPermission()
            getCurrentLocation()
          }
        } catch (error) {
          //console.log("에러?")
          // 예외 상황에 대한 처리나 오류 메시지 표시 등을 할 수 있습니다.
        }
      }

      //권한을 요청하는 코드
      const requestLocationPermission = async () => {
        let permission
        if (Platform.OS === "ios") {
          //ios 일 경우
          permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          console.log("requestPermission:" + permission)
          return permission
        } else {
          // android 일 경우
          /*const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app requires access to your location.",
            buttonPositive: "OK",
            buttonNegative: "Cancel",
          },
        )*/
          permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          return request(permission)
        }
        //return permission
      }

      //주소값으로 MapView에 셋팅
      const getCurrentLocation = () => {
        getLatLng(addressEnglish)
        console.log("lat:FN:" + lat)
        console.log("lng:FN:" + lng)

        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setInitialRegion({
              latitude,
              longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            })
            console.log("Before:FN" + lat)
            console.log("Before:FN" + lng)
            createMarker({ latitude: lat, longitude: lng })
          },
          (error) => {
            console.log("Error getting location:", error.message)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
      }
      checkLocationPermission()
    })
  }, [addressEnglish])

  const createMarker = (coordinate) => {
    // 이전 마커 제거
    //console.log("coordinate:", coordinate)
    setMarker((prevMarkers) => prevMarkers.filter((marker) => marker !== createdMarker))

    const newMarker = {
      id: markers.length + 1,
      title: `Marker ${markers.length + 1}`,
      description: "New marker clicked",
      coordinate,
      image: require("../../../assets/images/gps.png"), //발바닥 모양으로 변경 필요
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
              style={styles.address1}
            />
            <Row>
              <PreReg12 text={"도로명"} color={"#767676"} style={styles.address2} />
              <PreReg14
                //text={printArrayFromIndex(address, 4)}
                text={roadAddress}
                color={"#454545"}
                style={styles.address3}
              />
            </Row>

            <Row>
              <PreReg12 text={"지번"} color={"#767676"} style={styles.address2} />
              <PreReg14
                text={printArrayFromIndex(address, 4)}
                color={"#454545"}
                style={styles.address3}
              />
            </Row>
            <PreMed14 text={"상세 주소"} color={"#767676"} style={styles.addressDetail1} />

            <TextInput
              style={styles.addressDetail2}
              onChangeText={handleInputAddress}
              value={inputAddress}
              placeholder="ex) 판교원마을 6단지 601동 101호"
              color={"#171717"}
            />

            <View style={styles.horizonLine} />
          </>
        )}

        {
          //위치정보 권한이 없을 경우 MapView 비활성화
          locationPermissionStatus !== RESULTS.GRANTED && (
            <MapView
              style={[
                styles.mapViewStyle,
                locationPermissionStatus !== RESULTS.GRANTED && styles.disabledMap,
              ]}
            ></MapView>
          )
        }

        {
          //위치정보 권한이 있으면 MapView 활성화
          locationPermissionStatus === RESULTS.GRANTED && (
            <MapView
              style={[
                styles.mapViewStyle,
                locationPermissionStatus !== RESULTS.GRANTED && styles.mapDisabledOverlay,
              ]}
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
          )
        }

        <Row>
          <Pressable
            style={beforeConButton}
            onPress={() => {
              alert("이전으로 돌아가기")
            }}
          >
            <PreBol16 text={"이전"} color={palette.white} />
          </Pressable>

          <Pressable
            style={nextConButtion}
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
  address1: {
    marginTop: 20,
    marginLeft: 16,
    color: "#111111",
  },

  address2: {
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

  address3: {
    marginTop: 12,
    marginLeft: 12,
    color: "#454545",
  },

  addressDetail1: {
    marginTop: 20,
    marginLeft: 12,
    color: "#767676",
  },

  addressDetail2: {
    marginTop: 10,
    marginLeft: 12,
    color: "#767676",
  },

  horizonLine: {
    marginTop: 4,
    marginLeft: 12,
    width: 334,
    borderBottomWidth: 1,
    borderBottomColor: MIDDLE_LINE,
  },

  conditionButton: {
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

  beforeBackground: { width: 101, backgroundColor: "#F1F1F4" },

  nextBackground: { width: 225, backgroundColor: GIVER_CASUAL_NAVY },

  mapViewStyle: {
    width: 334,
    height: 249,
    marginTop: 48,
    marginRight: 14,
    marginLeft: 14,
    borderColor: "#767676",
    borderWidth: 1,
  },

  mapDisabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.4,
  },

  mapDisabledText: {
    color: "white",
    fontSize: 18,
  },

  disabledMap: {
    opacity: 0.4,
  },
})
