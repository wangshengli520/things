// pages/brushList/brushList.js
var app=getApp();
var newurl="";
var flag=true;
var _page=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey:'',
    listShoushua:"",
    loading: '正在加载中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  searchProduct: function (e) {
    var searchKey = e.detail.value;
    var searchUrl = app.globalData.DoBaseUrl + "shoushua.html?title=" + searchKey + "&p=";
    this.getListShoushua(searchUrl, 2, 1);
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
     flag = true;
     _page = 1;
    var searchKey = this.data.searchKey;
    var searchUrl = app.globalData.DoBaseUrl + "shoushua.html?title=" + searchKey + "&p=";
    this.getListShoushua(searchUrl, 2, 1);
  },
  getListShoushua: function (url, num, page) {
    var that = this;
    newurl = url;
    wx.request({
      url: url + page,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) { 
        if (res.data.errorCode == "00014") {
          flag = false;
          wx.hideNavigationBarLoading();
          that.setData({
            loading: "数据全部加载完毕",
            isLoading: false
          })
          return;
        }
        if (num == 1) {
          var l = that.data.listShoushua;
          for (var i = 0; i < res.data.listShoushua.length; i++) {
            l.push(res.data.listShoushua[i]);
          }
          that.setData({
            listShoushua: l
          });
          if (res.data.listShoushua.length > 0) {
            wx.showNavigationBarLoading();
            that.setData({
              isLoading: true
            })
          } else {
            flag = false;
            wx.hideNavigationBarLoading();
            that.setData({
              loading: "数据全部加载完毕",
              isLoading: false
            })
          }
        }
        if (num == 2) { 
          if (res.data.listShoushua.length == 0){
            wx.showToast({
              title: '暂无数据',
              icon: 'none',
              duration: 2000
            })
            that.setData({
              loading: "暂无数据",
              isLoading: false
            })
          }
          if (res.data.listShoushua.length<=14){
            that.setData({
              loading: "数据全部加载完毕",
              isLoading: false
            })
          }
          that.setData({
            listShoushua: res.data.listShoushua
          })
        }
      }
    })
  },
  navToXQ:function(e){
      console.log(e)
    var content = e.currentTarget.dataset.content;
    var id = e.currentTarget.dataset.id;
    if (content == 0){
        wx.navigateTo({
          url: '../brushListdetails/brushListdetails?id=' + id,
        })
    }else{
      
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
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 页数+1
    _page = _page + 1;
    var url = newurl;
    if (flag) {
      that.getListShoushua(url, 1, _page)
    }
    wx.stopPullDownRefresh()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})