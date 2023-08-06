export const findConsecutiveDays = (selectedDates: string[]): string[] => {
  if (selectedDates.length <= 1) {
    return selectedDates
  }

  const sortedDates = selectedDates.slice().sort()
  const consecutiveDays = []
  let currentConsecutive = [sortedDates[0]]

  for (let index = 1; index < sortedDates.length; index++) {
    const current = new Date(sortedDates[index])
    const previous = new Date(sortedDates[index - 1])
    const oneDay = 1000 * 60 * 60 * 24 // Milliseconds in a day

    if (current - previous === oneDay) {
      currentConsecutive.push(sortedDates[index])
    } else {
      consecutiveDays.push(currentConsecutive)
      currentConsecutive = [sortedDates[index]]
    }
  }

  consecutiveDays.push(currentConsecutive) // Push the last consecutive set

  // return consecutiveDays.filter((arr) => arr.length > 1)
  return consecutiveDays
}
