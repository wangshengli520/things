// pages/others/coop-detail/coop-detail.js
var app = getApp();
 
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "../../../images/timg.png",
      "../../../images/timg.png",
      "../../../images/timg.png",
      "../../../images/timg.png"
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onopenCard(){
    wx.navigateTo({
      url: '/pages/others/carddetails/carddetails'
    })
  },
  onCreatecard(){
    wx.navigateTo({
      url: '/pages/person/mycard/mycard'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id;
    console.log(options)
    this.setData({
      id: id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCooInfo();
  },
  getCooInfo:function(){
    var that = this;
    var memberId = wx.getStorageSync('memberId');
    var url = app.globalData.DoBaseUrl + "cooInfo.html?id=" + id + "&memberId=" + memberId;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res);
        that.setData({
          cooperation: res.data.cooperation,
          commList: res.data.commList,
          images: res.data.cooperation.imgList
        })
        /*var collStatus = res.data.cooperation.collStatus;
        var memberId = wx.getStorageSync('memberId');
        var _memberId = res.data.cooperation.memberId;
        if (memberId == _memberId) {
          that.setData({
            show: false
          })
        } else {
          that.setData({
            show: true
          })
        }
        that.setData({
          cooperation: res.data.cooperation,
          collStatus: collStatus,
          commList: res.data.commList,
          images: res.data.cooperation.imgList
        })*/
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})