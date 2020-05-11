//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'tian-ko88o',
        traceUser: true,
      })
    }
    this.getOpenid();
    this.globalData = {
      openid:-1,
    }
  
  },
  // 获取oppenId
  getOpenid(){
    wx.cloud.callFunction({
      name:"login",
    }).then((res)=>{
      let openid = res.result.openid
      this.globalData.openid= openid
      // 将openid 加到storage上
      if(wx.getStorageSync(openid)==''){
        wx.setStorageSync(openid, []);

      }
    })
  }
})
