// pages/Release-details/Release-details.js
var app = getApp();
 
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tarbar:{},
    releaseFocus: true,
    images:[],
    focus:false,
    cooperation:[],
    showView: false,
    collStatus:false,
    collNums:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    app.editTabbar();
    var that = this;
    var coopurl = app.globalData.DoBaseUrl + "cooperationList.html"
    wx.request({
      url: coopurl,
      method: 'GET', 
      header: {
        "Content-Type": "json"
      },
      success: function(res){
        console.log(res);
        that.setData({
          cooperation:res.data.cooperationList
         
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  /*跳到内页 */
  onTocoopDetail(e){
    //console.log(e.currentTarget.dataset)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/others/coop-detail/coop-detail?id='+ id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  // 图片预览
  previewImage: function (e) { 
    var current = e.target.dataset.src; 
    wx.previewImage({
      current: current,
      urls: this.data.images
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //this.getCooInfo();
  },
  getCooInfo:function(){
    var that = this;
    var memberId = wx.getStorageSync('memberId');
    var url = app.globalData.DoBaseUrl + "cooInfo.html?memberId="+ memberId;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res)
        console.log(132123)
        //var collStatus = res.data.cooperation.collStatus;
        //console.log(collStatus)
       var memberId = wx.getStorageSync('memberId');
        var _memberId = res.data.cooperation.memberId;
        if (memberId == _memberId) {
          that.setData({
            show: false
          })
        } else {
          that.setData({
            show: true
          })
        }
        that.setData({
          cooperation: res.data.cooperation,
          collStatus: collStatus,
          commList: res.data.commList,
          images: res.data.cooperation.imgList
        })
      }
    })
  },
  //搜索关键词
  formSubmit: function (e) {  
    var that = this;
    var content = e.detail.value.content;
    if (content==''){
      wx.showToast({
        title: '评论不能为空',
        icon: 'none'
      })
      return;
    }
    var memberId = wx.getStorageSync("memberId");
    var cooperationId =id;





    var data = { "content": content, "memberId": memberId, "cooperationId": cooperationId};
    wx.request({
      url:app.globalData.DoBaseUrl + "phoneVerification.html?memberId=" + memberId,
      method:"GET",
      header: {
        "Content-Type": "json"
      },
      success:function(res){
        if(res.data.flag=="true"){
          wx.request({
            url: app.globalData.DoBaseUrl + "addCommecnt.html",
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            data:data,
            header: {
              "Content-Type": "json"
            },
            success: function (res) {
              var url = app.globalData.DoBaseUrl + "cooInfo.html?id=" + cooperationId + "&memberId=" + memberId;
              wx.request({
                url: url,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                  "Content-Type": "json"
                },
                success: function (res) {
                 wx.showToast({
                   title: '评论成功',
                   icon: 'success'
                 })
                  that.setData({
                    cooperation: res.data.cooperation,
                    commList: res.data.commList,
                    contants:""
                  })
                }
              })
            }
          })
        }else{
          wx.showToast({
            title: '未绑定手机号',
            icon: 'none',
            image:"../../../images/gantan.png",
            duration: 2000
          })
        }
        // 
      }
    })
  },
  //收藏
  collect:function(e){
    console.log(e.currentTarget.dataset.i);
    var id = e.currentTarget.dataset.i;
    this.setData({
      colid:id
    })
    if(this.data.collStatus){
      this.setData({
        collStatus:false,
        collNums:0
      })
    }else{
      this.setData({
        collStatus:true,
        collNums:1
      })
    }

    /*var that=this;
    // debugger;
    var collStatus = this.data.collStatus;//收藏状态 
    if (collStatus==0){
      that.setData({
        collStatus:1
      })
      collStatus=1
    }else{
      that.setData({
        collStatus: 0
      })
      collStatus = 1
    }
    var memberId = wx.getStorageSync('memberId');
    var url = app.globalData.DoBaseUrl + "addCollection.html?memberId=" + memberId + "&status=" + collStatus +"&objectId="+id;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success:function(res){
        that.getCooInfo();
      }
    })*/
  },
  //悬浮框点击事件
  onChangeShowState:function (e) {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    });
  },
  //悬浮框跳转
  navToXF:function(e){
      var key = e.currentTarget.dataset.key;
      wx.navigateTo({
        url: "/pages/others/release/release?key=" + key
      })
  },
  //跳转到会员充值
  navToHY:function(){
    wx.navigateTo({
      url: "../../../pages/person/member/member"
    });
  },
  //点赞
  addZan:function(e) {
    console.log(e.currentTarget.dataset.i);
    var id = e.currentTarget.dataset.i;
    var that = this;
    // debugger;
    var memberId = wx.getStorageSync("memberId");
    // var cooperationId = id;
    var url = app.globalData.DoBaseUrl + "addZan.html";
    var data = {"memberId": memberId, "cooperationId": id };
    wx.request({
      url: url,
      data: data,
      method: 'GET', 
      header: {
        "Content-Type": "json"
      },
      success: function (res) { 
        that.getCooInfo();
      }
      
    })
  },
  callPhone:function(){
    var phoneNumber = this.data.cooperation.phone
    wx.makePhoneCall({
      phoneNumber: phoneNumber
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
  /**/
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