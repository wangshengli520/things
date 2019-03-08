// pages/mycard/mycard.js
var app = getApp();
var imagesLength = 0;
var images = "";
var videos = "";
var statu = "";
var id = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    initHeight: '300',
    initImgHeight: '400',
    images: [],
    uploadedImages: [],
    companyAddress: "",
    headImg: wx.getStorageSync("photo")
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(options.id !=null && options.id !=''){
        id = options.id;
      }
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
    var that = this; 
    var memberId=wx.getStorageSync('memberId')
    var url = app.globalData.DoBaseUrl + "businessCardCheckId.html?id=" + id + "&memberId=" + memberId;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res);
        if (res.data.businessCard.url != '') {
          that.setData({
            videoshow: true
          });
          videos = res.data.businessCard.headImgUrl;
        }
        if (res.data.businessCard.imgList.length > 0) {
          images = res.data.businessCard.photo;
          that.setData({
            imgshow: true,
            images: res.data.businessCard.imgList,
            imagesLength: res.data.businessCard.imgList.length
          });
        }

        that.setData({
          businessCard: res.data.businessCard,
        });
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },
  onTocardd(){
    console.log("名片夹详情");
    wx.navigateTo({
      url: '/pages/others/carddetailsd/carddetailsd'
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