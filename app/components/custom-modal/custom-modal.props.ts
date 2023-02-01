export interface CustomModalProps {
  visibleState: boolean
  title: string
  subtitle?: string
  yesBtnText: string
  noBtnText: string
  handleYesPress: () => any
  handleNoPress: () => any
}
