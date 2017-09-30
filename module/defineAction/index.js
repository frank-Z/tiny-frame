/**
 * Created by dt on 2016/9/6.
 */
golbal.DEFINE_ACTION_ARRAY = {};

global.DEFINE_ACTION = function (name, fn) {
    DEFINE_ACTION_ARRAY[name] = fn;
};