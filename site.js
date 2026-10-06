// Smita Chaddha site - progressive enhancement only.
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Real photo replaces the placeholder when one has been supplied.
  var hero = document.querySelector(".portrait-frame img");
  if (hero) {
    var probe = new Image();
    probe.onload = function () { hero.src = "assets/smita-chaddha.jpg"; };
    probe.src = "assets/smita-chaddha.jpg";
  }

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

  // Gentle hero parallax on pointer devices only.
  var media = document.querySelector(".hero-media");
  var copy = document.querySelector(".hero-copy");
  if (media && copy && !reduce && window.matchMedia("(min-width: 861px)").matches) {
    var frame = null;
    window.addEventListener("scroll", function () {
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = null;
        var y = window.scrollY;
        if (y > window.innerHeight * 1.2) return;
        media.style.transform = "translate3d(0," + (y * 0.16).toFixed(2) + "px,0)";
        copy.style.transform = "translate3d(0," + (y * 0.06).toFixed(2) + "px,0)";
      });
    }, { passive: true });
  }
})();