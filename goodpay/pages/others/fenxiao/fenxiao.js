// pages/personal/personal.js

var _page = 1;
var newurl = "";
var app = getApp();
var flag = true;
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    firstList:[]
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
    var that =  this;
    var memberId = wx.getStorageSync("memberId");
    var url = app.globalData.DoBaseUrl + 'fenXiaoList.html?id=' + memberId+"&p=";
    this.getMemberList(url, 2, 1)
    _page = 1;
    flag = true;
  },

  chooseMoney:function(){
    var that = this;
    var memberId = wx.getStorageSync("memberId");
    var url = app.globalData.DoBaseUrl + 'withdraw.html?id=' + memberId + "&p=";
    this.getMemberList(url, 2, 1)
    _page = 1;
    flag = true;
  },

  chooseMember:function(){
    var that = this;
    var memberId = wx.getStorageSync("memberId");
    var url = app.globalData.DoBaseUrl + 'fenXiaoList.html?id=' + memberId + "&p=";
    this.getMemberList(url, 2, 1)
    _page = 1;
    flag = true;
  }
  ,

  getMemberList: function (url, num, page){
    newurl = url;
    console.log(newurl+page);
    var that = this;
    wx.request({
      url: url+page,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var memberCount = res.data.nowMember.lastUpdator;
        if (memberCount!=''){ 
          that.setData({
            money: res.data.nowMember.creator,
            status: res.data.status,
            memberCount: memberCount
          })
         }else{
          that.setData({
            money: res.data.nowMember.creator,
            status: res.data.status
          })
         }
        console.log(res);
        if (res.data.firstList.length==0){
          flag = false;
          wx.showToast({
            title: '数据加载完毕',
          })
          return;
        }

        if (num == 1) {
          var l = that.data.firstList;
          for (var i = 0; i < res.data.firstList.length; i++) {
            l.push(res.data.firstList[i])
          }
          that.setData({
            firstList: l
          });
          
        }
        if (num == 2) {
          that.setData({
            firstList: res.data.firstList 
          }); 
        }
      }
    })
  }
,
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
    if (flag){
      wx.showLoading({
        title: '正在加载中...',
      })
      var that = this;
      // 页数+1
      _page = _page + 1;
      var url = newurl;
      that.getMemberList(url, 1, _page)
      wx.hideLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  } 
   

})