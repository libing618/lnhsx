const AV = require('../../utils/av-weapp-min.js');
function upData(classdata,newdata) {
    if (newdata.length>0) {                                                //有加载新增则更新数据
        for (var i=0; i<newdata.length; i++){
            for (var x=0; x<classdata.length; x++){                       //查找重复ID并删除旧记录
                if (newdata[i].objectId==classdata[x].objectId){          //每个对象的记录中都有objectId
                    classdata.splice(x, 1);
                }
            }    
            classdata.unshift(newdata[i]);
        }
        return classdata
    };
}

function dowData(classdata,newdata) {
    if (newdata.length>0) {                                                //有新增刷新则更新数据
        for (var i=newdata.length; i=0; i--){
            for (var x=0; x<classdata.length; x++){                       //查找重复ID并删除旧记录
                if (newdata[i-1].objectId==classdata[x].objectId){          //每个对象的记录中都有objectId
                    classdata.splice(x, 1);
                }
            }    
            classdata.push(newdata[i]);
        }
        return classdata
    };
}

//获取应用实例
var app = getApp()
Page({
    data: {
        img: [],
        goods: [],
        indicatorDots: false,
        vertical: false,
        interval: 3000,
        duration: 1200,
        scrollTop : 0,
        scrollHeight:0,
        loadingHidden: false  // loading
    },
    onLoad: function() {
    //事件处理函数
        var that = this            //调用应用实例的方法获取全局数据
        wx.getSystemInfo({
            success:function(res){
                    //这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        });
        that.setData({ img: wx.getStorageSync('imgdata') || [] });
        that.setData({ goods: wx.getStorageSync('goodsdata') || [] });

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
                    choiceItems: res.data.data.dataList.slice(0,5)
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
        var that = this;
        var gxdate = '1970-01-01' 
        if (img != []){
             gxdate = img[0].updatedAt ;
        };
        var pimgData = {
            'classname': 'imgData',
            'skipd': '6',
            'gxdate': gxdate,
            'ksdate': Date.now
        };
        AV.Cloud.run('lhndata',pimgData).then(function(results) {
            that.setData({
                img: upData(img,results),
                autoplay: true          //从index.wxml的class="swiper_box"中删掉bindchange="swiperchange"否则总报警
            })
        },function(error){
            console.error(error)
        });
        var pgoodsData = {
            'classname': 'goodsData',
            'skipd': '10',
            'gxdate': (goods==null) ? '1970-01-01' : goods[0].updatedAt,
            'ksdate': Date.now
        };
        AV.Cloud.run('lhndata',pgoodsData).then(function(results) {
            that.setData({
                goods: upData(goods,results)
            })
        },function(error){
            console.error(error)
        });
    },

    bindDownLoad:function(){
        //   该方法绑定了页面滑动到底部的事件
        var that = this;
        that.setData({
            loadingHidden: false,
        });
        var pgoodsData = {
            'classname': 'goodsData',
            'skipd': '10',
            'gxdate': '1970-01-01' ,
            'ksdate': goods[goods.length-1].updatedAt
        };
        AV.Cloud.run('lhndata',pgoodsData).then(function(results) {
            that.setData({
                goods: downData(goods,results),
            })
            setTimeout(function () {
                that.setData({
                    loadingHidden: true
                })
            }, 1500)
        },function(error){
            console.error(error)
        });
    },

    scroll:function(event){
        //   该方法绑定了页面滚动时的事件，这里记录当前的position.y的值,为了请求数据之后把页面定位到这里来。
        this.setData({
            scrollTop : event.detail.scrollTop
        });
    },

    refresh:function(event){
        //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
        var that = this;
        that.setData({
            loadingHidden: false,
            scrollTop : 0
        });
        var pimgData = {
            'classname': 'imgData',
            'skipd': '6',
            'gxdate': img==[] ? '1970-01-01' : img[0].updatedAt,
            'ksdate': Date.now
        };
        AV.Cloud.run('lhndata',pimgData).then(function(results) {
            this.setData({
                img: upData(img,results),
            })
        },function(error){
            console.error(error)
        });
        var pgoodsData = {
            'classname': 'goodsData',
            'skipd': '10',
            'gxdate': goods==[] ? '1970-01-01' : goods[0].updatedAt,
            'ksdate': Date.now
        };
        AV.Cloud.run('lhndata',pgoodsData).then(function(results) {
            that.setData({
                goods: upData(goods,results)
            })
            setTimeout(function () {
                that.setData({
                    loadingHidden: true
                })
            }, 1500)
        },function(error){
            console.error(error)
        });
    },

    onHide: function () {
        this.setData({
            autoplay: false              //退出当前页时关闭自动轮播,缓存数据。
        });
        wx.setStorage('imgdata', img);
        wx.setStorage('goodsdata', goods);
    },

})
