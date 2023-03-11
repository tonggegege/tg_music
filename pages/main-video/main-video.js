import { getVideoList } from "../../services/video"


Page({

	data: {
		videoList: [],
		hasMore: true,
		offset: 0
	},

	onLoad() {
		this.fetchVideoListData()
	},

	onPullDownRefresh() {
		this.setData({ videoList: [] })
		this.data.hasMore = true
		this.data.offset = 0

		this.fetchVideoListData()

		wx.stopPullDownRefresh()
	},

	onReachBottom() {
		if(!this.data.hasMore) return

		this.fetchVideoListData()

	},

	async fetchVideoListData() {
		const res = await getVideoList(this.data.offset)

		const newVideoList = [...this.data.videoList, ...res.data]
		this.setData({ videoList: newVideoList })
		this.data.hasMore = res.hasMore
		this.data.offset += 20
	},

	enterDetailVideoPage(event) {
		let vid = event.currentTarget.dataset.vid

		wx.navigateTo({
			url: `/pages/detail-video/detail-video?id=${vid}`,
		})
	}
})