// Scroll-reveal: fades/slides .reveal elements in as they enter the
// viewport. No dependencies. Does nothing (shows everything immediately)
// if the visitor prefers reduced motion or IntersectionObserver is missing.
(function () {
  var els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach(function (e) { e.classList.add("is-visible"); });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach(function (e) { io.observe(e); });
})();
