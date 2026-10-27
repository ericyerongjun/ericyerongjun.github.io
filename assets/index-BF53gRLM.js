const map = {
  "/hero-earth.svg": "https://i.imgur.com/8ifShZg.jpeg",
  "/chapter-inference.svg": "https://i.imgur.com/mNCc1H3.jpeg",
  "/chapter-silicon.svg": "https://i.imgur.com/R9rJHAj.jpeg",
  "/chapter-campus.svg": "https://i.imgur.com/vdN1nnP.jpeg",
  "/chapter-horizon.svg": "https://i.imgur.com/IRnOHTk.jpeg",
  "/portrait.svg": "https://i.imgur.com/xcGnuN6.jpeg",
};
function apply() {
  for (const img of document.images) {
    const key = img.getAttribute("src");
    if (key && map[key]) img.src = map[key];
  }
}
apply();
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", apply);
}
const obs = new MutationObserver(apply);
obs.observe(document.documentElement, { childList: true, subtree: true });
setTimeout(() => obs.disconnect(), 5000);
