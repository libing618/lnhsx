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

})