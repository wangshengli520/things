// pages/mycard/mycard.js
var app = getApp();
var imagesLength = 0;
var images = "";
var videos = "";
var statu = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    initHeight: '300',
    initImgHeight:'400',
    images: [],
    uploadedImages: [],
    companyAddress:"",
    headImg: wx.getStorageSync("photo")
  },
  formInfoSubmit:function(e){
    //console.log(e)
    var memberId = wx.getStorageSync("memberId"); 

    var name = e.detail.value.name;
      if (name==''){
        wx.showToast({
          title: '请输入姓名',
          icon: 'none',
        })
        return;
    }


    var relName = e.detail.value.mail;
    if (relName==''){
        wx.showToast({
          title: '请输入邮箱',
          icon: 'none',
        })
        return;
    }
    var companyName =e.detail.value.companyname;
    if (companyName == '') {
      wx.showToast({
        title: '请输入公司名称',
        icon: 'none',
      })
      return;
    }
    var companyPhone = e.detail.value.phone;
    if (companyPhone == '') {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
      })
      return;
    }
    var phone = e.detail.value.weixin;
    if (phone == '') {
      wx.showToast({
        title: '请输入微信号码',
        icon: 'none',
      })
      return;
    }
    var remark = e.detail.value.remark;
    if (remark == '') {
      wx.showToast({
        title: '请输入您的职位',
        icon: 'none',
      })
      return;
    }
    var companyAddress = e.detail.value.companyAddress;
    if (companyAddress == '') {
      wx.showToast({
        title: '请输入您的地址',
        icon: 'none',
      })
      return;
    }
    var data = { "memberId": memberId, "relName": relName, "companyName": companyName, "companyPhone": companyPhone, "phone": phone, "remark": remark, "companyAddress": companyAddress,"name":name};

    var url = app.globalData.DoBaseUrl + 'updBusinessCard.html';
    this.updateMemberInfo(url,data);
  },
  formInfoSubmitOthers: function (e) {
    var url = "";
    var photo ="";
    var memberId = wx.getStorageSync("memberId");
    if (images!=''){
      photo = images;
    } 
    if (videos != '') {
      url = videos;
    }
    var status = statu;
    var companyDescription = e.detail.value.synopsis; 
    var data = { "memberId": memberId, "url": url, "photo": photo, "companyDescription": companyDescription, "status": status};
    var url = app.globalData.DoBaseUrl + 'updBusinessCard.html';
    this.updateMemberInfo(url, data);
  },
  //修改方法
  updateMemberInfo:function(url,data){
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data:data,
      header: {
        "Content-Type": "json"
      },
      success: function (res) { 
        wx.showToast({
          title: '名片修改成功',
        })
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },
  checkboxChange: function (e) {
    statu = e.detail.value[0];
    if (statu =='undefined'){
      statu = "0";
    }
  },
  onTocardd(){
    console.log("名片夹详情");
    wx.navigateTo({
      url: '/pages/others/carddetailsd/carddetailsd'
    })
  },
  /**
  * 打开本地视频
  */
  bindButtonTap: function () {
    var that = this
    //拍摄视频或从手机相册中选视频
    wx.chooseVideo({
      //album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
      sourceType: ['album', 'camera'],
      //拍摄视频最长拍摄时间，单位秒。最长支持60秒
      maxDuration: 60,
      //前置或者后置摄像头，默认为前后都有，即：['front', 'back']
      camera: ['front', 'back'],
      //接口调用成功，返回视频文件的临时文件路径，详见返回参数说明
      success: function (res) { 
        that.setData({
          src: res.tempFilePath,
          size: (res.size / (1024 * 1024)).toFixed(2),
          duration: res.duration,
          videoshow:true
        })
        console.log(res.duration+'时长')
        debugger;
        if (res.size <= 1024 * 1024 * 25 && res.duration<300){
          wx.showLoading({ title: '视频上传中' });
          wx.uploadFile({
            url: app.globalData.DoBaseUrl + "/uploads/upload.html?resource=BUSINESSCARD_PATH",
            method: 'POST',
            filePath: res.tempFilePath,
            header: {
              'content-type': 'multipart/form-data'
            },
            name: 'file',
            formData: {
              photo_id: 1,
              album_id: 1
            },
            success: function (res) {
              var jsonObj = JSON.parse(res.data);
              videos = jsonObj.images;
              wx.hideLoading();
              wx.showToast({
                title: '视频上传成功',
                icon: "success"
              })
            },
            fail: function (r) {

            }
          })
        }else{
          wx.showToast({
            title: '您选择的视频不符合要求',
            icon: "none"
          })
        }

      }
    })
  },
  /**
   * 当发生错误时触发error事件，event.detail = {errMsg: 'something wrong'}
   */
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }
,
  chooseImage: function () {
    var that = this;
    that.setData({
      imgshow: true
    })
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
              "resource": "BUSINESSCARD_PATH"
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
        if (imagesLength == 2) {
          that.setData({
            initHeight: "600",
            initImgHeight: '500'
          });
        }
        if (imagesLength == 5) {
          that.setData({
            initHeight: "900",
            initImgHeight:'700'
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
    var that = this;
    var index = e.currentTarget.dataset.index;
    var images = this.data.images;
    images.splice(index, 1);
    that.setData({
      images: images
    });
  },
 
  choosePosition:function(){
    var that = this;
    wx.chooseLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) { 
        var address = res.address;
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.setData({ 
          latitude: latitude,
          longitude: longitude,
          companyAddress: address
        });

      }
    })
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
        console.log(res)
        if (res.data.businessCard.url !='undefined'){
          that.setData({
            vipshow: false
          });
          videos = res.data.businessCard.headImgUrl;
        }else if (res.data.businessCard.url!=''){
          that.setData({
            vipshow: false
          });
          videos = res.data.businessCard.headImgUrl;
        } 
        if (res.data.businessCard.imgList.length>0) {
          images = res.data.businessCard.photo;
          that.setData({
            imgshow: true,
            images: res.data.businessCard.imgList,
            imagesLength: res.data.businessCard.imgList.length,
          });
        } 
        that.setData({
           businessCard: res.data.businessCard,
          vipStatus: res.data.businessCard.vipStatus
      });
      },
      fail: function (error) {
        
      }
    })
  },
  NoVip:function(){
    wx.showModal({
      title: '提示',
      content: '您不是会员请先开通会员！',
      confirmText:'去开通',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/person/member/member',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
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
    return {
      title: '支付好帮手',
      desc: '实时快速的支付查询好帮手',
      path: '/pages/carddetails/carddetails?id=' + wx.getStorageSync("memberId")
    }
  }
})