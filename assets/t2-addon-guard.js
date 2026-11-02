/* T2 add-on price guard (added 2026-11-01).
   Blocks checkout if a cart item has a paid custom option selected (label contains "($")
   but is missing Easify's pricing tag (_po:items:addon), which would undercharge the order. */
(function(){
  var MSG = 'One item in your bag needs to be added again so your custom options are priced correctly. Please remove it and add it again from the product page. Your other items are fine.';
  function priced(it){
    var p = it.properties || {}, k, hasPaid = false, hasTag = false;
    for (k in p) {
      if (k.indexOf('_po:items:addon') === 0) hasTag = true;
      if (k.charAt(0) !== '_' && /\(\$\d/.test(String(p[k]))) hasPaid = true;
    }
    return hasPaid && !hasTag;
  }
  var bad = [];
  function block(e){ if (!bad.length) return; if (e) { e.preventDefault(); e.stopImmediatePropagation(); } showNotice(); }
  function showNotice(){
    var el = document.getElementById('t2-addon-guard');
    if (!el) {
      el = document.createElement('div'); el.id = 't2-addon-guard';
      el.setAttribute('role','alert');
      el.style.cssText = 'margin:16px auto;max-width:900px;padding:14px 18px;border:2px solid #600624;color:#600624;background:#fff;font-size:14px;line-height:1.5;text-align:center;';
      var names = bad.map(function(b){ return b.product_title; }).join(', ');
      el.textContent = MSG + ' (' + names + ')';
      var host = document.querySelector('form[action="/cart"]') || document.querySelector('main') || document.body;
      host.parentNode ? host.parentNode.insertBefore(el, host) : document.body.prepend(el);
    }
    el.scrollIntoView({behavior:'smooth', block:'center'});
  }
  function lock(){
    document.querySelectorAll('[name="checkout"], .additional-checkout-buttons, shopify-accelerated-checkout-cart, shopify-accelerated-checkout').forEach(function(b){
      if (b.tagName === 'BUTTON' || b.tagName === 'INPUT') { b.disabled = true; b.style.opacity = '.4'; } else { b.style.display = 'none'; }
    });
  }
  document.addEventListener('submit', function(e){
    var f = e.target, s = e.submitter;
    if ((s && s.name === 'checkout') || (f.action && /\/checkout/.test(f.action))) block(e);
  }, true);
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href*="/checkout"], [name="checkout"]');
    if (a) block(e);
  }, true);
  function check(){
    fetch('/cart.js', {credentials:'same-origin'}).then(function(r){ return r.json(); }).then(function(c){
      bad = (c.items || []).filter(priced);
      if (bad.length) { lock(); if (/\/cart\/?$/.test(location.pathname)) showNotice(); }
    }).catch(function(){});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', check); else check();
  document.addEventListener('cart:updated', check);
})();
