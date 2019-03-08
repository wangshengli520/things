// pages/posCode/posCode.js
var app=getApp();
var isShow=true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  POS:'',
  flag:true,
  poscodeList:''
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
  //输入pos码
  posInput:function(e){
   var pos=e.detail.value
   this.setData({
     POS:pos
   })
  },
//根据搜索查询
  searchPos:function(){
  var that=this;
  var pos=that.data.POS;
  that.setData({
    poscodeList:'',
    flag: true
  })
  if(pos==''){
   wx.showToast({
     title: '请输入Pos的返回码',
     icon:'none',
     duration: 2000
   })
   return
  }else{
        console.log(pos)
        var url = app.globalData.DoBaseUrl + 'posBackCode.html?posCode='+pos
        wx.request({
          url: url,
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "Content-Type": "json"
          },
          success: function (res) {
            var poscodeList = res.data.poscodeList;
            if (poscodeList.length==0){
              wx.showToast({
                title: '查不到该返回码信息',
                icon: 'none',
                duration: 2000
              })
            }else{
              that.setData({
                poscodeList: res.data.poscodeList,
                flag:false
              })
            }
          }
        })
      }
  
  
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