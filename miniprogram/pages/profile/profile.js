Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看收藏的商品
    this.collectInitData();
  },
  // 处理收藏商品的函数
  collectInitData() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'likeGoods',
      data:{
        $url:"searchCollectGoods",
      }
    }).then(res=>{
      wx.hideLoading();
      this.setData({
        collectNum: res.result.data.length
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  // 跳转到收藏商品的页面
  enterCollect(e) {
    wx.navigateTo({
      url: "../collect/collect",
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
    this.collectInitData();
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