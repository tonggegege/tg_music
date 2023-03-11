// pages/detail-menu/detail-menu.js
import { getTags, getMenuSongList } from "../../services/music"

Page({

  data: {
    menuAllList: []
  },

  onLoad() {
    this.fetchTagsData()
  },

  async fetchTagsData() {
    const res = await getTags()
    
    const menuAllPromise = []

    for(const item of res.tags) {
      const promise = getMenuSongList(item.name)
      menuAllPromise.push(promise)
    }

    Promise.all(menuAllPromise).then(res => {
      this.setData({ menuAllList: res })
    })


  }
  
})