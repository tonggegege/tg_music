import { tgRequest } from "./index"

export function getSongDetail(ids) {
  return tgRequest.get({
    url: "/song/detail",
    data: {
      ids
    }
  })
}

export function getSongLyric(id) {
  return tgRequest.get({
    url: "/lyric",
    data: {
      id
    }
  })
}