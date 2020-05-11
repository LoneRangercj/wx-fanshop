// 云函数入口文件
const cloud = require('wx-server-sdk')
const TchRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContent = cloud.getWXContext()
  const app = new TchRouter({
    event
  });
  // 定义公共的路由
  app.use(async (ctx, next) => {
    ctx.data = { con: '我是公共数据' }
    ctx.data.openid = wxContent.openid
    await next()
  })
  app.router("music", async (ctx, next) => {
    ctx.data.name = 'music';
    console.log(ctx);
    
    await next()
  }, async (ctx, next) => {
    console.log(ctx);
    ctx.data.age = '音乐';
    ctx.body = {
      data: ctx.data
    }
  })

  app.router("goods", async (ctx, next) => {
    ctx.data.name = 'goods'
    await next()
  }, async (ctx, next) => {
    ctx.data.age = '商品';
    ctx.body = {
      data: ctx.data
    }
  })

  app.router('movie', async (ctx, next) => {
    ctx.data.name = 'moview'
    ctx.data.age = '电影';

    ctx.body = {
      data: ctx.data
    }
  })

  return app.serve()

}