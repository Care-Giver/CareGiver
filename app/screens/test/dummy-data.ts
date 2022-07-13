// ? 방문 예약 내역
export const petsitterReserves = [
  {
    petSitter: {
      petSitterId: 1,
      name: "유혜린",
      profileImg: "",
      introduce:
        "어느덧 펫시터 3년차 입니다! 어느덧 펫시터 3년차 입니다! 어느덧 펫시터 3년차 입니다!",
      ratings: 4.7,
      reviews: 12,
    }, // 펫시터 아이디
    userId: 1, // 유저 아이디
    request: "산책을 꼭 시켜주세요",
    services: ["산책"],
    startDateTime: "2022-05-05T12:30:00.000+09:00",
    endDateTime: "2022-05-05T14:30:00.000+09:00",
    petIds: [1],
  },
  {
    petSitter: {
      petSitterId: 2,
      name: "최수민",
      profileImg: "",
      introduce:
        "어느덧 펫시터 3년차 입니다! 어느덧 펫시터 3년차 입니다! 어느덧 펫시터 3년차 입니다!",
      ratings: 4.7,
      reviews: 12,
    },
    userId: 1,
    request: "산책을 꼭 시켜주세요",
    services: ["산책"],
    startDateTime: "2022-05-05T12:30:00.000+09:00",
    endDateTime: "2022-05-05T14:30:00.000+09:00",
    petIds: [1],
  },
]
// ? 위탁 예약 내역
export const crecheReserves = [
  {
    petSitter: {
      petSitterId: 3,
      name: "박민선",
      profileImg: "",
      introduce: "어느덧 펫시터 3년차 입니다!",
      ratings: 4.7,
      reviews: 12,
    }, // 훈련사
    userId: 1,
    request: "산책을 꼭 시켜주세요",
    services: ["산책"],
    startDateTime: "2022-07-15",
    endDateTime: "2022-07-16",
    petIds: [1],
  },
]

// export const users = [
//   {
//     petSitterId: 1,
//     name: "유혜린",
//     profileImg: "",
//     introduce:
//       "어느덧 펫시터 3년차 입니다! 어느덧 펫시터 3년차 입니다! 어느덧 펫시터 3년차 입니다!",
//     ratings: 4.7,
//     reviews: 12,
//   },
//   {
//     petSitterId: 2,
//     name: "최수민",
//     profileImg: "",
//     introduce:
//       "어느덧 펫시터 3년차 입니다! 어느덧 펫시터 3년차 입니다! 어느덧 펫시터 3년차 입니다!",
//     ratings: 4.7,
//     reviews: 12,
//   },
//   {
//     crecheId: 1,
//     name: "박민선",
//     profileImg: "",
//     introduce: "어느덧 펫시터 3년차 입니다!",
//     ratings: 4.7,
//     reviews: 12,
//   },
// ]
