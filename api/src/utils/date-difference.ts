const MeasureConversion = {
  'hours': 1 / 60 / 60 / 1000,
  'minutes': 1 / 60 / 1000,
  'seconds': 1 / 1000,
  'milliseconds': 1,
}

const dateDifference = (
  start: Date,
  end: Date,
  measure: keyof typeof MeasureConversion = 'seconds'
) => {
  const elapsedTime = end.getTime() - start.getTime()
  return elapsedTime * MeasureConversion[measure]
}

export default dateDifference