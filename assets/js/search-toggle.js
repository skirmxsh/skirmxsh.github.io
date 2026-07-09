// Mobile: reveal the search field when the magnifier icon is tapped.
(function () {
  var btn = document.getElementById('search-toggle');
  var header = document.querySelector('.site-header');
  var input = document.getElementById('search-input');
  if (!btn || !header || !input) return;

  btn.addEventListener('click', function () {
    var open = header.classList.toggle('search-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close search' : 'Open search');
    if (open) {
      // Wait for the row to render, then focus.
      setTimeout(function () { input.focus(); }, 0);
    }
  });

  function close() {
    header.classList.remove('search-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open search');
  }

  // Close on Escape when the field is empty.
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && input.value === '') close();
  });

  // Close when tapping/clicking anywhere outside the header.
  document.addEventListener('click', function (e) {
    if (!header.classList.contains('search-open')) return;
    if (!header.contains(e.target)) close();
  });
})();
