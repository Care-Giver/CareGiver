import { Facility } from "app/screens/registration-stack/facility-registration-screen/facility-data"
import { Service } from "app/screens/registration-stack/service-registration-screen/service-data"

export interface RegisterButtonsContainerProps {
  services: Array<Service | Facility>
  selectedOptions: Array<string>
  handleOptionPress: (option: string) => void
  handleXPress: (option: string) => void
}
