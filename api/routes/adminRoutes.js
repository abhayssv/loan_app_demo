'use strict';
var jwt = require('jwt-simple');
var bodyParser = require("body-parser");
var generalConfig = require('../config/generalConfig');
var passport = require("../config/passport.js")();
const globalErrorHandler = require('../controllers/errorController');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.all('/admin/signin', function(req, res) {
        console.log(req.body.username.email);
        console.log(req.body.password);
        console.log(req.body.username.isadmin);
        if (req.body.username.email && req.body.password && req.body.username.isadmin == 1) {
            var email = req.body.username.email;
            var password = req.body.password;
            var isadmin = req.body.username.isadmin
            passport.validateEmailPassword(email, password, function(res1) {
                console.log("Response: ",res1);
                if (res1) {
                    if (res1.error == false) {
                        generalConfig.generateJwtToken(res1.data.id, res1.data.user_type, res1.data.has_role,  function(res2) {
                            res.json({
                                newToken: res2.newToken,
                                message: res1.message,
                                error: false
                            });
                        });
                    } else {
                        res.json({
                            message: res1.message,
                            error: true
                        });
                    }
                } else {
                    res.json({
                        message: 'Some issue occurred.',
                        error: true
                    });
                }
            });
        } else {
            res.json({
                message: "User credentials are invalid",
                error: true
            });
        }
    });

    app.all('/admin/*', passport.authenticate(), function(req, res, next) {
        next();
    });

    app.all('/apis/*', passport.authenticate(), function(req, res, next) {
        next();
    });

    app.all('/api/*', function(req, res, next) {
        next();
    });
    /* Admin Other Routes */

    var userRoute = require('./userRoute.js');
    new userRoute(app);
    var profileRoute = require('./profileRoute.js');
    new profileRoute(app);
    var appUserRoute = require('./appUserRoute.js');
    new appUserRoute(app);
    var appUserOtpRoute = require('./appUserOtpRoute');
    new appUserOtpRoute(app);
    var appUserContactRoute = require('./appUserContactsRoutes');
    new appUserContactRoute(app);
    var appPageRoute = require('./appPageRoute.js');
    new appPageRoute(app);
    var userForgotPasswordRoute = require('./userForgotPasswordRoute.js');
    new userForgotPasswordRoute(app);
    var appUsersProfileRoute = require('./appUserProfileRoute');
    new appUsersProfileRoute(app);
    var faqRoute = require('./faqRoute');
    new faqRoute(app);
    var appInterestPenalityRoute = require('./appInterestPenalityRoutes');
    new appInterestPenalityRoute(app);
    var appApplyLoanRoute = require('./appApplyLoanRoute');
    new appApplyLoanRoute(app);
    var appUserLimitRoute = require('./appUserLimitRoute');
    new appUserLimitRoute(app);
    var adminSubCategoryRoutes = require('./adminSubCategoryRoutes');
    new adminSubCategoryRoutes(app);
    var adminPermissionRoutes = require('./adminPermissionRoutes');
    new adminPermissionRoutes(app);
    var appCreditRoutes = require('./appCreditRoute');
    new appCreditRoutes(app);
    var appCoinRoutes = require('./appCoinRoute');
    new appCoinRoutes(app);
    var appPaymentRoutes = require('./appPaymentRoute');
    new appPaymentRoutes(app);
    var appNotificationRoutes = require('./appNotificationRoute');
    new appNotificationRoutes(app);
    var appCategoryRoutes = require('./userCategryRoute');
    new appCategoryRoutes(app);
    var appUserListRoutes = require('./appUserListRoute');
    new appUserListRoutes(app);
    var appUserTimeListRoutes = require('./appUserTimeListRoute');
    new appUserTimeListRoutes(app);
    var systemReportRoutes = require('./systemReportRoutes');
    new systemReportRoutes(app);
    var appListRoute = require('./appListRoute');
    new appListRoute(app);
    var locationRoute = require('./locationRoute');
    new locationRoute(app);
    var appAssignLoanRoute = require('./appAssignLoanRoute');
    new appAssignLoanRoute(app);
    var businessTenureRoute = require('./businessTenureRoute');
    new businessTenureRoute(app);
    var appBusinessPaymentRoute = require('./appBusinessPaymentRoute');
    new appBusinessPaymentRoute(app);
    var appInfoRoute = require('./appInfoRoute');
    new appInfoRoute(app);
    var scheduleRoute = require('./scheduleRoute');
    new scheduleRoute(app);
    var appVideoInfoRoute = require('./appVideoInfoRoute');
    new appVideoInfoRoute(app);
    
   
    /* Admin Other Routes End*/

    // Global error handling
    app.use(globalErrorHandler);

    app.use(function(err, req, res, next) {
        console.error(err);
        var msg = {
            error_code: err.error,
            message: ((err.message) ? err.message : err.error_description),
        };
        if (err.code == 401 || err.code == 503) {
            res.status(err.code).send(msg);
        } else {
            return res.json({
                code: err.code,
                status: 'fail',
                error: true,
                message: ((err.message) ? err.message : err.error_description),
            });
        }
    });
};
