// pages/Company-details/Company-details.js
var app=getApp();
var WxParse = require('../../../utils/wxParse/wxParse.js');
var article="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id:id
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
      var that=this;
      var id=this.data.id;
      var url = app.globalData.DoBaseUrl +"qiyeyuqingById.html?id="+id;
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success:function(res){
          var article = res.data.qiyeyuqing.article;
          that.setData({
            qiyeyuqingList: res.data.qiyeyuqing,
            article: WxParse.wxParse('article', 'html', article, that, 5),
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