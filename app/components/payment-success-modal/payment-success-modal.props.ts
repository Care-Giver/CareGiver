export interface PaymentSuccessModalProps {
    visibleState: boolean
    title: string
    subtitle?: string
    yesBtnText: string
    noBtnText: string
    handleYesPress: () => any
    handleNoPress: () => any
  }