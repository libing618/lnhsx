<<<<<<< HEAD
App({
  globalData:{
    userInfo: null,
    lcUser: null,
    userStatus: null
  },

  onLaunch: function () {
    var that = this
    that.globalData.lcUser = wx.getStorageSync('AV/icNDWuIvnuMGYUiobEqT4BNR-9Nh9j0Va/currentUser').objectId || null ;
    if ( that.globalData.lcUser !=null ){
      console.log('用户已登录'+that.globalData.lcUser)        
      }
    },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  onShow: function () {
  },
  onHide: function () {
    console.log('App Hide')
  }

=======
const AV = require('./utils/av-weapp-min.js');
AV.init( {
    appId: "icNDWuIvnuMGYUiobEqT4BNR-9Nh9j0Va",
    appKey: "7KKCodECPfJvo0wYDwh3xlXS",
});
App({
  onLaunch: function () {
    var that = this;
//AV.User.loginWithWeapp();
    that.globalData.lcUser = AV.User.currentUser || null;
      console.log('用户登录'+that.globalData.lcUser)        
  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  onShow: function () {
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData:{
    userInfo: null,
    lcUser: null
  }
>>>>>>> lnhsx-1-2
})