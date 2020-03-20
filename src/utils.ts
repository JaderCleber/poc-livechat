export const isAtTheBottom = (element: any, tolerance = 20) =>
  element.scrollTop + element.clientHeight >= element.scrollHeight - tolerance;
