// pages/XieHuihuiYuan/XieHuihuiYuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  huiyuan:'',
  inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //输入关键字
  huiyuanInput:function(e){
    var huiyuan=e.detail.value
     this.setData({
       huiyuan:huiyuan
     })
  },
  bindblur:function(){
    this.setData({
      inputValue: ""
    })
  },
  search:function(e){
    var keyWords=this.data.huiyuan
  wx.navigateTo({
    url: '../HuiYuanlist/HuiYuanlist?keyWords=' + keyWords,
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