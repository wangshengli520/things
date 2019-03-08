// pages/others/headlines-detail/headlines-detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    num:1,
    tabScrollTop: 0,
    loadingtime:"",
    flag:true,
    taskList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    //var that = this;
    //console.log(this);
   /*var timer = setInterval(function() {
      var numVal = that.data.num + 1;
      that.setData({ num: numVal });
      console.log('setInterval==' + that.data.num);
    },1000);*/
    var memberId = wx.getStorageSync('memberId');
    var that=this;
    var url = app.globalData.DoBaseUrl +"taskList.html?memberId="+ memberId;
    wx.request({
      url:url,
      data: {},
      method: 'GET', 
      success: function(res){
        console.log(res)
        that.setData({
          taskList:res.data.taskList
        })
      }
    });
    this.time();
    //内容获取
    console.log(op);
    var WxParse = require('../../../wxParse/wxParse.js');
    //支付头条信息获取
    var  url = app.globalData.DoBaseUrl + "getArticleList.html?type="+1;
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET', 
      header: {
        "Content-Type": "json"
      },
      success: function(res){
        var ar = res.data.rows[op.id].articleContent;
        that.setData({
          article:res.data.rows[op.id]
        });
        WxParse.wxParse('ar', 'html', ar, that,5);
      }
    })

  },
  time(){
    var that = this;
    that.setData({
      loadingtime:setInterval(function() {
        var numVal = that.data.num + 1;
        that.setData({ num: numVal });
        console.log('setInterval==' + that.data.num);
      },1000)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /*let query = wx.createSelectorQuery();
    query.select('#bottom').boundingClientRect();
    // 执行查询
    query.exec(ele => {
      console.log(ele)
      let e = ele[0];
      console.log(e.bottom);
      console.log(e.scrollTop)
    })*/
    var that = this;
    var query = wx.createSelectorQuery();
    query.select('#bottom').boundingClientRect(function (res) {
      that.setData({
        tabScrollTop: res.bottom
      })
    }).exec()
  },
  onPageScroll:function(e){
    //console.log(Math.abs(this.data.tabScrollTop-(1118+e.scrollTop)));
    var memberId = wx.getStorageSync('memberId');
    var taskscroll = this.data.taskList;
    if(taskscroll[2].complate == taskscroll[2].complateNum){
      console.log("任务已经做完")
      
    }else{
      console.log(this.data.flag)
      if(this.data.flag && this.data.num > 5 && Math.abs(this.data.tabScrollTop-(1118+e.scrollTop)) < 200){
        console.log(323)
        wx.showToast({
          title:"+10积分",
          icon: 'success',
          duration:1500
        }); 
        //发送请求
        var readurl = app.globalData.DoBaseUrl +"readAward.html?memberId="+ memberId;
        wx.request({
          url: readurl,
          method: 'GET',
          header: {
          "Content-Type": "json"
          },
          success:function(res){
            console.log(res);
          }
        })
        //设置flag
        this.setData({
          flag:false
        }) 
    }
   }

   
    
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    console.log(this.data.loadingtime)
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
   // clearInterval(timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
     clearInterval(this.data.loadingtime)
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
