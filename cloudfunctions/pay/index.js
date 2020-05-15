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
  app.router('orderGoodsDetail', async(ctx, body) => {
    let _id = event.Id;
    ctx.body = await db.collection('order')
      .where({
        _id
      })
      .get()
  })
  return app.serve()
}