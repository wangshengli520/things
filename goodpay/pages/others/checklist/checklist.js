// pages/checklist/checklist.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: ['我的', '好的', '是的', '好啊', '你好'],
    inputValue:''
    
  },
  //关键字搜索
  searchProduct: function (e) {
    var keyWords = e.detail.value
    var billList = wx.getStorageSync('billList') || [];
    if (keyWords !== "") {
      billList.push(e.detail.value);
      //数组去重
      var arr = billList,
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
      wx.setStorageSync('billList', result);
      this.setData({
        sercherStorage: wx.getStorageSync('billList')
      });
      console.log(this.data.sercherStorage)
    };
    if (keyWords == '') {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      wx.navigateTo({
        url: "../Inventory-list/Inventory-list?keyWords=" + keyWords
      })
    }
  },
  //清除输入框的输入值
  bindblur:function(){
    this.setData({
      inputValue: ""
    })
  },
  //选择热门关键词
  chooseKey:function(e){
    var hotwords = e.currentTarget.dataset.hotwords;
    var billList = wx.getStorageSync('billList') || [];
    billList.push(hotwords);
    var arr = billList,
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
    wx.setStorageSync('billList', result);
    this.setData({
      sercherStorage: wx.getStorageSync('billList')
    });
    wx.navigateTo({
      url: "../Inventory-list/Inventory-list?keyWords=" + hotwords
    })
  },
  //搜索历史跳转
  navTosearch: function (e) {
    var keyWords = e.currentTarget.dataset.keywords;
    wx.navigateTo({
      url: "../Inventory-list/Inventory-list?keyWords=" + keyWords
    })
  },
  //清除缓存
  clearStorage: function () {
    wx.removeStorageSync('billList')
    this.setData({
      sercherStorage: []
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      sercherStorage: wx.getStorageSync('billList') || []
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