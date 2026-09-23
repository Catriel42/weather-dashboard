/**
 * Formats OpenWeather date string ("2026-09-24 18:00:00")
 * into a friendly weekday title ("Tomorrow", "Fri", "Sat", etc.)
 */
export const formatForecastDay = (dtTxt: string, index: number): string => {
  if (index === 0) {
    return 'Tomorrow'
  }

  // Replace space with 'T' to create a valid ISO 8601 string ("2026-09-24T18:00:00")
  const date = new Date(dtTxt.replace(' ', 'T'))

  // 'short' produces 3-letter day names: "Fri", "Sat", "Sun", etc.
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}
