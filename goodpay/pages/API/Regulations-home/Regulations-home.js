// pages/Regulations-home/Regulations-home.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    home:[
      { "name": "标题检索", "index": 0 },
      { "name": "全文检索", "index": 1  }
      ],
    sercherStorage: [],
    inputValue: "",  
    catalogSelect: 0,
    item: ['支付', '支付宝', '手刷', '微信', '黑名单']
  },
  //获取检索下标
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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //获取历史记录或者热门搜索关键词
  historyChoose:function(e){
    var hotword = e.currentTarget.dataset.value
    var catalogSelect = this.data.catalogSelect
       wx.navigateTo({
         url: "../Provisions/Provisions?keywords=" + hotword + "&catalogSelect=" + catalogSelect
       })
  },
  //搜索关键字
  searchProduct: function (e) {
    var keywords = e.detail.value;
    var catalogSelect = this.data.catalogSelect;
    var keyWords = e.detail.value
    var searchData = wx.getStorageSync('searchData') || [];
    if (keyWords !== "") {
      searchData.push(e.detail.value);
      //数组去重
      var arr = searchData,
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
      wx.setStorageSync('searchData', result);
      this.setData({
        sercherStorage: wx.getStorageSync('searchData')
      });
    };
    if (keywords == '') {    
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      wx.navigateTo({
        url: "../Provisions/Provisions?keywords=" + keywords + "&catalogSelect=" + catalogSelect
      })
      }  
  },
  bindblur:function(){
    this.setData({
      inputValue:""
    })
  },
  //清除缓存
  clearSearchData:function(){
      wx.removeStorageSync('searchData')
      this.setData({
        sercherStorage:[]
      })
  },
  //选择热门搜索词
  chooseKey: function (e) {
    var catalogSelect = this.data.catalogSelect;
    var hotwords = e.currentTarget.dataset.hotwords; 
    var searchData = wx.getStorageSync('searchData') || [];
    searchData.push(hotwords);
    var arr = searchData,
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
    wx.setStorageSync('searchData', result);
    this.setData({
      sercherStorage: wx.getStorageSync('searchData')
    });
    wx.navigateTo({
      url: "../Provisions/Provisions?keywords=" + hotwords + "&catalogSelect=" + catalogSelect
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      sercherStorage: wx.getStorageSync('searchData')
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
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})