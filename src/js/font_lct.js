var tid="";
var fontSize = 20;
var pageWidth = 375;
var maxPageWidth = 420;
var elm = document.documentElement;
var clientWidth = elm.clientWidth
if (clientWidth >= maxPageWidth) {
    clientWidth = maxPageWidth;
}
var fonsSizeSeting = fontSize * (clientWidth / pageWidth) + 'px';
elm.style.fontSize = fonsSizeSeting;
function refreshRem() {
    var elmInner = document.documentElement;
    var widthInner = elmInner.clientWidth;
    if (widthInner >= maxPageWidth) {
        widthInner = maxPageWidth;
    }
    elmInner.style.fontSize = fontSize * (widthInner / pageWidth) + 'px';
}
window.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
}, false);

