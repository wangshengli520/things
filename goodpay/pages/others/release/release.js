// pages/release/release.js
var app=getApp();
var city="";//城市
var title = "";//标题
var brandId = "";//品牌
var postId = "";//机构
var month=0;//选择的月份 
var isWay="";
var images = "";
var imagesLength = 0;
var _page=1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showViews:false,
    flags:false,
    Province:'',
    brandList: [],
    index: 0,
    imagesLength:0,
    initHeight:'300',
    postList: [],
    home: 0,
    flag:true,
    serviceTime:"天",
    dateList: [],
    showProvince:true,
    suffix:1,
    region: "vip会员及曝光发布可进行多选",
    customItem: '',
    modeList: [{ name: "免费发布", key: 3}, { name: "我要置顶", key: 0 }, { name: "我要曝光", key:1}],
    _key:3,
    text: "请选择",
    items: [
      {name: "1",value: "北京市" },
      {name: "2",value: "天津市" },
      {name: "3",value: "河北省" },
      {name: "4",value: "山西省" },
      {name: "5",value: "内蒙古自治区" },
      {name: "6",value: "辽宁省" },
      {name: "7",value: "吉林省" },
      {name: "8",value: "黑龙江省" },
      {name: "9",value: "上海市" },
      {name: "10",value: "江苏省" },
      {name: "11",value: "浙江省" },
      {name: "12",value: "安徽省" },
      {name: "13",value: "福建省" },
      {name: "14",value: "江西省" },
      {name: "15",value: "山东省" },
      {name: "16",value: "河南省" },
      {name: "17",value: "湖北省" },
      {name: "18",value: "湖南省" },
      {name: "19",value: "广东省" },
      {name: "20",value: "广西壮族自治区" },
      {name: "21",value: "海南省" },
      {name: "22",value: "重庆市" },
      {name: "23",value: "四川省" },
      {name: "24",value: "贵州省" },
      {name: "25",value: "云南省" },
      {name: "26",value: "西藏自治区" },
      {name: "27",value: "陕西省" },
      {name: "28",value: "甘肃省" },
      {name: "29",value: "青海省" },
      {name: "30",value: "宁夏回族自治区" },
      {name: "31",value: "新疆维吾尔自治区" }
    ],
    images: [],
    uploadedImages: [],
    //imageWidth: getApp().screenWidth / 4 - 10

  },


  chooseImage: function () {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths; 
       

        wx.showToast({
          icon: "loading",
          title: "正在上传"
        }),
          wx.uploadFile({
            url: app.globalData.DoBaseUrl + "uploads/upload.html",
            filePath: tempFilePaths[0],
            name: 'file',
            header: { "Content-Type": "multipart/form-data" },
            formData: {
              //和服务器约定的token, 一般也可以放在header中
              "resource": "MEMBER_PATH"
            },
            success: function (res) { 
              var jsonObj = JSON.parse(res.data); 
              images = jsonObj.images + "," + images;
            },
            fail: function (e) { 
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
            },
            complete: function () {
              wx.hideToast(); //隐藏Toast
            }
          })
       
        imagesLength = that.data.images.length;
        if(imagesLength==2){
          that.setData({
            initHeight: "600"
          });
        }
        if (imagesLength == 5) {
          that.setData({
            initHeight: "900"
          });
        }
        that.setData({
          images: that.data.images.concat(tempFilePaths),
          imagesLength: imagesLength
        });
      }
    })
  },
  // 图片预览
  previewImage: function (e) { 
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.images
    })
  },
  // submit: function () {        
  //   // 提交图片，事先遍历图集数组
  //   that.data.images.forEach(function (tempFilePath) {
  //     new AV.File('file-name', {
  //       blob: {
  //         uri: tempFilePath,
  //       },
  //     }).save().then(                
  //       // file => console.log(file.url())
  //     function (file) {                    
  //       // 先读取
  //       var uploadedImages = that.data.uploadedImages;
  //       uploadedImages.push(file.url());                    
  //       // 再写入
  //       that.setData({
  //         uploadedImages: uploadedImages
  //       }); console.log(uploadedImages);
  //     }
  //     ).catch(console.error);
  //   });
  //   wx.showToast({
  //     title: '评价成功', success: function () {
  //       wx.navigateBack();
  //     }
  //   });
  // }, 
  delete: function (e) {
    var index = e.currentTarget.dataset.index; 
    var images = this.data.images;
    images.splice(index, 1);
    that.setData({
      images: images
    });
  },
  //设置checbox最多被选中三个  
  checkboxChange: function (e) {
    var that = this;
    var skin = e.detail.value
    //新建数组全部设置为没被选中  
    var new_itmes = [
      { name: "1", value: "北京市" },
      { name: "2", value: "天津市" },
      { name: "3", value: "河北省" },
      { name: "4", value: "山西省" },
      { name: "5", value: "内蒙古自治区" },
      { name: "6", value: "辽宁省" },
      { name: "7", value: "吉林省" },
      { name: "8", value: "黑龙江省" },
      { name: "9", value: "上海市" },
      { name: "10", value: "江苏省" },
      { name: "11", value: "浙江省" },
      { name: "12", value: "安徽省" },
      { name: "13", value: "福建省" },
      { name: "14", value: "江西省" },
      { name: "15", value: "山东省" },
      { name: "16", value: "河南省" },
      { name: "17", value: "湖北省" },
      { name: "18", value: "湖南省" },
      { name: "19", value: "广东省" },
      { name: "20", value: "广西壮族自治区" },
      { name: "21", value: "海南省" },
      { name: "22", value: "重庆市" },
      { name: "23", value: "四川省" },
      { name: "24", value: "贵州省" },
      { name: "25", value: "云南省" },
      { name: "26", value: "西藏自治区" },
      { name: "27", value: "陕西省" },
      { name: "28", value: "甘肃省" },
      { name: "29", value: "青海省" },
      { name: "30", value: "宁夏回族自治区" },
      { name: "31", value: "新疆维吾尔自治区" }
    ]
    if (skin.length > 3) {
      //取出倒数三个值  
      var key1 = skin[skin.length - 1];
      var key2 = skin[skin.length - 2];
      var key3 = skin[skin.length - 3];
      //设置最后三个值为选中状态  
      new_itmes[key1 - 1]['checked'] = 'true'
      new_itmes[key2 - 1]['checked'] = 'true'
      new_itmes[key3 - 1]['checked'] = 'true'

      //删除被选中的第一个值  
      skin.splice(0, 1);
    } else {
      //被选中少于三个，直接设置被选中  
      for (var i = 0; i < skin.length; i++) {
        var key = skin[i]
        new_itmes[key - 1]['checked'] = 'true'
      }
    }
    //拼接文字显示  
    var text = [];
    for (var i = 0; i < skin.length; i++) {
      var key = skin[i]
      text[i] = that.data.items[key - 1]['value']
    }
    city = text.join("、");
    text = text.join("、");
    //存入  
    that.setData({
      skin: skin,
      text: text,
      items: new_itmes
    })
  }  
,
  bindRegionChange: function (e) {
    console.log(e)
    city = e.detail.value[0]+e.detail.value[1] + e.detail.value[2] 
    this.setData({
      region: e.detail.value
    })
  },
  //选择品牌
  listenerPickerSelected: function (e) {
    
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
    var brandList = this.data.brandList;
    var index = e.detail.value;
    brandId = brandList[index].id;
  },
  //选择机构 
  institutionsPickerSelected: function (e) {
    this.setData({
      home: e.detail.value
    });
    var postList = this.data.postList;
    var index = e.detail.value;
    postId = postList[index].id;
  },
  release:function(e){ 
      var title = e.detail.value.title;
      if (title== '') {
        wx.showToast({
          title: '请输入标题',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      if (city == '') {
        wx.showToast({
          title: '请选择地区',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      if (postId == '' || postId==0) {
        wx.showToast({
          title: '请选择机构',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      if (brandId == '' || brandId == 0) {
        wx.showToast({
          title: '请选择品牌',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      var article = e.detail.value.textarea;
      if (article == '') {
        wx.showToast({
          title: '请输入描述内容',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      if (isWay == 0 || isWay == 1){
        if(month==0){
          wx.showToast({
            title: '请选择服务时长',
            icon: 'none',
            duration: 2000
          })
          return;
        }
      }


      var memberId = wx.getStorageSync('memberId');
    var FbUrl = app.globalData.DoBaseUrl + "addCooperation.html?memberId=" + memberId + "&title=" + title + "&city=" + city + "&brandId=" + brandId + "&postId=" + postId + "&article=" + article + "&isWay=" + isWay + "&month=" + month + "&images=" + images; 

      var that =this;
      wx.request({
        url:app.globalData.DoBaseUrl + "phoneVerification.html?memberId=" + memberId,
        method:"GET",
        header: {
          "Content-Type": "json"
        },
        success:function(res){
          if(res.data.flag=="true"){
            wx.request({
              url: FbUrl,
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                "Content-Type": "json"
              },
              success: function (res) { 
      
                if (isWay=='3'){
                  wx.showToast({
                    title: '发布成功',
                    icon: 'success',
                    duration: 2000
                  })
                  setTimeout(function () {
                    wx.navigateTo({
                      url: "../../../pages/person/I-release/I-release"
                    })
                  }, 2000)
                  return;
                  }
      
                wx.request({
                  url: app.globalData.DoBaseUrl + 'doCooOrder.html',
                  data: {
                    'openid': wx.getStorageSync('openid'),
                    "orderNo":res.data.orderNo
                  },
                  method: 'POST',
                  header: {
                    "content-type": 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    //  调用支付
                    wx.requestPayment({
                      timeStamp: res.data.timeStamp,
                      nonceStr: res.data.nonceStr,
                      package: res.data.package,
                      signType: res.data.signType,
                      paySign: res.data.paySign,
                      success: function (res) {
                        if (res.data.success) {
                          wx.showToast({
                            title: '发布成功',
                            icon: 'success',
                            duration: 2000
                          })
                          setTimeout(function () {
                            wx.navigateTo({
                              url: "../../../pages/person/I-release/I-release"
                            })
                          }, 2000)
                        } else {
                          wx.showToast({
                            title: '发布失败重新发布',
                            icon: 'none',
                            duration: 2000
                          })
                        }
                      },
                      fail: function (res) {
      
                      }
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
       
        }
      });
      

  },
  showProvince:function(){
    this.setData({
      flag: false
    }) 
  },
  bindProvince:function(){
    this.setData({
      flag: true
    }) 
  },
  radio: function (e) { 
    month = 0
    var that=this;
    isWay = e.currentTarget.dataset.id;
    console.log(isWay)
    var key = e.currentTarget.dataset.id; 
    that.setData({
      key: e.currentTarget.dataset.id
    })
    if (key == 0 || key ==1){
      that.setData({
        suffix:1
      }) 
      if (key==1){
        that.setData({
          showProvince: false,
          isplace:true,
          serviceTime:"周",
          money:500
        }) 
      }else{
        that.setData({
          showProvince: true,
          isplace: false,
          serviceTime:"天",
          money:1000
        }) 
      }
      var memberId = wx.getStorageSync('memberId');
      var releaseUrl = app.globalData.DoBaseUrl + "releaseCooperation.html?memberId=" + memberId + "&isWay=" + isWay;
      wx.request({
        url: releaseUrl,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          console.log(res)
          that.setData({
            postList: res.data.postList,
            brandList: res.data.brandList,
            dateList: res.data.topList
          })
        }
      })
    }else{
      that.setData({
        showProvince: true,
        isplace: false
      }) 
    }
  },
  //选择月份
  bindDateChange: function (e) { 
    var that=this;
    that.setData({
      suffix: e.detail.value
    })
    var index = e.detail.value;
    var dateList = this.data.dateList;
    month = dateList[index].month;
    if(index==0){
      that.setData({
        money:0
      }) 
    }else{
      var memberId = wx.getStorageSync("memberId");
      var releaseUrl = app.globalData.DoBaseUrl + "releaseCooperation.html?isWay=" + isWay + "&month=" + month + "&memberId=" + memberId;
      wx.request({
        url: releaseUrl,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success: function (res) { 
          that.setData({
            money: res.data.top.money
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this;
   var objectId = options.objectId; 
    var _key = options.key;
    var key = options.key; 
    isWay = _key;
    this.setData({
      _key: _key,
      key: key
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获取省份
    var that=this;
    wx.getLocation({ //没有特别说明的都是固定写法
      type: 'wgs84',
      success: function (res) {
        console.log('location', res);
        var locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: 'http://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            "key": "3KQBZ-UPFWP-IGDDH-LP4OP-XM4C3-2KBBB",
            "location": locationString
          },
          method: 'GET',
          success: function (r) {
            //输出一下位置信息
            that.setData({
              Province: r.data.result.address_component.province
            })
          }
        });
      }
    });
    //判断是否是会员
    var that = this;
    var memberId = wx.getStorageSync("memberId");
    var url = app.globalData.DoBaseUrl + "businessCardById.html?memberId="+memberId;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) { 
        console.log(res.data.businessCard.memberId)
        if(res.data.businessCard.memberId){
          that.setData({
            flags:false
          })
        }else{
          that.setData({
            flags:true
          })
        }
      },
      fail: function (error) {
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    var memberId = wx.getStorageSync('memberId');
    var releaseUrl = app.globalData.DoBaseUrl + "releaseCooperation.html?memberId=" + memberId;
    that.getInfoList(releaseUrl)
  },
  getInfoList:function(url){
    var that=this;
    wx.request({
      url: url ,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) { 
        console.log(res);
        that.setData({
          postList: res.data.postList,
          brandList: res.data.brandList
        })
      }
    })
  },
  onreIsvip(){
    console.log(this.data.flags)
    if(this.data.flags){
      wx.showToast({
        title: '您不是会员',
        icon: 'none',
        duration: 2000
      })
    }
  },
  notesTovip(){
    //console.log("跳到vip");
    wx.navigateTo({
      url: '/pages/person/memberJM/memberJM'
    })
  },
  notesBao(){
    var that=this;
    that.setData({
      showViews:true
    })
  },
  notesCha(){
    var that=this;
    that.setData({
      showViews:false
    })
  },
  Notesewm(){
    wx.saveImageToPhotosAlbum({
      filePath: "../../../images/notes-bao.jpg",
      success(result) {
        console.log(result)
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
  onReachBottom: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})


function upload(page, path) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
    wx.uploadFile({
      url: app.globalData.DoBaseUrl + "uploads/upload.html",
      filePath: path[0],
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        "resource": "MEMBER_PATH"
      },
      success: function (res) { 
        var jsonObj = JSON.parse(res.data); 
        upload = jsonObj.images;
      },
      fail: function (e) { 
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast(); //隐藏Toast
      }
    })
}