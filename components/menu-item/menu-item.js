// components/menu-item/menu-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onMenuItemClick() {
      const id = this.data.itemData.id
      
      wx.navigateTo({
        url: `/pages/detail-song/detail-song?id=${id}&type=menuSong`,
      })
    }
  }
})
