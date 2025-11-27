// Format the date as DD:MM:YYYY
// Displayed on Mine bookinger page
export const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Format the time range as H:MM-H:MM
// Displayed on Mine bookinger page
// Converts UTC time from database to viewer's local timezone
export const formatTime = (isoString: string) => {
  const date = new Date(isoString)
  // getHours() and getMinutes() automatically convert UTC to local timezone
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}
