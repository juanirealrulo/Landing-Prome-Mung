(function () {
  'use strict';

  // WhatsApp de Simón en formato internacional sin signos:
  // 54 (Argentina) + 9 (celular) + 351 8629374.
  var TELEFONO = '5493518629374';
  var MENSAJE = 'Hola Simón, vi la propuesta del poroto mung y quiero evaluarlo para esta campaña.';

  // 1. Enlaces a WhatsApp.
  var enlace = 'https://wa.me/' + TELEFONO + '?text=' + encodeURIComponent(MENSAJE);
  var botones = document.querySelectorAll('[data-wa]');
  for (var i = 0; i < botones.length; i++) {
    botones[i].setAttribute('href', enlace);
    botones[i].setAttribute('target', '_blank');
    botones[i].setAttribute('rel', 'noopener');
  }

  // 2. El botón flotante se esconde cuando el botón del llamado final ya está
  //    en pantalla, para no mostrar dos accesos iguales encimados.
  var fab = document.getElementById('fab');
  var cta = document.getElementById('cta-wa');
  if ('IntersectionObserver' in window && fab && cta) {
    new IntersectionObserver(function (entradas) {
      fab.hidden = entradas[0].isIntersecting;
    }, { rootMargin: '0px 0px -40px 0px' }).observe(cta);
  }
})();
