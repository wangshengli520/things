// pages/homepage/homepage.js
var app = getApp();
var longitude = '';
var latitude = '';
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (options) {
    if (options.parentId != null && options.parentId != '') {
      wx.setStorageSync("parentId", options.parentId);
    }
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    wx.getLocation({
      type: 'wgs84',
      success: function (local) {
        latitude = local.latitude
        longitude = local.longitude
        var getUserUrl = app.globalData.DoBaseUrl + "updateUserInfo.html";
        wx.request({
          url: getUserUrl,
          data: {
            openId: wx.getStorageSync("openid"),
            nickName: e.detail.userInfo.nickName,
            photo: e.detail.userInfo.avatarUrl,
            province: e.detail.userInfo.province,
            city: e.detail.userInfo.city,
            sex: e.detail.userInfo.gender,
            country: e.detail.userInfo.country,
            latitude: latitude,
            longitude: longitude

          }, success: function (res) {
            console.log(res);
            wx.setStorageSync('memberId', res.data.member.id);
            wx.setStorageSync('photo', res.data.member.headimgurl);
            wx.setStorageSync('phone', res.data.member.phone);
            wx.setStorageSync('nickName', res.data.member.nickname);
            wx.reLaunch({
              url: '../../tabbar/index/index'
            })

            console.log(e.detail.userInfo)
          }
        })
      }
    })


  }
})