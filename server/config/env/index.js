'use strict';

var path = require('path');
var _ = require('lodash');
var fs = require('fs');

var all = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 8083,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  seedDB: false,
  session:{
    secrets: 'julian-secret',
  },
  userRoles: ['user', 'admin'],
  qiniu:{
    app_key:"app_key",
    app_secret:"app_secret",
    domain:"domain",          //七牛配置域名
    bucket:"bucket"           //七牛空间名称  
  },
  //默认首页图片.
  defaultIndexImage:"http://zanjs.b0.upaiyun.com/image/8/39/88a19625234aa52b1658244d88f74.jpg",
  github:{
    clientID:"github",
    clientSecret:"clientSecret",
    callback:"/auth/github/callback"
  },
  weibo:{
    clientID:"clientID",
    clientSecret:"clientSecret",
    callbackURL:"/auth/weibo/callback"
  },
  qq:{
    clientID:"clientID",
    clientSecret:"clientSecret",
    callbackURL:"/auth/qq/callback"
  },
  apps:[
    {
      name:'React Native',
      gitUrl:'http://github.com/jackhutu/jackblog-react-native-redux',
      downloadUrl:{
        android:'http://a.app.qq.com/o/simple.jsp?pkgname=top.jackhu.reactnative',
        ios:''
      },
      qrcode:'http://upload.jackhu.top/qrcode/jackblog-react-native-qrcode.png'
    }
  ],
  //开启第三方登录
  snsLogins:['github','qq']
};

var config = _.merge(all,require('./' + process.env.NODE_ENV + '.js') || {});
//加载私有配置
if (fs.existsSync(path.join(__dirname, 'private/index.js'))) {
  config = _.merge(config, require(path.join(__dirname, 'private/index.js')) || {});  
}
module.exports = config;
