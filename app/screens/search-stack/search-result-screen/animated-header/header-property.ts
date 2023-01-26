

// ? 검색 필터(날짜, 시간, 장소 선택 필터) "컨테이너" 높이
export const HEADER_HEIGHT = 105

export const HEADER_MARGIN_TOP = 20
export const HEADER_MARGIN_BOTTOM = 22

// ? 검색 필터 "영역" 높이
// ? -> 영역에 해당 영역 높이 만큼의 음수 top 마진 값을 주면, 영역 높이만큼 위쪽으로 이동하게 됨
// ?    이를 이용하여, 스크롤을 어느정도 올리다보면 검색필터 영역이 위로 올라가면서 사라지는 효과를 줄 수 있다
export const HEADER_AREA = HEADER_HEIGHT + HEADER_MARGIN_TOP + HEADER_MARGIN_BOTTOM

// ? 검색필터 영역의 최소 선명도 (%)
export const OPACITY_MIN = 0
