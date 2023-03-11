import { HYEventStore } from "hy-event-store"
import { getNewSongList } from "../services/music"

const rankingIds = {
  originRanking: 2884035,
  newRanking: 3779629,
  upRanking: 19723756
}

export const rankingStore = new HYEventStore({
  state: {
    originRanking: {},
    newRanking: {},
    upRanking: {}
  },

  actions: {
    fetchRankingDataAction(ctx) {
      for(const key in rankingIds) {
        const id = rankingIds[key]
        getNewSongList(id).then(res => {
          ctx[key] = res.playlist
        })
      }
    }
  }
})


