(function(){
var key='chapter-inference.svg';
var data='[image content will be provided separately]';
document.querySelectorAll('img').forEach(function(img){
  var s=img.getAttribute('src')||'';
  if(s.indexOf(key)!==-1) img.src=data;
});
})();
