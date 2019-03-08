// pages/authentication/authentication.js
var app=getApp();
var newurl="";
var _page=1;
var flag=true;
var keywords="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList:[],//获取公司列表
    company:'',
    isLoading:true,
    loading: "正在加载中...",
    waibaoshangList:[]
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
  //搜索关键字
  searchProduct:function(e){
    var that=this;
    keywords=e.detail.value;
    var searchUrl = app.globalData.DoBaseUrl + 'waibaoshangList.html?key=' + keywords+"&p="//连接数据源
    that.getWaibaoshangList(searchUrl,2,1)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var first='' ; //初次页面渲染数据的条件
    var that=this;
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth();
    var day = mydate.getDate();
    that.setData({//系统当前时间
      year: year,
      month: month + 1,
      day: day
    })
    var url = app.globalData.DoBaseUrl + 'waibaoshangList.html?key=' + first+"&p=";
    that.getWaibaoshangList(url,2,1);
  },
  getWaibaoshangList:function(url,num,page){
      var that = this;
      newurl = url;
      wx.request({
        url: url + page,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          if (num == 1) {
            var l = that.data.waibaoshangList;
            for (var i = 0; i < res.data.waibaoshangList.length; i++) {
              l.push(res.data.waibaoshangList[i]);
            }
            that.setData({
              waibaoshangList: l
            });
            if (res.data.waibaoshangList.length > 0) {
              that.setData({
                isLoading: true
              })
            } else {
              flag = false;
              that.setData({
                loading: "数据全部加载完毕",
                isLoading: false
              })
            }

          }
          if (num == 2) {
            if (res.data.waibaoshangList.length <= 0) {
              that.setData({
                loading: "暂无数据信息",
                isLoading: false,
                waibaoshangList: ""
              })
              return;
            }
            that.setData({
              waibaoshangList: res.data.waibaoshangList
            });
            if (res.data.waibaoshangList.length !== 0) {
              wx.hideLoading()
            }
          }
        }
      })
  },
  //跳到该条数据详情
  navToXQ:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../authenticationdetails/authenticationdetails?id='+id,
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
    var that = this;
      that.setData({
        isLoading: false
      })
    // 页数+1  
    _page = _page + 1;
    var Url = newurl;
    if(keywords!==""){
      Url = app.globalData.DoBaseUrl + 'waibaoshangList.html?key=' + keywords + "&p=";
    }
    if(flag){
      that.getWaibaoshangList(Url, 1, _page);
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})