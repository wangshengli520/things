// pages/putforward/putforward.js
var app = getApp();
var bankcard="";
const formData = {
  address: 'T.I.T 造舰厂',
  time: '2017.01.09',
  name: '帝国歼星舰',
  serial: '123456789'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: false,
    showHide: false,
    _index: 0,
    bankname: "",
    banknum: '',
    openid:"",
    session_key:"",
    access_token:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        //服务通知
        var that = this
        //第一步获取openid
       /* wx.login({
              success: function (data) {
                    console.log(data.code, data) 
                    console.log("12345");
                    wx.request({
                          url: 'https://api.weixin.qq.com/sns/jscode2session',
                          data:{
                                appid: "wx390052b8319ecfa7",
                                secret: "小程序秘钥",
                                js_code: data.code//wx.login获取到的code
                          },
                          method: "post",
                          header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                          },
                          success: function (res) {
                                console.log(res);
                                that.setData({
                                      openid: res.data.openid,
                                      session_key: res.data.session_key,
                                })
                          }
                    })
              }
        })
        //第二步  获取access_token
        wx.request({
              url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=你的appid&secret=你的小程序秘钥',
              method: "GET",
              success: function (res) {
                    console.log("xxx");
                    console.log(res);
                    that.setData({
                          access_token: res.data.access_token,//获取到的access_token
                    })
              }
        })*/
  },
  close: function () {
    this.setData({
      showHide: false
    })
  },
  showHide: function () {
    this.setData({
      showHide: true
    })
  },
  //选择银行卡
  chooseBank: function (e) { 
    bankcard = e.currentTarget.dataset.cardno;
    this.setData({//把选中值放入判断值
      _index: e.currentTarget.dataset.index,
      bankname: e.currentTarget.dataset.bankname,
      banknum: e.currentTarget.dataset.banknum,
      showHide: false
    })
  },
  tclick: function () {
    this.setData({
      AllMoney: this.data.money
    })
  },
  form: function (e) {
   /* console.log(e);
    var that = this;
    var fId = e.detail.formId; // 网络请求    
    var l = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + that.data.access_token; 
    var d = {
          touser: that.data.openid, //用户的openid      
          template_id: 'TB13hWPskxuRlwcP8ulmWeZ3X30UnDJsCcuPlp-vFBY
          ',
          page: '/pages/person/putforward/putforward',
          form_id: fId,
          data: {           //模板消息要对应 有几个写几个  避免为空模板
                "keyword1": {
                      "value": "酒店",
                      "color": "#4a4a4a"
                },
                "keyword2": {
                      "value": "2018-03-22",
                      "color": "#9b9b9b",
                },
                "keyword3": {
                      "value": "$300",
                      "color": "#9b9b9b"
                },
                "keyword4": {
                      "value": "中国",
                      "color": "#9b9b9b"
                },
          },
          color: '#ccc',
          emphasis_keyword: 'keyword1.DATA'
    }
    wx.request({
          url: l,
          data: JSON.stringify(d),
          method: 'POST',
          success: function (res) {
                console.log(res);
          },
          fail: function (err) {
                console.log(err);
          }
    });*/
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
    var memberId = wx.getStorageSync('memberId');
    var that=this;
    var myBankUrl = app.globalData.DoBaseUrl + "withdrawInfo.html?memberId=" + memberId;
    this.myUserBankUrl(myBankUrl)
  },
  myUserBankUrl: function (url) { 
    var that = this;
    // console.log("请求的URL" + num+"中间参数" + newurl);
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        if (res.data.bankList.length==0){
          that.setData({
            isShow:true
          })
          return;
        }else{
            var bankList = res.data.bankList;
            var bankname = bankList[0].cardName;
            var banknum = bankList[0].remark;
            bankcard = bankList[0].cardNo;
            that.setData({
              bankList: res.data.bankList,
              bankname: bankname,
              banknum: banknum,
              money: res.data.member.money,
              isShow: false
            });
        }
      },
      fail: function (error) {
        // fail
        console.log(error)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  bindBankMoney: function (e) {
    var that = this; 
    var money = e.detail.value.money;
    var balance = that.data.money;
    if (money == '') {
      wx.showToast({
        title: '请输入您的提现金额',
        icon: 'none',
        duration: 2000
      })
    }
    var outMoney = balance - money;
    if (outMoney < 0) {
      wx.showToast({
        title: '您当前申请的金额不足',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var memberId = wx.getStorageSync('memberId');
    var url = app.globalData.DoBaseUrl + "withdrawRequest.html?memberId=" + memberId + "&bankcard=" + bankcard + "&money=" + money;
    wx.request({
      url: url ,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success:function(res){ 
        console.log(res) 
        if (res.data.success) {
          wx.showToast({
            title: '提现申请成功',
            icon: 'success',
            duration: 2000
          })
        }
        //服务通知



        setTimeout(function () {
          wx.navigateTo({
            //url: "../../../pages/person/wallet/wallet"
          })
        }, 1000);
      },
      fail: function (error) {
        // fail 
      }
    })
  },
  redirect: function () {
    wx.navigateTo({
      url: "../../../pages/person/binding/binding"
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})