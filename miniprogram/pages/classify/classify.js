Page({
  /**
    * 页面的初始数据
    */
  data: {
    goodList:[], 
    newGoodList:[],
    curNav: 0,    
    curIndex: 0,

  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    console.log(e);
    
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
      console.log(index);
      
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    // 初始化分类的数据
    this.classifyShow();
  },
  // 拿到数据
  classifyShow() {
    var _this = this;
    wx.showLoading({
      title: '加载中...',
    });
    wx.cloud.callFunction({
      name: "classify",
    }).then((res) => {
      console.log(res);
      // this.setData({
      //   goodList: res.result.RECORDS
      // },()=>{
        this.onDataHandle(res.result.RECORDS)
      // })
      wx.hideLoading();
    })
  },
  // 对拿到的数据处理
  onDataHandle(res) {
    let list = [];
    res.forEach((item, index) => {
      var flag = true;
      list.forEach(element => {
        if (element.type_one == item.type_one) {
          element.list.push(item);
          flag = false;
        }
      });
      if (flag) {
        list.push({
          type_one: item.type_one,
          list: []
        });
      }
    });
    this.setData({
      newGoodList:list
    })
  },
  //分类
  ClassifyHandle(e){
    let { index, item } = e.currentTarget.dataset;
    console.log(index,item);
    
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
      // console.log(res.result.data);
      this.ondataHandle(res.result.data)
    })
  },
  ondataHandle(res) {
    console.log(res);
    let list = [];
    res.forEach((item, index) => {
      var flag = true;
      list.forEach(element => {
        if (element.type_two == item.type_two) {
          element.list.push(item);
          flag = false;
        }
      });
      if (flag) {
        list.push({
          type_two: item.type_two,
          list: []
        });
      }
    });
    this.setData({
      goodList:list
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

  },
})