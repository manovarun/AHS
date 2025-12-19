const el = document.getElementById('tileGallery');

lightGallery(el, {
  selector: 'a.tile',
  plugins: [lgZoom, lgThumbnail, lgAutoplay],
  loop: true,
  speed: 450,

  // Lightbox animation feel
  mode: 'lg-fade',
  backdropDuration: 250,
  hideBarsDelay: 2500,

  // Slideshow
  autoplay: true,
  pause: 3200,
  progressBar: true,

  download: false,
});

const tiles = document.querySelectorAll('#tileGallery .tile');
tiles.forEach((t, i) => {
  t.setAttribute('data-aos', 'zoom-in');
  t.setAttribute('data-aos-delay', String((i % 12) * 70)); // stagger
  t.setAttribute('data-aos-duration', '650');
  t.setAttribute('data-aos-easing', 'ease-out-cubic');
});
