# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

### 微信小程序电商项目开发文档

# 凡购电商项目（基于微信小程序云开发）
该项目采用的是微信小程序云开发，组件自己手写，没有用封装好的ui组件。

## 使用指导
- 安装微信小程序
- 下载文件到本地
- 通过微信小程序打开文件(打开时可能没有数据加载因为你的云数据库中并没有数据，还有就是project.config.json中的appid也要换成自己的)

## 文件目录树
```md
.
|-- README.md
|-- cloudfunctions(云函数文件)
|   |-- TcbRouter(路由)
|   |   |-- index.js
|   |   |-- package-lock.json
|   |   `-- package.json
|   |-- address(地址)
|   |   |-- index.js
|   |   |-- package-lock.json
|   |   `-- package.json
|   |-- classify(分类)
|   |   |-- index.js
|   |   |-- package-lock.json
|   |   `-- package.json
|   |-- goods(商品)
|   |   |-- index.js
|   |   |-- package-lock.json
|   |   `-- package.json
|   |-- likeGoods(关注)
|   |   |-- index.js
|   |   |-- package-lock.json
|   |   `-- package.json
|   |-- orderlist(订单)
|   |   |-- index.js
|   |   |-- package-lock.json
|   |   `-- package.json
|   |-- pay(支付)
|   |   |-- index.js
|   |   |-- package-lock.json
|   |   `-- package.json
|   `-- swiper(轮播图)
|       |-- index.js
|       |-- package-lock.json
|       `-- package.json
|-- miniprogram
|   |-- app.js(配置云函数信息)
|   |-- app.json(页面配置信息)
|   |-- app.wxss(导入文件)
|   |-- assets(资源文件)
|   |   `-- icon
|   |       |-- cart1.png
|   |       |-- enshrine.png
|   |       |-- enshrine_select.png
|   |       |-- finder.png
|   |       |-- home.png
|   |       |-- huojian.png
|   |       |-- market.png
|   |       |-- min.png
|   |       |-- music.png
|   |       |-- search.png
|   |       |-- selectfinder.png
|   |       |-- selecthome.png
|   |       |-- selectmarket.png
|   |       |-- selectmin.png
|   |       |-- selectmusic.png
|   |       |-- selectsearch.png
|   |       |-- selectshopcar.png
|   |       `-- shopcar.png
|   |-- components(组件)
|   |   |-- backTop
|   |   |   |-- backTop.js
|   |   |   |-- backTop.json
|   |   |   |-- backTop.wxml
|   |   |   `-- backTop.wxss
|   |   |-- bottom-modal
|   |   |   |-- bottom-modal.js
|   |   |   |-- bottom-modal.json
|   |   |   |-- bottom-modal.wxml
|   |   |   `-- bottom-modal.wxss
|   |   |-- cart-list
|   |   |   |-- cart.js
|   |   |   |-- cart.json
|   |   |   |-- cart.wxml
|   |   |   `-- cart.wxss
|   |   |-- common-bar
|   |   |   |-- common-bar.js
|   |   |   |-- common-bar.json
|   |   |   |-- common-bar.wxml
|   |   |   `-- common-bar.wxss
|   |   |-- goodlist
|   |   |   |-- goodlist.js
|   |   |   |-- goodlist.json
|   |   |   |-- goodlist.wxml
|   |   |   `-- goodlist.wxss
|   |   |-- searchlist
|   |   |   |-- searchlist.js
|   |   |   |-- searchlist.json
|   |   |   |-- searchlist.wxml
|   |   |   `-- searchlist.wxss
|   |   `-- shopcar-bottom
|   |       |-- shopcar-bottom.js
|   |       |-- shopcar-bottom.json
|   |       |-- shopcar-bottom.wxml
|   |       `-- shopcar-bottom.wxss
|   |-- pages(页面)
|   |   |-- aboutme
|   |   |   |-- aboutme.js
|   |   |   |-- aboutme.json
|   |   |   |-- aboutme.wxml
|   |   |   `-- aboutme.wxss
|   |   |-- addAddress
|   |   |   |-- addAddress.js
|   |   |   |-- addAddress.json
|   |   |   |-- addAddress.wxml
|   |   |   `-- addAddress.wxss
|   |   |-- address
|   |   |   |-- address.js
|   |   |   |-- address.json
|   |   |   |-- address.wxml
|   |   |   `-- address.wxss
|   |   |-- classify
|   |   |   |-- classify.js
|   |   |   |-- classify.json
|   |   |   |-- classify.wxml
|   |   |   `-- classify.wxss
|   |   |-- collect
|   |   |   |-- collect.js
|   |   |   |-- collect.json
|   |   |   |-- collect.wxml
|   |   |   `-- collect.wxss
|   |   |-- contactme
|   |   |   |-- contactme.js
|   |   |   |-- contactme.json
|   |   |   |-- contactme.wxml
|   |   |   `-- contactme.wxss
|   |   |-- drawback
|   |   |   |-- drawback.js
|   |   |   |-- drawback.json
|   |   |   |-- drawback.wxml
|   |   |   `-- drawback.wxss
|   |   |-- finish
|   |   |   |-- finish.js
|   |   |   |-- finish.json
|   |   |   |-- finish.wxml
|   |   |   `-- finish.wxss
|   |   |-- goodsdetail
|   |   |   |-- goodsdetail.js
|   |   |   |-- goodsdetail.json
|   |   |   |-- goodsdetail.wxml
|   |   |   `-- goodsdetail.wxss
|   |   |-- home
|   |   |   |-- home.js
|   |   |   |-- home.json
|   |   |   |-- home.wxml
|   |   |   `-- home.wxss
|   |   |-- money
|   |   |   |-- money.js
|   |   |   |-- money.json
|   |   |   |-- money.wxml
|   |   |   `-- money.wxss
|   |   |-- obligation
|   |   |   |-- obligation.js
|   |   |   |-- obligation.json
|   |   |   |-- obligation.wxml
|   |   |   `-- obligation.wxss
|   |   |-- order
|   |   |   |-- order.js
|   |   |   |-- order.json
|   |   |   |-- order.wxml
|   |   |   `-- order.wxss
|   |   |-- pay
|   |   |   |-- pay.js
|   |   |   |-- pay.json
|   |   |   |-- pay.wxml
|   |   |   `-- pay.wxss
|   |   |-- profile
|   |   |   |-- profile.js
|   |   |   |-- profile.json
|   |   |   |-- profile.wxml
|   |   |   `-- profile.wxss
|   |   |-- receive
|   |   |   |-- receive.js
|   |   |   |-- receive.json
|   |   |   |-- receive.wxml
|   |   |   `-- receive.wxss
|   |   |-- searchgoods
|   |   |   |-- searchgoods.js
|   |   |   |-- searchgoods.json
|   |   |   |-- searchgoods.wxml
|   |   |   `-- searchgoods.wxss
|   |   |-- select
|   |   |   |-- select.js
|   |   |   |-- select.json
|   |   |   |-- select.wxml
|   |   |   `-- select.wxss
|   |   `-- shopcar
|   |       |-- shopcar.js
|   |       |-- shopcar.json
|   |       |-- shopcar.wxml
|   |       `-- shopcar.wxss
|   |-- sitemap.json
|   |-- style
|   |   |-- icon-address.wxss
|   |   |-- icon-profile.wxss
|   |   `-- icon.wxss
|   `-- utils(工具文件)
|       |-- ajax.js
|       |-- area.js
|       |-- formatTime.js
|       |-- util.js
|       `-- weui.wxss
|-- project.config.json
`-- tree.txt
```

## 技术要点
- [x] `云函数`
- [x] `云调用`
- [x] `云存储`
- [x] `tcb-router`

## 功能页面

本项目一共十一个功能页面，分为4个底部导航栏和其他在底部页面中的跳转

具体阐述：

1. 首页

   首页包含了搜索功能，搜索中可以对商品进行查询，还有模糊查询；首页除了搜索还对商品进行了展示与分类。

2. 分类

   具体分为分类一和分类二，分类一底下包含着分类二，点击分类一对分类二进行搜索，点击分类二对相同分类一的商品进行分类。

3. 购物车

   购物车可以对详情页中添加的商品进行展示，并且可以修改商品数量和总价，对结算功能并没有实现支付功能，而是模拟了一下支付流程。

4. 个人中心

   可以获取小程序用户的头像和昵称，查询订单列表，收藏关注的商品，还可以添加删除地址，这里并没有写修改地址。

## 部分技术要点分析
1.在文件中调用云函数(以获取商品分类为例子)

```js
wx.cloud.callFunction({
    name:'goods',
    data:{
        $url:'goodListByType',
        item
    }
}).then(res=>{
    wx.hideLoading();
    this.setData({
        goodList:res.result.data
    })
})
```
2.在文件中添加数据到云数据库中

```js  
let db = wx.cloud.database();
db.collection('order').add({
    data: {
        ...list[item]
    }
}).then(res => {
    console.log(res)
}).catch(console.error)
```
## 项目结构分析
- `cloudfunctions`是存放云函数的文件，用于文件中调用它，并对云数据库中的数据进行操作
- `miniprogram` 文件包含页面(`pages`)、图片资源(`assets`)、封装的插件(`utils`)、组件(`components`)等文件
- `app.js`是对小程序的配置文件 
- `project.config.json`项目配置文件
