// pages/tabbar/task/task.js
const app = getApp();
var num = 0;
var timer = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
	taskList:[],
	taskImg:["../../../images/newtask-img1.jpg","../../../images/newtask-img2.jpg","../../../images/newtask-img3.jpg","../../../images/newtask-img4.jpg"],
	signList:[
			{num:"1天",signurl:"../../../images/sigin-img1.jpg"},
			{num:"2天",signurl:"../../../images/sigin-img2.jpg"},
			{num:"3天",signurl:"../../../images/sigin-img3.jpg"},
			{num:"4天",signurl:"../../../images/sigin-img4.jpg"},
			{num:"5天",signurl:"../../../images/sigin-img5.jpg"},
			{num:"6天",signurl:"../../../images/sigin-img6.jpg"},
			{num:"7天",signurl:"../../../images/sigin-img7.jpg"},
		],
	signqueryList:[],
	mingintegral:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  clickTask(e){
		var index = e.currentTarget.dataset.i;
		if(index == 0){
			wx.showToast({
				title: '已签到',
				icon: 'success',
				duration: 1500
			});
		}else if(index == 1){
			//console.log("分享");
			//console.log(e)
		}else if(index == 2){
			wx.switchTab({
				url: '../headlines/headlines'
			});
		}else if(index == 3){
			wx.navigateTo({
				url: '/pages/person/Invitation/Invitation'
			})
		}
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	},
	onPageScroll:function(e){
    //console.log(e);//{scrollTop:99}
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var memberId = wx.getStorageSync('memberId');
    var that=this;
    var url = app.globalData.DoBaseUrl +"taskList.html?memberId="+ memberId;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success:function(res){
				console.log(res);
				//console.log(res.data.taskList[0].complateNum);
				//console.log(res.data.taskList[0].complate);
				that.setData({
					taskList: res.data.taskList
				});
				//判断是否签到
				if(res.data.taskList[0].complateNum == res.data.taskList[0].complate){
					console.log("已经签到过了");
				}else{
					//签到成功
					wx.showToast({
						title: '签到成功',
						icon: 'success',
						duration: 1500
					});
					//发送签到请求
					//console.log(getNowFormatDate());
					var timer = getNowFormatDate();
					var signurl = app.globalData.DoBaseUrl +"sign.html?memberId="+ memberId+"&taskId="+1+"&dataDate="+timer+"&type="+1;
					wx.request({
						url: signurl,
						method: 'GET',
						header: {
						"Content-Type": "json"
						},
						success:function(res){
							console.log(res);
						}
					})
					//签到模块
					var querySignurl = app.globalData.DoBaseUrl +"querySignType.html?memberId="+ memberId;
					wx.request({
						url:querySignurl,
						data: {},
						method: 'GET', 
						header: {
							"Content-Type": "json"
						},
						success: function(res){
							var signlastday = res.data.signTypeList;
							var signTypeList = res.data.signTypeList;
							var signArr = [];
							var newArr=[];
							for(var i=0;i<signTypeList.length;i++){
								signArr.push(signTypeList[i].day);
							}
							for(var j=1;j<8;j++){
								if(signArr.indexOf(j) > -1 ){
									newArr.push(true)
								}else{
									newArr.push(false)
								}
							}
							that.setData({
								signTypeList: newArr,
								signArr:signArr,
								signlastday:signlastday
							})
							console.log(that.data.signTypeList)
						}
					})
				}
      }
	});
	//签到模块
	var querySignurl = app.globalData.DoBaseUrl +"querySignType.html?memberId="+ memberId;
	wx.request({
		url:querySignurl,
		data: {},
		method: 'GET', 
		header: {
			"Content-Type": "json"
		},
		success: function(res){
			console.log(res);
			var signlastday = res.data.signTypeList;
			var signTypeList = res.data.signTypeList;
			var signArr = [];
			var newArr=[];
			for(var i=0;i<signTypeList.length;i++){
				signArr.push(signTypeList[i].day);
			}
			for(var j=1;j<8;j++){
				if(signArr.indexOf(j) > -1 ){
					newArr.push(true)
				}else{
					newArr.push(false)
				}
			}
			that.setData({
				signTypeList: newArr,
				signArr:signArr,
				signlastday:signlastday,
				signqueryList:res.data.signTypeList
			})
			console.log(that.data.signqueryList.length)
			//明日积分请求
			var signqueryList = that.data.signqueryList;
			var signListurl  = app.globalData.DoBaseUrl + "signList.html";
			wx.request({
				url: signListurl,
				data: {},
				method: 'GET',
				success: function(res){
					console.log(res.data.rows);
					that.setData({
						mingintegral:res.data.rows
					})
				}
			})
		}
	})
	//余额获取请求
    var nurl = app.globalData.DoBaseUrl + 'memberInfo.html?memberId=' + memberId;
    wx.request({
		url: nurl,
		method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
		header: {
		"Content-Type": "json"
		},
		success: function (res) { 
			console.log(res);
			that.setData({
				member:res.data.member
			}); 
		}
	})
	},
	onToInvitation(){
		wx.navigateTo({
			url: '/pages/person/Invitation/Invitation'
		})
	},
	onRetroactive(e){
		var memberId = wx.getStorageSync("memberId");
		var that = this;
		//console.log(this.data.signTypeList)
		var signarr = this.data.signTypeList;
		var signlastday = this.data.signlastday;
		var signlastlen = this.data.signlastday.length;
		var signid = e.currentTarget.dataset.id;
		//console.log(signlastday[signlastlen-1].day);
		var signarrindex = [];
		//计算出数组中的false的索引值
		for(var i=0;i<signarr.length;i++){
			if(signarr[i] == false){
				signarrindex.push(i);
			}
		}
		//console.log(signarrindex);

		//循环false
		for(var j=0;j<signarrindex.length;j++){
			//判断出这个值是否大于最后一天的day如果大于是错误
			if(signarrindex[j] < signlastday[signlastlen-1].day){
				//console.log(signarrindex[j]);
				if(signarrindex[j] == signid ){
					//console.log(signlastday[signlastlen-1].day);
					//console.log(signarrindex[j]);
					//console.log(signlastday[signlastlen-1].day - (signarrindex[j]+1));
					//计算出与当前时间相差的天数   用最后一天的day - 他数组中位置+1
					var signcha = signlastday[signlastlen-1].day - (signarrindex[j]+1);
					//补签提示
					wx.showModal({
						title: '提示',
						content: '是否补签',
						success(res) {
							if (res.confirm) {
								//日期获取
								var date = new Date();
								var seperator1 = "-";
								var year = date.getFullYear();
								var month = date.getMonth() + 1;
								var strDate = date.getDate()-signcha;
								if (month >= 1 && month <= 9) {
									month = "0" + month;
								}
								if (strDate >= 0 && strDate <= 9) {
									strDate = "0" + strDate;
								}
								var currentdate = year + seperator1 + month + seperator1 + strDate;
								console.log(currentdate);
								var signsurl = app.globalData.DoBaseUrl +"sign.html?memberId="+ memberId+"&taskId="+1+"&dataDate="+currentdate+"&type="+2;
								console.log(currentdate);
								wx.request({
									url: signsurl,
									data: {},
									method: 'GET', 
									header: {
										"Content-Type": "json"
									},
									success: function(res){
										console.log(res)
										wx.showToast({
											title: '补签成功',
											icon: 'success',
											duration: 2000
										});
										//签到
										var querySignurl = app.globalData.DoBaseUrl +"querySignType.html?memberId="+ memberId;
										wx.request({
											url:querySignurl,
											data: {},
											method: 'GET', 
											header: {
												"Content-Type": "json"
											},
											success: function(res){
												var signlastday = res.data.signTypeList;
												var signTypeList = res.data.signTypeList;
												var signArr = [];
												var newArr=[];
												for(var i=0;i<signTypeList.length;i++){
													signArr.push(signTypeList[i].day);
												}
												for(var j=1;j<8;j++){
													if(signArr.indexOf(j) > -1 ){
														newArr.push(true)
													}else{
														newArr.push(false)
													}
												}
												that.setData({
													signTypeList: newArr,
													signArr:signArr,
													signlastday:signlastday
												})
												console.log(that.data.signTypeList)
											}
										})
									}
								})
								console.log('用户点击确定')
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					});
				}
			}
		}
		
		// if(){
		// 	console.log("补签");
		// }
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
  onShareAppMessage: function (res) {
		/*return {
			title: '支付好帮手',
			desc: '实时快速的支付查询好帮手',
			path: '/pages/carddetails/carddetails?id=' + wx.getStorageSync("memberId")
		}*/
		//console.log(res)
		if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
		return {
			title: '支付好帮手', // 转发后 所显示的title
			path: '/pages/tabbar/task/task',
			success: function(res) {
				console.log(123)
			} 
		}
  }
})
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}