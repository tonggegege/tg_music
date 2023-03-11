// pages/detail-song/detail-song.js
import { recommondStore } from "../../store/recommondStore"
import { rankingStore } from "../../store/rankingStore"
import { getNewSongList } from "../../services/music"
import { playerStore } from "../../store/playerStore"
import { historyFunciton, songMenuFunciton } from "../../database/index"

const db = wx.cloud.database()

Page({

  data: {
    itemData: {},
    id: "",
    type: ""
  },

  async onLoad(options) {

    if (options.type === "recommendSong") {
      recommondStore.onState("recommondList", value => {
        this.setData({ 
          itemData: value
        })
      })
    } else if(options.type === "ranking" && options.ranking !== "") {
      rankingStore.onState(options.ranking, value => {
        this.setData({ 
          itemData: value
        })
      })
    } else if(options.type === "menuSong") {
      this.data.id = options.id
      this.setData({ type: options.type })
      this.fetchMenuSong()
    } else if(options.type  === 'profileTabs') {
      const Allcollection = await db.collection(`c_${options.category}`).get()
      const itemData = {
        name: options.tab,
        tracks: Allcollection.data
      }
      this.setData({ type: options.type, itemData })
    } else if(options.type === 'songMenu') {
      const songMenuCol = await songMenuFunciton.query(options.id)
      console.log(songMenuCol);
      const itemData = {
        name: songMenuCol.data.menuName,
        tracks: songMenuCol.data.songList
      }

      this.setData({ type: options.type, itemData })

    }
  },
  async fetchMenuSong() {
    getNewSongList(this.data.id).then(res => {
      this.setData({ itemData: res.playlist })
    })
  },

  // ------事件监听
  onSongItemV2Click(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playList", this.data.itemData.tracks)
    playerStore.setState("playListSongIndex", index)

    historyFunciton.add(this.data.itemData.tracks[index])
  }
  
})