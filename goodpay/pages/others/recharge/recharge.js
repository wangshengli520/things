// pages/recharge/recharge.js
var app = getApp();
var money = '20.00';
var fanhuiUrl = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    denominationList: ['20元', '30元', '50元', '100元', '200元', '500元'],
    i: 0,
    val: '20'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  changeVal: function (e) {
    var newmoney = parseFloat(e.currentTarget.dataset.val);
    newmoney= newmoney.toFixed(2);
    console.log(newmoney)
   money = newmoney
    this.setData({
      i: e.currentTarget.dataset.i,
      val: newmoney,
      btnVal: newmoney
    })
  },
  bindfocus:function(e){
    var i=this.data.i;
    this.setData({
      i:"###@#$",
      val:'',
      userInput:'',
      btnVal:''
    })
  },
  changeInput: function (e) {
    var that=this;
    var newmoney = parseFloat(e.detail.value);
    newmoney = newmoney.toFixed(2);
    console.log(newmoney)
    money = newmoney;
      that.setData({
        btnVal: newmoney
      })
  },
  Recharge:function(){
    var memberId = wx.getStorageSync('memberId');
    var url = app.globalData.DoBaseUrl + "addRecharge.html?memberId=" + memberId + "&money=" + money;
    console.log(url)
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success:function(res){
        console.log(res)
        wx.request({
          url: app.globalData.DoBaseUrl + 'doOrder.html',
          data: {
            'openid': wx.getStorageSync('openid'),
            "orderNo": res.data.orderNo
          },
          method: 'POST',
          header: {
            "content-type": 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            if (res.data.appId == "") {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
              return;
            }
            //  调用支付
            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success: function (res) {
                      wx.showToast({
                        title: "支付成功",
                        icon: 'success',
                        duration: 2000
                      })
                      setTimeout(function () {
                        wx.redirectTo({
                          url: '../wallet/wallet'
                        })
                      }, 2000);
              },
              fail: function (res) {
                console.log(res.errMsg)
                    wx.showToast({
                      title: "支付失败",
                      icon: 'none',
                      duration: 2000
                    })
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '../wallet/wallet'
                      })
                    }, 2000);
              }
            })

          }
        })
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