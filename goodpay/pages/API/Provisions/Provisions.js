// pages/Provisions/Provisions.js
var app=getApp();
var catalogSelect;
var newurl = "";
var _page = 1;
var flag = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    home: [
      { "name": "标题检索", "index": 0 },
      { "name": "全文检索", "index": 1 }
    ],
    item:['','',''],
    catalogSelect: 0,
    faguitiaowenList:[],
    isLoading:true,
    loading:'正在加载中...'
  },
  chooseCatalog: function (data) {
    var that = this;
    that.setData({//把选中值放入判断值
      catalogSelect: data.currentTarget.dataset.select
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keywords = options.keywords;
   var catalogSelect = options.catalogSelect
   this.setData({
     catalogSelect: catalogSelect,
     keywords: keywords
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  chooseCompany:function(e){
    var id = e.currentTarget.dataset.id
    var catalogSelect=this.data.catalogSelect
    var keywords=''
    console.log(e)
    wx.navigateTo({
      url: '../faguixiangqing/faguixiangqing?id=' + id + "&key=" + keywords + "&searching=" + catalogSelect,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // debugger;
     _page = 1;
     flag = true;    
     var keywords = this.data.keywords;
     var catalogSelect = this.data.catalogSelect
     var codeUrl = app.globalData.DoBaseUrl + "faguitiaowenList.html?searching=" + catalogSelect + "&key=" + keywords+"&p=";
    this.getCodeList(codeUrl,2,1);
  },
  getCodeList: function (url, num, page) {
    var that = this;
    newurl = url;
    wx.request({
      url: url + page,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        if (num == 1) {
          var l = that.data.faguitiaowenList;
          for (var i = 0; i < res.data.faguitiaowenList.length; i++) {
            l.push(res.data.faguitiaowenList[i])
          }
          that.setData({
            faguitiaowenList: l
          });
          if (res.data.faguitiaowenList.length > 0) {
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
          if (res.data.faguitiaowenList.length == 0) {
            that.setData({
              loading: "暂无该条搜索数据...",
              isLoading: false
            })
          }
          that.setData({
            faguitiaowenList: res.data.faguitiaowenList
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
    // 页数+1  
    _page = _page + 1;
    var url = newurl;
    if (flag) {
      this.getCodeList(url, 1, _page);
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})