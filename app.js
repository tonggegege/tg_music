// app.js
App({

  globalData: {
    screenHeight: 0,
    screenWidth: 375,
    statusHeight: 20,
    contentHeight: 0
  },

  onLaunch() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenHeight = res.screenHeight
        this.globalData.screenWidth = res.screenWidth
        this.globalData.statusHeight = res.statusBarHeight
        this.globalData.contentHeight = res.screenHeight - res.statusBarHeight - 44
      },
    })

     // 2.云开发能力进行初始化
     wx.cloud.init({
      env: "codertg-9g11f70kfbe86ce5"
    })

    
  }
  
})
