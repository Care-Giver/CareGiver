import { ServiceType } from "#models"
import { SelectedTime } from "#navigators"
import { VisitingCreche } from "../../search-stack/search-result-screen/search-result-screen"

export type RawPayment = {
  key: ServiceType
  selectedPetIds: number[]
  selectedTime: SelectedTime
  service: VisitingCreche
}

export class PaymentRequestAdaptor {
  private value: RawPayment

  constructor(obj: RawPayment) {
    this.value = obj
  }

  get idProp() {
    switch (this.value.key) {
      case "visiting":
        return "visitingId"
      case "creche":
        return "crecheId"
      default:
        throw new Error("잘못된 service type 입니다.")
    }
  }

  get startProp() {
    switch (this.value.key) {
      case "visiting":
        return "startTime"
      case "creche":
        return "startDate"
      default:
        throw new Error(`잘못된 service type 입니다. serviceType: ${this.value.key}`)
    }
  }

  get endProp() {
    switch (this.value.key) {
      case "visiting":
        return "endTime"
      case "creche":
        return "endDate"
      default:
        throw new Error(`잘못된 service type 입니다. serviceType: ${this.value.key}`)
    }
  }

  adapt() {
    return {
      [this.idProp]: this.value.service[this.value.key].id,
      [this.startProp]: this.value.selectedTime.start,
      [this.endProp]: this.value.selectedTime.end,
      petIds: this.value.selectedPetIds,
    }
  }
}
