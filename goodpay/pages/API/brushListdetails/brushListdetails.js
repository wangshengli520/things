// pages/Sousuodetails/Sousuodetails.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id
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
      var id=this.data.id;
      var that=this;
      var url = app.globalData.DoBaseUrl +"shoushua.html?id="+id;
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success:function(res){
          console.log(res)
          if (!res.data.success){
            that.setData({
              listShoushua: "",
              shoushua: res.data.shoushua
            })
            return;
          }
         
          that.setData({
            listShoushua: res.data.listShoushua,
            shoushua: res.data.shoushua
          })
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
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  navToXQ: function (e) {
    console.log(e)
    var content = e.currentTarget.dataset.content;
    var id = e.currentTarget.dataset.id;
    if (content == 0) {
      wx.redirectTo({
        url: '../brushListdetails/brushListdetails?id=' + id,
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})