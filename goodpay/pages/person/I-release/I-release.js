// pages/I-release/I-release.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cooperationList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
    var memberId = wx.getStorageSync('memberId');
    var FBUrl = app.globalData.DoBaseUrl + "coopetionList.html?memberId=" + memberId;
    wx.request({
      url: FBUrl,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success:function(res){
        that.setData({
          cooperationList: res.data.cooperationList
        }) 
      }
    })
  },
  navToFBD:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: "../../../pages/others/Release-details/Release-details?id=" +id
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