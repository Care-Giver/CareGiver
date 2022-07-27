export interface SitterProfileCardProps {
  style: object //FEEDBACK: object 객체 일지라도, 절대 object type 이라고 절대 쓰지 말 것. 너무 추상적이므로 TS 를 쓰는 목적에 어긋남. https://stackoverflow.com/questions/64852546/dont-use-object-as-a-type
  image: string
  name: string
  rating: number
  review: number
  title: string
  desc: string
  onPress: () => void
}
