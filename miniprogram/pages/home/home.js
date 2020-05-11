const MAX_LIMIT = 20
let flag = true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tarBar: [
      { name: '咖啡'},
      { name: '饮食'},
      { name: '正餐'},
      { name: '男装'},
      { name: '女装'},
      { name: '眼镜'},
      { name: '鞋靴'}
    ],
    goodList: [],//商品列表
    total: -1,//商品总数
    listType: [],//商品类型列表
    chooseIndex: -1,//选中商品分类类名
    swiperList: [],//轮播列表
    toTopValue: false//返回顶部开关，默认隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化数据的函数
    this.getShopList();
    this.getTotal();
    this.getSwiperList();
  },
   //获取商品列表
   getShopList(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'goods',
      data:{
        $url:"goodList",
        start:this.data.goodList.length,
        count: MAX_LIMIT
      }
    }).then(res=>{
       wx.hideLoading();
       console.log(res);
       this.setData({
         goodList: this.data.goodList.concat(res.result.data)
       })
    }).catch(err=>{
      console.log(err)
    })
  },
  //获取商品总数
  getTotal(){
    wx.cloud.callFunction({
      name: 'goods',
      data:{
        $url:'total'
      }
    }).then(res=>{
      this.setData({
        total:res.result.total
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  //获取轮播图列表
  getSwiperList(){
    wx.cloud.callFunction({
      name:"swiper",
    }).then(res=>{
      console.log(res);
      this.setData({
        swiperList: res.result.data
      })
    })
  },
  //搜索
  onSearch(e){
    let value = e.detail.value;
    wx.cloud.callFunction({
      name:'goods',
      data:{
        $url:"search",
        value
      }
    }).then(res=>{
      this.setData({
        goodList:res.result.data
      })
    })
  },
  //分类
  ClassifyHandle(e){
    let { index, item } = e.currentTarget.dataset;
    this.setData({
      chooseIndex:index
    })
    wx.showLoading({
      title: `加载${item}中`,
    })
    wx.cloud.callFunction({
      name:'goods',
      data:{
        $url:'goodListByType',
        item
      }
    }).then(res=>{
      wx.hideLoading();
      this.setData({
        goodList:res.result.data
      })
    })
  },
  onShow: function () {

  },
  searchGoodsHandle(e) {
    wx.showLoading({
      title: '进入搜索商品'
    })
    wx.navigateTo({
      url: '../../pages/searchgoods/searchgoods',
      success: ()=>{
        wx.hideLoading();
      },
      fail: ()=>{
        wx.hideLoading();
      },
    })    
  },
  //检测滚动事件
  onPageScroll:function(e){
    let scrollTop = e.scrollTop
    let toTopValue = scrollTop > 500 ? true : false
    if(toTopValue && flag){
      this.setData({
        toTopValue: true
      },()=>{
        flag = false;
      })
    }else if(!toTopValue && !flag){
      this.setData({
        toTopValue:false
      },()=>{
        flag = true;
      })
    }
  },
  //返回顶部
  onToTop(){
    wx.pageScrollTo({
      scrollTop: 0,
    })
    this.setData({
      toTopValue:false
    },()=>{
      flag = true
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
    this.setData({
      goodList:[]
    })
    this.getShopList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  // 开始版本的初始化数据
  // getGoodslist() {
  //   var _this = this;
  //   wx.showLoading({
  //     title: '加载中...',
  //   });
  //   wx.cloud.callFunction({
  //     name: "goods",
  //   }).then((res) => {
  //     var result = res.result.RECORDS;
  //     for (let i = 0; i < result.length; i++) {
  //       if (result[i].type_one == '咖啡') {
  //         _this.data.lists['coffee'].list.push(result[i]);
  //       } else if (result[i].type_one == '饮食') {
  //         _this.data.lists['diet'].list.push(result[i]);
  //       } else if (result[i].type_one == '正餐') {
  //         _this.data.lists['dinner'].list.push(result[i]);
  //       } else if (result[i].type_one == '男装') {
  //         _this.data.lists['mcloth'].list.push(result[i]);
  //       } else if (result[i].type_one == '女装') {
  //         _this.data.lists['wcloth'].list.push(result[i]);
  //       } else if (result[i].type_one == '眼镜') {
  //         _this.data.lists['glass'].list.push(result[i]);
  //       } else {
  //         _this.data.lists['shoe'].list.push(result[i]);
  //       }
  //     } 
  //     let index = this.data.current;
  //     let goodCount = this.data.count;
  //     for(let j = index; j<MAX_LIMIT * (goodCount+1);j++){
  //       this.data.newGoodsList.push(result[j]);
  //     }
  //     goodCount++;
  //     this.setData({
  //       oldGoodslist: result,
  //       goodslist: this.data.newGoodsList,
  //       countTotal: result.length,
  //       current: this.data.newGoodsList.length,
  //       count: goodCount
  //     })
  //     this.setLocalGoodslist();
  //     wx.hideLoading();
  //   })
    
  // },
  // 将商品保存到本地
  // setLocalGoodslist() {
  //   console.log(this.data.goodslist);
    
  //   wx.setStorage({
  //     key: 'goodslist',
  //     data: this.data.goodslist,
  //   });
  // },
})