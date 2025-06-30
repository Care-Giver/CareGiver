import { Dispatch, SetStateAction, useState } from "react"
import { HandleType } from "../../../services/api"
import { PetsitterModel } from "#models"
import _ from "lodash"

/**
 * handleType 과 addtionalPrice 객체의 조합입니다.
 * <CheckerInput /> 컴포넌트와 같이 사용하기 용이하도록 고안된 변수 입니다.
 */
type CheckerItem = {
  // 정렬을 위한 우선순위
  priority: number
  handleType: HandleType
  addtionalPrice: number
  isChecked: boolean
  label: string
}

type R = [
  checker: CheckerItem[],
  setChecker: Dispatch<SetStateAction<CheckerItem[]>>,
  // 맡을 강아지 크기와 추가요금 변화 여부.
  hasChanges: boolean,
]

/**
 * 방문/위탁 "날짜 별 서비스 수정" 스크린에서 사용되는 커스텀 훅입니다.
 *
 */
export const useAdditionalPriceChecker = (petsitter: PetsitterModel): R => {
  // 강아지 크기 별 추가 요금
  const _checker = [
    {
      priority: 0,
      handleType: HandleType.SMALL,
      addtionalPrice: petsitter?.extraSizeFee?.Small,
      isChecked: _.includes(petsitter?.handleType, HandleType.SMALL),
      label: "소형견 추가 요금(원)",
    },
    {
      priority: 1,
      handleType: HandleType.MEDIUM,
      addtionalPrice: petsitter?.extraSizeFee?.Medium,
      isChecked: _.includes(petsitter?.handleType, HandleType.MEDIUM),
      label: "중형견 추가 요금(원)",
    },
    {
      priority: 2,
      handleType: HandleType.LARGE,
      addtionalPrice: petsitter?.extraSizeFee?.Large,
      isChecked: _.includes(petsitter?.handleType, HandleType.LARGE),
      label: "대형견 추가 요금(원)",
    },
  ]
  const [original, __] = useState(_checker)
  const [checker, setChecker] = useState(_checker)
  const hasChanges = !_.isEqual(original, checker)

  return [checker, setChecker, hasChanges]
}
