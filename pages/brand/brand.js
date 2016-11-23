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


})