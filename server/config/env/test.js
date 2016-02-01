'use strict';

// 测试环境配置
// ===========================
module.exports = {
  mongo: {
    uri: 'mongodb://localhost/julian-test'
  },
  port:    process.env.PORT || 8080,
  seedDB: true
};