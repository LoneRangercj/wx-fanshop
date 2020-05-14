Component({
  properties: {
    cartList: {
      type: Array
    },
    allchecked: {
      type: Number
    },
    goodsNumber: {
      type: Number
    }
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      this.setData({
        allchecked: false,
        goodsNumber:0
      })
    },
  },
  methods: {
    checkboxChange(e) {
      let indexList = e.detail.value;
      console.log(indexList);
      this.triggerEvent('onCheck',{indexList})
    },
    onReduce(e) {
      let _id = e.currentTarget.dataset._id;
      this.triggerEvent("onReduce",{_id})
    },
    onAdd(e) {
      let _id = e.currentTarget.dataset._id;
      this.triggerEvent("onAdd", { _id })
    },
    goDetail(e) {
      let id = e.currentTarget.dataset.id;
      // console.log(id);
      wx.navigateTo({
        url: `/pages/goodsdetail/goodsdetail?goodsId=${id}`
      })
    }
  }
})
