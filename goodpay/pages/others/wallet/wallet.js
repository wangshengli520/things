// pages/wallet/wallet.js
var app=getApp();
var _page = 1;
var newurl = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[]
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
  navToCz:function(){
    wx.navigateTo({
      url: "../recharge/recharge"
    })
  },
  navToTx:function(){
    wx.navigateTo({
      url: "../putforward/putforward"
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var memberId = wx.getStorageSync('memberId');
    var that=this;
    var walletUrl = app.globalData.DoBaseUrl + "walletList.html?memberId=" + memberId + "&p=";
    this.getwalletList(walletUrl,2,1)
  },
  getwalletList: function (url, num, page){
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
        var ymoney = res.data.member.money;
        ymoney = ymoney.toFixed(2);
        that.setData({
          ymoney: ymoney
          // recordList: res.data.rechargeList
        })
        if (num == 1) {
          var l = that.data.recordList;
          for (var i = 0; i < res.data.rechargeList.length; i++) {
            l.push(res.data.rechargeList[i])
          }
          that.setData({
            recordList: l
          });
        }
        if (num == 2) {
          that.setData({
            recordList: res.data.rechargeList
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '正在加载中',
      icon: 'none',
      duration: 2000
    })
    var that = this;
    // 页数+1  
    _page = _page + 1;
    var walletUrl = newurl;
    this.getwalletList(walletUrl, 1, _page);
    wx.stopPullDownRefresh();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})