const URL_f = 'https://tab.leancloud.cn/1.1/functions/lnhdata';
const lcHeader = {
          'X-LC-Id': 'icNDWuIvnuMGYUiobEqT4BNR-9Nh9j0Va',
          'X-LC-Key': '7KKCodECPfJvo0wYDwh3xlXS',
          'Accept': 'application/json'                 //这有一个大坑，不能用Content-Type：'application/json'
      };

function lcgetList(that,classname) {              //取无登录状态数据
    var endname = classname + 'end' ;          //最后更新缓存KEY名
    var dataname = classname + 'data' ;        //数据对象缓存KEY名
    var enddate = wx.getStorageSync(endname) || '1970-01-01'          //从缓存中读最后更新时间
    var classdata = wx.getStorageSync(dataname) || [] ;              //从缓存中读对象的数据
    wx.request({
        url: URL_f,
        method: 'POST',
        header: lcHeader,
        data: {
            'classname': classname+'Data',
            'skipd': '0',
            'gxdate': enddate
        },       
        success: function(res){     //这要注意返回的json名称有变化，要在控制台进行查看,千万不要用id这样的保留字作自定义的列名
            if (res.data.result.length>0) {                                                //有新增则更新缓存
            wx.setStorageSync(endname, res.data.result[res.data.result.length-1].updatedAt)      //修改最后更新时间
            for (var i=0; i<res.data.result.length; i++){
                for (var x=0; x<classdata.length; x++){                       //查找重复ID并删除旧记录
                    if (res.data.result[i].objectId==classdata[x].objectId){          //每个对象的记录中都有objectId
                        classdata.splice(x, 1);
                    }
                }    
                classdata.unshift(res.data.result[i]);
            }
            wx.setStorageSync(dataname, classdata)
            }
        },
        fail: function(error){
            return error;
        },
        complete: function(){        //异步处理流程解决数据请求中返回空值问题
            switch (classname){
                case 'img':
                    that.setData({img: classdata});
                    break;
                case 'goods':
                    that.setData({goods: classdata});
                    break;
            }
        }
    })

}

module.exports = {
  lcgetList: lcgetList
}