var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();

Page({
  data: {
    bannerInfo: {
      'img_url': '',
      'name': ''
    },
    categoryFilter: false,
    filterCategory: [],
    goodsList: [
      {
        pic_img: 'https://cdn.huaduocai.net/Storage/Shop/3/Products/7038/39954843750740.jpg',
        good_name: '心中只有你 热烈爱的宣言，铭记于心的约定 爱这花儿般优雅的你',
        comment_num: 378,
        goodcomment_num: '100%',
        price: 218,
        sales_volume: 536,
        id: "1"
      },
      {
        pic_img: 'http://img.21xianhua.com/upload/2019/01/02/24b4c6868b8134b80500597f9cc3cac9@360',
        good_name: '笑语嫣然',
        comment_num: 378,
        goodcomment_num: '100%',
        price: 139,
        sales_volume: 536,
        id: "2"
      },
      {
        pic_img: 'http://img.21xianhua.com/upload/2018/12/14/2a70d15c210a832b27f99a08f2869e42@360',
        good_name: '温暖心情',
        comment_num: 378,
        goodcomment_num: '100%',
        price: 158,
        sales_volume: 536,
        id: "3"
      },
      {
        pic_img: '//img.21xianhua.com/upload/2017/11/04/436d1c743e2421e0cb5f79fb83985786@360',
        good_name: '呵护你',
        comment_num: 378,
        goodcomment_num: '100%',
        price: 108,
        sales_volume: 536,
        id: "4"
      },
      {
        pic_img: 'https://cdn.huaduocai.net/Storage/Shop/3/Products/7038/39954843750740.jpg',
        good_name: '心中只有你 热烈爱的宣言，铭记于心的约定 爱这花儿般优雅的你',
        comment_num: 378,
        goodcomment_num: '100%',
        price: 218,
        sales_volume: 536,
        id: "1"
      },
      {
        pic_img: 'http://img.21xianhua.com/upload/2019/01/02/24b4c6868b8134b80500597f9cc3cac9@360',
        good_name: '笑语嫣然',
        comment_num: 378,
        goodcomment_num: '100%',
        price: 139,
        sales_volume: 536,
        id: "2"
      },
      {
        pic_img: 'http://img.21xianhua.com/upload/2018/12/14/2a70d15c210a832b27f99a08f2869e42@360',
        good_name: '温暖心情',
        comment_num: 378,
        goodcomment_num: '100%',
        price: 158,
        sales_volume: 536,
        id: "3"
      },
      {
        pic_img: '//img.21xianhua.com/upload/2017/11/04/436d1c743e2421e0cb5f79fb83985786@360',
        good_name: '呵护你',
        comment_num: 378,
        goodcomment_num: '100%',
        price: 108,
        sales_volume: 536,
        id: "4"
      }
    ],
    categoryId: 0,
    currentSortType: 'default',
    currentSortOrder: 'desc',
    page: 1,
    size: 1000
  },
  getData: function () {
    let that = this;
    util.request(api.GoodsHot).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          bannerInfo: res.data.bannerInfo,
        });
        that.getGoodsList();
      }
    });
  },
  getGoodsList (){
    var that = this;

    util.request(api.GoodsList, { isHot: 1, page: that.data.page, size: that.data.size, order: that.data.currentSortOrder, sort: that.data.currentSortType, categoryId: that.data.categoryId})
      .then(function (res) {
        if (res.errno === 0) {
          that.setData({
            goodsList: res.data.goodsList,
            filterCategory: res.data.filterCategory
          });
        }
      });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getData();
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
  openSortFilter: function (event) {
    let currentId = event.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        this.setData({
          'categoryFilter': !this.data.categoryFilter,
          'currentSortType': 'category',
          'currentSortOrder': 'asc'
        });
        break;
      case 'priceSort':
        let tmpSortOrder = 'asc';
        if (this.data.currentSortOrder == 'asc') {
          tmpSortOrder = 'desc';
        }
        this.setData({
          'currentSortType': 'price',
          'currentSortOrder': tmpSortOrder,
          'categoryFilter': false
        });

        this.getData();
        break;
      default:
        //综合排序
        this.setData({
          'currentSortType': 'default',
          'currentSortOrder': 'desc',
          'categoryFilter': false
        });
        this.getData();
    }
  },
  selectCategory: function(event){
    let currentIndex = event.target.dataset.categoryIndex;
    this.setData({
      'categoryFilter': false,
      'categoryId': this.data.filterCategory[currentIndex].id
    });
    this.getData();

  }
})