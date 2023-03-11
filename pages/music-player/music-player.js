// pages/music-player/music-player.js
import { throttle } from "underscore"

import { playerStore, audioContext } from "../../store/playerStore"

import { historyFunciton } from "../../database/index"

const app = getApp()

// const audioContext = wx.createInnerAudioContext()


const storeDataFromArr = [ 
  "playList", 
  "playListSongIndex", 
  "songDetail",
  "id", 
  "lyricArr", 
  "currentTextIndex",
  "isPlay", 
  "durationTime", 
  "currentTime", 
  "modeIndex", 
  "mode", 
  "isNext"
]

Page({

  data: {

    statusHeight: 0, // 顶部状态栏
    contentHeight: 0, // 内容高度
    
    playList: [], // 总歌曲
    playListSongIndex: 0, // 总歌曲里的其中一首
    id: "", // 歌曲的id
    songDetail: {}, // 歌曲详情
    lyricArr: [], // 歌曲歌词解析数值
    currentTextIndex: 0, // 当前歌词文字索引
    isPlay: true, // 歌曲是否正在播放
    durationTime: 0, // 当前歌曲播放总时长
    currentTime: 0, // 当前歌曲播放时间
    modeIndex: 0, // 播放模式索引
    mode: "order", // 播放模式,
    isNext: true, // 是否为下一首
    
    currentIndex: 0, // 页面类目切换
    silderValue: 0, // 滑块滑动距离
    scrollTop: 35, // 歌词滚动距离
    pageTitles: ["歌曲", "歌词"], // 页面类目,
    isSliderChanging: false
    
  },

  onLoad(options) {
    // 页面基本信息
    const statusHeight = app.globalData.statusHeight
    const contentHeight = app.globalData.contentHeight

    const id = options.id
    this.setData({ statusHeight, contentHeight })

    // store
    if (id !== undefined) {
      this.setData({ id })

      // 获取页面数据
      playerStore.dispatch("playMusicWithSongIdAction", id)
    }
    playerStore.onStates(storeDataFromArr, this.getSongInfosHandler)

  },
  
  onSwiperChange(event) {
    const index = event.detail.current
    this.setData({ currentIndex: index })
  },

  onTitleClick(event) {
    const index = event.currentTarget.dataset.index
    this.setData({ currentIndex: index })
  },

  countTime: throttle(function () {
    if (this.data.isSliderChanging) return 

    const silderValue = this.data.currentTime / this.data.durationTime * 100

    this.setData({
      currentTime: audioContext.currentTime * 1000, 
      silderValue
    })
    
  }, 500, {
    leading: false,
    trailing: false
  }),

  onSliderChange(event) {
    this.data.isSliderChanging = false

    const silderValue = event.detail.value

    const currentTime = silderValue / 100 * this.data.durationTime
    audioContext.seek(currentTime / 1000)
    this.setData({ currentTime, silderValue })
  },

  onsliderChanging: throttle(function(event) {
    this.data.isSliderChanging = true

    const silderValue = event.detail.value
    const currentTime = silderValue / 100 * this.data.durationTime
    this.setData({ currentTime, silderValue })

  }, 100),

  // 点击操控事件
  onBackClick() {
    wx.navigateBack()
  },

  onModeClick() {
    playerStore.dispatch("changePlayModeAction")
  },

  onPlayClick() {
    playerStore.dispatch("changeMusicStatusAction")
  },

  onPrevClick() {
    playerStore.dispatch("playNewMusicAction", false)
  },

  onNextClick() {
    playerStore.dispatch("playNewMusicAction", true)
  },

  // 监听Store事件
  getSongInfosHandler({
    playList,
    playListSongIndex,
    songDetail,
    id, 
    lyricArr, 
    currentTextIndex,
    isPlay, 
    durationTime, 
    currentTime, 
    modeIndex, 
    mode, 
    isNext
  })  {

    if (id !== undefined) {
      this.setData({ id })
    }

    if (songDetail) {
      this.setData({ songDetail })
    }

    if (durationTime !== undefined) {
      this.setData({ durationTime })
    }

    if (currentTime !== undefined) {
      this.countTime(currentTime)
    }

    if (isPlay !== undefined) {
      this.setData({ isPlay })
    }

    if (lyricArr) {
      this.setData({ lyricArr })
    }

    if (currentTextIndex) {
      this.setData({ currentTextIndex })
    }

    if (playList) {
      this.setData({ playList })
    }

    if (playListSongIndex) {
      this.setData({ playListSongIndex })
    }

    if (mode !== undefined) {
      this.setData({ mode })
    }

    if (modeIndex) {
      this.setData({ modeIndex })
    }

    if (isNext !== undefined) {
      this.setData({ isNext })
    }
  },

  onUnload() {
    playerStore.offStates(storeDataFromArr, this.getSongInfosHandler)
  },

})