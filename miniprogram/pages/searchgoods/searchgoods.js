const MAX_LIMIT = 20;
let flag = true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyTitle: [], //绑定历史搜索关键词
    searchFind: ['咖啡','上衣','眼镜 ','主食','衬衫','隐形眼镜'], //绑定搜索发现的关键词
    openEye: true, //是否隐藏的图标
    inputWrite: '',//输入框输入的值
    searchList: [],//搜索到的数据
    inputSearch:[],//搜索框底下的模糊查找
    goodList: [],//商品列表
    flag: false,//控制模糊搜索的开关
    toTopValue: false//返回顶部开关，默认隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 返回到首页
  backHome(e) {
    wx.showLoading({
      title: '回到首页'
    });
    wx.switchTab({
      url: '../../pages/home/home',
      success:()=>{
        wx.hideLoading();
      }
    });
  },
  // 搜索按钮的处理函数
  searchHandle(e) {
    if(this.data.inputWrite == '') {
      // 写出提示
      wx.showModal({
        title: '搜索提示',
        content: '输入中文商品名,请输入规范呦',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else {
      wx.showLoading({
        title: '加载中...',
      })
      let value = this.data.inputWrite;
      wx.cloud.callFunction({
        name:'goods',
        data:{
          $url:"search",
          value
        }
      }).then(res=>{
        wx.hideLoading();
        this.setData({
          searchList: res.result.data,
          inputWrite: '',
          flag: false,
          inputSearch: []
        })
      })
    }
  },
  // 获取焦点时触发
  inputEnter(e) {
    var value = e.detail.value;
    var reg1 = /^[\u4e00-\u9fa5]{2,7}$/;
    if(reg1.test(value)) {
      var historyTitlelist = this.data.historyTitle;
      if(historyTitlelist.indexOf(e.detail.value) == -1){
        this.data.historyTitle.push(e.detail.value);
      }
      this.setData({
        historyTitle: this.data.historyTitle,
        inputWrite: e.detail.value
      })
      wx.cloud.callFunction({
        name:'goods',
        data:{
          $url:"search",
          value
        }
      }).then(res=>{
        this.searchDataHandle(res.result.data);
      })
    }
  },
  // 处理搜索标题的函数
  searchDataHandle(data) {
    var searchData = [];
    for(var i =0;i<data.length;i++) {
      searchData.push(data[i].title);
    }
    this.setData({
      inputSearch: searchData
    })
  },
  // 点击搜索记录输入框变为记录的函数 
  searchInput(e) {
    this.setData({
      inputWrite: e.target.dataset.value
    })
  },
  // 处理点击眼睛关闭搜索发现的处理
  closeEyeHandle(e) {
    this.setData({
      openEye: !this.data.openEye
    })
  },
  // 删除搜索记录
  deleteSearchHandle(e) {
    var _that = this;
    wx.showModal({
      title: '删除提示',
      content: '删除商品名称么，删了就没有了',
      success (res) {
        if (res.confirm) {
          _that.setData({
            historyTitle: []
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 搜索模态框的出现
  inputFlagHandle() {
    this.setData({
      flag: true,
      searchList: []
    })
  },
  // 搜索内容跳到搜索框中的处理
  searchResultHandle(e) {
    this.setData({
      inputWrite: e.target.dataset.title
    })
  },
  // 处理取消搜索时的函数
  cancelFlagHandle() {
    this.setData({
      flag: false
    })
  },
  // 点击发现标签放入输入框的处理
  discoverSearchHandle(e) {
    this.setData({
      inputWrite: e.target.dataset.discover
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