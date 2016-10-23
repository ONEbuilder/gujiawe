~function () {
    //->createXHR:创建AJAX对象,兼容所有的浏览器
    function createXHR() {
        var xhr = null,
            flag = false,
            ary = [
                function () {
                    return new XMLHttpRequest;
                },
                function () {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                },
                function () {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                },
                function () {
                    return new ActiveXObject("Msxml3.XMLHTTP");
                }
            ];
        for (var i = 0, len = ary.length; i < len; i++) {
            var curFn = ary[i];
            try {
                xhr = curFn();
                createXHR = curFn;
                flag = true;
                break;
            } catch (e) {
            }
        }
        if (!flag) {
            throw new Error("your browser is not support ajax,please change your browser,try again!");
        }
        return xhr;
    }

    //->ajax:实现AJAX请求的公共方法;
    function ajax(options) {
        var _default = {
            url: "",
            type: "get",
            dataType: "json",
            async: true,
            data: null,
            getHead: null,
            success: null
        };
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        if (_default.type === "get") {
            _default.url.indexOf("?") >= 0 ? _default.url += "&" : _default.url += "?";
            _default.url += "_=" + Math.random();
        }

        //->SEND AJAX
        var xhr = createXHR();
        xhr.open(_default.type, _default.url, _default.async);
        xhr.onreadystatechange = function () {
            if (/^2\d{2}$/.test(xhr.status)) {
                if (xhr.readyState === 2) {
                    if (typeof _default.getHead === "function") {
                        _default.getHead.call(xhr);
                    }
                }
                if (xhr.readyState === 4) {
                    var val = xhr.responseText;
                    if (_default.dataType === "json") {
                        val = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")");
                    }
                    _default.success && _default.success.call(xhr, val);
                }
              /*  if (xhr.readyState === 4) {
                    //->返回内容类型的处理
                    var text = xhr.responseText;
                    _default.dataType = _default.dataType.toUpperCase();
                    switch (_default.dataType) {
                        case 'XML':
                            text = xhr.responseXML;
                            break;
                        case 'JSON':
                            text = 'JSON' in window ? JSON.parse(text) : eval('(' + text + ')');
                            break;
                    }
                    //->执行SUCCESS
                    _default.success && _default.success.call(xhr, text);
                }*/

            }
        };
        xhr.send(_default.data);
    }

    window.ajax = ajax;
}();
~(function(){
    function ajax(options){
        var _default={
            type:'get',
            url:'',
            dataType:'json',
            async:true,
            data:null,
            success:null,
            getHead:null,
            error:null
        }
        for(var key in options){
            if(options.hasOwnProperty(key)){
                _default[key]=options[key]
            }
        }
      var xhr=new  XMLHttpRequest();
        if(_default.type.toUpperCase()=="GET"){
            _default.url+=_default.url.indexOf("?")==-1?'?':'&';
            _default.url+='_='+Math.random();
        }
      xhr.open(_default.type,_default.url,_default.async)
        xhr.onreadystatechange=function(){
            if (/^2\d{2}$/.test(xhr.status)){
               if(xhr.readyState==2){
                   _default.getHead && _default.getHead.call(xhr)
               }
                if (xhr.readyState==4){
                    var text=xhr.responseText
                    _default.dataType=_default.dataType.toLowerCase()
                    switch (_default.dataType){
                        case 'XML':
                            text=xhr.responseXML;
                            break;
                        case 'JSON':
                            val='JSON' in window? JSON.parse(text):eval('('+text+')');
                            break
                    }
                    _default.success && _default.success.call(xhr,text)

                }
            }
            xhr.send(_default.data)
        }
    }
})()

