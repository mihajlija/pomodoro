const formatTime = ms => {
  let t = ms
  let seconds = Math.floor(t / 1000 % 60)
  let minutes = Math.floor(t / 1000 / 60 % 60)
  let hours = Math.floor(t / (1000 * 60 * 60) % 24)

  return {
    h: hours,
    m: minutes,
    s: seconds
  }
}

export default formatTime
