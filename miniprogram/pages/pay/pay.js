var goodslist = [];
var addresslists = [];
var total = 0;
var num = 0;
var list = [];
let db = wx.cloud.database();
const app = new getApp();
// var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [],// 支付的商品
    total: 0, //总的支付价格
    num: 0, // 总的商品数
    addresslist: [], //商品的接收地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.idlist) {
      list  = JSON.parse(options.idlist);
      // 获取购买的商品
      this.orderData(list);
      total = options.total;
      num = options.num
      this.setData({
        total: options.total,
        num: options.num
      })
    }
  },
  // 获取购买的商品
  orderData(list) {
    var that = this;
    wx.showLoading({
      title: '订单加载中'
    })
    console.log(list);
    
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
        goodslist = that.data.orderlist;
        that.setData({
          orderlist: that.data.orderlist
        })
      })
    })
  },
  // 处理收货地址
  selectAddress(e) {
    wx.showLoading({
      title: '进入地址页面'
    })
    wx.navigateTo({
      url: `/pages/address/address?flag=true`,
      success: ()=>{
        wx.hideLoading();
      },
      fail: ()=>{
        wx.hideLoading();
      },
    })   
  },
  // 点击支付，跳到购物车
  payGood() {
    clearTimeout(timer);
    var that = this;
    let _openid = app.globalData.openid;
    // var time = util.formatTime(new Date());
    wx.showLoading({
      title: '付款中',
    })
    // db.collection('orderlist').add({
    //   data: {
    //     time
    //   }
    // })
    // .then(res => {
    // })
    // .catch(console.error)
    wx.cloud.callFunction({
      name: "pay",
      data: {
        "$url": "orderGoodsDelete",
        "openid": _openid
      }
    })
    that.data.orderlist.splice(0);
    this.setData({
      orderlist: that.data.orderlist
    })
    var timer = setTimeout(function(){
      wx.switchTab({
        url: '/pages/profile/profile',
        success: ()=>{
          wx.hideLoading();
        },
        fail: ()=>{
          wx.hideLoading();
        },
      })
    },2000)
    
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
    // console.log(total);
    // console.log(num);
    // console.log(goodslist);
    this.setData({
      total,
      num,
      orderlist: goodslist
    })
    var that = this;
    let res = wx.getStorageSync('address');
    wx.cloud.callFunction({
      name: "address",
      data: {
        "$url": "addressSelect",
        "_id": res
      }
    }).then(res => {
      addresslists = res.result.data;
      that.setData({
        addresslist: res.result.data
      })
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

  }
})