const AV = require('../../utils/av-weapp-min.js');
var app = getApp()
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
		minusStatuse: 'disabled',
        interval: 3000,
        duration: 1200,
		fQuantity: 1,
		brandList:[],
		cartobjectId: null,
        actionSheetHidden: true
    },
    jCartTap: function(){                        //点“加入购物车”
        this.setData({
            actionSheetHidden: false
        })
		var query = new AV.Query('cartData');
		var priorityQuery = new AV.Query('cartData');
		priorityQuery.equalTo('fGid', this.data.brandList.objectId);        //商品Id
		var statusQuery = new AV.Query('cartData');
		statusQuery.equalTo('fStatus','1');               //状态1购物车、2拼团、3订单、4付款、5发货、6收货、7退货、8清算、9结算
		var query = AV.Query.and(priorityQuery, statusQuery);
		query.find().then( function(results) {
			this.setData({fQuantity : results.fNum})
		}).then( function(results) {
			if (results.length == 0){
				this.setData({fQuantity: 1});
			}
			else
			{
				cartobjectId = results.objectId;
				this.setData({fQuantity: results.get('fNum')});
			}
		})
	},
	actionSheetChange: function(){				//点“确定”
        this.setData({
            actionSheetHidden: true
        })
		//写数据
		var wCartData = AV.object.extend('cartData');
		wCartData.set('fGid', brandList.objectId);
		wCartData.set('fNum', fQuantity);
		wCartData.set('fPrice', brandList.fPrice);
		wCartData.set('fShopId', brandList.fShopID);
		wCartData.set('fUserId', app.globalData.lcUser._id);
		wCartData.set('fStatus', '1');
		if (cartobjectId != null){
			wCartData.set('objectId', cartobjectId);
		} 
		wCartData.save().then(function(results){
			console.log()
		}),function(error) {
			console.error(error)
		}
    },
    bindMinus: function(e) {
		// 如果只有1件了，就不允许再减了
		if (fQuantity > 1) {
			this.setData({fQuantity: fQuantity --});
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态
		this.setData({minusStatus: fQuantity <= 1 ? 'disabled' : 'normal'}) ;
	},
	bindPlus: function(e) {
		// 自增
		this.setData({fQuantity: fQuantity ++});
		// 只有大于一件的时候，才能normal状态，否则disable状态
		this.setData({minusStatus: fQuantity <= 1 ? 'disabled' : 'normal'}) ;
	},
	bindManual: function(e) {
		// 将数值与状态写回
		this.setData({
			fQuantity: e.detail.value
		});
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
		else
		{
			wx.navigateBack();
		}
    }


})