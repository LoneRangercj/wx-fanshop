Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchList: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    catchSearchHandle: function (e) {     
      var goodsId = e.currentTarget.dataset.goodsid;    
      //跳转商品详情
      wx.showLoading({
        title: '加载中...',
      });
      wx.navigateTo({
        url: `/pages/goodsdetail/goodsdetail?goodsId=${goodsId}`,
        success: (result)=>{
          wx.hideLoading();
        },
        fail: ()=>{
          wx.hideLoading();
        },
      });
    },
  }

})
