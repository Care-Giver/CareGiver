export const reviews = [
  {
    id: 1,
    user: {
      name: "박민선",
      profileImg: "",
    },
    ratings: 4.7,
    // TODO: getMonth() 조사 필요(?) UI상 달이 원래보다 한 달 더 앞서서 나옴
    createdAt: new Date("2022-07-07T00:35:00.000+09:00"),
    images: ["", "", ""],
    review: "이 펫시터님 성격도 정말 좋으시구 저희 강아지도 펫시터님 만나면 너무 좋아해요~!!ㅎㅎ",
    pets: [
      {
        name: "초코",
        petType: "중형견",
        species: "푸들",
        age: 7,
        sex: "여",
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "최수민",
      profileImg: "",
    },
    ratings: 4.2,
    createdAt: new Date("2022-06-10T00:35:00.000+09:00"),
    images: [],
    review: "이 펫시터님 성격도 정말 좋으시구 저희 강아지도 펫시터님 만나면 너무 좋아해요~!!ㅎㅎ",
    pets: [
      {
        name: "초코",
        petType: "중형견",
        species: "푸들",
        age: 7,
        sex: "여",
      },
      {
        name: "초코",
        petType: "중형견",
        species: "푸들",
        age: 7,
        sex: "여",
      },
    ],
  },
  {
    id: 3,
    user: {
      name: "최희영",
      profileImg: "",
    },
    ratings: 4.5,
    createdAt: new Date("2022-05-05T00:35:00.000+09:00"),
    images: [""],
    review: "이 펫시터님 성격도 정말 좋으시구 저희 강아지도 펫시터님 만나면 너무 좋아해요~!!ㅎㅎ",
    pets: [
      {
        name: "초코",
        petType: "중형견",
        species: "푸들",
        age: 7,
        sex: "여",
      },
      {
        name: "초코",
        petType: "중형견",
        species: "푸들",
        age: 7,
        sex: "여",
      },
      {
        name: "초코",
        petType: "중형견",
        species: "푸들",
        age: 7,
        sex: "여",
      },
    ],
  },
]
