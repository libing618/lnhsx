<<<<<<< HEAD
const AV = require('./av-weapp-min.js');
AV.init( {
    appId: "icNDWuIvnuMGYUiobEqT4BNR-9Nh9j0Va",
    appKey: "7KKCodECPfJvo0wYDwh3xlXS",
});

function lcgetstatus( that ) {              //登录后取用户状态数据
  var query = new AV.Query('cartData');
  query.find().then( function(results) {
    return results
  }).then( function(results) {
    app.globalData.userStatus = results
  })
}

function lcsetdata(classdata,fstatus) {              //登录后修改用户购物数据
  var query = new AV.Query('cartData');
  query.equalTo('fStatus',fstatus);                //状态1购物车、2拼团、3订单、4付款、5发货、6收货、7退货、8清算、9结算
  query.find().then(function(res) {
    res.map(function(fsetData) {
      fsetData['fStatus'] = fstatus;
    });
    return AV.Object.saveAll(res);
  }).then(function(res) {
    // 更新成功
  }, function (error) {
    // 异常处理
  });
}

module.exports = {
  lcgetstatus: lcgetstatus
=======
const AV = require('./av-weapp-min.js');
AV.init( {
    appId: "icNDWuIvnuMGYUiobEqT4BNR-9Nh9j0Va",
    appKey: "7KKCodECPfJvo0wYDwh3xlXS",
});

function lcgetstatus( that ) {              //登录后取用户状态数据
  var query = new AV.Query('cartData');
  query.find().then( function(results) {
    return results
  }).then( function(results) {
      app.Data.userStatus = results
  })
}

function lcsetdata(classdata,fstatus) {              //登录后修改用户购物数据
  var query = new AV.Query('cartData');
  query.equalTo('fStatus',fstatus);                //状态1购物车、2拼团、3订单、4付款、5发货、6收货、7退货、8清算、9结算
  query.find().then(function(res) {
    res.map(function(fsetData) {
      fsetData['fStatus'] = fstatus;
    });
    return AV.Object.saveAll(res);
  }).then(function(res) {
    // 更新成功
  }, function (error) {
    // 异常处理
  });
}

module.exports = {
  lcgetstatus: lcgetstatus
>>>>>>> lnhsx-1-2
}