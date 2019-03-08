// pages/HuiYuanlist/HuiYuanlist.js
var app=getApp();
var newurl="";
var _page=1;
var flag=true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    xiehuihuiyuanList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keyWords = options.keyWords;
    var HYurl = app.globalData.DoBaseUrl + 'xiehuiList.html?key=' + keyWords+"&p=" //连接数据源
    console.log(HYurl)
    var that = this;
    that.getHYList(HYurl,2,1)
  },
  getHYList: function (url, num, page) {
    var that = this;
    newurl = url;
    wx.request({
      url: url + page,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res)
        var count = res.data.count
        if (num == 1) {
          var l = that.data.xiehuihuiyuanList;
          for (var i = 0; i < res.data.xiehuihuiyuanList.length; i++) {
            l.push(res.data.xiehuihuiyuanList[i]);
          }
          that.setData({
            xiehuihuiyuanList: l
          });
          if (res.data.xiehuihuiyuanList.length > 0) {
            wx.showToast({
              title: '数据加载中',
              icon: 'none',
              duration: 1000
            })
          } else {
            flag = false;
            wx.showToast({
              title: '数据加载完毕',
              icon: 'none',
              duration: 1000
            })
          }
        }
        if (num == 2) {
          that.setData({
            xiehuihuiyuanList: res.data.xiehuihuiyuanList,
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
    // 页数+1  
    _page = _page + 1;
    var Url = newurl;
    if (flag) {
      that.getHYList(Url, 1, _page);
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})