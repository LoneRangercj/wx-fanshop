const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.getUnlimited({
      scene: 'wxContext.OPENID',
      // page:'pages/min/min'
    })
    const code = await cloud.uploadFile({
      cloudPath:"OrCode/"+Date.now()+"-"+Math.random()+".jpg",
      fileContent:result.buffer
    })
    return code.fileID
  } catch (err) {
    console.log(err)
    return err
  }
}