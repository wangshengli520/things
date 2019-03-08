// pages/personal/personal.js
var app = getApp();
var interval = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    timeOut: '获取验证码', //倒计时 
    currentTime: 60,
    flag: true,
    InShow:false,
    Instructionstext:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      app.editTabbar();

      this.setData({
        photo: wx.getStorageSync("photo"),
        phone: wx.getStorageSync("phone"),
        nickname: wx.getStorageSync("nickName")
      }) 

      
  },
  onInstructions(){
    var that = this;
    that.setData({
      InShow:(!that.data.InShow)
    });
  },
  //我的钱包
  navToWallet:function(){
    wx.navigateTo({
      url: "pages/others/wallet/wallet"
    })
  },
  //提现
  withMoney:function(){
    wx.navigateTo({
      url: "../../../pages/person/putforward/putforward"
    })
  },
  //VIP权益
  goMemberVip:function(){
    wx.navigateTo({
      url: "../../../pages/person/memberJM/memberJM"
    })
  },
  //我的个人资料
  navToPD:function(){
    wx.navigateTo({
      url: "../../../pages/person/mycard/mycard"
    })
  },
  //会员
  
  //我的发布
  navToFB:function(){
    wx.navigateTo({
      url: "../../../pages/person/I-release/I-release"
    })
  },
  //我的收藏
  navToSc:function(){
    wx.navigateTo({
      url: "../../../pages/person/My-collection/My-collection"
    })
  },
  //我的名片
  navToMp:function(){
    wx.navigateTo({
      url: "../../../pages/person/mycard/mycard"
    })
  },
  //我的二维码
  navToQR:function(){
    wx.navigateTo({
      url: "../../../pages/others/myQR/myQR"
    })
  },
  //分销
  navToFenXiao: function () {
    wx.navigateTo({
      url: "../../../pages/person/Invitation/Invitation"
    })
  },
  // 客服中心
  phonecallevent: function (e) {
    wx.makePhoneCall({
      phoneNumber: "4006775139"
    })
  },
  // 用户交流群
  navToJl:function(){
    wx.navigateTo({
      url: "../../../pages/person/customer-flock/customer-flock"
    })
  },
  //关于我们
  navToUS:function(){
    wx.navigateTo({
      url: "../../../pages/person/aboutUs/aboutUs"
    })
  },
  //合伙人赚钱
  navToSchehuo(){
    wx.navigateTo({
      url: '../../person/hehuotxt/hehuotxt'
    })
  },
  overPerson:function(){
    this.setData({
      flag: false
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
    var that = this;
    var memberId = wx.getStorageSync("memberId");
    var url = app.globalData.DoBaseUrl + 'memberInfo.html?memberId=' + memberId;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) { 
        console.log(res);
        that.setData({
          member:res.data.member
        }); 
      },
      fail: function (error) {
        // fail 
      }
    })

    this.setData({
      photo: wx.getStorageSync("photo"),
      phone: wx.getStorageSync("phone"),
      nickname: wx.getStorageSync("nickName")
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  phoneBox: function (e) {
    var phone = e.detail.value.phone;
    if (phone == '') {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var code = e.detail.value.code;
    var that = this;
    if (code == "") {

      this.getCode();
      var that = this
      that.setData({
        disabled: true
      })
      var memberId = wx.getStorageSync("memberId");
      var url = app.globalData.DoBaseUrl + 'SendMessageInterface.html?phoneNo=' + phone+"&memberId=" + memberId;
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          if (res.data.success) {
            wx.showToast({
              title: '短信发送成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function (error) {
          // fail
          console.log(error)
        }
      })
    } else {
      var memberId = wx.getStorageSync("memberId");
      var url = app.globalData.DoBaseUrl + 'updateMessageInterface.html?phoneNo=' + phone + "&code=" + code + "&memberId=" + memberId;
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          console.log(res);
          if (res.data.success) {
            wx.setStorageSync("phone", phone)
            that.setData({
              flag: true,
              phone: phone
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function (error) {
          // fail
          console.log(error)
        }
      })

    }
  }, getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime;
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        timeOut: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          timeOut: '获取',
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
  }
  , showPhone: function () {
    var that = this;
    that.setData({
      flag: false
    });
  },
  close: function () {
    this.setData({
      flag: true
    })
  }
  
})