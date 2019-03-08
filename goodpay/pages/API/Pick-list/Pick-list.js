// pages/Pick-list/Pick-list.js
var app = getApp();
var _page = 1;
var newurl = "";
var flag=true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lianhanghaoList:[],
    isShow:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this;
    var city=options.city;
    var keyword = options.keyword;
    if (keyword=='undefined'){
      keyword=""
    }
    if (city =="undefined"){
      city=""
    }
    var bankname=options.bankname;
    that.setData({
      city: city,
      keyword: keyword,
      bankname: bankname
    })
    if (keyword == "" && city == "" && bankname==""){
      that.setData({
        isShow:true
      })
      wx.showToast({
        title: '请输入搜索条件',
        icon: 'none',
        duration: 2000
      })
    }
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
    flag=true;
    _page=1;
    var city = this.data.city;
    var keyword = this.data.keyword;
    var bankname = this.data.bankname;
    var url = app.globalData.DoBaseUrl + "lianhanghaoQuery.html?key=" + keyword + "&bankName=" + bankname + "&bankCity=" + city+"&p=";
    this.getBankList(url,2,1)
  },
  getBankList: function (url, num, page) {
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
        if (res.data.errorMsg=="暂无数据"){
         
        }else{
          var count = res.data.count;
          if (num == 1) {
            var l = that.data.lianhanghaoList;
          for (var i = 0; i < res.data.lianhanghaoList.length; i++) {
            l.push(res.data.lianhanghaoList[i])
          }
          that.setData({
            lianhanghaoList: l
          });
          if (res.data.lianhanghaoList.length > 0) {
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
          if (res.data.lianhanghaoList.length == 0) {
            that.setData({
              isShow: true
            })
          }
          that.setData({
            lianhanghaoList: res.data.lianhanghaoList,
            count: count
          });
        }
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
      this.getBankList(url, 1, _page);
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})