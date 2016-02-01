'use strict';

const passport = require('koa-passport');
const GithubStrategy = require('passport-github').Strategy;
const tools = require('../../util/tools');
const co = require("co");
const debug = require('../../util/debug')('auth:github');

exports.setup = function (User,config) {
  passport.use(new GithubStrategy({
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callback,
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      debug('GithubStrategy start');
      var userId = req.session.passport.userId || null;
      profile._json.token = accessToken;
      //如果userId不存在.而新建用户,否而更新用户.
      if(userId) return done(new Error('您已经是登录状态了'));
      co(function *() {
        const checkUserId = yield User.findOne({'github.id': profile.id});
        if(checkUserId) return done(null, checkUserId);
        let newUser = {
          nickname: profile.displayName || profile.username,
          avatar:profile._json.avatar_url || '',
          provider: 'github',
          github: profile._json,
          status:1
        }
        const checkUserName = yield User.findOne({nickname:newUser.nickname});
        if(checkUser){
          newUser.nickname = tools.randomString();
        }
        const user = yield new User(newUser).save();
        return done(null, user);
      }).catch(function (err) {
        debug('GithubStrategy error');
        return done(err);
      });
    }
  ));
};