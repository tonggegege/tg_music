import { HYEventStore } from "hy-event-store"

const db = wx.cloud.database()
const songMenuFunction = db.collection("c_songMenu")

export const menuStore = new HYEventStore({
  state: {
    songMenu: []
  },

  actions: {
    async fetchSongMenu(ctx) {
      const res = await songMenuFunction.get()
      ctx.songMenu = res.data
    }
  }
})

menuStore.dispatch("fetchSongMenu")