import { HYEventStore } from "hy-event-store"
import { getNewSongList } from "../services/music"


export const recommondStore = new HYEventStore({
  state: {
    recommondList: {}
  },
  actions: {
    async fetchNewSongsList(ctx) {
      getNewSongList(3778678).then(res => {
        ctx.recommondList = res.playlist
      })
    }
  }
})