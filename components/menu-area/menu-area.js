// components/menu-area/menu-area.js
const app = getApp()

Component({
  properties: {
    MenuListData: {
      type: Array,
      value: []
    },
    title: {
      type: String,
      value: ""
    },
    hasMore: {
      type: Boolean,
      value: true
    }
    
  },

  data: {
    screenWidth: 375
  },

  lifetimes: {
    attached() {
      const screenWidth = app.globalData.screenWidth
      this.setData({ screenWidth })
    }
  },

  methods: {
    onMoreClick() {
      wx.navigateTo({
        url: '/pages/detail-menu/detail-menu',
      })
    }
  }
})
