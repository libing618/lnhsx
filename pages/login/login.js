var  util = require( '../../utils/util.js' );
const AV = require('../../utils/av-weapp-min.js');
AV.init( {
    appId: "icNDWuIvnuMGYUiobEqT4BNR-9Nh9j0Va",
    appKey: "7KKCodECPfJvo0wYDwh3xlXS",
});
        
var app = getApp()
Page( {
  data: {
    userInfo: {},
    captcha_code: '../../images/iconfont-tuihuo.png',
    phone: '18603517701',
    captcha: "030002",
    code: ''
  },
  onLoad: function( options ) {
     //页面初始化 options 为页面跳转所带来的参数
    var that = this;
      that.setData({
          userInfo: app.globalData.userInfo
      })
  },

  phoneDataChange: function( e ) {
    // 电话变化
    var phone = e.detail.value;
    if( util.validatePhone( phone ) ) {
      this.setData({
        phone : phone
      })
    }
  },

  captchaDataChange: function( e ) {
    // 密码变化
    var captcha = e.detail.value;
    if( util.validateCode( captcha ) ) {
      this.data.captcha = this.data.captcha || {};
      this.data.captcha.value = captcha;
    }
  },

  formSubmit: function( e ) {
    var user = new AV.User();
        //  用户登陆
    user.setUsername( e.detail.value.phone );
    user.setPassword( e.detail.value.captcha );
  //  user.setEmail( e.detail.value.phone + "@leancloud.cn" );
    user.logIn().then( function( loginedUser ) {
      if(loginedUser.id != null){
        wx.showToast({
          title: '成功登录',
          icon: 'success',
          duration: 2000
        })
        wx.navigateBack();
      }
    }, ( function( error ) { })
    );
  }
})