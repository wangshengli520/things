// pages/crossborder/crossborder.js
var app = getApp();
var keywords="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindblur:function(){
      this.setData({
        inputValue:''
      });
  },
  formSubmit:function(e){ 
    keywords = e.detail.value.keywords
    wx.navigateTo({
      url: '../crossborderdeList/crossborderdeList?keywords=' + keywords
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
    //获取当前时间：年月日
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth();
    var day = mydate.getDate();
    this.setData({
      year: year,
      month: month + 1,
      day: day
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