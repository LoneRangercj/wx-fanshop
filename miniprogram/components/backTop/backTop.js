Component({
  properties: {
    toTopValue:{
      type:Boolean
    }
  },
  data:{
    isShow:false,
    selected:false
  },
  observers:{
    "toTopValue":function(val){
      this.setData({
        isShow:val
      })
    }
  },
  methods: {
    onToTop(){
      clearTimeout(timer);
      var _that = this;
      this.setData({
        selected: true
      })
      var timer = setTimeout(function(){
        _that.setData({
          selected: false
        })
        _that.triggerEvent('onToTop');
      },500)
    }
  }
})
