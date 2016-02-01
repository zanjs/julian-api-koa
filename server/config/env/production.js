'use strict';

// 生产环境配置
// =================================
module.exports = {
  port:     process.env.PORT || 8800,
  mongo: {
    uri: 'mongodb://localhost/julian-api',
    options: {
      user:'user',          //生产环境用户名
      pass:'pass'           //生产环境密码
    }
  },
  session:{
  	cookie:  {domain:'.zanjs.com',maxAge: 60000*5}
  }
};
