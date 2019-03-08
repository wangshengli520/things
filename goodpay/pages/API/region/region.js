// pages/region/region.js
var app = getApp();
var flag = true;
var newId = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    items:['',''],
    showView: true
   
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
  searchProduct:function(e){
    var that = this;
    var key = e.detail.value; 
    var url = app.globalData.DoBaseUrl + "placeList.html?key=" + key;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success:function(res){ 
        if (res.data.success){
          that.setData({
            provinceList: res.data.placeList
          });
        }else{
          console.log("暂无数据")
        }
      }
    })
  },
  bindblur:function(){
    this.setData({
      inputValue:''
    })
  },
  clickShow:function(e){
    var that=this;
    var id = e.currentTarget.dataset.index; 
    if (id != newId){
      flag = true
    }
    if (flag){
      newId = id;
      that.setData({
        showIndex: id
      })
      flag = false;
    }else{
      that.setData({
        showIndex: 0
      })
      flag = true;
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
    var groomUrl = app.globalData.DoBaseUrl + "placeList.html";
    this.getProvinceListData(groomUrl);
  },
  getProvinceListData: function (url) {
    var that = this;
    wx.request({
      url: url ,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) { 
          that.setData({
            provinceList: res.data.placeList
          });
        
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})