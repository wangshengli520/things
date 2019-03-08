// pages/Xuanzexukediqu/Xuanzexukediqu.js
var citys=[];
var _index="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: [{ "city": "全国", "state": 0 }, { "city": "北京市", "state": 0 }, { "city": "天津市", "state": 0 }, { "city": "上海市", "state": 0 }, { "city": "重庆市", "state": 0 }, { "city": "河北市", "state": 0 }, { "city": "山西市", "state": 0 }, { "city": "内蒙古", "state": 0 }, { "city": "辽宁省", "state": 0 }, { "city": "吉林省", "state": 0 }, { "city": "黑龙江", "state": 0 }, { "city": "江苏省", "state": 0 }, { "city": "浙江省", "state": 0 }, { "city": "安徽省", "state": 0 }, { "city": "福建省", "state": 0 }, { "city": "山东省", "state": 0 }, { "city": "河南省", "state": 0 }, { "city": "湖北省", "state": 0 }, { "city": "湖南省", "state": 0 }, { "city": "广东省", "state": 0 }, { "city": "广西", "state": 0 }, { "city": "海南省", "state": 0 }, { "city": "四川省", "state": 0 }, { "city": "贵州省", "state": 0 }, { "city": "云南省", "state": 0 }, { "city": "西藏", "state": 0 }, { "city": "陕西省", "state": 0 }, { "city": "甘肃省", "state": 0 }, { "city": "青海省", "state": 0 }, { "city": "宁夏", "state": 0 }, { "city": "宁夏", "state": 0 }, { "city": "新疆", "state": 0 }, { "city": "深圳市", "state": 0 }, { "city": "大连市", "state": 0 }, { "city": "青岛市", "state": 0 }, { "city": "宁波市", "state": 0 }, { "city": "厦门市", "state": 0 }, { "city": "江西省", "state": 0  }],
    storageData:[]
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  deleteImage: function (e) {
    this.data.show=false;
    var that = this;
    var storageData = that.data.storageData;
    _index = e.currentTarget.dataset.index;//获取当前长按图片下标
    var areaList = that.data.areaList;
    for (var i = 0; i <areaList.length;i++){
      if (storageData[_index].city == areaList[i].city){
        storageData[_index].show=true
          that.setData({
            storageData: storageData
          }) 
      }
    }
  },
  deleteSelf:function(e){ 
    var that = this;
    var storageData = that.data.storageData;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    var areaList = that.data.areaList;
    for (var i = 0; i < areaList.length; i++) {
      if (storageData[_index].city == areaList[i].city) {
         areaList[i].state=0
      }
    }
    storageData.splice(index, 1);
    that.setData({
      storageData: storageData,
      areaList: areaList
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  //选择城市
  clickItem:function(e){

    var that=this;
    var index = e.currentTarget.dataset.id;//获取点击当前的地区的下标
    if (that.data.areaList[index].state == 1) {
      that.data.areaList[index].state = 0;

    } else if (that.data.areaList[index].state == 0) {
      that.data.areaList[index].state = 1;
    }
    that.setData({
      areaList: that.data.areaList,
    });
    var areaList = that.data.areaList
    var storageData=[];
    for (var i = 0; i < areaList.length;i++){
      if (that.data.areaList[i].state==1){
            var obj = {};
            obj.city = that.data.areaList[i].city;
            storageData.push(obj);
      }
    }
    that.setData({
      storageData: storageData
    })
},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that=this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    if (that.data.storageData.length==0){
      prevPage.setData({
        QXZ: "undefined"
      }) 
    }else{
      prevPage.setData({
        storageData: that.data.storageData
      }) 
    }
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