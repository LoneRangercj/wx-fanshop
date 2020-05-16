let db = wx.cloud.database();
const app = new getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 订单管理的处理
    this.orderlistHandle()
  },
  // 订单管理的处理
  orderlistHandle() {
    let _openid = app.globalData.openid;
    wx.cloud.callFunction({
      name: "orderlist",
      data: {
        "$url": "searchOrderList",
        "openid": _openid
      }
    }).then(res=>{
      // 对商品进行处理
      this.getGoodsHandle(res.result.data);
    })
  },
  getGoodsHandle(res) {
    var result = res;
    this.setData({
      goodsData: result
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