export const setFastMove = (valueToSet) => {
    return {
        type: 'SETTINGS_SET_FASTMOVE',
        payload: valueToSet
    }
}
export const setCurrencyValue = (valueToSet) => {
  return {
      type: 'SETTINGS_SET_CURRENCY',
      payload: valueToSet
  }
}
export const setLocale = (valueToSet) => {
  return {
      type: 'SETTINGS_SET_LOCALE',
      payload: valueToSet
  }
}
export const setSourceValue = (valueToSet) => {
  return {
      type: 'SETTINGS_SET_SOURCE',
      payload: valueToSet
  }
}
