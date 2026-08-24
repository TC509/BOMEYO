/* Home hero media: a single looping video, cropped to a fixed 3:4 box (shared
   .hero-slider styling also used by the product photo gallery), plus a live
   "ambient mode" glow behind it — see initHeroAmbient(). The navbar itself is
   permanently transparent + backdrop-blurred site-wide (in style.css); only
   this colored glow layer is specific to the home hero video. */

function heroVideoMarkup() {
  return `
    <div class="hero-ambient-wrap" data-hero-ambient>
      <canvas class="hero-ambient-glow" data-ambient-canvas width="32" height="43" aria-hidden="true"></canvas>
      <div class="hero-slider hero-video">
        <video autoplay muted loop playsinline preload="auto">
          <source src="assets/img/bomeyo_front_video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  `;
}

let ambientGlowTimer = null;

/* Repeatedly downsamples the current video frame onto a tiny canvas, then a
   heavy CSS blur turns that into a soft, color-shifting halo (same trick
   YouTube's ambient mode uses). */
function initHeroAmbient() {
  if (ambientGlowTimer) {
    clearInterval(ambientGlowTimer);
    ambientGlowTimer = null;
  }

  const wrap = document.querySelector("[data-hero-ambient]");
  if (!wrap) return;

  const canvas = wrap.querySelector("[data-ambient-canvas]");
  const video = wrap.querySelector("video");
  if (!canvas || !video) return;

  const ctx = canvas.getContext("2d");

  function draw() {
    if (video.readyState >= 2) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
  }

  video.addEventListener("loadeddata", draw);
  ambientGlowTimer = setInterval(draw, 120);
}
