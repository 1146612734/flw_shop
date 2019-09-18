const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    lists: [
      {
        pic_img: 'https://cdn.huaduocai.net/Storage/Shop/3/Products/7038/39954843750740.jpg',
        pic_title: '心中只有你',
        comment_num: 378,
        goodcomment_num: '100%',
        price: 218,
        sales_volume: 536,
        id: "1"
      },
      {
        pic_img: 'http://img.21xianhua.com/upload/2019/01/02/24b4c6868b8134b80500597f9cc3cac9@360',
        pic_title: '笑语嫣然',
        comment_num: 378,
        goodcomment_num: '100%',
        price: 139,
        sales_volume: 536,
        id: "2"
      },
      {
        pic_img: 'http://img.21xianhua.com/upload/2018/12/14/2a70d15c210a832b27f99a08f2869e42@360',
        pic_title: '温暖心情',
        comment_num: 378,
        goodcomment_num: '100%',
        price: 158,
        sales_volume: 536,
        id: "3"
      },
      {
        pic_img: '//img.21xianhua.com/upload/2017/11/04/436d1c743e2421e0cb5f79fb83985786@360',
        pic_title: '呵护你',
        comment_num: 378,
        goodcomment_num: '100%',
        price: 108,
        sales_volume: 536,
        id: "4"
      }
    ]
  },
  onShareAppMessage: function () {
    return {
      title: 'NideShop',
      desc: '仿网易严选微信小程序商城',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brand: res.data.brandList,
          floorGoods: res.data.categoryList,
          banner: res.data.banner,
          channel: res.data.channel
        });
      }
    });
  },
  goCommodityList: function (event) {
    wx.navigateTo({
      url: '../../pages/hotGoods/hotGoods'
    })
  },
  onLoad: function (options) {
    this.getIndexData();
    util.request(api.GoodsCount).then(res => {
      this.setData({
        goodsCount: res.data.goodsCount
      });
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})
