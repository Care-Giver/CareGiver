import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { StyleProp, ViewStyle, View, StyleSheet, TextInput } from "react-native"
import { observer } from "mobx-react-lite"
import { BODY, HEAD_LINE, LIGHT_LINE, MIDDLE_LINE, SUB_HEAD_LINE } from "#theme"
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types"
import { PreBol16, PreMed14, PreReg12, PreReg14, Row } from "#components"
import MapView, { LatLng, Marker } from "react-native-maps"
import { images } from "#images"
import { ServiceTypeKorean } from "#models"
import { addressToCoordinates } from "./addressToCoordinates"

export interface CgConfirmAddressProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
  address: OnCompleteParams
  detailAddress: string
  setDetailAddress: Dispatch<SetStateAction<string>>
  serviceType: ServiceTypeKorean
}

// const GOOGLE_MAP_API_KEY = "AIzaSyDhFKJYgH5Dizee2-Pj-8h5IBQNjcCSrSU"

// /**
//  * GCP MAP API 를 사용하여,
//  * 영문주소 정보로 위도(lat)와 경도(long)를 불러오는 함수
//  * @param addressEnglish 영문주소 OnCompleteParams 객체의 addressEnglish 프로퍼티를 사용할 것
//  * @returns
//  */
// const convertAddressEnglishToCoordinatesUsingGoogleAPI = (addressEnglish: OnCompleteParams["addressEnglish"]) => {
//   return new Promise((resolve, reject) => {
//     const encodedURI = encodeURIComponent(addressEnglish)
//     const url =
//       "https://maps.googleapis.com/maps/api/geocode/json?address=$" +
//       encodedURI +
//       "&key=" +
//       GOOGLE_MAP_API_KEY
//     fetch(url)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.log("responseJson", responseJson)
//         if (responseJson?.error_message) {
//           reject(responseJson?.error_message)
//         }
//         // const lat = responseJson.results[0].geometry.location.lat
//         // const lng = responseJson.results[0].geometry.location.lng
//         // console.log("GetLat: " + lat)
//         // console.log("GetLng: " + lng)
//         // resolve({ lat, lng }) // Resolve the Promise with latitude and longitude values
//       })
//       .catch((error) => {
//         console.log("Error:", error)
//         reject(error) // Reject the Promise with the error
//       })
//   })
// }

export const CgConfirmAddress = observer(function CgConfirmAddress(props: CgConfirmAddressProps) {
  const { style, address, detailAddress, setDetailAddress, serviceType } = props
  const allStyles = Object.assign({}, styles.root, style)
  const [coordinate, setCoordinate] = useState<LatLng>(null)

  useEffect(() => {
    addressToCoordinates(address.address).then(setCoordinate)
    // console.log("coordinate ♦️", coordinate)
  }, [address.address])

  return (
    <View style={allStyles}>
      <PreBol16
        text={`${address.sido} ${address.sigungu} ${address.bname}`}
        style={styles.address1}
      />
      <Row>
        <PreReg12 text={"도로명"} color={BODY} style={styles.address2} />
        <PreReg14 text={address.roadAddress} color={SUB_HEAD_LINE} style={styles.address3} />
      </Row>
      <Row>
        <PreReg12 text={"지번"} color={BODY} style={styles.address2} />
        <PreReg14
          text={address.jibunAddress || "-"}
          color={SUB_HEAD_LINE}
          style={styles.address3}
        />
      </Row>

      {/* "위탁"일 경우, 상세 주소 필수 */}
      {serviceType === "위탁" && (
        <>
          <PreMed14 text={"상세 주소"} color={BODY} style={styles.addressDetail1} />
          <TextInput
            style={styles.addressDetail2}
            onChangeText={setDetailAddress}
            value={detailAddress}
            // value={detailAddress.replace(/[^\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3|a-z|A-Z|0-9|_]+/g, '')}
            placeholder="ex) 1층 102호"
          />
          <View style={styles.horizonLine} />
        </>
      )}

      {/* 지도 뷰 */}
      {coordinate && (
        <MapView
          initialRegion={{
            ...coordinate,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }}
          style={styles.mapViewStyle}
          provider="google"
        >
          <Marker coordinate={coordinate} image={images.map_marker} />
        </MapView>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {},
  address1: {
    marginTop: 20,
    color: HEAD_LINE,
  },

  address2: {
    marginTop: 12,
    color: BODY,
    borderColor: LIGHT_LINE,
    padding: 4,
    borderWidth: 2,
    borderRadius: 4,
    minWidth: 46,
    Height: 20,
    textAlign: "center",
  },

  address3: {
    marginTop: 12,
    marginLeft: 12,
    color: SUB_HEAD_LINE,
  },

  addressDetail1: {
    marginTop: 20,
    color: BODY,
  },

  addressDetail2: {
    marginTop: 10,
    color: BODY,
  },

  horizonLine: {
    marginTop: 4,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: MIDDLE_LINE,
  },

  mapViewStyle: {
    width: "100%",
    height: 250,
    marginTop: 40,
    borderColor: BODY,
    borderWidth: 1,
  },
})
