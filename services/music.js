import { tgRequest } from "./index"

export function getBanners(type = 0) {
  return tgRequest.get({
    url: "/banner",
    data: {
      type
    }
  })
}

export function getNewSongList(id) {
  return tgRequest.get({
    url: "/playlist/detail",
    data: {
      id
    }
  })
}

export function getMenuSongList(cat = "全部", limit = 6, offset = 0) {
  return tgRequest.get({
    url: "/top/playlist",
    data: {
      cat,
      limit,
      offset
    }
  })
}

export function getTags() {
  return tgRequest.get({
    url: "/playlist/hot"
  })
}