export default function instanceOrArrayOf(element: any, type: any) {
  let singleElement = element
  if (element instanceof Array && element.length > 0) {
    singleElement = element[0]
  }

  return singleElement instanceof type
}