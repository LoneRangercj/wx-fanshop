let flag = true;
Page({
  data: {
      // motto: 'Hello World',
      // userInfo: {},
      // hasUserInfo: false,
      // canIUse: wx.canIUse('button.open-type.getUserInfo'),
      navData:[
          {
            type_one: '咖啡'
          },
          {
            type_one: '饮食'
          },
          {
            type_one: '正餐'
          },
          {
            type_one: '男装'
          },
          {
            type_one: '女装'
          },
          {
            type_one: '眼镜'
          },
          {
            type_one: '鞋靴'
          },
      ],
      currentTab: 0, //默认type_one的分类位置
      currentIndex: 0, //默认type_two的分类位置
      nav1ScrollLeft: 0, //默认分类一的向左滚动多少
      nav2ScrollLeft: 0, //默认分类二的向左滚动多少
      goodList: [], //商品的数据
      scrollTop: null,//滚动高度
      toTopValue: false//返回顶部开关，默认隐藏
  },
  //事件处理函数
  onLoad: function () {
      // if (app.globalData.userInfo) {
      //     this.setData({
      //         userInfo: app.globalData.userInfo,
      //         hasUserInfo: true
      //     })
      // } else if (this.data.canIUse) {
      //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      //     // 所以此处加入 callback 以防止这种情况
      //     app.userInfoReadyCallback = res => {
      //         this.setData({
      //             userInfo: res.userInfo,
      //             hasUserInfo: true
      //         })
      //     }
      // } else {
      //     // 在没有 open-type=getUserInfo 版本的兼容处理
      //     wx.getUserInfo({
      //         success: res => {
      //             app.globalData.userInfo = res.userInfo
      //             this.setData({
      //                 userInfo: res.userInfo,
      //                 hasUserInfo: true
      //             })
      //         }
      //     })
      // }
      wx.getSystemInfo({
          success: (res) => {
              this.setData({
                  pixelRatio: res.pixelRatio,
                  windowHeight: res.windowHeight,
                  windowWidth: res.windowWidth
              })
          },
      })
      this.deaultDataHandle(this.data.navData[this.data.currentTab].type_one);       
  },
  // 初始化数据
  deaultDataHandle(data) {
    // console.log(data);
    wx.showLoading({
      title: `加载${data}中`,
    })
    wx.cloud.callFunction({
      name:'goods',
      data:{
        $url:'goodListByType',
        item: data
      }
    }).then(res=>{
      wx.hideLoading();
      this.onDataHandle(res.result.data)
    })
  },
  // 对拿到的数据处理
  onDataHandle(res) {
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
  // type_one分类点击更换数据
  switchNav1(event){
      var cur = event.currentTarget.dataset.current; 
      this.deaultDataHandle(this.data.navData[cur].type_one);
      //每个tab选项宽度占1/5
      var singleNavWidth = this.data.windowWidth / 5;
      //tab选项居中                            
      this.setData({
          nav1ScrollLeft: (cur - 2) * singleNavWidth
      })      
      if (this.data.currentTab == cur) {
          return false;
      } else {
          this.setData({
              currentTab: cur,
              currentIndex: 0
          })
      }
  },
  // type_two分类点击更换数据
  switchNav2(event){
    var cur = event.currentTarget.dataset.current; 
    // console.log(cur);
    // this.deaultDataHandle(this.data.navData[cur].type_one);
    // //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
        nav2ScrollLeft: (cur - 2) * singleNavWidth
    })      
    if (this.data.currentIndex == cur) {
        return false;
    } else {
        this.setData({
            currentIndex: cur
        })
    }
  },
  //检测滚动事件
  onPageScroll:function(e){
    this.setData({ scrollTop: e.scrollTop });
  },
})