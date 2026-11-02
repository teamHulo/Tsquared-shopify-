/* T2: footer "The T2 Edit" signup. Shopify still saves the email as normal (same tab).
   In the same click, Substack opens in a new tab with the email filled in so they can confirm. */
(function(){
  var SUBSTACK='https://tsquaredofficial.substack.com/api/v1/free?nojs=true';
  document.addEventListener('submit',function(ev){
    var f=ev.target; if(!f||f.tagName!=='FORM'||f.getAttribute('data-t2-ss')) return;
    var tag=f.querySelector('[name="contact[tags]"]');
    var em=f.querySelector('[name="contact[email]"]');
    if(!tag||!em||!/newsletter/i.test(tag.value||'')) return;
    var v=(em.value||'').trim(); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return;
    try{
      var s=document.createElement('form'); s.setAttribute('data-t2-ss','1');
      s.method='POST'; s.action=SUBSTACK; s.target='_blank'; s.style.display='none';
      var add=function(n,val){var i=document.createElement('input'); i.type='hidden'; i.name=n; i.value=val; s.appendChild(i);};
      add('email',v); add('source','embed'); add('first_url',location.href); add('current_url',location.href);
      document.body.appendChild(s); s.submit();
      setTimeout(function(){ s.remove(); },2000);
    }catch(e){}
  },true);
})();