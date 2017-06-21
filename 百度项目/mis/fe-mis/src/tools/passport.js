
import { urlJson } from './url-config';
import { Jsonp } from '../tools/tool';

exports.showLogin = function () {
    window.location.href = urlJson.login.LoginUrl + 'url=' + encodeURIComponent(window.location.href);
    //window.location.href = 'https://itebeta.baidu.com/login?service=' + encodeURIComponent(window.location.href + window.location.hash);
};
exports.exitLogin = function () {
    window.location.href = urlJson.login.ExitUrl + 'service=' + encodeURIComponent(window.location.href);
}
exports.checkLogin = function (callback) {
    let Url = urlJson.login.CheckUrl
    Jsonp(Url, (err, res) => {
        if (res.code == 0){
            callback(true, res.data.uname);
        } else {
            callback(false, false);
        }
    },'callback')
    callback(true,'user')
}
