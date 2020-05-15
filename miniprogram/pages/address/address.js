let db = wx.cloud.database();
Page({
  /**页面的初始数据 */
  	data: {
    addressList:[]
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    this.addressListHandle();
  },
  // 处理获取地址数据
  addressListHandle() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'address',
      data:{
        $url:"searchAddress",
      }
    }).then(res=>{
      wx.hideLoading();
      // console.log(res);
      this.setData({
        addressList: res.result.data
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  /**监听页面显示 */
	onShow: function () {
    this.addressListHandle();
  },
  // 添加地址
  addAddress:function(){
    wx.showLoading({
      title: '加载中...',
    });
    wx.navigateTo({
      url: `/pages/addAddress/addAddress`,
      success: (result)=>{
        wx.hideLoading();
      },
      fail: ()=>{
        wx.hideLoading();
      },
    });
  },
  /* 删除地址 */
  delAddress: function (e) {
    console.log(e.target.dataset.consignee);
    var that = this;
    var consignee = e.target.dataset.consignee;
    wx.cloud.callFunction({
      name: "address",
      data: {
        "$url": "addressDetail",
        "consignee": consignee
      }
    }).then(res => {
      console.log(res.result.data[0]._id);
      var id = res.result.data[0]._id;
      db.collection('address').doc(id).remove({
        success:function(res){
          wx.showToast({
            title: '删除成功'
          })
          that.addressListHandle();
        }
      })
    })
  }
})