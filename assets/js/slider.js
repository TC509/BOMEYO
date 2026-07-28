/* Hero slider: image slides auto-advance every 5s; video slides play through once
   and only advance to the next slide when the video ends (see initHeroSlider). */

const HERO_SLIDES = [
  { type: "video", src: "assets/img/slider1.mp4" },
  { type: "image", src: "assets/img/slider2.jpg", alt: "BOMEYO look 02" },
  { type: "image", src: "assets/img/slider3.jpg", alt: "BOMEYO look 03" },
  { type: "image", src: "assets/img/slider4.jpg", alt: "BOMEYO look 04" },
  { type: "image", src: "https://placehold.co/900x1100/ede6da/2c190d?text=Look+05", alt: "Look 05" },
];

function heroSliderMarkup() {
  const slides = HERO_SLIDES.map((slide) => {
    const media =
      slide.type === "video"
        ? `<video src="${slide.src}" muted playsinline></video>`
        : `<img src="${slide.src}" alt="${slide.alt}" loading="lazy" />`;
    return `<div class="slider-slide">${media}</div>`;
  }).join("");

  const dots = HERO_SLIDES.map((_, i) => `<button class="slider-dot${i === 0 ? " active" : ""}" data-slide-index="${i}" aria-label="Go to slide ${i + 1}"></button>`).join("");

  return `
    <div class="hero-slider" data-hero-slider>
      <div class="slider-track">${slides}</div>
      <button class="slider-arrow slider-prev" data-slider-prev aria-label="Previous slide">&#8249;</button>
      <button class="slider-arrow slider-next" data-slider-next aria-label="Next slide">&#8250;</button>
      <div class="slider-dots">${dots}</div>
    </div>
  `;
}

function initHeroSlider() {
  const root = document.querySelector("[data-hero-slider]");
  if (!root) return;

  const track = root.querySelector(".slider-track");
  const slideEls = Array.from(root.querySelectorAll(".slider-slide"));
  const dots = Array.from(root.querySelectorAll(".slider-dot"));
  const total = HERO_SLIDES.length;
  let index = 0;
  let timer = null;
  let activeVideo = null;
  let onEnded = null;
  let paused = false;

  function pauseAllVideos() {
    slideEls.forEach((slide) => {
      const v = slide.querySelector("video");
      if (v) v.pause();
    });
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(next, 5000);
  }

  function detachVideoHandler() {
    if (activeVideo && onEnded) activeVideo.removeEventListener("ended", onEnded);
    activeVideo = null;
    onEnded = null;
  }

  function applyHeight(naturalWidth, naturalHeight) {
    if (!naturalWidth || !naturalHeight) return;
    const width = root.clientWidth;
    root.style.height = (width * (naturalHeight / naturalWidth)) + "px";
  }

  function updateHeightForCurrentSlide() {
    const media = slideEls[index].querySelector("img, video");
    if (!media) return;

    if (media.tagName === "IMG") {
      if (media.naturalWidth) {
        applyHeight(media.naturalWidth, media.naturalHeight);
      } else {
        media.addEventListener("load", () => {
          if (slideEls[index].contains(media)) applyHeight(media.naturalWidth, media.naturalHeight);
        }, { once: true });
      }
    } else {
      if (media.videoWidth) {
        applyHeight(media.videoWidth, media.videoHeight);
      } else {
        media.addEventListener("loadedmetadata", () => {
          if (slideEls[index].contains(media)) applyHeight(media.videoWidth, media.videoHeight);
        }, { once: true });
      }
    }
  }

  function activateCurrentSlide() {
    stopAutoplay();
    detachVideoHandler();
    pauseAllVideos();
    updateHeightForCurrentSlide();

    const video = slideEls[index].querySelector("video");

    if (video) {
      activeVideo = video;
      video.currentTime = 0;
      onEnded = () => next();
      video.addEventListener("ended", onEnded, { once: true });
      if (!paused) {
        const playPromise = video.play();
        if (playPromise && playPromise.catch) playPromise.catch(() => {});
      }
    } else if (!paused) {
      startAutoplay();
    }
  }

  function goTo(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, di) => dot.classList.toggle("active", di === index));
    activateCurrentSlide();
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  root.querySelector("[data-slider-next]").addEventListener("click", next);
  root.querySelector("[data-slider-prev]").addEventListener("click", prev);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => goTo(Number(dot.getAttribute("data-slide-index"))));
  });

  root.addEventListener("mouseenter", () => {
    paused = true;
    stopAutoplay();
    if (activeVideo) activeVideo.pause();
  });

  root.addEventListener("mouseleave", () => {
    paused = false;
    if (activeVideo) {
      const playPromise = activeVideo.play();
      if (playPromise && playPromise.catch) playPromise.catch(() => {});
    } else {
      startAutoplay();
    }
  });

  window.addEventListener("resize", updateHeightForCurrentSlide);

  goTo(0);
}
