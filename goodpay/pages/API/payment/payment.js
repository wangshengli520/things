// pages//payment/payment.js
var app = getApp();
var newurl = "";
var flag = true;
var _page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
    shuyuList: [],
    loading: '正在加载中...',
    item: ['我的', '好的', '是的', '好啊', '你好'],
    height:470
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var list = wx.getStorageSync('paymentList');
      var height = that.data.height
      var addHeight = 70;
      var newHeight;
      var num = Math.ceil(list.length/3)
      newHeight = height + addHeight * num
      that.setData({
        height: newHeight
      })
  },
  searchProduct: function (e) {
    var searchKey = e.detail.value;
    var that=this;
    var paymentList = wx.getStorageSync('paymentList') || [];
    var CF = true;
    for (var i = 0; i < paymentList.length; i++) {
      if (searchKey == paymentList[i]) {
        CF = false;
        break;
      }
    }
    if (CF) {
      var height = that.data.height
      var addHeight = 70;
      if ([(paymentList.length+1) % 3] == 1) {
        height += addHeight
        that.setData({
          height: height
        })
      }
    }
    if (searchKey !== "") {
      paymentList.push(e.detail.value);
      //数组去重
      var arr = paymentList,
        result = [],
        i,
        j,
        len = arr.length;
      for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
          if (arr[i] === arr[j]) {
            j = ++i;
          }
        }
        result.push(arr[i]);
      }
      wx.setStorageSync('paymentList', result);
      that.setData({
        sercherStorage: wx.getStorageSync('paymentList')
      }); 
    };
    if (searchKey == '') {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var searchUrl = app.globalData.DoBaseUrl + "payshuyu.html?title=" + searchKey + "&p=";
    that.getListShoushua(searchUrl, 2, 1);
  },
  bindblur: function () {
    this.setData({
      inputValue: ''
    })
  },
  navToDetail:function(e){
    var id = e.currentTarget.dataset.id;
    var keyword = e.currentTarget.dataset.keyword;
    var paymentList = wx.getStorageSync('paymentList') || [];
    var that=this;
    var CF=true;
    for (var i = 0; i < paymentList.length; i++) {
      if (keyword == paymentList[i]) {
        CF = false;
        break;
      }
    }
    paymentList.push(keyword);
    //数组去重
    var arr = paymentList,
      result = [],
      i,
      j,
      len = arr.length;
    for (i = 0; i < len; i++) {
      for (j = i + 1; j < len; j++) {
        if (arr[i] === arr[j]) {
          j = ++i;
        }
      }
      result.push(arr[i]);
    }
    wx.setStorageSync('paymentList', result);
    that.setData({
      sercherStorage: wx.getStorageSync('paymentList')
    });
    if(CF){
          var height = that.data.height
          var addHeight=70;
        if ([result.length%3]==1){
            height += addHeight
            that.setData({
              height: height
            })
        }
    }
    wx.navigateTo({
      url: "../../../pages/API/paymentDetails/paymentDetails?id="+id
    });
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
    flag=true;
    this.setData({
      sercherStorage: wx.getStorageSync('paymentList') || []
    });
    var searchKey = this.data.searchKey;
    var searchUrl = app.globalData.DoBaseUrl + "payshuyu.html?title=" + searchKey +"&p=";
    this.getListShoushua(searchUrl, 2, 1);
  },
  getListShoushua: function (url, num, page) {
    var that = this;
    newurl = url;
    wx.request({
      url: url + page,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) { 
        if (res.data.errorCode == "00014") {
          flag = false;
          wx.hideNavigationBarLoading();
          that.setData({
            loading: "数据全部加载完毕",
            isLoading: false
          })
          return;
        }
        if (num == 1) {
          var l = that.data.shuyuList;
          for (var i = 0; i < res.data.shuyuList.length; i++) {
            l.push(res.data.shuyuList[i]);
          }
          that.setData({
            shuyuList: l
          });
          if (res.data.shuyuList.length > 0) {
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
          if (res.data.shuyuList.length<5){
            that.setData({
              loading: "数据全部加载完毕",
              isLoading: false
            })
          }
          if (res.data.shuyuList.length == 0) {
            wx.showToast({
              title: '暂无数据',
              icon: 'none',
              duration: 2000
            })
            that.setData({
              loading: "暂无数据",
              isLoading: false
            })
          }
          that.setData({
            shuyuList: res.data.shuyuList
          })
        }
      }
    })
  },
  //清除缓存
  clearStorage: function () {
    wx.removeStorageSync('paymentList')
    this.setData({
      sercherStorage: [],
      height:470
    })
  },
  navTosearch: function (e) {
    var keyWords = e.currentTarget.dataset.keywords;
    var searchUrl = app.globalData.DoBaseUrl + "payshuyu.html?title=" + keyWords + "&p=";
    this.getListShoushua(searchUrl, 2, 1);
  },
  //选择热门关键词
  chooseKey: function (e) {
    var that=this;
    var hotwords = e.currentTarget.dataset.hotwords;
    var paymentList = wx.getStorageSync('paymentList') || [];
    paymentList.push(hotwords);
    var arr = paymentList,
      result = [],
      i,
      j,
      len = arr.length;
    for (i = 0; i < len; i++) {
      for (j = i + 1; j < len; j++) {
        if (arr[i] === arr[j]) {
          j = ++i;
        }
      }
      result.push(arr[i]);
    }
    wx.setStorageSync('paymentList', result);
    that.setData({
      sercherStorage: wx.getStorageSync('paymentList')
    });
    var searchUrl = app.globalData.DoBaseUrl + "payshuyu.html?title=" + hotwords + "&p=";
    that.getListShoushua(searchUrl, 2, 1);
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
      that.getListShoushua(url, 1, _page)
    }
    wx.stopPullDownRefresh()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})