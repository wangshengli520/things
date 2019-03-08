// pages/MCC-query/MCC-query.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  flag:true,
  MCC:'',
  mccList:'',
  inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //输入关键字或者企业类别名称
  searchProduct:function(e){
  var  mcc=e.detail.value
  this.setData({
    MCC:mcc
})
  },
  //根据MCC码查询数据
  showsearch:function(){
    var mcc=this.data.MCC 
    this.setData({//初始化
      mccList: '',
      flag: true
    })
    mcc = mcc.replace(/\s+/g, ""); 
    if(mcc==''){
     wx.showToast({
       title: '请输入查询内容',
       icon:'none',
       duration: 2000
     })
     return
    }else{
      var url =app.globalData.DoBaseUrl + 'mccList.html?inputMessage='+mcc; //连接数据源
      var that = this;
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          console.log(res)
          var mcclist = res.data.mccList
          if (mcclist.length == 0) {
            wx.showToast({
              title: '没有该信息！',
              icon: 'none',
              duration: 2000
            })
          }else{
            that.setData({
              mccList:mcclist,
              flag: false,
              MCC:''
            });
          }         
        },
        fail: function (error) {
          // fail
          console.log(error)
        }
      })  
    } 
  },
  bindblur:function(){
    this.setData({
      inputValue:''
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