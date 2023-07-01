import { ImageSourcePropType } from "react-native"

interface Pet {
  id: number //? 필수?
  profileImage: ImageSourcePropType //?array?
  name: string
  birthday: string //? number ?
  species: string
  sex: string
  petType: string //*크기
  weight: number
  isNeutralizated: boolean
  desc: string //*소개
  //?familyType ?
}

export const Pets: Pet[] = [
  {
    id: 1,
    profileImage: null, //?array?
    name: "방울이",
    birthday: "2005-01-23", //? number ?
    species: "포메라니안",
    sex: "FEMALE",
    petType: "소형", //? 백엔드 데이터에선 영어? 이를 바꿀 필요 있? -> large 다음엔 뭐? medium , small  ?
    weight: 3,
    isNeutralizated: false,
    desc:
      "우리집 방울이는 굉장히 밝고 활발한 아이입니다. 산책을 너무 좋아해요~! 밥도 잘 먹고 간식도 잘 먹어요ㅎㅎ 항상 관심 받고 싶어하고 공놀이를 좋아한답니다. 밥 먹거나 간식 먹을 때는 예민 해져서 건드리면 안 돼요! 그렇지만 사람을 좋아해서 금방 친해질 수 있어요~~!!",
  },
  {
    id: 2,
    profileImage: null,
    name: "식빵",
    birthday: "2022-09-09",
    species: "믹스",
    sex: "FEMALE",
    petType: "중형",
    weight: 8.9,
    isNeutralizated: true,
    desc:
      "우리집 식빵이는 참 말을 잘들어요. 산책 하루 두 번 필수! 자기가 귀여움 받는다는걸 안답니다. 은근히 소심한 구석이 있으니 갑자기 큰 소리나 큰 액션은 조심해주세요!",
  },

  {
    id: 3,
    profileImage: null,
    name: "자두",
    birthday: "2019-03-01",
    species: "코리안숏헤어",
    sex: "MALE",
    petType: "중형", //? cat 의 경우 ?
    weight: 5.7,
    isNeutralizated: true,
    desc:
      "우리집 구름이는 '고양이'같은 면이 있는 고양이에요. 천천히 거리를 가지고 다가가주셔야 해요. 낯선 사람을 보면 책장 위로 숨어서 관찰해요. 간식과 낚시대로 조금씩 유혹하며 다가가주세요. 자유 배식. 놀이는 한번에 30분 이상, 하루 두 번은 필요해요. 캣휠을 좋아해요. ",
  },
]
