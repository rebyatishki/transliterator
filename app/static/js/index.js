document.addEventListener('DOMContentLoaded', function(){
    var textArea = document.querySelectorAll('textarea')[0],
        output = document.getElementById('out');
    textArea.focus();
    textArea.addEventListener('focus', function(e){
        e.target.previousSibling.previousSibling.style.color = '#2962ff';
    });
    textArea.addEventListener('blur', function(e) {
        e.target.previousSibling.previousSibling.style.color = '';
    });
    var sendBtn = document.getElementById('sendbtn');
    sendBtn.addEventListener('click', function(event) {
        var success = function(data) {
                output.innerHTML = data.translation;
            };
        var error = function (data) {
            var e = document.querySelectorAll('.error')[0];
            var m = document.getElementById('error-message');
            m.innerHTML = data.message;
            e.style.height = '2.5em';
            setTimeout(function() {
                e.style.height = '0';
            }, 2200);
        };
        var val = textArea.value.trim();
        if (val.length === 0) {
            return;
        }
        if (val.length > 400) {
            val = val.substring(0,399);
        }
        new Ajax({
            url: '/translate',
            timeout: 20000,
            onSuccess: success,
            onError: error
        }).post({ text: val });
    });
});