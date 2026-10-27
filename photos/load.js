(async function(){
var jobs=[
  ['hero-earth.svg','hero-earth',8],
  ['chapter-inference.svg','chapter-inference',7],
  ['chapter-silicon.svg','chapter-silicon',7],
  ['chapter-campus.svg','chapter-campus',9],
  ['chapter-horizon.svg','chapter-horizon',7],
  ['portrait.svg','portrait',12],
];
for (var j=0;j<jobs.length;j++){
  var key=jobs[j][0], stem=jobs[j][1], n=jobs[j][2], b64='';
  for (var i=0;i<n;i++){
    var name=stem+'-'+('0'+i).slice(-2)+'.b64';
    var res=await fetch('/photos/'+name);
    if(!res.ok) continue;
    b64 += (await res.text()).replace(/\s+/g,'');
  }
  if(!b64) continue;
  var data='data:image/jpeg;base64,'+b64;
  document.querySelectorAll('img').forEach(function(img){
    var s=img.getAttribute('src')||'';
    if(s.indexOf(key)!==-1) img.src=data;
  });
}
})();
