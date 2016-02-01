'use strict';

const router = require("koa-router")();
const controller = require('./user.controller');
const auth = require('../../auth/auth.service');

router.get('/getUserList', auth.hasRole('admin'),controller.getUserList);
router.post('/addUser', auth.hasRole('admin'),controller.addUser);
router.delete('/:id', auth.hasRole('admin'),controller.destroy);
router.put('/:id/updateUser', auth.hasRole('admin'), controller.updateUser);
//前台用户更新信息
router.put('/mdUser', auth.isAuthenticated(), controller.mdUser);
router.get('/getUserProvider',auth.isAuthenticated(), controller.getUserProvider);
router.get('/getCaptcha', controller.getCaptcha);
router.get('/me', auth.isAuthenticated(), controller.getMe);
router.get('/snsLogins',controller.getSnsLogins)
module.exports = router;
