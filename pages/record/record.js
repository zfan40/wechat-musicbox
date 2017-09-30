//index.js
//获取应用实例
const app = getApp()
let pianoNoteUrls = []
const PIANOADDRESSSTART=39148
for (var i = 0 ;i<=87;i++) {
  pianoNoteUrls.push('https://freesound.org/data/previews/39/'+(PIANOADDRESSSTART+i)+'_35187-lq.mp3')
}
const musicBoxNoteUrls = []

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pianoNotes:pianoNoteUrls,
    activeNote: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  touchStartHandler: function(e) {
    // console.log(e);
    //http://www.wxapp-union.com/portal.php?mod=view&aid=2830  how to setData
    var key = 'activeNote'+'.'+e.target.id;
    var index = +e.target.id.split('note')[1]+51
    console.log(index)
    this.audioCtx[index].seek(0);
    this.audioCtx[index].play();
    this.setData({
      [key]:true
    })
  },
  touchEndHandler: function(e) {
    var key = 'activeNote' + '.' + e.target.id;
    this.setData({
      [key]: false
    })
  },
  onLoad: function () {
    var self = this;
    this.audioCtx = []
    for (let i = 52;i<=64;i++) {
      this.audioCtx[i] = wx.createAudioContext('piano'+(i+1))
      this.audioCtx[i].setSrc(pianoNoteUrls[i]) //TODO: 看是模板直接赋值src还是这里赋值
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
