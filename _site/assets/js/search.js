// Lightweight client-side search over a Jekyll-generated JSON index.
// Works on GitHub Pages (no server-side plugins required).
(function () {
  var input   = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  if (!input || !results) return;

  var index = [];
  var loaded = false;
  var loading = false;

  // Resolve search.json relative to the site root (handles project baseurls).
  function indexUrl() {
    var base = document.querySelector('link[rel="alternate"]');
    // feed.xml lives at site root; derive base path from it.
    if (base) {
      var href = base.getAttribute('href') || '';
      return href.replace(/feed\.xml$/, 'search.json');
    }
    return 'search.json';
  }

  function loadIndex() {
    if (loaded || loading) return;
    loading = true;
    fetch(indexUrl())
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; loaded = true; loading = false; })
      .catch(function () { loading = false; });
  }

  function escapeHtml(s) {
    return (s || '').replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
    });
  }

  function render(matches, q) {
    if (!q) { results.classList.remove('show'); results.innerHTML = ''; return; }
    if (matches.length === 0) {
      results.innerHTML = '<li class="r-empty">No posts match “' + escapeHtml(q) + '”.</li>';
      results.classList.add('show');
      return;
    }
    results.innerHTML = matches.slice(0, 8).map(function (m) {
      return '<li><a href="' + m.url + '">' +
             '<span class="r-title">' + escapeHtml(m.title) + '</span>' +
             '<span class="r-snippet">' + escapeHtml(m.date) +
             (m.excerpt ? ' — ' + escapeHtml(m.excerpt) : '') +
             '</span></a></li>';
    }).join('');
    results.classList.add('show');
  }

  function search(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    return index.filter(function (item) {
      var hay = (item.title + ' ' + item.tags + ' ' + item.content).toLowerCase();
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    });
  }

  input.addEventListener('focus', loadIndex);
  input.addEventListener('input', function () {
    var q = input.value.trim();
    if (!loaded) { loadIndex(); }
    render(search(q), q);
  });

  // Hide results when clicking away or pressing Escape.
  document.addEventListener('click', function (e) {
    if (!results.contains(e.target) && e.target !== input) {
      results.classList.remove('show');
    }
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { input.value = ''; results.classList.remove('show'); input.blur(); }
  });
})();
