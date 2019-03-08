// pages/Payment-list/Payment-list.js
var app=getApp();
var newurl;
var _page=1;
var flag=true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paypaizhaoList:[],
    isLoading:true,
    loading:"正在加载中..."
  },


  /**
   * 生命周期函数--监听页面加载
   */
  //跳转到详情页
  navTodetails:function(e){
    var id = e.currentTarget.dataset.id
     wx.navigateTo({
       url: '../License-details/License-details?id='+id,
     })
  },
  onLoad: function (options) {
    // debugger;
    var that =this;
    var guanjian = options.guanjian;
    var PC = options.pici;
    var customItem = options.customItem;
    var yewu = options.yewu;
    var province = options.province;
    var status = options.status;
    if (status==2){
      wx.setNavigationBarTitle({
        title: '已注销支付机构名单',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '支付机构名单',
      })
    }
    var url = app.globalData.DoBaseUrl + 'paypaizhaoList.html?key=' + guanjian + "&okProvince=" + customItem + "&province=" + province + "&businesType=" + yewu + "&type=" + PC + "&status=" + status+ "&p=" 
    this.getPaymentList(url, 2, 1) 
  },
  getPaymentList: function (url, num, page) {
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
          var l = that.data.paypaizhaoList;
          for (var i = 0; i < res.data.paypaizhaoList.length; i++) {
            l.push(res.data.paypaizhaoList[i]);
          }
          that.setData({
            paypaizhaoList: l
          });
        if (res.data.paypaizhaoList.length>0){
            wx.showNavigationBarLoading();
            that.setData({
              isLoading: true
            })      
        }else{
            flag=false;
            wx.hideNavigationBarLoading();
            that.setData({
              loading:"数据全部加载完毕",
              isLoading: false
            })
        }    
        }
        if (num == 2) {
          that.setData({
            paypaizhaoList: res.data.paypaizhaoList
          });
        }
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
    _page = 1;
    flag = true;
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
    var that = this;
    that.setData({
      isLoading:false
    })
    var that = this;
    // 页数+1  
    _page = _page + 1;
    var url = newurl;
    if(flag){
   this.getPaymentList(url, 1, _page);
}
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})