import { HYEventStore } from "hy-event-store"
import { getSongLyric, getSongDetail } from "../services/player"

import { lyricToArr } from "../utils/parse-lyric"

const allMode = ["order", "repeat", "random"]

export const audioContext = wx.createInnerAudioContext()

export const playerStore = new HYEventStore({
  state: {
    playList: [], // 当前所有的歌曲
    playListSongIndex: 0, // 当前所有歌曲中的索引

    id: "", // 歌曲的id
    songDetail: {}, // 歌曲详情
    lyricArr: [], // 歌曲歌词解析数值
    currentTextIndex: 0,
    isPlay: false, // 歌曲是否正在播放
    durationTime: 0, // 当前歌曲播放总时长
    currentTime: 0, // 当前歌曲播放时间
    modeIndex: 0, // 播放模式索引
    mode: "order", // 播放模式,
    isNext: true, // 是否为下一首,
    currentTextIndex: 0
  },

  actions: {
    playMusicWithSongIdAction(ctx, id) {
      ctx.songDetail = {}
      ctx.currentTime = 0
      ctx.durationTime = 0
      ctx.id = "",


      ctx.isPlay = true

      getSongDetail(id).then(res => {
        ctx.songDetail = res.songs[0]
        ctx.durationTime = res.songs[0].dt
      })

  
      getSongLyric(id).then(res => {
        const lyricArr = lyricToArr(res.lrc.lyric)
  
        ctx.lyricArr = lyricArr
      })


      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true

      audioContext.onTimeUpdate(() => {
          ctx.currentTime = audioContext.currentTime * 1000
          let currentTextIndex = ctx.lyricArr.length - 1
  
          for(let i = 0 ; i < ctx.lyricArr.length; i++) {
            const lyricArrItem = ctx.lyricArr[i]
            if (ctx.currentTime < lyricArrItem.time) {
              currentTextIndex = i - 1
              break
            }
          }
  
          ctx.currentTextIndex = currentTextIndex
      })

      audioContext.onWaiting(() => {
        audioContext.pause()
      })
      
      audioContext.onCanplay(() => {
        ctx.isPlay = true
        audioContext.play()
      }),

      audioContext.onEnded(() => {
        if(audioContext.loop) return

        // tocheck
        this.dispatch("playNewMusicAction", ctx.isNext)
      })

    },

    

    changeMusicStatusAction(ctx) {
      if(!audioContext.paused) {
        audioContext.pause()
      } else {
        audioContext.play()
      }

      ctx.isPlay = !ctx.isPlay
    },


    playNewMusicAction(ctx, isNext) {
      let index = ctx.playListSongIndex
    
      const playList = ctx.playList

      switch(ctx.modeIndex) {
        case 0:
        case 1:
          if (isNext === true) {
            index++
            if(index === playList.length) {
              index = 0
            }
          } else {
            index--
            if(index === -1) {
              index = playList.length - 1
            }
          }
          break;
        case 2:
          index = Math.floor(Math.random() * playList.length)
          break;

      }

      this.dispatch("playMusicWithSongIdAction", playList[index].id)
      
      ctx.playListSongIndex = index
      ctx.isNext = isNext
    },



    changePlayModeAction(ctx) {
      let modeIndex = ctx.modeIndex
      modeIndex++

      if (modeIndex === 1) {
        audioContext.loop = true
      } else {
        audioContext.loop = false
      }
      
      if (modeIndex === allMode.length) {
        modeIndex = 0
      }

      ctx.modeIndex = modeIndex
      ctx.mode = allMode[modeIndex]
    }




    
  }
})