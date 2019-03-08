// pages/fund/fund.js
var app=getApp();
var newurl = "";
var _page = 1;
var flag=true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    jijinpayList:[],
    loading:"正在加载中..."
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
  searchProduct: function (e) {
    console.log(e)
    var that = this
    var keywords = e.detail.value
    var searchUrl = app.globalData.DoBaseUrl + 'jijinpayList.html?key=' + keywords+"&p=";
    this.getFundList(searchUrl,2,1)
  },
  detail:function(e){
    var id=e.currentTarget.dataset.id
    console.log(id)
      wx.navigateTo({
        url: '../funddetails/funddetails?id='+id,
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth();
    var day = mydate.getDate();
    that.setData({
      year: year,
      month: month + 1,
      day: day
    })
    var keywords = ''  /**获取输入的公司 */
    var url = app.globalData.DoBaseUrl + 'jijinpayList.html?key=' + keywords+"&p="//连接数据源
    that.getFundList(url,2,1)
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  getFundList:function(url,num,page){
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
          var l = that.data.jijinpayList;
          for (var i = 0; i < res.data.jijinpayList.length; i++) {
            l.push(res.data.jijinpayList[i]);
          }
          that.setData({
            jijinpayList: l
          });
          if (res.data.jijinpayList.length > 0) {
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
          that.setData({
            jijinpayList: res.data.jijinpayList
          });
        }
      }
    })
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
    var Url = newurl;
    _page = _page + 1;
    if (flag) {
      that.getFundList(Url, 1, _page);
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})