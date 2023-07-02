import type { IMPData } from "iamport-react-native"

export interface CertificationParams {
  params: IMPData.CertificationData
  tierCode?: string
}

export interface PaymentParams {
  params: IMPData.PaymentData
  tierCode?: string
}

export type RootStackParamList = {
  Home: undefined
  Certification: CertificationParams | undefined
  CertificationTest: undefined
  CertificationResult: any
  Payment: PaymentParams | undefined
  PaymentTest: undefined
  PaymentResult: any
}
