// pages/others/carddetailsd/carddetailsd.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessCard:{},
    width:0,
    height:0
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
    var that = this;
    wx.getSystemInfo({
        //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
        success: function (res) {
            console.log(res)
            that.width = res.windowWidth
            that.height = res.windowHeight
            that.radius = 105 / 602 * that.height
        }
    });
    
    var context = wx.createCanvasContext('share');
    context.setFillStyle('#fff')
    context.fillRect(0, 0, that.width,400 )  
    context.stroke() 
    context.setFillStyle('#000')
    context.setFontSize(16)
    context.fillText('王胜利', 30, 45)
    context.fillText('客户经理',100, 45) 
    context.setFillStyle('#f59210')
    context.setFontSize(20)
    context.fillText('支付好帮手',250, 45)
    context.setFillStyle('#000')
    context.setFontSize(16)
    context.fillText('瑞银支付公司',100, 100)
    context.setFillStyle('#757575')
    context.fillText('Tel:555555555',100,120)
    context.fillText('mail:fuwu@qq.com',100,140)
    context.fillText('微信：exbonll',100,160)
    context.fillText('官方网址：www.zfhak.com',100,180)
    context.draw(false, this.getTempFilePath);  
    //**** */
   // var bgImgPath = that.data.shareImgSrc;
    //这里是把页面上的数据写入到画布里，具体的坐标需要各位自行调整
    // ctx.drawImage(bgImgPath, 0, 0, 375, 580);
    // ctx.drawImage(that.data.shareImgPath, 50, 450, 284, 80);
    // ctx.drawImage(that.data.imgurl, 146, 100, 100, 100);

  },
  //获取临时路径 
  getTempFilePath:function(){ 
    wx.canvasToTempFilePath({ 
      canvasId: 'share', 
      success: (res) => { 
        this.setData({ 
          shareTempFilePath: res.tempFilePath 
        }) 
      } 
    }) 
  },
   //保存至相册 
   saveImageToPhotosAlbum:function(){ 
     if (!this.data.shareTempFilePath){ 
       wx.showModal({ 
         title: '提示', 
         content: '图片绘制中，请稍后重试', 
         showCancel:false 
        }) 
      } 
      wx.saveImageToPhotosAlbum({ 
        filePath: this.data.shareTempFilePath, 
        success:(res)=>{ 
          console.log(res) 
        }, 
        fail:(err)=>{ 
          console.log(err) 
        } 
      }) 
    },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this; 
    var url = app.globalData.DoBaseUrl + 'businessCardList.html';
    console.log(url)
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res);
        that.setData({
          businessCard: res.data.businessCardList,
        });
      },
      fail: function (error) {
        // fail
        console.log(error)
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