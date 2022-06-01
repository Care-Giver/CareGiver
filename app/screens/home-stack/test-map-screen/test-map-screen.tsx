import { View, SafeAreaView } from "react-native"
import React from "react"
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
import MapView, { Marker } from "react-native-maps"
import { styles } from "./styles"
import CustomMarkers from "./CustomMarkers"
import MyLocationMapMarker from "./MyLocationMapMarker"

export const TestMapScreen: FC<StackScreenProps<NavigatorParamList, "search">> = observer(
  ({ navigation }) => {
    return (
      <ScreenRootView>
        {/* <CustomMarkers /> */}

        <MapView style={styles.map} showsMyLocationButton={true} showsUserLocation={true}>
          {/* <MyLocationMapMarker mounted={true} /> */}
          <Marker>
            <MyLocationMapMarker {...marker} />
          </Marker>
        </MapView>
      </ScreenRootView>
    )
  },
)
