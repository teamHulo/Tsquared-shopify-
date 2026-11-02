/* T2: copy footer newsletter signups to Substack (tsquaredofficial). Shopify signup still happens as normal. */
(function(){
  var SUBSTACK='https://tsquaredofficial.substack.com/api/v1/free?nojs=true';
  function send(email){
    try{
      var body=new URLSearchParams({email:email, first_url:location.href, current_url:location.href, source:'tsquarednyc-footer'});
      if(navigator.sendBeacon){ navigator.sendBeacon(SUBSTACK, body); }
      else { fetch(SUBSTACK,{method:'POST',mode:'no-cors',body:body,keepalive:true}); }
    }catch(e){}
  }
  document.addEventListener('submit',function(ev){
    var f=ev.target; if(!f||f.tagName!=='FORM') return;
    var tag=f.querySelector('[name="contact[tags]"]');
    var em=f.querySelector('[name="contact[email]"]');
    if(!tag||!em||!/newsletter/i.test(tag.value||'')) return;
    var v=(em.value||'').trim(); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return;
    send(v);
  },true);
})();