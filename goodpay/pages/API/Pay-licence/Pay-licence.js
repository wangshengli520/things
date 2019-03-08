// pages/Pay-licence/Pay-licence.js
var app=getApp();
var index=0;
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    items: [
      { name: '银行卡收单', value: '银行卡收单' },
      { name: '预付卡发行与受理', value: '预付卡发行与受理' },
      { name: '预付卡受理', value: '预付卡受理' },
      { name: '互联网支付', value: '互联网支付' },
      { name: '移动电话支付', value: '移动电话支付' },
      { name: '数字电视支付', value: '数字电视支付' },
      { name: '固定电话支付', value: '固定电话支付' },
      { name: '预付卡发行与受理(线上)', value: '预付卡发行与受理(线上)'},
     
    ],
    demo: ['不限', '第一批:2021年5月', '第二批:2021年8月', '第三批:2021年12月', '第四批:2022年6月','第五批:2023年1月','第六批:2018年7月','第七批:2019年7月','第八批:2020年12月'],
    home:'',
    sercherStorage:[],
    index:0,
    multiIndex:'',
    multiArray: ['不限','北京', '安徽', "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "上海", "四川", "天津", "西藏", "新疆", "云南", "浙江", "重庆", "香港", "澳门", "台湾"],
    customItem: '',//许可地区
    province:'',//选择省份
    pici:'',//批次选择
    yewuList:'',//业务类型
    guanjianzi:'',//关键字
    show:true,
    isshow:true,
    clshow:true,
    storageData:[]
  },
  //选择省份
  bindChange:function(e){
    var that = this
    var province = that.data.multiArray[e.detail.value]
    that.setData({
      multiIndex: e.detail.value,
      province: province,
      show:false
    })
  },
  //输入关键字
  guanjianzi:function(e){
    var guanjian = e.detail.value
this.setData({
  guanjianzi:guanjian
})
  },
 
  //获取批次
  listenerPickerSelected: function (e) {
    var that = this
    var pici = that.data.demo[e.detail.value]
    this.setData({
      home: e.detail.value,
      pici:pici,
      isshow:false
    });
  }, 
  showdiqu:function(){
    var that=this;
    setTimeout(function(){
      that.setData({
        clshow: false
      })
    },2000)
    wx.navigateTo({
      url: '../Xuanzexukediqu/Xuanzexukediqu'
    })
  },
  deleteList:function(e){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //查询
  // customItem: '',//许可地区
  // province: '',//选择省份
  // pici: '',//批次选择
  // yewuList: '',//业务类型
  // guanjianzi: ''//关键字
  navToList:function(e){
    var status = e.currentTarget.dataset.status;
    var guanjian=this.data.guanjianzi;
    var storageData = this.data.storageData
    console.log(storageData)
    var pici=this.data.pici;
    var yewu=this.data.yewuList;
    var province=this.data.province;
    var customItem=[];
    for (var i = 0; i < storageData.length;i++){
      customItem.push(storageData[i].city)
    }
    console.log(customItem)
    wx.navigateTo({
      url: '../../../pages/API/Payment-list/Payment-list?guanjian=' + guanjian + "&customItem=" + customItem + "&pici=" + pici + "&yewu=" + yewu + "&province=" + province + "&status=" + status
    })
  },
  //选择业务类型
  checkboxChange: function (e) {
    var list=e.detail.value
    
    console.log('checkbox发生change事件，携带value值为：',list)
   this.setData({
     yewuList:list
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
    var storageData = this.data.storageData;
    var that=this;
    if (storageData == "undefined" || storageData == undefined || storageData.length==0){
      that.setData({
        QXZ: "请选择许可地区",
        isShowaa:true
      })
    }else{
      that.setData({
        isShowaa: false
      })
    }
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