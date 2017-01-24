/*new Ajax({
 url: '/index.php',
 timeout: 20000,
 method: 'post',
 onComplete: function(data){ alert(data);}
 }).send('qwerty=123');*/

function Ajax(params) {
    this.xml_http_request =  null;
    this.timeout = null;
    this.response = 'json';
    this.options = {
        url: '',
        method: 'POST',
        async: true,
        timeout: 10000,
        onSuccess: function(){},
        onError: function(){}
    };
    if(params.url != undefined)
        this.options.url = params.url;

    // set method
    if(params.method != undefined)
        this.options.method = params.method;
    // set asynchronus param
    if(params.async != undefined)
        this.options.async = params.async;
    // set timeout
    if(params.timeout != undefined)
        this.options.timeout = params.timeout;
    // set callback functions
    if((params.onSuccess != undefined) && (typeof(params.onSuccess) == 'function'))
        this.options.onSuccess = params.onSuccess;
    if((params.onError != undefined) && (typeof(params.onError) == 'function'))
        this.options.onError = params.onError;

    this.init();
}
Ajax.prototype.init = function() {
    if (typeof XMLHttpRequest != 'undefined') {
        this.xml_http_request = new XMLHttpRequest();
    }
    else{
        try {
            this.xml_http_request = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                this.xml_http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                alert('Your browser don\'t support Ajax technology. Please download real browser :)');
            }
        }
    }
    var self_ = this;
    this.xml_http_request.open(self_.options.method, self_.options.url, self_.options.async);

    /** Вешаем callback в случае успешного
     *
     *   Список состояний readyState такой:
     *   0 - Unitialized
     *   1 - Loading
     *   2 - Loaded
     *   3 - Interactive
     *   4 - Complete
     *   Состояния 0-2 вообще не используются.
     *
     * self_.xml_http_request.status - код ответа сервера (200, 404 и тд)
     */
        // set callback function for XMLHttpRequest
    this.xml_http_request.onreadystatechange = function(){
        if((self_.xml_http_request.readyState == 4)) {
            var response;
            clearTimeout(self_.timeout);
                try {
                    response = JSON.parse(self_.xml_http_request.responseText);
                } catch (e) {
                    self_.options.onError({message: 'Something is ne tak'});
                    return;
                }
            if(response.status === 200) {
                self_.options.onSuccess(response);
            } else {
                self_.options.onError(response);
            }
        }
    }
};

Ajax.prototype.setRequestHeader = function(name, value)
{
    this.xml_http_request.setRequestHeader(name, value);
};

Ajax.prototype.get = function(queryparams)  {
    this.options.method = 'GET';
    this.xml_http_request.send(queryparams);
    var self_ = this;
    // set timeout need for abort request
    this.timeout = setTimeout( function(){ self_.xml_http_request.abort(); }, this.options.timeout);
};
Ajax.prototype.post = function(queryparams)  {
    var self_ = this;
    self_.options.method = 'POST';
    this.xml_http_request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    this.xml_http_request.send(JSON.stringify(queryparams));

    // set timeout need for abort request
    this.timeout = setTimeout( function(){ self_.xml_http_request.abort(); }, this.options.timeout);
};