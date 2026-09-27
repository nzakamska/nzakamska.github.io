/* ============================================================
   Email obfuscation
   ------------------------------------------------------------
   The address is never written into the HTML source. It is
   assembled here at page load and injected into any element
   with class="email-link".

   Why: scrapers that simply fetch the raw HTML and run a regex
   for name@domain find nothing. This does not stop a scraper
   that runs a full browser, but it does stop the cheap majority.
   Click-to-email, copy-paste and screen readers all still work
   normally, which is why this is preferred over an image of the
   address (modern OCR reads those effortlessly).

   Visitors with JavaScript disabled see the <noscript> fallback
   written into each page instead: "natalie.zakamska [at] gmail
   [dot] com".

   TO REVERT TO A PLAIN ADDRESS: delete the <script> tag from
   each page and replace every
       <span class="email-link"></span>
   with an ordinary
       <a href="mailto:...">...</a>

   TO CHANGE THE ADDRESS: edit the three parts below.
   ============================================================ */

(function () {
  var user = "natalie.zakamska";
  var host = "gmail";
  var tld = "com";

  var address = user + "@" + host + "." + tld;

  document.addEventListener("DOMContentLoaded", function () {
    var slots = document.querySelectorAll(".email-link");
    for (var i = 0; i < slots.length; i++) {
      var slot = slots[i];
      var a = document.createElement("a");
      a.href = "mailto:" + address;
      // data-label="short" renders just the address; anything else
      // can set its own visible text via data-label.
      a.textContent = slot.getAttribute("data-label") || address;
      slot.parentNode.replaceChild(a, slot);
    }
  });
})();
