

const debug = require('debug')('egg-passport-apple')
const assert = require('assert')
const AppleStrategy = require('passport-apple')

module.exports = app => {
    const config = app.config.passportApple
    config.passReqToCallback = true
    assert(config.clientID, '[egg-passport-apple] config.passportApple.clientID required')

    // must require `req` params
    app.passport.use('apple', new AppleStrategy(config, (req, accessToken, refreshToken, params, profile, done) => {
    // format user
        const user = {
            provider: 'apple',
            id: params.sub,
            name: params.email,
            displayName: params.email,
            photo: '',
            accessToken,
            refreshToken,
            params,
            profile,
        }

        debug('%s %s get user: %j', req.method, req.url, user)

        // let passport do verify and call verify hook
        app.passport.doVerify(req, user, done)
    }))
}
