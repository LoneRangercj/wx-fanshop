// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "tian-ko88o"
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('swiper').get();
}