// pages/profile/profile.js
import { menuStore } from "../../store/menuStore"
import { songMenuFunciton } from "../../database/index"

const db = wx.cloud.database()

const songMenuCol = db.collection("c_songMenu")

Page({

  data: {
    userInfo: {},
    isLogin: false,
    tabs: [
      {
        name: "我的收藏",
        type: "favor"
      },
      {
        name: "我的喜欢",
        type: "like"
      },
      {
        name: "历史记录",
        type: "history"
      }
      
    ],
    isShowDialog: false,
    menuName:"",
    songMenu: []
  },

  onLoad() {
    // store
    menuStore.onState("songMenu", this.handleSongMenu)

    
  },

  async onGetUserInfoTap() {
    const openIdValue = wx.getStorageInfoSync('openid')
    const userInfoValue =  wx.getStorageInfoSync('userInfo')

    if (!openIdValue || !userInfoValue) {
      const userProfileRes = await wx.getUserProfile({
        desc: '获取用户头像和昵称'
      })
      const userInfo = userProfileRes.userInfo

      const getOpenIdFn = await wx.cloud.callFunction({
        name: "getOpenId"
      })

      const { openid } = getOpenIdFn.result

      wx.setStorageSync('userInfo', userInfo)
      wx.setStorageSync('openid', openid)

      this.setData({ userInfo, isLogin:true })
    }

    
  
  },

  // ---------- 事件监听
  ontabsClick(event) {
    const category = event.currentTarget.dataset.category
    const tab = event.currentTarget.dataset.tab

    wx.navigateTo({
      url: `/pages/detail-song/detail-song?type=profileTabs&category=${category}&tab=${tab}`,
    })
  },

  onPlusTap() {
    this.setData({ isShowDialog: true })
  },

  onInputChange() {},
  
  async onConfirmTap() {
    const songList = []

    const data = {
      menuName: this.data.menuName,
      songList
    }

    const res = await songMenuCol.add({ data })

    if (res) {
      wx.showToast({
        title: '添加歌单成功~`',
      })
    }

    this.setData({ menuName: "" })
    menuStore.dispatch("fetchSongMenu")
  },

  onDeleteMenuClick(event) {
    const _id = event.currentTarget.dataset.id
    songMenuFunciton.remove(_id)
    menuStore.dispatch("fetchSongMenu")
  },

  // --------------- store
  handleSongMenu(value) {
    if (value.length === 0) return
    this.setData({ songMenu: value })
  },

  onMenuItemV2Click(event) {
    const _id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail-song/detail-song?type=songMenu&id=${_id}`
    })
  }

  
})