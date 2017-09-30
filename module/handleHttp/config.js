/**
 * Created by dt on 2016/9/6.
 */

var _HTTP_CONFIG = require('../../config/httpConfig.js');


module.exports = {
    getActionName: function (url) {
        return _HTTP_CONFIG[url];
    }

};


