// pages/Inventory-list/Inventory-list.js
var app=getApp();
var app = getApp();
var newurl = "";
var _page = 1;
var flag = true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkList:[],
    isLoading: true,
    loading: '正在加载中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keywords = options.keyWords;//搜索关键词
    this.setData({
      keywords: keywords
    })
  },
  //跳转到详情页
  navToJc:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../listing-details/listing-details?id=" +id
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
    var keywords = this.data.keywords;
    var url = app.globalData.DoBaseUrl + "checkList.html?key=" + keywords + "&p=";
    this.getInspectList(url,2,1)
  },
  getInspectList: function (url, num, page) {
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
        if (num == 1) {
          var l = that.data.checkList;
          for (var i = 0; i < res.data.checkList.length; i++) {
            l.push(res.data.checkList[i])
          }
          that.setData({
            checkList: l
          });
          if (res.data.checkList.length > 0) {
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
          if (res.data.checkList.length == 0) {
            that.setData({
              loading: "暂无该条搜索数据...",
              isLoading: false
            })
          }
          that.setData({
            checkList: res.data.checkList
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
    var that = this;
    // 页数+1  
    _page = _page + 1;
    var url = newurl;
    if (flag) {
      this.getInspectList(url, 1, _page);
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})