var lc = require( '../../utils/contants.js' );
var app = getApp()
Page( {
  data: {
    userInfo: {},
    userListInfo: [ {
      icon: '../../images/iconfont-dingdan.png',
      text: '我的订单',
      isunread: true,
      unreadNum: 0
    }, {
        icon: '../../images/iconfont-card.png',
        text: '我的代金券',
        isunread: false,
        unreadNum: 0
      }, {
        icon: '../../images/iconfont-icontuan.png',
        text: '我的拼团',
        isunread: true,
        unreadNum: 0
      }, {
        icon: '../../images/iconfont-shouhuodizhi.png',
        text: '收货地址管理'
      }, {
        icon: '../../images/iconfont-kefu.png',
        text: '联系客服'
      }, {
        icon: '../../images/iconfont-help.png',
        text: '常见问题'
      }]
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( reuserInfo ) {
      //更新数据
      that.setData( {
        userInfo: reuserInfo
      })
    })
    that.globalData.lcUser = wx.getStorageSync('AV/icNDWuIvnuMGYUiobEqT4BNR-9Nh9j0Va/currentUser').objectId || null ;
    if ( app.globalData.lcUser == null ) {
      console.log('Session ='+app.globalData.lcUser)
      wx.navigateTo({
        url: '../login/login'
      })
    }else
    {
      lc.lcgetstatus(that);

    };
  }
})