const MeasureConversion = {
  'years': (mili: number) => new Date(mili).getUTCFullYear() - 1970,
  'weeks': (mili: number) => mili / 7 / 24 / 60 / 60 / 1000,
  'days': (mili: number) => mili / 24 / 60 / 60 / 1000,
  'hours': (mili: number) => mili / 60 / 60 / 1000,
  'minutes': (mili: number) => mili / 60 / 1000,
  'seconds': (mili: number) => mili / 1000,
  'milliseconds': (mili: number) => mili,
}

const dateDifference = (
  start: Date,
  end: Date,
  measure: keyof typeof MeasureConversion = 'seconds'
) => {
  const elapsedTime = end.getTime() - start.getTime()
  return MeasureConversion[measure](elapsedTime)
}

export default dateDifference