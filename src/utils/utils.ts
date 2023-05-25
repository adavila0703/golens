export const getBarColor = (coverage: number): string => {
  if (coverage >= 0 && coverage < 80) {
    return 'red'
  } else if (coverage >= 80 && coverage < 90) {
    return 'yellow'
  } else if (coverage >= 90 && coverage <= 100) {
    return 'green'
  }

  return ''
}
