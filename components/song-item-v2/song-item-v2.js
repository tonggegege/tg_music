// components/song-item-v2/song-item-v2.js
import { favorFunction, likeFunction, songMenuFunciton } from "../../database/index"
const db = wx.cloud.database()
const songMenuCol = db.collection("c_songMenu")
const _ = db.command

Component({
  properties: {
    itemTracksData: {
      type: Object,
      value: {}
    },
    number: {
      type: Number,
      value: 0
    }
  },
  methods: {
    onSongItemClick() {
      const id = this.properties.itemTracksData.id

      wx.navigateTo({
        url: `/pages/music-player/music-player?id=${id}`,
      })
    },
    async onMoreIconTap() {
      try {
        const showSuccess = await wx.showActionSheet({
          itemList: ["收藏歌曲", "喜欢歌曲", "添加到歌单"]
        })      
  
        const tapIndex = showSuccess.tapIndex
        const data = this.properties.itemTracksData
        let res = null
        switch(tapIndex) {
          case 0:
            res = await favorFunction.add(data)
            break
          case 1:
            res = await likeFunction.add(data)
            break 
          case 2:
            const itemList = (await songMenuCol.get()).data.map(item => item.menuName)
            const showSuccess = await wx.showActionSheet({
              itemList
            })

            const dataToSongMenu = {
              songList: _.push(data)
            }

            const menuName = itemList[showSuccess.tapIndex]
            const res = await songMenuFunciton.update({ menuName }, dataToSongMenu, false)
            if(res) {
              wx.showToast({
                title: '添加歌曲成功~',
              })
            }
            return
        }
  
        if (res) {
          const title = tapIndex === 0 ? '收藏成功~': '喜欢成功~'
          wx.showToast({
            title
          })
        }
      } catch (error) {
        
      }
    }
  }
})
