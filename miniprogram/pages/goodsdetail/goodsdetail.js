let db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{},
    showDialog: false,
    isLike: false,//表示是否被收藏过
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取从首页或者分类页跳转过来的商品信息
    this.getGoodsDetail(options.goodsId);
  },
  getGoodsDetail(goodsId) {
    var Id = goodsId;
    wx.cloud.callFunction({
      name: "goods",
      data: {
        "$url": "goodsDetail",
        "Id": goodsId
      }
    }).then(res => {
      // console.log(res);
      // 获取是否收藏过
      this.isCollectHandle(Id);
      this.setData({
        goodsDetail: res.result.data[0]
      })
    })
  },
  // 处理收藏过的商品在详情时是否显示已收藏的图片
  isCollectHandle(id) {
    db.collection('likeGoods').where({
      Id:id
    }).get().then(res => {
      if(res.data.length) {
        this.setData({
          isLike: true
        })
      }
    })
  },
  /**
   * 加入购物车
   */
  addCar: function (e) {    
    // 将数据存到缓存
    let res = wx.getStorageSync('car');
    if (res.length != 0) {
      let existgoods = res.filter((item) => {
        if (item.Id == this.data.goodsDetail.Id) {
          item.count = ++item.count
          return true
        }
      })
      if(existgoods.length == 0){
        res.unshift({
          ...this.data.goodsDetail,
          count: 1
        })
      }
      wx.setStorageSync('car', res)
      wx.showToast({
        title: '添加成功'
      })
    } else {
      let newRes = [{
        ...this.data.goodsDetail,
        count: 1
      }]
      wx.setStorageSync('car',newRes)
      wx.showToast({
        title: '添加成功'
      })
    }
  },
  // 详情跳到购物车
  carHandle() {
    wx.showLoading({
      title: '正在进入购物车'
    })
    wx.switchTab({
      url: '/pages/shopcar/shopcar',
      success: ()=>{
        wx.hideLoading();
      },
      fail: ()=>{
        wx.hideLoading();
      },
    })
  },
  // 处理收藏的函数
  collectHandle(e) {
    var Id = e.target.dataset.gooddetail.Id;
    var title = e.target.dataset.gooddetail.title;
    var img_url = e.target.dataset.gooddetail.img_url;
    var price = e.target.dataset.gooddetail.price;
    var type_one = e.target.dataset.gooddetail.type_one;
    var type_two = e.target.dataset.gooddetail.type_two;
    var mack = e.target.dataset.gooddetail.mack;
    var nice = e.target.dataset.gooddetail.nice;
    db.collection('likeGoods').where({
      Id
    }).get().then(res => {
      if(res.data.length != 0) {
        var id = res.data[0]._id;
        this.setData({
          isLike: false
        })
        db.collection('likeGoods').doc(id).remove({
          success:function(res){
            wx.showToast({
              title: '取消收藏'
            })
          }
        })
        
      }else{
        wx.showToast({
          title: '收藏成功'
        })
        db.collection('likeGoods').add({
          data: {
            Id,title,img_url,price,type_one,type_two,mack,nice,isLike:true
          }
        })
        .then(res => {
          console.log(res)
        })
        .catch(console.error)
        this.setData({
          isLike: true
        })
      }
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