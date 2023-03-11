// pages/detail-video/detail-video.js
import { getDetailMv } from "../../services/video"

Page({

  data: {
    id: 0,
    mvUrl: ""
  },

  onLoad(options) {
    const id = options.id
    this.setData({ id })
    this.fetchDeteilMVData(id)
  },

  async fetchDeteilMVData(id) {
    const res = await getDetailMv(id)
    
    this.setData({ mvUrl: res.data.url })
  }

})