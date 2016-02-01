'use strict';

const passport = require('koa-passport');
const WeiboStrategy = require('passport-weibo').Strategy;
const tools = require('../../util/tools');
const co = require("co");
const debug = require('../../util/debug')('auth:weibo');

exports.setup = function (User,config) {
  passport.use(new WeiboStrategy({
      clientID: config.weibo.clientID,
      clientSecret: config.weibo.clientSecret,
      callbackURL: config.weibo.callbackURL,
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      var userId = req.session.passport.userId || null;
      profile._json.token = accessToken;
      //如果userId不存在.而新建用户,否而更新用户.
      if(userId) return done(new Error('您已经是登录状态了'));
      co(function *() {
        const checkUserId = yield User.findOne({'weibo.id': profile.id});
        if(checkUserId) return done(null, checkUserId);
        let newUser = {
          nickname: profile.displayName || profile.username,
          avatar:profile._json.avatar_large || '',
          provider: 'weibo',
          weibo: profile._json,
          status:1
        }
        const checkUserName = yield User.findOne({nickname:newUser.nickname});
        if(checkUser){
          newUser.nickname = tools.randomString();
        }
        const user = yield new User(newUser).save();
        return done(null, user);
      }).catch(function (err) {
        debug('WeiboStrategy error');
        return done(err);
      });

    }
  ));
};