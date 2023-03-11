const lyricExg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function lyricToArr (lyricString) {

  const lyricArr = []

  const lyricStringArr = lyricString.split("\n")

  for (const item of lyricStringArr) {
    const itemArr = lyricExg.exec(item)
    if (!itemArr) continue
    const itemText = item.split(itemArr[0])[1]

    const minuteToMesc = itemArr[1] * 60 * 1000
    const secondToMesc = itemArr[2] * 1000
    const mesc = itemArr[3].length === 3 ? itemArr[3] * 1 : itemArr[3] * 10
    const currentTextTime = minuteToMesc + secondToMesc + mesc

    lyricArr.push({ text: itemText, time: currentTextTime })

  }




  return lyricArr


}