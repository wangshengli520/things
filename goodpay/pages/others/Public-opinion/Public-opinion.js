// pages/Public-opinion/Public-opinion.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: ['你好', '好的', '是啊', '我是', '好啊'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //输入关键字
  searchProduct: function (e) {
    var keyWords = e.detail.value
    var searchList = wx.getStorageSync('searchList') || [];
    if (keyWords!==""){
      searchList.push(e.detail.value);
      //数组去重
      var arr = searchList,
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
      wx.setStorageSync('searchList', result);
      this.setData({
        sercherStorage: wx.getStorageSync('searchList')
      });
    };
    if (keyWords == '') {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 2000
      })
      return
    }else{
      wx.navigateTo({
        url: "../enterprise/enterprise?keyWords=" + keyWords
      })
    }
  },
  bindblur: function () {
    this.setData({
      inputValue: ""
    })
  },
  //选择热门搜索词
  chooseKey:function(e){
    var hotwords = e.currentTarget.dataset.hotwords;
    var searchList = wx.getStorageSync('searchList') || [];
    searchList.push(hotwords);
    var arr = searchList,
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
    wx.setStorageSync('searchList', result);
    this.setData({
      sercherStorage: wx.getStorageSync('searchList')
    });
    wx.navigateTo({
      url: "../enterprise/enterprise?keyWords=" + hotwords
    })
  },
  //清除缓存
  clearStorage:function(){
    wx.removeStorageSync('searchList')
    this.setData({
      sercherStorage: []
    })
  },
  //搜索历史跳转
  navTosearch:function(e){
    console.log(e)
     var keyWords = e.currentTarget.dataset.keywords;
    wx.navigateTo({
      url: "../enterprise/enterprise?keyWords=" + keyWords
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
    this.setData({
      sercherStorage: wx.getStorageSync('searchList')||[]
    });
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})