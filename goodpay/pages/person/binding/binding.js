// pages/binding/binding.js
var app=getApp();
var spayWay=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['支付宝', '银行卡'],
    index: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindPickerChange: function (e) {
    spayWay = e.detail.value;
    console.log(spayWay)
    this.setData({
      index: e.detail.value
    })
  },
  bindfocus: function () {
    this.setData({
      inputTxt: ''
    })
  },
  searchBox: function (e) {
    var that = this;
    var memberId = wx.getStorageSync("memberId");
    var payWay = spayWay;
    var cardName = e.detail.value.cardName;
    if (cardName == '') {
      wx.showToast({
        title: '请输入银行卡支行信息',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var cardNo = e.detail.value.cardNo;
    if (cardNo == '') {
      wx.showToast({
        title: '请输入银行卡号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var remark = e.detail.value.remark;
    if (remark == '') {
      wx.showToast({
        title: '请输入银行持卡人',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var url = app.globalData.DoBaseUrl + "addBankCard.html?memberId=" + memberId + "&payWay=" + payWay + "&cardName=" + cardName + "&cardNo=" + cardNo + "&remark=" + remark;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res);
        if (res.data.success) {
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 2000
          })

          setTimeout(function () {
            wx.navigateTo({
              url: "/pages/putforward/putforward"
            })
          }, 2000);
        }
      },
      fail: function (error) {
        // fail
        console.log(error)
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