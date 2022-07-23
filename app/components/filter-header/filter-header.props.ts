export interface FilterHeaderProps {
  // ? 필터 헤더 부분에 오는 숫자는 Poppins 폰트를 사용하기 때문에, 따로 전달 받음
  title: string
  number?: string
  seletedOption?: string //? all-comments-screen 에서 재활용하기 위해 optional 로 변경함
}
