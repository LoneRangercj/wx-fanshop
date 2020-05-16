// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require('tcb-router');
cloud.init({
  env: "tian-ko88o"
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const app = new tcbRouter({
    event
  });
  //获取全部订单信息
  app.router('searchOrderList', async(ctx, next) => {
    let _openid = event.openid;
    ctx.body =  await db.collection('orderlist').where({
      _openid
    }).get()
  })

  return app.serve()
}