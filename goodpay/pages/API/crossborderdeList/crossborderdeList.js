// pages/crossborderdeList/crossborderdeList.js
var app=getApp();
var keywords="";
var newurl="";
var _page=1;
var flag=true;
Page({

  /**
   * 页面的初始数据c
   */
  data: {
    paypunishList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    keywords = options.keywords 
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
    _page=1;
    flag = true;
    var WhUrl = app.globalData.DoBaseUrl + 'kuajingwanhuiList.html?compayName=' + keywords+"&p="; 
    this.getWHList(WhUrl,2,1)
  },
  getWHList:function(url,num,page){
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
            var l = that.data.kuajingwanhui;
            for (var i = 0; i < res.data.kuajingwanhui.length; i++) {
              l.push(res.data.kuajingwanhui[i]);
            }
            that.setData({
              kuajingwanhui: l
            });
            if (res.data.kuajingwanhui.length > 0) {
              wx.showToast({
                title: '数据加载中...',
                icon: 'none',
                duration: 500
              })
            } else {
              flag = false;
              wx.showToast({
                title: '数据加完毕...',
                icon: 'success',
                duration: 500
              })
            }
          }
          if (num == 2) {
            that.setData({
              kuajingwanhui: res.data.kuajingwanhui,
              count: count
            });
          }
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
    var that = this;
    that.setData({
      isLoading: false
    })
    // 页数+1
    var Url=newurl;
    _page = _page + 1;
    if (flag) {
      that.getWHList(Url, 1, _page);
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})