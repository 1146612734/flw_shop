var util = require('../../utils/util.js');
var api = require('../../config/api.js');


var app = getApp();

Page({
  data: {
    id: 0,
    brand: {
      pic_img: '//img.21xianhua.com/upload/2017/11/04/436d1c743e2421e0cb5f79fb83985786@360',
      pic_title: '笑语嫣然 缘定三生 33枝红玫瑰，搭配满天星 鲜花店送花订花 花束 礼盒',
      price: 139,
      detailNodes: '<img src="https://cdn.huaduocai.net//Storage/Shop/1/Products/1221/373976388972175750.jpg">'
    },
    standardHide: true,
    purchase_num: 1,
    stock_num: 998,
    increaseDisable: "",
    cutdownDisable: "disabled",

    goodsList: [],
    page: 1,
    size: 1000
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      id: parseInt(options.id)
    });
    this.getBrand();
    var detailNodes = "brand.detailNodes";
    let html = this.data.brand.detailNodes
      .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
      .replace(/<p>/ig, '<p style="font-size: 15Px; line-height: 25Px;">')
      .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img$1')
      .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img$1')
      .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img$1')
      .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img$1')
      .replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img$1 style="max-width: 100%; border-radius: 8Px;    "');
    this.setData({
      [detailNodes]: html
    })
  },
  getBrand: function () {
    let that = this;
    util.request(api.BrandDetail, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          brand: res.data.brand
        });

        that.getGoodsList();
      }
    });
  },
  getGoodsList() {
    var that = this;

    util.request(api.GoodsList, { brandId: that.data.id, page: that.data.page, size: that.data.size})
      .then(function (res) {
        if (res.errno === 0) {
          that.setData({
            goodsList: res.data.goodsList
          });
        }
      });
  },
  onShareAppMessage: function () {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/index/index',
      success: function (res) { }
    }
  },
  standardShow: function () {
    this.setData({
      standardHide: false
    });
  },
  standardHide: function () {
    this.setData({
      standardHide: true
    });
  },
  increaseNum: function () {
    this.data.purchase_num ++;
    if (this.data.purchase_num >= this.data.stock_num) {
      this.setData({
        purchase_num: this.data.stock_num,
        increaseDisable: "disabled"
      });
    } else {
      this.setData({
        purchase_num: this.data.purchase_num
      });
    }
    if (this.data.purchase_num > 1) {
      this.setData({
        cutdownDisable: ""
      });
    } 
  },
  cutDown: function () {
    this.data.purchase_num--;
    if (this.data.purchase_num <= 1) {
      this.setData({
        purchase_num: 1,
        cutdownDisable: "disabled"
      });
    } else {
      this.setData({
        purchase_num: this.data.purchase_num
      });
    }
    if (this.data.purchase_num < this.data.stock_num) {
      this.setData({
        increaseDisable: ""
      });
    } 
  },
  changeNum: function (event) {
    console.log(isNaN(event.detail.value));
  },
  addCart: function () {
    wx.showToast({
      title: '待开发',
      icon: 'success',
      duration: 1000
    })
  },
  buyNow: function () {
    wx.showToast({
      title: '待开发',
      icon: 'success',
      duration: 1000
    })
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

  }
})