Component({
 /**
   * 组件的属性列表
   */
  properties: {
    indexList: {
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    total:0,
    number:0,
    allchecked: false, //全部选中
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dataHandle(){
      let total = 0;
      let number = 0;
      let cartList = wx.getStorageSync('car')
      this.properties.indexList.forEach(item => {
        total += cartList[item].price * cartList[item].count;
        number += cartList[item].count;
      })
      this.setData({
        total,
        number
      })
      // console.log(this.properties.indexList.length);
      if(this.properties.indexList.length == cartList.length) {
        this.setData({
          allchecked: true
        })
      }else {
        this.setData({
          allchecked: false
        })
      }
      console.log(number);
      this.triggerEvent('goodsTotal',{number});
    },
    checkAll(e) {
      let allchecked = !this.data.allchecked;
      //console.log(allchecked);
      this.setData({
        allchecked
      })
      if(allchecked === false) {
        // console.log(111111);
        this.setData({
          total: 0
        })
      }
      this.triggerEvent("checkAll",{allchecked})
    }
  }
})
