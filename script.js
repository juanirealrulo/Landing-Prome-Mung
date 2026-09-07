(function () {
  'use strict';

  // Reemplazar por el número de Martín en formato internacional, sin signos.
  var TELEFONO = '5493700000000';
  var MENSAJE = 'Hola, vi la página del poroto mung y quiero saber si entra en mi planteo.';

  // 1. Armar los enlaces a WhatsApp. Los botones con data-plan mandan el
  //    nombre del programa, así Martín sabe de entrada por cuál preguntan.
  var botones = document.querySelectorAll('[data-wa]');
  for (var i = 0; i < botones.length; i++) {
    var plan = botones[i].getAttribute('data-plan');
    var texto = plan
      ? 'Hola, tengo interés en el ' + plan + ' de poroto mung.'
      : MENSAJE;
    botones[i].setAttribute('href', 'https://wa.me/' + TELEFONO + '?text=' + encodeURIComponent(texto));
    botones[i].setAttribute('rel', 'noopener');
  }

  // 2. Indicador de avance de lectura.
  var barraAvance = document.getElementById('progreso-barra');
  var pendiente = false;

  function avance() {
    var alto = document.documentElement.scrollHeight - window.innerHeight;
    var leido = alto > 0 ? Math.min(window.scrollY / alto, 1) : 1;
    barraAvance.style.width = (leido * 100).toFixed(1) + '%';
    pendiente = false;
  }

  window.addEventListener('scroll', function () {
    if (!pendiente) {
      pendiente = true;
      window.requestAnimationFrame(avance);
    }
  }, { passive: true });

  window.addEventListener('resize', avance, { passive: true });
  avance();

  // 3. Ocultar la barra fija cuando el cierre ya está en pantalla,
  //    para que no queden dos botones iguales encimados.
  var barra = document.getElementById('barra');
  var cierre = document.getElementById('cta-final');

  if ('IntersectionObserver' in window && barra && cierre) {
    var observador = new IntersectionObserver(function (entradas) {
      barra.hidden = entradas[0].isIntersecting;
    }, { rootMargin: '0px 0px -80px 0px' });
    observador.observe(cierre);
  }
})();
