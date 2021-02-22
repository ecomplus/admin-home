export default val => {
  if (!val) {
    return 0
  }
  let unit = ''
  if (val >= 1000) {
    val /= 1000
    unit = 'k'
    if (val >= 1000) {
      val /= 1000
      unit = 'M'
    }
  }
  return val + unit
}
