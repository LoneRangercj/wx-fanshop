// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'tian-ko88o',
})

const db = cloud.database();
const goodsCollection = db.collection('goods');
// 云函数入口函数
// 获取数据库的数据
// 本来写的
exports.main = async (event, context) => {
  return await goodsCollection.get().then((res)=>{
    return res.data[0]
  })
}