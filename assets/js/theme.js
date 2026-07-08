// Theme toggle: persists choice in localStorage.
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var root = document.documentElement;
    var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    var next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();
