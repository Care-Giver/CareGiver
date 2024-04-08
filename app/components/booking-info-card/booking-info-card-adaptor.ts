import { BookingStatus, CurrentBooking, PreviousBooking } from "#api"
import { ServiceType } from "#models"
import { BookingInfoCardProps } from "./booking-info-card"

class BaseAdaptor {
  private source: PreviousBooking | CurrentBooking
  public common: Pick<
    BookingInfoCardProps,
    | "bookingId"
    | "petsitterId"
    | "start"
    | "end"
    | "serviceType"
    | "profileImage"
    | "petsitterName"
    | "desc"
    | "isFavorite"
  >

  public adapted: BookingInfoCardProps

  constructor(obj: PreviousBooking | CurrentBooking) {
    this.source = obj
    this.common = {
      bookingId: this.bookingId,
      petsitterId: this.petsitterId,
      start: this.start,
      end: this.end,
      serviceType: this.serviceType,
      desc: this.source.desc,
      isFavorite: false,
      profileImage: this.source.profileImage,
      petsitterName: this.source.petSitterName,
    }
  }

  get bookingId() {
    return "visitingId" in this.source ? this.source.visitingBookingId : this.source.crecheBookingId
  }

  get petsitterId() {
    return "visitingId" in this.source ? this.source.visitingId : this.source.crecheId
  }

  get serviceType(): ServiceType {
    return "visitingId" in this.source ? "visiting" : "creche"
  }

  get start() {
    return "visitingId" in this.source ? this.source.startTime : this.source.startDate
  }

  get end() {
    return "visitingId" in this.source ? this.source.endTime : this.source.endDate
  }
}

export class PreviousBookingAdaptor extends BaseAdaptor {
  constructor(obj: PreviousBooking) {
    super(obj)
    this.adapted = {
      ...this.common,
      type: BookingStatus.COMPLETE,
      isCanceled: obj.isCanceled,
      reviewStatus: obj.reviewStatus,
    }
  }

  adapt() {
    return this.adapted
  }
}

export class WaitingBookingAdaptor extends BaseAdaptor {
  constructor(obj: CurrentBooking) {
    super(obj)
    this.adapted = {
      ...this.common,
      type: BookingStatus.WAITING,
    }
  }

  adapt() {
    return this.adapted
  }
}
