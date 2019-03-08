// pages/inquire/inquire.js

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    imgUrls: [
      { "item": "../../../images/License.png", "name": " 支付牌照查询", "url": '../../../pages/API/Pay-licence/Pay-licence' },
      { "item": "../../../images/monitoring.png", "name": "收单机构号", "url": '../../../pages/API/acquiring/acquiring' },
      { "item": "../../../images/check.png", "name": "地区代码", "url": '../../../pages/API/region/region' },
      { "item": "../../../images/shoushua.png", "name": "POS品牌（黑名单）", "url": '../../../pages/API/brushList/brushList' },
      { "item": "../../../images/mcc.png", "name": "MCC查询", "url": '../../../pages/API/MCC-query/MCC-query' },
      { "item": "../../../images/pos.png", "name": "POS返回码查询", "url": '../../../pages/API/posCode/posCode' },
      { "item": "../../../images/payment.png", "name": "支付术语表", "url": '../../../pages/API/payment/payment'},
      { "item": "../../../images/bin.png", "name": "卡BIN查询", "url": '../../../pages/API/MCC/MCC' },
      { "item": "../../../images/correspon.png", "name": "联行号查询", "url": '../../../pages/API/Unionpay/Unionpay' },
      { "item": "../../../images/ticket.png", "name": "支付机构罚单", "url": '../../../pages/API/ticket/ticket' },
      { "item": "../../../images/outsourcing.png", "name": "认证外包商", "url": '../../../pages/API/authentication/authentication' },
      { "item": "../../../images/provisions.png", "name": "法规条文查询", "url": '../../../pages/API/Regulations-home/Regulations-home' },
      { "item": "../../../images/forex.png", "name": "跨境外汇牌照", "url": '../../../pages/API/crossborder/crossborder' },
      { "item": "../../../images/listing.png", "name": "基金支付牌照清单", "url": '../../../pages/API/fund/fund' },
      { "item": "../../../images/members.png", "name": "协会会员名单", "url": '../../../pages/API/XieHuihuiYuan/XieHuihuiYuan'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    //隐藏tabbar
    wx.hideTabBar();
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
  chooseSearch: function (event){
      wx.navigateTo({
        url: event.currentTarget.dataset.url,
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
  
  }
})