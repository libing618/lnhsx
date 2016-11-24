<<<<<<< HEAD
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
=======
var app = getApp()
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
		minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
        interval: 3000,
        duration: 1200,
		fQuantity: 1,
		cartData:[],
        actionSheetHidden: true
    },
    jCartTap: function(){                        //点“加入购物车”
        this.setData({
            actionSheetHidden: false
        })
		var query = new AV.Query('cartData');
		var priorityQuery = new AV.Query('cartData');
		priorityQuery.equalTo('fGid', brandList.objectId);        //商品Id
		var statusQuery = new AV.Query('cartData');
		statusQuery.equalTo('fStatus','1');               //状态1购物车、2拼团、3订单、4付款、5发货、6收货、7退货、8清算、9结算
		var query = AV.Query.and(priorityQuery, statusQuery);
		query.find().then( function(results) {
			this.setData({fQuantity : results.fNum})
		}).then( function(results) {
			if (results.length == 0){
				this.setData({fQuantity: 1})
			}
			else
			{
				cartData = results
			}
		})
	},
	actionSheetChange: function(){				//点“确定”
        this.setData({
            actionSheetHidden: true
        })
		//写数据
    },
    bindMinus: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.carts[index].get('quantity');
		// 如果只有1件了，就不允许再减了
		if (num > 1) {
			num --;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var carts = this.data.carts;
		carts[index].set('quantity', num);
		// 按钮可用状态
		var minusStatuses = this.data.minusStatuses;
		minusStatuses[index] = minusStatus;
		// 将数值与状态写回
		this.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
		// update database
		carts[index].save();
		this.sum();
	},
	bindPlus: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.carts[index].get('quantity');
		// 自增
		num ++;
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var carts = this.data.carts;
		carts[index].set('quantity', num);
		// 按钮可用状态
		var minusStatuses = this.data.minusStatuses;
		minusStatuses[index] = minusStatus;
		// 将数值与状态写回
		this.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
		// update database
		carts[index].save();
		this.sum();
	},
	bindManual: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var carts = this.data.carts;
		var num = e.detail.value;
		carts[index].set('quantity', num);
		// 将数值与状态写回
		this.setData({
			carts: carts
		});
		cart[index].save();
		console.log(this.data.carts);
	},
        // 选择商品
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


>>>>>>> lnhsx-1-2
})