// pages/Invitation/Invitation.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    showBang:true,
    showHide:true,
    ruleIsShow:true
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
    var memberId = wx.getStorageSync("memberId");
    var url = app.globalData.DoBaseUrl + 'darenList.html?memberId='+memberId+"&page=1&rows=3";
    this.showDareList(url,1);
  },
  showAllBang:function(){
    var memberId = wx.getStorageSync("memberId");
    var url = app.globalData.DoBaseUrl + 'darenList.html?memberId=' + memberId + "&page=1&rows=100";
    this.showDareList(url,2);
  },
  showDareList: function (url,num) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) { 
        if (num==1){
          that.setData({
            darenList: res.data.darenList,
            daren: res.data.darenOrder,
            activityRule: res.data.ACTIVITY_RULES,
            begin: res.data.map.begin,
            end: res.data.map.end
          });
        }else{
          that.setData({
            showBang: false,
            darenAllList: res.data.darenList,
            daren: res.data.darenOrder,
            begin: res.data.map.begin,
            end: res.data.map.end
          });
        }
        
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },
  preventTouchMove: function (e) {

  },
  closeBang:function(){
      this.setData({
        showBang: true
      })
  },
  showRule:function(){
    this.setData({
      ruleIsShow: false
    })
  },
  closeRule:function(){
    this.setData({
      ruleIsShow: true
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
  preventTouchMove: function (e) {

  },
  closeQR:function(){
    this.setData({
      showHide: true
    })
  },
  popup: function () {
    var memberId = wx.getStorageSync("memberId");
    var QRUrl = app.globalData.DoBaseUrl + "getWxAqrcode.html?memberId=" + memberId;
    this.setData({
      showHide:false,
      QRUrl: QRUrl
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return {
      title: '支付好帮手',
      desc: '实时快速的支付查询好帮手',
      path: '/pages/carddetails/carddetails?id=' + wx.getStorageSync("memberId")
    }
  }
})