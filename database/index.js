const db = wx.cloud.database()

class tgCollection {
  constructor(col) {
    this.collection = db.collection(col)
  }

  add(condition, data, isDoc = true) {
    if (isDoc) {
      return this.collection.add({ data })
    } else {
      return this.collection.where(condition).add(data)
    }
  }

  remove(condition, isDoc = true) {
    if (isDoc) {
      return this.collection.doc(condition).remove()
    } else {
      return this.collection.where(condition).remove()
    }
  }

  update(condition, data, isDoc = true) {
    if (isDoc) {
      return this.collection.doc(condition).update({ data })
    } else {
      return this.collection.where(condition).update({ data })
    }
  }

  query(condition, data, isDoc = true) {
    if (isDoc) {
      return this.collection.doc(condition).get()
    } else {
      return this.collection.where({ data }).get()
    }
  }


}

export const favorFunction = new tgCollection("c_favor")
export const likeFunction = new tgCollection("c_like")
export const historyFunciton = new tgCollection("c_history")

export const songMenuFunciton = new tgCollection("c_songMenu")