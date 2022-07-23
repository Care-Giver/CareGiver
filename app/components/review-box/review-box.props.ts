export interface ReviewBoxProps {
  //TODO: 이미지 url 주소로 넘겨받는 것 맞겠지..?
  profileImg: string
  userName: string
  ratings: number
  createdAt: Date
  images: Array<string>
  review: string
  pets: Array<Object>
  style: Object
}
