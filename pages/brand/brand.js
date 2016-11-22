var app = getApp()
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,       
    },
        // 选择菜品
    selectDish (event) {
        let dish = event.currentTarget.dataset.dish; //选择的菜品的id
        let flag = true; //true表示可以被添加到购物车中
        let cart = this.data.cart; //购物车数组

        if(cart.length > 0){ //购物车中有商品时
            cart.forEach(function(item,index){//遍历购物车
                if(item == dish){//购物车如果有该商品
                    cart.splice(index,1); //删除该商品
                    flag = false;//不能被添加到购物车中
                }
            })
        }
        if(flag) cart.push(dish); //添加到购物车
        this.setData({
            cartTotal:cart.length //购物车商品数量
        })
        this.setStatus(dish) //修改状态
    },
    //修改菜品选中状态
    setStatus (dishId) {
        let dishes = this.data.dishesList;//菜品的二维数组
        for (let dish of dishes){
            dish.forEach((item) => { //双重循环遍历
                if(item.id == dishId){ //修改对应id的状态
                    item.status = !item.status || false
                }
            })
        }

        this.setData({
            dishesList:this.data.dishesList
        })
    },
    onLoad: function(options) {
        var that = this
        var lcFiles = wx.getStorageSync('goodsdata')
          if (lcFiles.length>0) {
            for (var i=0; i<lcFiles.length; i++){
                if (lcFiles[i].objectId==options.idbrand){          //每个对象的记录中都有objectId
                    that.setData({
                        brandList: lcFiles[i]
                    });
                    break
                  }
             }
        }
    }
})