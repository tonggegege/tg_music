import { tgRequest } from "./index"

export function getVideoList(offset, limit = 20) {
  return tgRequest.get({
    url: "/top/mv",
    data: {
      limit,
      offset
    }
  })
}

export function getDetailMv(id) {
  return tgRequest.get({
    url: "/mv/url",
    data: {
      id
    }
  })
}