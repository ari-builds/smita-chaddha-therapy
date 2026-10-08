// Smita Chaddha site - progressive enhancement only.
(function () {
  "use strict";

  // Head armed a 3s failsafe that would disable reveal; we loaded, so cancel it.
  if (window.__revealFailsafe) {
    clearTimeout(window.__revealFailsafe);
    window.__revealFailsafe = null;
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year.
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Scroll reveal, skipped when reduced motion is requested.
  var items = document.querySelectorAll(".rv");
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Gentle parallax on the full-bleed media layer ONLY. It is absolutely
  // positioned at z-index -2 behind the scrim and grid, so it can never collide with
  // text at any scroll position. Applied to copy instead would do that.
  var media = document.querySelector(".hero-media");
  if (media && !reduce && window.matchMedia("(min-width: 861px)").matches) {
    var frame = null;
    window.addEventListener("scroll", function () {
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = null;
        var y = window.scrollY;
        if (y > window.innerHeight * 1.4) return;
        media.style.transform = "translate3d(0," + (y * 0.14).toFixed(2) + "px,0)";
      });
    }, { passive: true });
  }
})();