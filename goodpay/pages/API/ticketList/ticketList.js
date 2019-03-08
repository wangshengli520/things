// pages/ticketList/ticketList.js
var WxParse = require('../../../utils/wxParse/wxParse.js');
var app=getApp();
var newurl = "";
var _page = 1;
var flag = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paypunishList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keyword = options.keyword;
    this.setData({
      keyword: keyword
    })
  },
  getHistoryList:function(url,num,page){
    var that = this;
    newurl = url;
    wx.request({
      url: url + page,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var count = res.data.count;
        if (num == 1) {
          var l = that.data.paypunishList;
          for (var i = 0; i < res.data.paypunishList.length; i++) {
            l.push(res.data.paypunishList[i])
          }
          that.setData({
            paypunishList: l
          });
          if (res.data.paypunishList.length > 0) {
            wx.showNavigationBarLoading();
            that.setData({
              isLoading: true
            })
          } else {
            flag = false;
            wx.hideNavigationBarLoading();
            that.setData({
              loading: "数据全部加载完毕",
              isLoading: false
            })
          }
        }
        if (num == 2) {
          console.log(res)
          var article = res.data.paypunishList;
          for (var i = 0; i < article.length;i++){
            article[i].punishContent = WxParse.wxParse('article', 'html', article[i].punishContent, that, 5)
          }
          that.setData({
            paypunishList: article,
            count: count
          });
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
     _page = 1;
    flag = true;
    var keyword = this.data.keyword;
    var url = app.globalData.DoBaseUrl + 'punishList.html?key=' + keyword + "&p=";
    this.getHistoryList(url, 2, 1);
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
    var that = this;
    // 页数+1  
    _page = _page + 1;
    var url = newurl;
    if (flag) {
      this.getHistoryList(url, 1, _page);
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})