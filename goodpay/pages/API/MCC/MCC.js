// pages/MCC/MCC.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    userInput:'',
    BINList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //输入关键字或者企业类别名称
  searchProduct: function (e) {
    var userInput = e.detail.value;
    this.setData({
      userInput: userInput
    })
  },
  showsearch:function(){
    console.log("我点击了")
    var that=this;
    this.setData({//初始化
      BINList: '',
      flag: true
    })
    var keyWords = that.data.userInput;
    console.log(keyWords)
    if(keyWords==""){
      wx.showToast({
        title: '请输入信息',
        icon: 'none',
        duration: 2000
      })
      return;
    }else{
      var that=this;
      var url = app.globalData.DoBaseUrl + "getBankInfo.html?bankno=" + keyWords;
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success:function(res){
          console.log(res)
          var BINList = res.data.convertvalue.data;
          if(BINList.bank_name ==undefined){
            that.setData({
              flag:true
            })
            wx.showToast({
              title: '没有该银行卡信息！',
              icon: 'none',
              duration: 2000
            })
            return;  
          }
          if(res.data.convertvalue.resp.code==0){
            that.setData({
              BINList: res.data.convertvalue.data,
              flag: false
            })
          }else{
            wx.showToast({
              title: '没有该信息！',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  bindblur: function () {
    this.setData({
      inputValue: ''
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