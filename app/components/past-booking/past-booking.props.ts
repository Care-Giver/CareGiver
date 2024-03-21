import { PetsitterType, ServiceType } from "../../models"
import { StyleProp, ViewStyle } from "react-native"
import { PreviousBookingParams } from "../../services/api"

export interface PastBookingProps extends PreviousBookingParams {
  style?: StyleProp<ViewStyle>
  forceUpdate?: () => any
}
