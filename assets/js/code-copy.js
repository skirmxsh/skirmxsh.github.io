// Adds a copy-to-clipboard button to each code block in a post.
(function () {
  var blocks = document.querySelectorAll('.post-content pre, .post-content .highlight');
  if (!blocks.length || !navigator.clipboard) return;

  blocks.forEach(function (block) {
    // Avoid doubling up when .highlight wraps a <pre>.
    if (block.classList.contains('highlight') && block.querySelector('pre')) {
      // button goes on the wrapper only
    } else if (block.tagName === 'PRE' && block.closest('.highlight')) {
      return;
    }

    block.style.position = 'relative';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');

    btn.addEventListener('click', function () {
      var codeEl = block.querySelector('code') || block.querySelector('pre') || block;
      var text = codeEl.innerText.replace(/\n$/, '');
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 1600);
      });
    });

    block.appendChild(btn);
  });
})();
