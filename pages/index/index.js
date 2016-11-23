var lc = require( '../../utils/lcgetdata.js');

//获取应用实例
var app = getApp()
Page({
    data: {
        indicatorDots: false,
        vertical: false,
        interval: 3000,
        duration: 1200,
        loadingHidden: false  // loading
    },
    onLoad: function() {
    //事件处理函数
        var that = this            //调用应用实例的方法获取全局数据
        lc.lcgetList(that,'img');
                autoplay: true

        lc.lcgetList(that,'goods');

        //choiceList
        wx.request({
            url: 'http://huanqiuxiaozhen.com/wemall/goods/choiceList',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                    choiceItems: res.data.data.dataList
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1500)
            }
        })
    },

    onShow: function () {
        this.setData({
            autoplay: true          //从index.wxml的class="swiper_box"中删掉bindchange="swiperchange"否则总报警
        })
    },

    onHide: function () {
        this.setData({
            autoplay: false              //退出当前页时关闭自动轮播
        });
    },

})
