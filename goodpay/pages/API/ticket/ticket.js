// pages/ticket/ticket.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

//输入关键字或者企业名称

searchInput(e){
var keyword=e.detail.value

this.setData({  
  keyword: keyword
})
},

  //跳转到罚单详情首页
  search:function(e){
    var keyword = this.data.keyword
    var url = app.globalData.DoBaseUrl + 'punishList.html?key=' + keyword
       wx.request({
         url: url,
         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         header: {
           "Content-Type": "json"
         },
         success: function (res) {
           var paypunishList = res.data.paypunishList;
           if (paypunishList.length == 0) {
             wx.showToast({
               title: '没有该信息！',
               icon: 'none',
               duration: 2000
             })
           } else {
             wx.navigateTo({
               url: '../ticketList/ticketList?keyword=' + keyword,
             })
           }
         
         }
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
    var mydate=new Date();
    var year=mydate.getFullYear();
    var month=mydate.getMonth();
    var day=mydate.getDate();
    this.setData({
      year:year,
      month:month+1,
      day:day
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