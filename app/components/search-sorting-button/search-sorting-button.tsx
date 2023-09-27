import React from "react"
import { StyleProp, ViewStyle, StyleSheet, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { DISABLED, GIVER_CASUAL_NAVY, LIGHT_LINE } from "#theme"
import { PreMed12 } from "../basics/custom-texts/custom-texts"
import { SearchResultSortingOption } from "#screens"

export interface SearchSortingButtonProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  sortingOption: SearchResultSortingOption
  selectedSortingOption?: SearchResultSortingOption
  handlePress: (sortingOption) => void
}

export const SearchSortingButton = observer(function SearchSortingButton(
  props: SearchSortingButtonProps,
) {
  const { style, sortingOption, selectedSortingOption, handlePress } = props
  const isSelected = sortingOption === selectedSortingOption
  const allStyles = Object.assign({}, styles.root, isSelected && styles.selected, style)

  return (
    <TouchableOpacity onPress={() => handlePress(sortingOption)} style={allStyles}>
      <PreMed12 text={sortingOption} color={isSelected ? GIVER_CASUAL_NAVY : DISABLED} />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  root: {
    width: "auto",
    height: 24,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: LIGHT_LINE,
  },
  selected: {
    borderColor: GIVER_CASUAL_NAVY,
  },
})
