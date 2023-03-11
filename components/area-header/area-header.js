// components/area-header/area-header.js
Component({
  properties: {
    title: {
      type: String,
      value: "我是标题"
    },

    hasMore: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onDetailMenuClick() {
      this.triggerEvent("onMoreClick")
    }
  }
})
