Component({
 /**
   * 组件的属性列表
   */
  properties: {
    indexList: {
      type:Array
    },
    cartList: {
      type:Array
    }
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      this.setData({
        allchecked: false,
        total: 0,
        number: 0
      })
    },
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
      // console.log(number);
      this.triggerEvent('goodsTotal',{number});
    },
    checkAll(e) {
      console.log(this.properties.cartList.length);
      if(this.properties.cartList.length == 0) {
        this.setData({
          allchecked: false
        })
      }else {
        let allchecked = !this.data.allchecked;
        // console.log(allchecked);
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
    },
    // 付款函数
    payGood(e) {
      let num = this.data.number;
      let total = this.data.total;
      this.triggerEvent("payGood",{num,total})
    }
  },

})
