// pages/My-collection/My-collection.js
var app = getApp();
var newurl = "";
var _page = 1;
var status = "0";
var flag=true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ["名片", "发布"],
    currentNavbar: '0',
    collectionList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  swichNav(e) {
    _page=1;
    flag=true;
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    var memberId = wx.getStorageSync('memberId');
    status = e.currentTarget.dataset.idx;
    var collentionListUrl = app.globalData.DoBaseUrl + "collentionList.html?memberId=" + memberId + "&status=" + status + "&p=";
    this.getcollentionList(collentionListUrl, 2, 1)   
  },
  delRows:function(e){
    var that=this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    let collectionList = this.data.collectionList;
    collectionList.splice(index, 1);
    wx.showModal({
      title: '提示',
      content: '你确定删除该收藏吗？',
      success: function (res) {
        if (res.confirm) {
          var url = app.globalData.DoBaseUrl + "delCollection.html?id=" + id;
          wx.request({
            url: url,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              "Content-Type": "json"
            },
            success: function (res) {
              if (res.data.success) {
                wx.showToast({
                  title: '删除成功!',
                  icon: 'success',
                  duration: 2000
                })
                var memberId = wx.getStorageSync('memberId');
                var collentionListUrl = app.globalData.DoBaseUrl + "collentionList.html?memberId=" + memberId + "&status=" + status + "&p=";
                that.getcollentionList(collentionListUrl, 2, 1)
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  navToCardUrl: function (e) { 
    var id = e.currentTarget.dataset.objectid;
    var relName = e.currentTarget.dataset.relname;
    wx.navigateTo({
      url: "../carddetails/carddetails?id=" + id + "&relName=" + relName
    })
  },
  //发布详情
  navToFb: function (e) {
    var id = e.currentTarget.dataset.objectid;
    wx.navigateTo({
      url: "../Release-details/Release-details?id=" + id
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
    status=0;
    flag = true;
    // _page = 1;
    var memberId = wx.getStorageSync('memberId');
    var collentionListUrl = app.globalData.DoBaseUrl + "collentionList.html?memberId=" + memberId + "&status=" + status+ "&p=";
    this.getcollentionList(collentionListUrl, 2, 1)
  },
  getcollentionList: function (url, num, page) {
    var that = this;
    newurl = url;
    wx.request({
      url: url + page,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) { 
        console.log(res);
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
          var l = that.data.collectionList;
          for (var i = 0; i < res.data.collectionList.length; i++) {
            l.push(res.data.collectionList[i]);
          }
          that.setData({
            collectionList: l
          });
          if (res.data.collectionList.length > 0) {
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
          that.setData({
            collectionList: res.data.collectionList
          });
        }
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
  pullUpLoad(){
    _page++; 
    var memberId = wx.getStorageSync('memberId');
    var collentionListUrl = app.globalData.DoBaseUrl + "collentionList.html?memberId=" + memberId + "&status=" + status + "&p=";
    if(flag){
    this.getcollentionList(collentionListUrl, 1, _page)
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})