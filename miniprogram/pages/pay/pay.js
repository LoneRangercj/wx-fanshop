// miniprogram/pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = JSON.parse(options.idlist)
    // 获取购买的商品
    this.orderData(list);
    // 获取商品接收地址
    this.addressData();
  },
  // 获取购买的商品
  orderData(list) {
    var that = this;
    // console.log(list);
    wx.showLoading({
      title: '订单加载中'
    })
    list.forEach((item)=>{
      wx.cloud.callFunction({
        name: "pay",
        data: {
          "$url": "orderGoodsDetail",
          "Id": item
        }
      }).then(res => {
        wx.hideLoading();
        that.data.orderlist.push(res.result.data);
        that.setData({
          orderlist: that.data.orderlist
        })
      })
    })
    console.log(this.data.orderlist);
    
  },
  // 获取商品接收地址
  addressData() {
    wx.cloud.callFunction({
      name: 'address',
      data:{
        $url:"searchAddress",
      }
    }).then(res=>{
      console.log(res);
      // this.setData({
      //   addressList: res.result.data
      // })
    }).catch(err=>{
      console.log(err)
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

  }
})