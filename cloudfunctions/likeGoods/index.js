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
  //获取收藏商品的信息
  app.router('searchCollectGoods', async(ctx, next) => {
    ctx.body =  await db.collection('likeGoods').get()
  })
  //  获取收藏商品的信息
   app.router('searchCollectGoodsNumber', async(ctx, next) => {
    let _openid = event.openid
    ctx.body =  await db.collection('likeGoods').where({
      _openid
    }).get()
  })
  // return await db.collection('likeGoods').where({
  //   Id: event.Id
  // }).get()
  //  获取收藏商品的详情
  app.router('collectGoodsDetail', async(ctx, body) => {
    let Id = event.Id;
    ctx.body = await db.collection('likeGoods')
      .where({
        Id
      })
      .get()
  })
  return app.serve()
}