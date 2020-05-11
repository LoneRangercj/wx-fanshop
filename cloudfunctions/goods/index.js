// 云函数入口文件
const cloud = require('wx-server-sdk');
const tcbRouter = require('tcb-router');
const LIMIT = 50;
cloud.init({
  env: 'tian-ko88o',
})

const db = cloud.database();
exports.main = async(event, context) => {
  const app = new tcbRouter({
    event
  });
  //获取商品列表
  app.router('goodList', async(ctx, next) => {
    const {
      start,
      count
    } = event
    ctx.body = await db.collection('goodslist')
      .skip(start)
      .limit(count)
      .get()
  })

  //获取搜索商品名的信息
  app.router('searchGoodList', async(ctx, next) => {
    ctx.body =  await db.collection('goods').get()
  })


  //获取商品总数
  app.router('total', async(ctx, next) => {
    ctx.body = await db.collection('goodslist').count()
  })

  app.router('search', async(ctx, next) => {
    let {
      value
    } = event
    ctx.body = await db.collection('goodslist')
      .where({
        title: db.RegExp({
          regexp: value,
          options: 'i',
        })
      })
      .get()
  })

  //  获取商品详情
  app.router('goodsDetail', async(ctx, body) => {
    let Id = event.Id;
    ctx.body = await db.collection('goodslist')
      .where({
        Id
      })
      .get()
  })
  // 获取具体分类的商品
  app.router('goodListByType', async(ctx, next) => {
    let item = event.item;
    let res = await db.collection('goodslist')
      .where({
        type_one: item
      })
      .count()
    if(res.total <= 50){
      ctx.body = await db.collection('goodslist').where({type_one: item}).get()
    }else{
      let times = Math.ceil(res.total/LIMIT);
      let tasks = [];
      for(var i=0;i<times;i++){
        let promise = db.collection('goodslist').where({type_one:item}).skip(i*LIMIT).limit(LIMIT).get()
        tasks.push(promise)
      }
      var list = {
        data: []
      }
      if (tasks.length > 0) {
        list = (await Promise.all(tasks)).reduce((acc, cur) => {
          return {
            data: acc.data.concat(cur.data)
          }
        })
      }
      console.log(list)
      ctx.body = list
    }
  })
  return app.serve()
}