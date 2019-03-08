//index.js
//获取应用实例
const app = getApp();
var newurl="";
var brandId="";
var city="";
var _page = 1;
var title="";
var flag = true;
var keyword='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 2000,
    index: 0,
    array: ['品 牌', '腾讯', '百度', '阿里巴巴'],
    region: ['地 区', '', ''],
    customItem: '',
    showView: false,
    cooperationList:[],
    loading:'正在加载中...',
    userSearch: '',
    animate: "animate seven",
    texts: "",
    textList: [" 支付牌照查询", "收单机构号", "地区代码", "POS品牌（黑名单）", "MCC查询", "POS返回码查询", "支付术语表", "卡BIN查询", "联行号查询", "支付机构罚单", "认证外包商", "法规条文查询", "跨境外汇牌照", "基金支付牌照清单", "协会会员名单"]
  },
  // 地区
  bindRegionChange: function (e) {
    var city = e.detail.value[1] + e.detail.value[2]
    wx.reLaunch({
      url: "../cooperation/cooperation?city=" + city
    });
    this.setData({
      region: e.detail.value
    })
  },
  // 品牌
  //事件处理函数
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面 
    var index = e.detail.value;
    var brandList = this.data.brandList; 
    var brandId = brandList[index].id;
    wx.reLaunch({
      url: "../cooperation/cooperation?brandId=" + brandId
    });
    this.setData({
      index: e.detail.value
    });
  },
  //获取品牌列表
  getBrandInfoList:function(){
    var that=this;
    var url = app.globalData.DoBaseUrl +"brandInfoList.html"
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success:function(res){
        that.setData({
          brandList: res.data.brandList
        })
      }
    })
  },
  //跳转到会员充值
  navToHY:function(){
    wx.navigateTo({
      url: "../../../pages/person/member/member"
    });
  },
  onLoad: function (options) {
    app.editTabbar();
    //隐藏tabbar
    wx.hideTabBar();
    
    this.changeTextAnimation();
    var that = this;
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    if (options != null) {
      if (options.parentId != null && options.patentId != '') {
        wx.setStorageSync("parentId", options.parentId);
      }
    }
    showView: (options.showView == "true" ? true : false)
  },
  changeTextAnimation() {
    this.setData({
      animate: "animate"
    })

    let showTime = 0;
    let texts = this.data.textList[Math.max((this.data.textList.indexOf(this.data.texts) + 1) % this.data.textList.length, 0)];
    setTimeout(() => {
      this.setData({
        texts: texts,
        animate: "animate seven"
      });
    }, showTime);
    setTimeout(() => {
      this.changeTextAnimation();
    }, texts.length * 0.5 * 1000/*动画执行时间*/ + showTime/*文本显示时间*/)
  },
  onChangeShowState:function (e) {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //悬浮框跳转
  navToXF:function(e){
      var key = e.currentTarget.dataset.key;
      wx.navigateTo({
        url: "/pages/others/release/release?key=" + key
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 
    var latitude = wx.getStorageSync("latitude");
    var longitude = wx.getStorageSync("longitude");
    var memberId = wx.getStorageSync("memberId");
    if (latitude == 0) {
      latitude = "";
    }
    if (longitude == 0) {
      longitude = "";
    }
    var page = this
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo?key=685eaed494c2c35cbdc670638cbd7852&location=' + longitude + ',' + latitude + '&radius=1000&extensions=all&batch=false&roadlevel=0',
      //url: 'https://api.map.baidu.com/geocoder/v2/?ak=fdb5AkyHYq8jatOFPexoI2eBYrNptfth&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) { 
        if (res.data.status == '0') {
          page.setData({ currentCity: "获取定位失败" }); 
          flag = true;
          _page = 1;
          var groomUrl = app.globalData.DoBaseUrl + "cooperationInfoList.html?province=" + province + "&city=" + city + "&memberId=" + memberId + "&p="; 
          page.getGroomListData(groomUrl, 2, 1);
          page.getBusinessCardList();
          page.getBrandInfoList();

          return;
        }
       var province= res.data.regeocode.addressComponent.province;
        var city = res.data.regeocode.addressComponent.city; 

        page.setData({ locations: province + city});
        flag = true;
        _page = 1;
        var groomUrl = app.globalData.DoBaseUrl + "cooperationInfoList.html?province=" + province + "&city=" + city + "&memberId=" + memberId + "&p="; 
        page.getGroomListData(groomUrl, 2, 1);
        page.getBusinessCardList();
        page.getBrandInfoList();
      },
      fail: function () {
        page.setData({ currentCity: "获取定位失败" });
      },

    })


 
  },
  //发布详情
  navToFb:function(e){
     var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/others/Release-details/Release-details?id=" + id
    })
  },
  getGroomListData: function (url, num, page) {
    var that = this;
    newurl = url;
    wx.request({
      url: url + page,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) { 
        if (res.data.errorCode=="00014"){
          flag = false;
          wx.hideNavigationBarLoading();
          that.setData({
            loading: "数据全部加载完毕",
            isLoading: false
          })
          return;
        }
        if (num == 1) {
          var l = that.data.cooperationList;
          for (var i = 0; i < res.data.cooperationList.length; i++) {
            l.push(res.data.cooperationList[i]);
          }
          that.setData({
            cooperationList: l
          });
          if (res.data.cooperationList.length >0) {
            wx.showNavigationBarLoading();
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
            cooperationList: res.data.cooperationList
          });
        }
      }
    })
  },
  //轮播名片
  getBusinessCardList(){
    var that=this;
    var cardUrl = app.globalData.DoBaseUrl +"businessCardList.html";
    wx.request({
      url: cardUrl,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success:function(res){ 
        console.log("名片");
        console.log(res);
        that.setData({
          businessCardList: res.data.businessCardList,
          navigationList: res.data.navigationList,
          listString: res.data.listString
        })
      }
    })
  },
  navToUrl:function(e){
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },
  //搜索关键词
  searchProduct:function(e){
    var keyword = e.detail.value;
    wx.reLaunch({
      url: "../../../pages/tabbar/cooperation/cooperation?keyword=" + keyword
    })
    this.setData({
      userSearch:''
    })
  },
  navToCardUrl:function(e){
    var id = e.currentTarget.dataset.id;
    var relName = e.currentTarget.dataset.relname;
    wx.navigateTo({
      url: "/pages/others/carddetails/carddetails?id=" + id + "&relName=" + relName
    })
  },
  ontoCardd(){
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
    var that = this;
    // 页数+1
    _page = _page + 1;
    var url = newurl;
  if(flag){
      that.getGroomListData(url, 1, _page)
    }
  wx.stopPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
//动画事件
function animationEvents(that, moveY, show) { 
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  }
  )
  that.animation.translateY(moveY + 'vh').step()

  that.setData({
    animation: that.animation.export(),
    show: show
  })

}
// ---------------- 分割线 ---------------- 

//获取省份数据
function getProvinceData(that) {
  var s;
  provinces = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    s = areaInfo[i];
    if (s.di == "00" && s.xian == "00") {
      provinces[num] = s;
      num++;
    }
  }
  that.setData({
    provinces: provinces
  })
  //初始化调一次
  getCityArr(0, that);
  getCountyInfo(0, 0, that);
  that.setData({
    province: "北京市",
    city: "市辖区",
    county: "东城区",
  })
}
// 获取地级市数据
function getCityArr(count, that) {
  var c;
  citys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
      citys[num] = c;
      num++;
    }
  }
  if (citys.length == 0) {
    citys[0] = { name: '' };
  }

  that.setData({
    city: "",
    citys: citys,
    value: [count, 0, 0]
  })
}

// 获取区县数据
function getCountyInfo(column0, column1, that) {
  var c;
  countys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
      countys[num] = c;
      num++;
    }
  }
  if (countys.length == 0) {
    countys[0] = { name: '' };
  }
  that.setData({
    county: "",
    countys: countys,
    value: [column0, column1, 0]
  })
}