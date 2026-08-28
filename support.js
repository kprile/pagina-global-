/* Global Tires loader: conserva runtime original y añade experiencia de prueba */
(() => {
  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='./intro-experience.css?v=20260828g';
  document.head.appendChild(css);
  document.write('<script src="./runtime.js"><\/script>');
  const s=document.createElement('script');
  s.src='./intro-experience.js?v=20260828g';
  s.async=false;
  document.head.appendChild(s);
})();