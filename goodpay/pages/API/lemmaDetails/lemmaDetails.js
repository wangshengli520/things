// pages/lemmaDetails/lemmaDetails.js
var WxParse = require('../../../utils/wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var id = options.id;
    var title = options.title;
    this.setData({
      title: title,
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
    var title = this.data.title;
    wx.setNavigationBarTitle({
      title: title+"的详情",
    })
    var id = this.data.id;
    var that = this;
    var searchUrl = app.globalData.DoBaseUrl + "payshuyu.html?id=" + id;
    wx.request({
      url: searchUrl,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var article = res.data.shuyu.shuyuContent;
        WxParse.wxParse('article', 'html', article, that, 5)
        that.setData({
          shuyu: res.data.shuyu,
          shuyuList: res.data.shuyuList
        })
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
    wx.stopPullDownRefresh();
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