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

  // Mobile menu.
  var menu = document.getElementById("mobileMenu");
  var btn = document.getElementById("menuBtn");
  var close = document.getElementById("menuClose");
  function openMenu() {
    if (!menu) return;
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    if (btn) btn.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }
  if (btn) {
    btn.addEventListener("click", function () {
      if (!menu) return;
      if (menu.classList.contains("open")) closeMenu();
      else openMenu();
    });
  }
  if (close) close.addEventListener("click", closeMenu);
  if (menu) menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

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
  // positioned behind the scrim and content, so it can never collide with
  // text at any scroll position. The layer is 24% oversized top and bottom,
  // which gives it room to travel without ever exposing a gap.
  var media = document.querySelector(".hero-media");
  if (media && !reduce && window.matchMedia("(min-width: 881px)").matches) {
    var frame = null;
    window.addEventListener("scroll", function () {
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = null;
        var sy = window.scrollY;
        if (sy > window.innerHeight * 1.5) return;
        media.style.transform = "translate3d(0," + (sy * 0.25).toFixed(2) + "px,0)";
      });
    }, { passive: true });
  }
})();
