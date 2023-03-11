// pages/main-music/main-music.js
import { throttle } from 'underscore'

import { getBanners, getMenuSongList } from "../../services/music"
import querySelect from "../../utils/query-selec"

import { recommondStore } from "../../store/recommondStore"
import { rankingStore } from "../../store/rankingStore"
import { playerStore } from "../../store/playerStore"

const querySelectThrottle = throttle(querySelect,100)

Page({
	data: {
		searchValue: "",
		banners: [],
    bannerHeight: 0,
    recommendSongList: [],
    hotMenuList: [],
    recommendMenuList: [],
    rankingList: {},
    isPlay: false,
    songDetail: {}
	},

	onLoad() {
    this.fetchBannersData()
    this.fetchMenuSongList()
    

    // actions
    recommondStore.dispatch("fetchNewSongsList")
    rankingStore.dispatch("fetchRankingDataAction")

    // onState
    recommondStore.onState("recommondList", this.handleRecommendList)
    rankingStore.onState("originRanking", this.handleRankingList("originRanking"))
    rankingStore.onState("newRanking", this.handleRankingList("newRanking"))
    rankingStore.onState("upRanking", this.handleRankingList("upRanking"))
    playerStore.onStates(["isPlay", "songDetail"], this.handlePlayer)
  },

  
  handleRecommendList(value) {
    if (Object.keys(value).length === 0) return
    this.setData({ recommendSongList: value.tracks.slice(0, 6) })
  },

  handleRankingList(ranking) {
    return value => {
      const everyRanking = { ...this.data.rankingList, [ranking]: value }
      this.setData({ rankingList: everyRanking })
    }
  },

  handlePlayer({
    isPlay,
    songDetail
  }) {
    
    if (isPlay !== undefined) {
      this.setData({ isPlay })
    }

    if (songDetail) {
      this.setData({ songDetail })
    }

  },

	async fetchBannersData() {
		const res = await getBanners()
		this.setData({ banners: res.banners })
  },
  
  async fetchMenuSongList() {
    getMenuSongList().then(res => {
      this.setData({ hotMenuList: res.playlists })
    })

    getMenuSongList("华语").then(res => {
      this.setData({ recommendMenuList: res.playlists })
    })
  },

	listenImageLoaded() {
		querySelectThrottle(".select-image").then(res => {
			this.setData({ bannerHeight: res[0].height })
		})
	},

	vanSearchTap() {
		wx.navigateTo({
			url: '/pages/detail-search/detail-search',
		})
  },

  onMoreClick() {
    wx.navigateTo({
      url: `/pages/detail-song/detail-song?type=recommendSong`,
    })
  },

  onRankingClick(event) {
    const { type, rankingitem } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail-song/detail-song?type=${type}&ranking=${rankingitem}`,
    })
  },

  onSongItemClick(event) {
    const id = event.currentTarget.dataset.id
    playerStore.setState("playList", this.data.recommendSongList)
    playerStore.setState("playListSongIndex", event.currentTarget.dataset.index)
    
    wx.navigateTo({
      url: `/pages/music-player/music-player?id=${id}`,
    })
  },

  onPlayerClick() {
    playerStore.dispatch("changeMusicStatusAction")
  },

  onPlayBarClick() {
    wx.navigateTo({
      url: '/pages/music-player/music-player',
    })
  }
})