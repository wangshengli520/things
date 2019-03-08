// pages/member/member.js
var app = getApp();
var fanhuiUrl = '';
var money="";
var month="";
var orderNo='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:true,
    selected1:false,
    recharge: [],
    i: 0,
    val: '1个月',
    num:0,
    points:'',
    topList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //积分获取请求
    var memberId = wx.getStorageSync('memberId');
    var that = this;
    var nurl = app.globalData.DoBaseUrl + 'memberInfo.html?memberId=' + memberId;
    wx.request({
      url: nurl,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
      "Content-Type": "json"
      },
      success: function (res) { 
        console.log(res);
        that.setData({
          member:res.data.member
        }); 
      }
    });
    var memberId = wx.getStorageSync('memberId');
    var url = app.globalData.DoBaseUrl + "memberTop.html?memberId=" + memberId;
    this.getDataInfo(url);

    //头像昵称获取
    var cardUrl = app.globalData.DoBaseUrl +"businessCardList.html";
    wx.request({
      url: cardUrl,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success:function(res){ 
        console.log(res);
        that.setData({
          businessCardList: res.data.businessCardList
        })
      }
    })
  },
  // changeVal: function (e) {
  //    month = e.currentTarget.dataset.val.month;
  //    money = e.currentTarget.dataset.val.money;
  //   this.setData({
  //     i: e.currentTarget.dataset.i,
  //     money: money
  //   })
  // },
  Recharge:function () {
    console.log(month)
    var memberId = wx.getStorageSync("memberId");
    var balance = this.data.balance;//账户余额
    var money = this.data.money;//应付金额
    var liberalUrl = app.globalData.DoBaseUrl + "top.html?month=" + month + "&memberId=" + memberId;
    wx.request({
      url: liberalUrl,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success:function(res){
        //console.log(res)
       // console.log(wx.getStorageSync('openid'));
        //  调用支付
        if (res.data.success){
          wx.request({
            url: app.globalData.DoBaseUrl + 'doMemberOrder.html',
            data: {
              'openid': wx.getStorageSync('openid'),
              "orderNo": res.data.orderNo
            },
            method: 'POST',
            header: {
              "content-type": 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res);
              //  调用支付
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success: function (res) {
                  if (res.data.success) {
                    wx.showToast({
                      title: '充值成功',
                      icon: 'success',
                      duration: 2000
                    })
                    setTimeout(function () {
                      wx.navigateTo({
                        url: "../../../pages/tabbar/index/index"
                      })
                    }, 2000)
                  } else {
                    wx.showToast({
                      title: '充值失败重新充值',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }
              })
            }
          })
        }
      }
      })
  },
  Rechargeint(){
    console.log("积分付款");
    var memberId = wx.getStorageSync("memberId");
    var balance = this.data.balance;//账户余额
    var money = this.data.money;//应付金额
    var liberalUrl = app.globalData.DoBaseUrl + "integralTop.html?month=" + month + "&memberId=" + memberId;
    var vipint = this.data.topList[this.data.num].integral;
    var vipgold = this.data.points.gold;
    if(vipgold > vipint){
      wx.showModal({
        title: '提示',
        content: '是否购买会员',
        success(res) {
          if (res.confirm) {
           
            //发送请求
            wx.request({
              url: liberalUrl,
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                "Content-Type": "json"
              },
              success:function(res){
                console.log(res);
                if (res.data.success){
                  wx.request({
                    url: app.globalData.DoBaseUrl + 'integralDoMemberOrder.html',
                    data: {
                      'openid': wx.getStorageSync('openid'),
                      "orderNo": res.data.orderNo
                    },
                    method: 'POST',
                    header: {
                      "content-type": 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      wx.showToast({
                        title:"支付成功",
                        icon: 'success',
                        duration:1500
                      });
                      setTimeout(function () {
                        wx.switchTab({
                          url: '/pages/tabbar/index/index'
                        })
                      }, 2000)
                    }
                  })
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.request({
        url: liberalUrl,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success:function(res){
            //  调用支付
            if (res.data.success){
              wx.request({
                url: app.globalData.DoBaseUrl + 'integralDoMemberOrder.html',
                data: {
                  'openid': wx.getStorageSync('openid'),
                  "orderNo": res.data.orderNo
                },
                method: 'POST',
                header: {
                  "content-type": 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res);
                  //  调用支付
                  wx.requestPayment({
                    timeStamp: res.data.timeStamp,
                    nonceStr: res.data.nonceStr,
                    package: res.data.package,
                    signType: res.data.signType,
                    paySign: res.data.paySign,
                    success: function (res) {
                      if (res.data.success) {
                        wx.showToast({
                          title: '充值成功',
                          icon: 'success',
                          duration: 2000
                        })
                        setTimeout(function () {
                          wx.navigateTo({
                            url: "../../../pages/tabbar/index/index"
                          })
                        }, 2000)
                      } else {
                        wx.showToast({
                          title: '充值失败重新充值',
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    }
                  })
                }
              })
            }
          
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  selected:function(e){
      this.setData({
          selected1:false,
          selected:true
      })
  },
  selected1:function(e){
  this.setData({
      selected:false,
      selected1:true
  })

  var vipint = this.data.topList[this.data.num].integral;
  var vipgold = this.data.points.gold;
  if(vipgold > vipint){
    this.setData({
      consumptiongold:vipint,
      consumptionmoney:0
    })
  }else{
    var conmoney = (vipint-vipgold)/10;
    this.setData({
      consumptiongold:vipgold,
      consumptionmoney:conmoney
    })
  }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //计算积分
    /*var vipint = this.data.topList[this.data.num].integral;
    var vipgold = this.data.points.gold;
    if(vipgold > vipint){
      this.setData({
        consumptiongold:vipgold,
        consumptionmoney:0
      })
    }else{
      var conmoney = (vipint-vipgold)/10;
      this.setData({
        consumptiongold:vipgold,
        consumptionmoney:conmoney
      })
    }*/
  },
  getDataInfo:function(url){
      var that=this;
      wx.request({
        url: url,
        method: 'GET',
        header: {
          "Content-Type": "json"
        },
        success:function(res){
          console.log(res)
          month = res.data.topList[0].month;
          that.setData({
            topList: res.data.topList,
            points:res.data.member
          })
        }
      })
  },
  onvipselect(e){
    console.log(e);
    this.setData({
      num:e.currentTarget.dataset.i
    });
    month = this.data.topList[this.data.num].month;
    var vipint = this.data.topList[this.data.num].integral;
    var vipgold = this.data.points.gold;
    if(vipgold > vipint){
      this.setData({
        consumptiongold:vipint,
        consumptionmoney:0
      })
    }else{
      var conmoney = (vipint-vipgold)/10;
      this.setData({
        consumptiongold:vipgold,
        consumptionmoney:conmoney
      })
    }
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