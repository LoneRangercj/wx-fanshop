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
  //获取地址信息
  app.router('searchAddress', async(ctx, next) => {
    let _openid = event.openid;
    ctx.body =  await db.collection('address').where({
      _openid
    }).get()
  })
  //  获取地址的详情
  app.router('addressDetail', async(ctx, body) => {
    let consignee = event.consignee;
    
    ctx.body = await db.collection('address')
      .where({
        consignee
      })
      .get()
  })
  app.router('addressSelect', async(ctx, body) => {
    let _id = event._id;
    ctx.body = await db.collection('address')
      .where({
        _id
      })
      .get()
  })
  return app.serve()
}