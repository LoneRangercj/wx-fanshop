var list = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],//缓存的数据
    allchecked: false,//全选的标识
    indexList:[],//存放选中商品的数组
    goodsNumber: 0 //购买商品的数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从缓存中拿到数据
    console.log(1111);
    
    this.getCardetailGoods()
  },
  getCardetailGoods() {
    list = wx.getStorageSync('car');
    // console.log(list);
    
    this.setData({
      cartList: list
    })
  },
  onShow: function () {
    this.getCardetailGoods()
  },
  // 购物车空时，可以回到首页挑选
  homeHandle() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  // 递减商品数量
  onReduce(e){
    let _id = e.detail._id;
    let data = wx.getStorageSync('car');
    data.forEach((item,index)=>{
      if(item._id == _id && item.count > 1){
        item.count--
        wx.setStorageSync('car',data);
        this.setData({
          cartList: data
        })
      }else if(item._id == _id){
        wx.showModal({
          title: '提示',
          content: '已经不能再少了，您是否要删除该商品',
          success:res=> {
            if (res.confirm) {
              data.splice(index,1);
              wx.setStorageSync('car', data);
              this.setData({
                cartList:data
              })
            } else if (res.cancel) {
              item.count = 1
            }
          }
        })
      }
    })

    this.selectComponent('#car-bottom').dataHandle();
  },
  // 递增商品数量
  onAdd(e){
    let _id = e.detail._id;
    let data = wx.getStorageSync('car');
    data.forEach((item, index) => {
      if (item._id == _id && item.count < 10) {
        item.count++
        wx.setStorageSync('car', data);
        this.setData({
          cartList: data
        })
      }else if(item._id == _id){
        wx.showModal({
          title: '提示',
          content: '已经不能再多了，您是否要减少商品数量',
          success:res=> {
              item.count = 10
          }
        })
      }
    })
    this.selectComponent('#car-bottom').dataHandle();
  },
  // 计算底部显示商品总价函数
  onCheck(e){
    if(e == true) {
      for(let i =0;i < this.data.cartList.length;i++) {
        this.data.indexList.push(`${i}`);
      }
      this.setData({
        indexList: this.data.indexList
      })
      this.selectComponent('#car-bottom').dataHandle();
    }else if(e == false){
    }else {
      let indexList = e.detail.indexList;
      this.setData({
        indexList,
      })
      this.selectComponent('#car-bottom').dataHandle();
    }
  },
  // 全选功能函数
  checkAll(e) {
    // console.log(e.detail.allchecked);
    // console.log(this.data.indexList)
    if(this.data.indexList.length != 0) {
      this.setData({
        indexList: []
      })
    }
    this.setData({
      allchecked: e.detail.allchecked
    })
    if(this.data.allchecked === false) {
      // console.log(2222222);
      this.setData({
        indexList:[],
        goodsNumber: 0
      })
    }
    this.onCheck(this.data.allchecked);
  },
  // 购物车商品数量
  goodsTotal(e) {
    // console.log(e.detail.number);
    this.setData({
      goodsNumber: e.detail.number
    })
  },
  //检测滚动事件
  onPageScroll: function (e) {
    let scrollTop = e.scrollTop
    let toTopValue = scrollTop > 500 ? true : false
    if (toTopValue && flag) {
      this.setData({
        toTopValue: true
      }, () => {
        flag = false;
      })
    } else if (!toTopValue && !flag) {
      this.setData({
        toTopValue: false
      }, () => {
        flag = true;
      })
    }
  },
  //返回顶部
  onToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
    this.setData({
      toTopValue: false
    }, () => {
      flag =  true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(222222);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {   
    // console.log(33333);
    this.getCardetailGoods();
    
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