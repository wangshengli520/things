// pages/tabbar/headlines/headlines.js

const app = getApp();
var util = require('../../../utils/util.js');
var start;
var end;
var total_time = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar:{},
    article:[]
  },
  getTime:function(){
    var time = util.formatTime(new Date())
    //为页面中time赋值
    this.setData({
      time:time
    })
    //打印
    console.log(time)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    //隐藏tabbar
    wx.hideTabBar();
    //支付头条信息获取
    var  url = app.globalData.DoBaseUrl + "getArticleList.html?type="+1+"&page="+1;
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET', 
      header: {
        "Content-Type": "json"
      },
      success: function(res){
        console.log(res);
        that.setData({
          article:res.data.rows
        })
      }
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
  onToheadlines(e){

    var id = e.currentTarget.dataset.i;
    wx.navigateTo({
      url: '../../others/headlines-detail/headlines-detail?id='+id
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    end = new Date(); //用户退出时间
    total_time = end.getTime() - start.getTime();
    total_time = Math.ceil(total_time / 1000); //取的是秒并且化整用户停留时间
    console.log(total_time);
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
    /*wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)*/
  },  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})