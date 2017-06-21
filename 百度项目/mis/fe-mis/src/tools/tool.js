/**
 * @file
 * Created by Zhangyunlu on 16/8/8.
 * pubulic tools for production
 */
window.callback_number = 0;

export function Jsonp(url, onload, fn, onerror) {
	let time = (new Date()).getTime();
    let cbn = '$CB' + (callback_number++);

    fn = fn || 'callback';
    url = url + (url.indexOf('?') > -1 ? '&' : '?') + fn + '=window.' + cbn + '&t=' + time;
    
    var s = document.createElement('script');

    window[cbn] = (response) => {
        s.parentNode.removeChild(s);
        delete window[cbn];
        onload && onload(null, response);
    }

    s.onerror = () => {
        s.parentNode.removeChild(s);
        delete window[cbn];
        onerror && onerror();
    }
    s.src = url;
    s.type = 'text/javascript';
    document.body.appendChild(s);
}

export function parseUrl (url) {
    if(!url){return {}}
    let properties = '"' + url.replace(/&/g, '","').replace(/=/g, '":"') + '"';
    let obj = JSON.parse('{' + properties + '}');
    return obj;
}
export function parseToUrl (paramK, paramV) {
    let str = '';
    let num = 0;
    for( let i of paramV) {
        if ((typeof(i) == 'string'|| typeof(i) == 'number') && i) {
            str = str + '&' + paramK[num] + '=' + i; 
        }
        if ('Array' == Object.prototype.toString.call(i).slice(8,13) && i[0]) {
            str = str + '&' + paramK[num] + '=' + i[0];
        }
        num ++ ;
    }
    str = str.substring(1);
    window.location.hash = window.location.hash.split('$')[0] + '$' + str;
}