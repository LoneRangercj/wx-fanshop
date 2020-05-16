let db = wx.cloud.database();
const app = new getApp();
Page({
  /**页面的初始数据 */
  data: {
    addressList:[],
    flag: false, // 判断选择地址的开关
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    if(options.flag) {
      this.setData({
        flag: options.flag
      })
    }
    this.addressListHandle();
  },
  // 处理获取地址数据
  addressListHandle() {
    let openid = app.globalData.openid;
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'address',
      data:{
        $url:"searchAddress",
        openid
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
  /* 挑选地址 */
  selectAddress: function (e) {
    // var that = this;
    var _id = e.target.dataset.id;
    wx.setStorageSync('address', []);
    wx.setStorageSync('address', _id);
    wx.navigateTo({
      url: `/pages/pay/pay`
    })
  },
  // 删除地址
  delAddress: function (e) {
    // console.log(e.target.dataset.consignee);
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