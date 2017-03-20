"use strict";

function ready(fn) {
  if (document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function(){
  var shiftedEls = document.getElementsByClassName('shifted');
  if (shiftedEls.length > 0){
    setTimeout(function(){
      /*TODO: This bit here is tricky. Basically, .shifted elements add scrollbar to the browser, before they slide back up. But if a page is long, the scrollbar is necessary. */
      document.body.style.overflow = 'auto';      
    }, shiftedEls.length*500);
    Array.prototype.forEach.call(shiftedEls, function(el, index) {
      setTimeout(
        function(){
          el.classList.remove('shifted');
          el.classList.add('unshifted');
        },
        55*index*index);
    });
  }
});
