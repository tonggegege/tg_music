// components/menu-item-v2/menu-item-v2.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onDeleteTap() {
      this.triggerEvent("onDeleteClick")
    }
  }
})
